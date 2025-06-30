# Personal AI Model Host

A Python-based LangChain AI agent that uses the OpenAI API endpoint specification for personal AI model hosting.

## Features

- **LangChain Integration**: Built with LangChain for advanced AI agent capabilities
- **OpenAI API**: Uses OpenAI's API endpoint specification
- **FastAPI Backend**: RESTful API for easy integration
- **Streamlit UI**: Web-based user interface
- **CLI Client**: Command-line interface for direct interaction
- **Conversation Memory**: Maintains context across conversations
- **Tool Integration**: Extensible tool system for enhanced capabilities
- **Multiple Interfaces**: Web UI, CLI, and API endpoints

## Quick Start

### 1. Installation

```bash
# Install dependencies
pip install -r requirements.txt
```

### 2. Configuration

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Edit `.env` and add your OpenAI API key:

```env
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4
```

### 3. Start the Agent

```bash
# Start the FastAPI server
python main.py
```

The API will be available at `http://localhost:8000`

### 4. Use the Interfaces

#### Web UI (Streamlit)
```bash
# In a new terminal
streamlit run streamlit_ui.py
```

#### CLI Client
```bash
# Interactive mode
python cli_client.py interactive

# Single message
python cli_client.py chat "Hello, how are you?"

# Check status
python cli_client.py status
```

#### Direct API
```bash
# Using curl
curl -X POST "http://localhost:8000/chat" \
     -H "Content-Type: application/json" \
     -d '{"message": "Hello, AI!"}'
```

## API Endpoints

### Core Endpoints

- `GET /` - Basic information
- `GET /status` - Agent status and info
- `POST /chat` - Send message to AI agent
- `GET /conversations` - List active conversations
- `DELETE /conversations/{id}` - Delete conversation
- `POST /reset` - Reset agent and clear conversations

### Chat Request Format

```json
{
  "message": "Your message here",
  "conversation_id": "optional_conversation_id",
  "system_prompt": "optional_custom_system_prompt",
  "temperature": 0.7,
  "max_tokens": 2048
}
```

### Chat Response Format

```json
{
  "response": "AI agent response",
  "conversation_id": "conversation_id",
  "timestamp": "2024-01-01T12:00:00",
  "model_used": "gpt-4",
  "tokens_used": null
}
```

## Architecture

### Components

1. **PersonalAIAgent**: Core agent class with LangChain integration
2. **FastAPI Server**: RESTful API backend
3. **Streamlit UI**: Web-based user interface
4. **CLI Client**: Command-line interface
5. **Tools System**: Extensible tool integration

### Agent Capabilities

- **Natural Conversation**: Engaging chat with context memory
- **Tool Usage**: Built-in tools for time, calculations, and memory search
- **Memory Management**: Conversation history and context retention
- **Custom Prompts**: Support for custom system prompts
- **Multi-conversation**: Handle multiple concurrent conversations

### Built-in Tools

1. **get_current_time**: Get current date and time
2. **calculate**: Perform mathematical calculations
3. **search_memory**: Search conversation history (placeholder)

## Configuration

### Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key (required)
- `OPENAI_BASE_URL`: OpenAI API base URL (default: https://api.openai.com/v1)
- `OPENAI_MODEL`: Model to use (default: gpt-4)
- `AGENT_NAME`: Agent name (default: PersonalAI)
- `TEMPERATURE`: Response randomness (default: 0.7)
- `MAX_TOKENS`: Maximum response tokens (default: 2048)
- `HOST`: Server host (default: 0.0.0.0)
- `PORT`: Server port (default: 8000)
- `DEBUG`: Debug mode (default: True)

## Usage Examples

### Python API Usage

```python
import requests

# Send a chat message
response = requests.post("http://localhost:8000/chat", json={
    "message": "Explain quantum computing",
    "conversation_id": "my_conversation"
})

print(response.json()["response"])
```

### CLI Usage

```bash
# Interactive chat
python cli_client.py interactive

# Single message with custom conversation ID
python cli_client.py chat "What's the weather like?" --conversation-id weather_chat

# Check agent status
python cli_client.py status

# List all conversations
python cli_client.py conversations

# Reset the agent
python cli_client.py reset
```

### Streamlit UI Features

- Real-time chat interface
- Conversation management
- Configuration controls
- Export conversations
- Agent status monitoring

## Extending the Agent

### Adding New Tools

```python
def my_custom_tool(input_text: str) -> str:
    """Custom tool description"""
    # Your tool logic here
    return "Tool result"

# Add to the tools list in PersonalAIAgent._create_tools()
Tool(
    name="my_custom_tool",
    description="Description of what the tool does",
    func=my_custom_tool
)
```

### Custom System Prompts

You can override the default system prompt by including it in your chat request:

```json
{
  "message": "Hello",
  "system_prompt": "You are a helpful coding assistant specialized in Python."
}
```

## Development

### Project Structure

```
├── main.py              # FastAPI server and core agent
├── streamlit_ui.py      # Streamlit web interface
├── cli_client.py        # Command-line client
├── requirements.txt     # Python dependencies
├── .env.example        # Environment variables template
└── README.md           # This file
```

### Running in Development

```bash
# Start with auto-reload
python main.py

# Or use uvicorn directly
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## Troubleshooting

### Common Issues

1. **OpenAI API Key Error**: Ensure your API key is set in the `.env` file
2. **Port Already in Use**: Change the PORT in `.env` or kill the existing process
3. **Module Not Found**: Install dependencies with `pip install -r requirements.txt`
4. **Connection Refused**: Make sure the FastAPI server is running before using the UI or CLI

### Logs

The application logs important events and errors. Check the console output for debugging information.

## License

This project is open source and available under the MIT License.