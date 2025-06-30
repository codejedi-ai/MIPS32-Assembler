import React from 'react';
import { MermaidRenderer } from '../MermaidRenderer';

export const Architecture: React.FC = () => {
  const firebaseArchitecture = `
    graph TB
      %% User Interface Layer
      subgraph "Frontend Layer"
        WEB[Web App - React/Next.js]
        MOBILE[Mobile App - React Native]
        PWA[Progressive Web App]
      end

      %% Firebase Services
      subgraph "Firebase Backend"
        AUTH[Firebase Authentication]
        FIRESTORE[(Firestore Database)]
        STORAGE[Firebase Storage]
        FUNCTIONS[Cloud Functions]
        HOSTING[Firebase Hosting]
        ANALYTICS[Firebase Analytics]
      end

      %% Core AI Services
      subgraph "AI/ML Services"
        AI_ENGINE[AI Personality Engine]
        LLM[Language Model API]
        MEMORY[Conversation Memory]
        PERSONALITY[Personality System]
        CHALLENGE[Challenge Generator]
        GROWTH[Growth Tracker]
      end

      %% External Services
      subgraph "External APIs"
        OPENAI[OpenAI/Anthropic]
        VECTOR_DB[Pinecone Vector DB]
        STRIPE[Stripe Payments]
        SENDGRID[Email Service]
      end

      %% Monitoring & Analytics
      subgraph "Monitoring"
        FIREBASE_LOGS[Firebase Logging]
        CRASHLYTICS[Crashlytics]
        PERFORMANCE[Performance Monitoring]
        CUSTOM_ANALYTICS[Custom Analytics]
      end

      %% Connections
      WEB --> AUTH
      MOBILE --> AUTH
      PWA --> AUTH
      
      AUTH --> FIRESTORE
      AUTH --> FUNCTIONS
      
      FUNCTIONS --> AI_ENGINE
      AI_ENGINE --> LLM
      AI_ENGINE --> MEMORY
      AI_ENGINE --> PERSONALITY
      AI_ENGINE --> CHALLENGE
      AI_ENGINE --> GROWTH
      
      LLM --> OPENAI
      MEMORY --> VECTOR_DB
      
      FUNCTIONS --> STRIPE
      FUNCTIONS --> SENDGRID
      
      FIRESTORE --> FIREBASE_LOGS
      WEB --> ANALYTICS
      MOBILE --> CRASHLYTICS
      
      WEB --> HOSTING
      
      style WEB fill:#e1f5fe
      style MOBILE fill:#e1f5fe
      style PWA fill:#e1f5fe
      style AUTH fill:#fff3e0
      style FIRESTORE fill:#e8f5e8
      style AI_ENGINE fill:#f3e5f5
      style CHALLENGE fill:#ffebee
      style GROWTH fill:#e0f2f1
  `;

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          🏗️ System Architecture
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Galatea AI leverages Firebase as the primary backend infrastructure, 
          providing scalable, real-time capabilities for AI-driven conversations with personality and growth tracking.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Firebase-Powered Architecture
        </h2>
        <MermaidRenderer chart={firebaseArchitecture} id="firebase-architecture" />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">🔥 Firebase Services</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-orange-400 pl-4">
              <h4 className="font-semibold text-gray-800">Authentication</h4>
              <p className="text-sm text-gray-600">Multi-provider auth with social logins</p>
            </div>
            <div className="border-l-4 border-blue-400 pl-4">
              <h4 className="font-semibold text-gray-800">Firestore</h4>
              <p className="text-sm text-gray-600">Real-time NoSQL database for conversations</p>
            </div>
            <div className="border-l-4 border-green-400 pl-4">
              <h4 className="font-semibold text-gray-800">Cloud Functions</h4>
              <p className="text-sm text-gray-600">Serverless AI processing and business logic</p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h4 className="font-semibold text-gray-800">Storage</h4>
              <p className="text-sm text-gray-600">Media files, avatars, and voice messages</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">🤖 AI Components</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-pink-400 pl-4">
              <h4 className="font-semibold text-gray-800">Personality Engine</h4>
              <p className="text-sm text-gray-600">Dynamic personality traits and behavioral patterns</p>
            </div>
            <div className="border-l-4 border-red-400 pl-4">
              <h4 className="font-semibold text-gray-800">Challenge Generator</h4>
              <p className="text-sm text-gray-600">Creates growth-oriented conversation challenges</p>
            </div>
            <div className="border-l-4 border-indigo-400 pl-4">
              <h4 className="font-semibold text-gray-800">Memory System</h4>
              <p className="text-sm text-gray-600">Long-term conversation context and relationship history</p>
            </div>
            <div className="border-l-4 border-teal-400 pl-4">
              <h4 className="font-semibold text-gray-800">Growth Tracker</h4>
              <p className="text-sm text-gray-600">Monitors user development and relationship progress</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Key Architectural Decisions</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Why Firebase?</h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Real-time synchronization for live conversations</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Automatic scaling without infrastructure management</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Built-in authentication and security rules</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Offline support for mobile applications</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">NoSQL Benefits</h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Flexible schema for evolving AI personalities</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Nested conversation structures</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Dynamic user preference storage</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Rapid prototyping and iteration</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};