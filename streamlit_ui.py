#!/usr/bin/env python3
"""
Streamlit UI for the Personal AI Model Host
"""

import streamlit as st
import requests
import json
from datetime import datetime
from typing import Dict, List

# Configure Streamlit page
st.set_page_config(
    page_title="Personal AI Model Host",
    page_icon="🤖",
    layout="wide",
    initial_sidebar_state="expanded"
)

# API Configuration
API_BASE_URL = "http://localhost:8000"

def call_api(endpoint: str, method: str = "GET", data: Dict = None) -> Dict:
    """Make API calls to the FastAPI backend"""
    url = f"{API_BASE_URL}{endpoint}"
    
    try:
        if method == "GET":
            response = requests.get(url)
        elif method == "POST":
            response = requests.post(url, json=data)
        elif method == "DELETE":
            response = requests.delete(url)
        
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        st.error(f"API Error: {str(e)}")
        return {}

def main():
    """Main Streamlit application"""
    
    # Title and description
    st.title("🤖 Personal AI Model Host")
    st.markdown("*LangChain AI Agent with OpenAI API endpoint specification*")
    
    # Sidebar for configuration and status
    with st.sidebar:
        st.header("⚙️ Configuration")
        
        # Check agent status
        status_data = call_api("/status")
        if status_data:
            st.success("✅ Agent Active")
            st.write(f"**Model:** {status_data.get('model', 'Unknown')}")
            st.write(f"**Active Conversations:** {status_data.get('conversations_active', 0)}")
        else:
            st.error("❌ Agent Offline")
        
        st.divider()
        
        # Conversation settings
        st.subheader("💬 Conversation Settings")
        
        conversation_id = st.text_input(
            "Conversation ID",
            value=f"conv_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
            help="Unique identifier for this conversation"
        )
        
        temperature = st.slider(
            "Temperature",
            min_value=0.0,
            max_value=2.0,
            value=0.7,
            step=0.1,
            help="Controls randomness in responses"
        )
        
        max_tokens = st.slider(
            "Max Tokens",
            min_value=100,
            max_value=4096,
            value=2048,
            step=100,
            help="Maximum tokens in response"
        )
        
        # System prompt
        system_prompt = st.text_area(
            "Custom System Prompt",
            placeholder="Enter a custom system prompt (optional)",
            help="Override the default system prompt"
        )
        
        st.divider()
        
        # Conversation management
        st.subheader("📋 Conversation Management")
        
        if st.button("🔄 Reset Agent"):
            result = call_api("/reset", method="POST")
            if result:
                st.success("Agent reset successfully!")
                st.rerun()
        
        # List conversations
        conversations_data = call_api("/conversations")
        if conversations_data and conversations_data.get("conversations"):
            st.write("**Active Conversations:**")
            for conv_id in conversations_data["conversations"]:
                col1, col2 = st.columns([3, 1])
                with col1:
                    st.write(f"• {conv_id}")
                with col2:
                    if st.button("🗑️", key=f"delete_{conv_id}"):
                        call_api(f"/conversations/{conv_id}", method="DELETE")
                        st.rerun()
    
    # Main chat interface
    st.header("💬 Chat Interface")
    
    # Initialize chat history in session state
    if "messages" not in st.session_state:
        st.session_state.messages = []
    
    # Display chat messages
    for message in st.session_state.messages:
        with st.chat_message(message["role"]):
            st.markdown(message["content"])
            if "timestamp" in message:
                st.caption(f"*{message['timestamp']}*")
    
    # Chat input
    if prompt := st.chat_input("Type your message here..."):
        # Add user message to chat history
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        st.session_state.messages.append({
            "role": "user",
            "content": prompt,
            "timestamp": timestamp
        })
        
        # Display user message
        with st.chat_message("user"):
            st.markdown(prompt)
            st.caption(f"*{timestamp}*")
        
        # Get AI response
        with st.chat_message("assistant"):
            with st.spinner("Thinking..."):
                # Prepare API request
                chat_request = {
                    "message": prompt,
                    "conversation_id": conversation_id,
                    "temperature": temperature,
                    "max_tokens": max_tokens
                }
                
                if system_prompt.strip():
                    chat_request["system_prompt"] = system_prompt
                
                # Call the chat API
                response_data = call_api("/chat", method="POST", data=chat_request)
                
                if response_data:
                    ai_response = response_data.get("response", "Sorry, I couldn't generate a response.")
                    response_timestamp = response_data.get("timestamp", datetime.now().isoformat())
                    model_used = response_data.get("model_used", "Unknown")
                    
                    # Display AI response
                    st.markdown(ai_response)
                    st.caption(f"*{response_timestamp} • Model: {model_used}*")
                    
                    # Add AI response to chat history
                    st.session_state.messages.append({
                        "role": "assistant",
                        "content": ai_response,
                        "timestamp": response_timestamp,
                        "model": model_used
                    })
                else:
                    st.error("Failed to get response from AI agent")
    
    # Additional features
    st.divider()
    
    # Export conversation
    col1, col2, col3 = st.columns(3)
    
    with col1:
        if st.button("📥 Export Conversation"):
            if st.session_state.messages:
                conversation_json = json.dumps(st.session_state.messages, indent=2)
                st.download_button(
                    label="Download JSON",
                    data=conversation_json,
                    file_name=f"conversation_{conversation_id}.json",
                    mime="application/json"
                )
            else:
                st.warning("No conversation to export")
    
    with col2:
        if st.button("🗑️ Clear Chat"):
            st.session_state.messages = []
            st.rerun()
    
    with col3:
        if st.button("ℹ️ Agent Info"):
            agent_info = call_api("/")
            if agent_info:
                st.json(agent_info)

if __name__ == "__main__":
    main()