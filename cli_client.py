#!/usr/bin/env python3
"""
Command-line client for the Personal AI Model Host
"""

import argparse
import requests
import json
import sys
from datetime import datetime
from typing import Dict, Optional

class AIAgentClient:
    def __init__(self, base_url: str = "http://localhost:8000"):
        self.base_url = base_url.rstrip('/')
    
    def _make_request(self, endpoint: str, method: str = "GET", data: Dict = None) -> Optional[Dict]:
        """Make HTTP request to the API"""
        url = f"{self.base_url}{endpoint}"
        
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
            print(f"Error: {e}")
            return None
    
    def chat(self, message: str, conversation_id: str = None, system_prompt: str = None) -> None:
        """Send a chat message to the AI agent"""
        if not conversation_id:
            conversation_id = f"cli_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        
        request_data = {
            "message": message,
            "conversation_id": conversation_id
        }
        
        if system_prompt:
            request_data["system_prompt"] = system_prompt
        
        response = self._make_request("/chat", method="POST", data=request_data)
        
        if response:
            print(f"\n🤖 AI Response:")
            print(f"{response['response']}")
            print(f"\n📊 Info: Model: {response['model_used']} | Conversation: {response['conversation_id']}")
        else:
            print("Failed to get response from AI agent")
    
    def status(self) -> None:
        """Get agent status"""
        response = self._make_request("/status")
        
        if response:
            print("🤖 Agent Status:")
            print(f"  Status: {response['status']}")
            print(f"  Model: {response['model']}")
            print(f"  Active Conversations: {response['conversations_active']}")
            print(f"  Uptime: {response['uptime']}")
        else:
            print("Failed to get agent status")
    
    def list_conversations(self) -> None:
        """List active conversations"""
        response = self._make_request("/conversations")
        
        if response:
            conversations = response.get('conversations', [])
            print(f"📋 Active Conversations ({len(conversations)}):")
            for conv_id in conversations:
                print(f"  • {conv_id}")
        else:
            print("Failed to get conversations list")
    
    def delete_conversation(self, conversation_id: str) -> None:
        """Delete a conversation"""
        response = self._make_request(f"/conversations/{conversation_id}", method="DELETE")
        
        if response:
            print(f"✅ {response['message']}")
        else:
            print(f"Failed to delete conversation: {conversation_id}")
    
    def reset(self) -> None:
        """Reset the agent"""
        response = self._make_request("/reset", method="POST")
        
        if response:
            print("✅ Agent reset successfully")
        else:
            print("Failed to reset agent")
    
    def interactive_mode(self) -> None:
        """Start interactive chat mode"""
        conversation_id = f"interactive_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        print(f"🤖 Starting interactive mode (Conversation ID: {conversation_id})")
        print("Type 'quit', 'exit', or 'bye' to end the conversation\n")
        
        while True:
            try:
                user_input = input("You: ").strip()
                
                if user_input.lower() in ['quit', 'exit', 'bye']:
                    print("👋 Goodbye!")
                    break
                
                if not user_input:
                    continue
                
                # Send message to AI
                request_data = {
                    "message": user_input,
                    "conversation_id": conversation_id
                }
                
                response = self._make_request("/chat", method="POST", data=request_data)
                
                if response:
                    print(f"AI: {response['response']}\n")
                else:
                    print("Error: Failed to get response from AI agent\n")
                    
            except KeyboardInterrupt:
                print("\n👋 Goodbye!")
                break
            except EOFError:
                print("\n👋 Goodbye!")
                break

def main():
    parser = argparse.ArgumentParser(description="Personal AI Model Host CLI Client")
    parser.add_argument("--url", default="http://localhost:8000", help="API base URL")
    
    subparsers = parser.add_subparsers(dest="command", help="Available commands")
    
    # Chat command
    chat_parser = subparsers.add_parser("chat", help="Send a message to the AI agent")
    chat_parser.add_argument("message", help="Message to send")
    chat_parser.add_argument("--conversation-id", help="Conversation ID")
    chat_parser.add_argument("--system-prompt", help="Custom system prompt")
    
    # Status command
    subparsers.add_parser("status", help="Get agent status")
    
    # List conversations command
    subparsers.add_parser("conversations", help="List active conversations")
    
    # Delete conversation command
    delete_parser = subparsers.add_parser("delete", help="Delete a conversation")
    delete_parser.add_argument("conversation_id", help="Conversation ID to delete")
    
    # Reset command
    subparsers.add_parser("reset", help="Reset the agent")
    
    # Interactive mode
    subparsers.add_parser("interactive", help="Start interactive chat mode")
    
    args = parser.parse_args()
    
    if not args.command:
        parser.print_help()
        return
    
    client = AIAgentClient(args.url)
    
    if args.command == "chat":
        client.chat(args.message, args.conversation_id, args.system_prompt)
    elif args.command == "status":
        client.status()
    elif args.command == "conversations":
        client.list_conversations()
    elif args.command == "delete":
        client.delete_conversation(args.conversation_id)
    elif args.command == "reset":
        client.reset()
    elif args.command == "interactive":
        client.interactive_mode()

if __name__ == "__main__":
    main()