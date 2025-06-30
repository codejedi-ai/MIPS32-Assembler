#!/usr/bin/env python3
"""
Personal AI Model Host using LangChain and OpenAI API
"""

import os
import asyncio
from typing import Dict, List, Optional, Any
from datetime import datetime
import logging

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import uvicorn

from langchain.agents import AgentExecutor, create_openai_functions_agent
from langchain.agents.openai_functions_agent.base import OpenAIFunctionsAgent
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.tools import Tool
from langchain.memory import ConversationBufferWindowMemory
from langchain.schema import BaseMemory

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="Personal AI Model Host",
    description="LangChain AI Agent with OpenAI API endpoint specification",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models for API
class ChatMessage(BaseModel):
    role: str = Field(..., description="Role of the message sender (user, assistant, system)")
    content: str = Field(..., description="Content of the message")
    timestamp: Optional[datetime] = Field(default_factory=datetime.now)

class ChatRequest(BaseModel):
    message: str = Field(..., description="User message to send to the AI agent")
    conversation_id: Optional[str] = Field(None, description="Conversation ID for context")
    system_prompt: Optional[str] = Field(None, description="Custom system prompt")
    temperature: Optional[float] = Field(0.7, ge=0.0, le=2.0)
    max_tokens: Optional[int] = Field(2048, ge=1, le=4096)

class ChatResponse(BaseModel):
    response: str = Field(..., description="AI agent response")
    conversation_id: str = Field(..., description="Conversation ID")
    timestamp: datetime = Field(default_factory=datetime.now)
    model_used: str = Field(..., description="Model used for generation")
    tokens_used: Optional[int] = Field(None, description="Tokens used in generation")

class AgentStatus(BaseModel):
    status: str = Field(..., description="Agent status")
    model: str = Field(..., description="Current model")
    conversations_active: int = Field(..., description="Number of active conversations")
    uptime: str = Field(..., description="Agent uptime")

# AI Agent Configuration
class PersonalAIAgent:
    def __init__(self):
        self.openai_api_key = os.getenv("OPENAI_API_KEY")
        self.openai_base_url = os.getenv("OPENAI_BASE_URL", "https://api.openai.com/v1")
        self.model_name = os.getenv("OPENAI_MODEL", "gpt-4")
        self.agent_name = os.getenv("AGENT_NAME", "PersonalAI")
        
        if not self.openai_api_key:
            raise ValueError("OPENAI_API_KEY environment variable is required")
        
        # Initialize the language model
        self.llm = ChatOpenAI(
            openai_api_key=self.openai_api_key,
            base_url=self.openai_base_url,
            model_name=self.model_name,
            temperature=float(os.getenv("TEMPERATURE", 0.7)),
            max_tokens=int(os.getenv("MAX_TOKENS", 2048))
        )
        
        # Conversation memory storage
        self.conversations: Dict[str, ConversationBufferWindowMemory] = {}
        
        # Initialize tools
        self.tools = self._create_tools()
        
        # Create agent prompt
        self.prompt = self._create_prompt()
        
        # Create agent
        self.agent = create_openai_functions_agent(
            llm=self.llm,
            tools=self.tools,
            prompt=self.prompt
        )
        
        logger.info(f"Personal AI Agent initialized with model: {self.model_name}")
    
    def _create_tools(self) -> List[Tool]:
        """Create tools for the agent"""
        
        def get_current_time() -> str:
            """Get the current date and time"""
            return datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        def calculate(expression: str) -> str:
            """Safely evaluate mathematical expressions"""
            try:
                # Basic safety check - only allow numbers, operators, and parentheses
                allowed_chars = set('0123456789+-*/()., ')
                if not all(c in allowed_chars for c in expression):
                    return "Error: Invalid characters in expression"
                
                result = eval(expression)
                return str(result)
            except Exception as e:
                return f"Error: {str(e)}"
        
        def search_memory(query: str) -> str:
            """Search through conversation memory"""
            # This is a placeholder - in a real implementation, you'd search through stored conversations
            return f"Memory search for '{query}' - feature coming soon"
        
        return [
            Tool(
                name="get_current_time",
                description="Get the current date and time",
                func=get_current_time
            ),
            Tool(
                name="calculate",
                description="Perform mathematical calculations. Input should be a mathematical expression.",
                func=calculate
            ),
            Tool(
                name="search_memory",
                description="Search through conversation history and memory",
                func=search_memory
            )
        ]
    
    def _create_prompt(self) -> ChatPromptTemplate:
        """Create the agent prompt template"""
        system_message = f"""You are {self.agent_name}, a personal AI assistant and model host.

You are powered by LangChain and use OpenAI's API endpoint specification.

Your capabilities include:
- Engaging in natural conversations
- Using tools to provide accurate information
- Maintaining conversation context and memory
- Helping with various tasks and questions

You should be helpful, accurate, and engaging while maintaining a professional yet friendly tone.

Current date and time: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
"""
        
        return ChatPromptTemplate.from_messages([
            ("system", system_message),
            MessagesPlaceholder(variable_name="chat_history"),
            ("human", "{input}"),
            MessagesPlaceholder(variable_name="agent_scratchpad")
        ])
    
    def get_or_create_memory(self, conversation_id: str) -> ConversationBufferWindowMemory:
        """Get or create conversation memory for a given conversation ID"""
        if conversation_id not in self.conversations:
            self.conversations[conversation_id] = ConversationBufferWindowMemory(
                k=10,  # Keep last 10 exchanges
                memory_key="chat_history",
                return_messages=True
            )
        return self.conversations[conversation_id]
    
    async def chat(self, message: str, conversation_id: str, system_prompt: Optional[str] = None) -> str:
        """Process a chat message and return the agent's response"""
        try:
            # Get conversation memory
            memory = self.get_or_create_memory(conversation_id)
            
            # Create agent executor
            agent_executor = AgentExecutor(
                agent=self.agent,
                tools=self.tools,
                memory=memory,
                verbose=True,
                handle_parsing_errors=True
            )
            
            # If custom system prompt is provided, modify the prompt temporarily
            if system_prompt:
                custom_prompt = ChatPromptTemplate.from_messages([
                    ("system", system_prompt),
                    MessagesPlaceholder(variable_name="chat_history"),
                    ("human", "{input}"),
                    MessagesPlaceholder(variable_name="agent_scratchpad")
                ])
                agent_executor.agent.prompt = custom_prompt
            
            # Execute the agent
            response = await agent_executor.ainvoke({"input": message})
            
            return response["output"]
            
        except Exception as e:
            logger.error(f"Error in chat processing: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Agent processing error: {str(e)}")

# Initialize the AI agent
try:
    ai_agent = PersonalAIAgent()
except Exception as e:
    logger.error(f"Failed to initialize AI agent: {str(e)}")
    ai_agent = None

# API Routes
@app.get("/", response_model=Dict[str, str])
async def root():
    """Root endpoint with basic information"""
    return {
        "message": "Personal AI Model Host",
        "description": "LangChain AI Agent with OpenAI API endpoint specification",
        "version": "1.0.0",
        "status": "active" if ai_agent else "error"
    }

@app.get("/status", response_model=AgentStatus)
async def get_status():
    """Get agent status and information"""
    if not ai_agent:
        raise HTTPException(status_code=503, detail="AI Agent not initialized")
    
    return AgentStatus(
        status="active",
        model=ai_agent.model_name,
        conversations_active=len(ai_agent.conversations),
        uptime="Running"  # In a real implementation, you'd track actual uptime
    )

@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    """Main chat endpoint for interacting with the AI agent"""
    if not ai_agent:
        raise HTTPException(status_code=503, detail="AI Agent not initialized")
    
    # Generate conversation ID if not provided
    conversation_id = request.conversation_id or f"conv_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
    
    try:
        # Process the message with the agent
        response = await ai_agent.chat(
            message=request.message,
            conversation_id=conversation_id,
            system_prompt=request.system_prompt
        )
        
        return ChatResponse(
            response=response,
            conversation_id=conversation_id,
            model_used=ai_agent.model_name,
            tokens_used=None  # OpenAI doesn't always return token count
        )
        
    except Exception as e:
        logger.error(f"Chat endpoint error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/conversations")
async def list_conversations():
    """List active conversations"""
    if not ai_agent:
        raise HTTPException(status_code=503, detail="AI Agent not initialized")
    
    return {
        "conversations": list(ai_agent.conversations.keys()),
        "total": len(ai_agent.conversations)
    }

@app.delete("/conversations/{conversation_id}")
async def delete_conversation(conversation_id: str):
    """Delete a specific conversation"""
    if not ai_agent:
        raise HTTPException(status_code=503, detail="AI Agent not initialized")
    
    if conversation_id in ai_agent.conversations:
        del ai_agent.conversations[conversation_id]
        return {"message": f"Conversation {conversation_id} deleted"}
    else:
        raise HTTPException(status_code=404, detail="Conversation not found")

@app.post("/reset")
async def reset_agent():
    """Reset the agent and clear all conversations"""
    if not ai_agent:
        raise HTTPException(status_code=503, detail="AI Agent not initialized")
    
    ai_agent.conversations.clear()
    return {"message": "Agent reset successfully", "conversations_cleared": True}

if __name__ == "__main__":
    # Configuration from environment variables
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", 8000))
    debug = os.getenv("DEBUG", "True").lower() == "true"
    
    logger.info(f"Starting Personal AI Model Host on {host}:{port}")
    
    uvicorn.run(
        "main:app",
        host=host,
        port=port,
        reload=debug,
        log_level="info"
    )