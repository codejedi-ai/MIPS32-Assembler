import React from 'react';
import { MermaidRenderer } from './components/MermaidRenderer';

function App() {
  // UTM Diagram for AI Companion App Architecture
  const utmDiagram = `
    graph TB
      %% User Interface Layer
      subgraph "Frontend Layer"
        WEB[Web App - React/Next.js]
        MOBILE[Mobile App - React Native]
        PWA[Progressive Web App]
      end

      %% API Gateway & Load Balancer
      subgraph "API Layer"
        LB[Load Balancer]
        API[API Gateway]
        AUTH[Authentication Service]
        RATE[Rate Limiting]
      end

      %% Core Services
      subgraph "Core Services"
        USER[User Service]
        CHAR[Character Service]
        CHAT[Chat Service]
        AI[AI Engine Service]
        MEMORY[Memory Service]
        PERSONA[Personality Engine]
      end

      %% AI/ML Layer
      subgraph "AI/ML Infrastructure"
        LLM[Large Language Model]
        EMB[Embedding Service]
        VECTOR[Vector Database]
        TRAIN[Training Pipeline]
        FINE[Fine-tuning Service]
      end

      %% Data Layer
      subgraph "Data Storage"
        POSTGRES[(PostgreSQL - User Data)]
        REDIS[(Redis - Sessions/Cache)]
        S3[(S3 - Media Storage)]
        PINECONE[(Pinecone - Vector DB)]
        ELASTIC[(Elasticsearch - Search)]
      end

      %% External Services
      subgraph "External APIs"
        OPENAI[OpenAI/Anthropic API]
        STRIPE[Stripe - Payments]
        SENDGRID[SendGrid - Email]
        TWILIO[Twilio - SMS]
        CDN[CloudFront CDN]
      end

      %% Monitoring & Analytics
      subgraph "Monitoring"
        LOGS[Logging Service]
        METRICS[Metrics Collection]
        ALERT[Alerting System]
        ANALYTICS[User Analytics]
      end

      %% Connections
      WEB --> LB
      MOBILE --> LB
      PWA --> LB
      
      LB --> API
      API --> AUTH
      API --> RATE
      
      AUTH --> USER
      API --> CHAR
      API --> CHAT
      API --> AI
      
      CHAT --> MEMORY
      AI --> PERSONA
      AI --> LLM
      AI --> EMB
      
      EMB --> VECTOR
      VECTOR --> PINECONE
      
      USER --> POSTGRES
      CHAT --> POSTGRES
      CHAR --> POSTGRES
      MEMORY --> REDIS
      
      AI --> OPENAI
      USER --> STRIPE
      USER --> SENDGRID
      
      CHAR --> S3
      CHAT --> S3
      
      API --> LOGS
      USER --> ANALYTICS
      CHAT --> METRICS
      
      style WEB fill:#e1f5fe
      style MOBILE fill:#e1f5fe
      style PWA fill:#e1f5fe
      style AI fill:#f3e5f5
      style LLM fill:#f3e5f5
      style POSTGRES fill:#e8f5e8
      style REDIS fill:#fff3e0
  `;

  // User Flow Diagram
  const userFlowDiagram = `
    graph TD
      START([User Opens App]) --> LANDING{First Time User?}
      
      %% Onboarding Flow
      LANDING -->|Yes| SIGNUP[Sign Up Process]
      SIGNUP --> VERIFY[Email Verification]
      VERIFY --> ONBOARD[Onboarding Tutorial]
      ONBOARD --> CHAR_SELECT[Character Selection/Creation]
      
      %% Returning User Flow
      LANDING -->|No| LOGIN{Logged In?}
      LOGIN -->|No| AUTH[Login/Authentication]
      LOGIN -->|Yes| DASHBOARD[Main Dashboard]
      AUTH --> DASHBOARD
      
      %% Character Selection/Creation
      CHAR_SELECT --> CREATE_CHAR{Create New Character?}
      CREATE_CHAR -->|Yes| CHAR_BUILDER[Character Builder]
      CREATE_CHAR -->|No| BROWSE_CHARS[Browse Characters]
      
      CHAR_BUILDER --> CHAR_DETAILS[Set Name, Personality, Avatar]
      CHAR_DETAILS --> CHAR_TRAITS[Define Traits & Backstory]
      CHAR_TRAITS --> CHAR_VOICE[Voice & Communication Style]
      CHAR_VOICE --> SAVE_CHAR[Save Character]
      
      BROWSE_CHARS --> SELECT_CHAR[Select Existing Character]
      SELECT_CHAR --> CHAR_PROFILE[View Character Profile]
      CHAR_PROFILE --> START_CHAT{Start Conversation?}
      
      SAVE_CHAR --> DASHBOARD
      
      %% Main Dashboard
      DASHBOARD --> RECENT_CHATS[Recent Conversations]
      DASHBOARD --> MY_CHARS[My Characters]
      DASHBOARD --> DISCOVER[Discover Characters]
      DASHBOARD --> PROFILE[User Profile]
      
      %% Chat Flow
      START_CHAT -->|Yes| CHAT_INTERFACE[Chat Interface]
      RECENT_CHATS --> CHAT_INTERFACE
      
      CHAT_INTERFACE --> SEND_MSG[Send Message]
      SEND_MSG --> AI_PROCESS[AI Processing]
      AI_PROCESS --> AI_RESPONSE[AI Response]
      AI_RESPONSE --> UPDATE_MEMORY[Update Conversation Memory]
      UPDATE_MEMORY --> CHAT_INTERFACE
      
      %% Chat Features
      CHAT_INTERFACE --> VOICE_MSG[Voice Messages]
      CHAT_INTERFACE --> IMAGE_SHARE[Share Images]
      CHAT_INTERFACE --> ROLEPLAY[Roleplay Mode]
      CHAT_INTERFACE --> MOOD_SET[Set Character Mood]
      
      %% Premium Features
      CHAT_INTERFACE --> PREMIUM{Premium User?}
      PREMIUM -->|No| FREE_LIMIT[Free Message Limit]
      FREE_LIMIT --> UPGRADE[Upgrade Prompt]
      UPGRADE --> PAYMENT[Payment Flow]
      PAYMENT --> PREMIUM_UNLOCK[Unlock Premium Features]
      
      PREMIUM -->|Yes| UNLIMITED[Unlimited Messages]
      UNLIMITED --> ADVANCED_AI[Advanced AI Models]
      ADVANCED_AI --> CUSTOM_CHARS[Custom Character Creation]
      
      %% Settings & Profile
      PROFILE --> ACCOUNT_SETTINGS[Account Settings]
      PROFILE --> PRIVACY[Privacy Settings]
      PROFILE --> SUBSCRIPTION[Subscription Management]
      PROFILE --> EXPORT_DATA[Export Conversations]
      
      %% Character Management
      MY_CHARS --> EDIT_CHAR[Edit Character]
      MY_CHARS --> DELETE_CHAR[Delete Character]
      MY_CHARS --> SHARE_CHAR[Share Character]
      
      EDIT_CHAR --> CHAR_DETAILS
      
      %% Discovery
      DISCOVER --> TRENDING[Trending Characters]
      DISCOVER --> CATEGORIES[Browse Categories]
      DISCOVER --> SEARCH[Search Characters]
      
      TRENDING --> CHAR_PROFILE
      CATEGORIES --> CHAR_PROFILE
      SEARCH --> CHAR_PROFILE
      
      style START fill:#e8f5e8
      style CHAT_INTERFACE fill:#e1f5fe
      style AI_PROCESS fill:#f3e5f5
      style PREMIUM_UNLOCK fill:#fff3e0
      style PAYMENT fill:#ffebee
  `;

  // Technical Architecture Flow
  const techFlowDiagram = `
    sequenceDiagram
      participant U as User
      participant F as Frontend
      participant API as API Gateway
      participant AUTH as Auth Service
      participant CHAT as Chat Service
      participant AI as AI Engine
      participant DB as Database
      participant VECTOR as Vector DB
      participant LLM as Language Model

      U->>F: Open App
      F->>API: Request Authentication
      API->>AUTH: Validate Token
      AUTH-->>API: User Authenticated
      API-->>F: User Data
      F-->>U: Show Dashboard

      U->>F: Start Chat with Character
      F->>API: Load Character Profile
      API->>DB: Fetch Character Data
      DB-->>API: Character Info
      API-->>F: Character Profile
      F-->>U: Chat Interface

      U->>F: Send Message
      F->>API: POST /chat/message
      API->>CHAT: Process Message
      CHAT->>VECTOR: Retrieve Context
      VECTOR-->>CHAT: Conversation History
      CHAT->>AI: Generate Response
      AI->>LLM: Query Language Model
      LLM-->>AI: AI Response
      AI-->>CHAT: Formatted Response
      CHAT->>DB: Save Conversation
      CHAT->>VECTOR: Update Memory
      CHAT-->>API: Response Ready
      API-->>F: AI Message
      F-->>U: Display Response
  `;

  // Database Schema Diagram
  const databaseSchema = `
    erDiagram
      USERS {
        uuid id PK
        string email UK
        string username UK
        string password_hash
        string first_name
        string last_name
        string avatar_url
        boolean is_premium
        timestamp created_at
        timestamp updated_at
        timestamp last_active
      }

      CHARACTERS {
        uuid id PK
        uuid creator_id FK
        string name
        text description
        text personality
        text backstory
        string avatar_url
        string voice_id
        json traits
        json conversation_style
        boolean is_public
        integer likes_count
        timestamp created_at
        timestamp updated_at
      }

      CONVERSATIONS {
        uuid id PK
        uuid user_id FK
        uuid character_id FK
        string title
        timestamp created_at
        timestamp updated_at
        timestamp last_message_at
      }

      MESSAGES {
        uuid id PK
        uuid conversation_id FK
        uuid sender_id FK
        string sender_type
        text content
        string message_type
        json metadata
        timestamp created_at
        boolean is_edited
        timestamp edited_at
      }

      CHARACTER_MEMORIES {
        uuid id PK
        uuid character_id FK
        uuid user_id FK
        text memory_content
        string memory_type
        float importance_score
        timestamp created_at
        timestamp last_accessed
      }

      SUBSCRIPTIONS {
        uuid id PK
        uuid user_id FK
        string plan_type
        string status
        timestamp started_at
        timestamp expires_at
        string stripe_subscription_id
      }

      USER_PREFERENCES {
        uuid id PK
        uuid user_id FK
        json chat_settings
        json privacy_settings
        json notification_settings
        timestamp updated_at
      }

      USERS ||--o{ CHARACTERS : creates
      USERS ||--o{ CONVERSATIONS : participates
      USERS ||--|| SUBSCRIPTIONS : has
      USERS ||--|| USER_PREFERENCES : has
      CHARACTERS ||--o{ CONVERSATIONS : participates
      CHARACTERS ||--o{ CHARACTER_MEMORIES : stores
      CONVERSATIONS ||--o{ MESSAGES : contains
      USERS ||--o{ CHARACTER_MEMORIES : relates_to
  `;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🤖 Galatea AI - AI Companion App Architecture
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Complete system architecture and user flow diagrams for building an AI companion app 
            similar to Replika and Character.AI
          </p>
        </div>
        
        {/* UTM Architecture Diagram */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
              🏗️ System Architecture (UTM Diagram)
            </h2>
            <p className="text-gray-600 mb-6">
              High-level system architecture showing all components needed for the AI companion platform
            </p>
          </div>
          <MermaidRenderer chart={utmDiagram} id="utm-diagram" />
        </section>

        {/* User Flow Diagram */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
              👤 User Flow Diagram
            </h2>
            <p className="text-gray-600 mb-6">
              Complete user journey from onboarding to premium features
            </p>
          </div>
          <MermaidRenderer chart={userFlowDiagram} id="user-flow" />
        </section>

        {/* Technical Flow */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
              ⚡ Technical Message Flow
            </h2>
            <p className="text-gray-600 mb-6">
              Sequence diagram showing how messages flow through the system
            </p>
          </div>
          <MermaidRenderer chart={techFlowDiagram} id="tech-flow" />
        </section>

        {/* Database Schema */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
              🗄️ Database Schema
            </h2>
            <p className="text-gray-600 mb-6">
              Entity relationship diagram showing the database structure
            </p>
          </div>
          <MermaidRenderer chart={databaseSchema} id="database-schema" />
        </section>

        {/* Key Features Summary */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              🚀 Key Features & Components
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-gray-800 mb-2">Core Features</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• AI-powered conversations</li>
                  <li>• Custom character creation</li>
                  <li>• Personality customization</li>
                  <li>• Memory & context retention</li>
                  <li>• Voice messages</li>
                  <li>• Image sharing</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold text-gray-800 mb-2">Premium Features</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Unlimited messages</li>
                  <li>• Advanced AI models</li>
                  <li>• Custom character voices</li>
                  <li>• Priority response times</li>
                  <li>• Export conversations</li>
                  <li>• Multiple characters</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-semibold text-gray-800 mb-2">Technical Stack</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• React/Next.js Frontend</li>
                  <li>• Node.js/Express Backend</li>
                  <li>• PostgreSQL Database</li>
                  <li>• Redis Caching</li>
                  <li>• Vector Database (Pinecone)</li>
                  <li>• OpenAI/Anthropic APIs</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;