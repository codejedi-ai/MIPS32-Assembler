import React from 'react';
import { MermaidRenderer } from '../MermaidRenderer';

export const DatabaseSchema: React.FC = () => {
  const firestoreSchema = `
    erDiagram
      USERS {
        string uid PK
        string email
        string displayName
        string photoURL
        object personalityProfile
        object growthMetrics
        object preferences
        timestamp createdAt
        timestamp lastActive
        boolean isPremium
        object subscriptionData
      }

      AI_COMPANIONS {
        string companionId PK
        string userId FK
        string name
        object personality
        object traits
        object communicationStyle
        number challengeIntensity
        object boundaries
        object evolutionHistory
        timestamp createdAt
        timestamp lastUpdated
      }

      CONVERSATIONS {
        string conversationId PK
        string userId FK
        string companionId FK
        string title
        object context
        object emotionalState
        number growthScore
        timestamp createdAt
        timestamp lastMessageAt
        boolean isActive
      }

      MESSAGES {
        string messageId PK
        string conversationId FK
        string senderId
        string senderType
        string content
        object metadata
        string messageType
        object aiAnalysis
        object growthOpportunity
        timestamp createdAt
        boolean isChallenge
        object challengeData
      }

      GROWTH_CHALLENGES {
        string challengeId PK
        string userId FK
        string companionId FK
        string type
        string description
        object parameters
        string status
        object progress
        object results
        timestamp createdAt
        timestamp completedAt
        number difficultyLevel
      }

      PERSONALITY_EVOLUTION {
        string evolutionId PK
        string companionId FK
        string userId FK
        object previousState
        object newState
        string trigger
        object reasoning
        timestamp evolvedAt
        number impactScore
      }

      GROWTH_METRICS {
        string metricId PK
        string userId FK
        string category
        number score
        object breakdown
        object insights
        timestamp measuredAt
        object trends
      }

      USER_INSIGHTS {
        string insightId PK
        string userId FK
        string type
        string content
        object data
        number relevanceScore
        timestamp generatedAt
        boolean isRead
        object actionItems
      }

      USERS ||--|| AI_COMPANIONS : creates
      USERS ||--o{ CONVERSATIONS : participates
      USERS ||--o{ GROWTH_CHALLENGES : receives
      USERS ||--o{ GROWTH_METRICS : tracks
      USERS ||--o{ USER_INSIGHTS : receives
      AI_COMPANIONS ||--o{ CONVERSATIONS : participates
      AI_COMPANIONS ||--o{ GROWTH_CHALLENGES : creates
      AI_COMPANIONS ||--o{ PERSONALITY_EVOLUTION : undergoes
      CONVERSATIONS ||--o{ MESSAGES : contains
      GROWTH_CHALLENGES ||--o{ MESSAGES : generates
  `;

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          🗄️ Database Schema (Firestore)
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Galatea AI uses Firestore's NoSQL structure to store dynamic personality data, 
          conversation context, and growth tracking metrics with real-time synchronization.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Firestore Collections & Relationships
        </h2>
        <MermaidRenderer chart={firestoreSchema} id="firestore-schema" />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">🔥 Core Collections</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-400 pl-4">
              <h4 className="font-semibold text-gray-800">users</h4>
              <p className="text-sm text-gray-600 mb-2">User profiles with personality assessments and growth metrics</p>
              <div className="bg-gray-50 p-2 rounded text-xs font-mono">
                personalityProfile: {"{type, traits, preferences}"}
              </div>
            </div>
            <div className="border-l-4 border-purple-400 pl-4">
              <h4 className="font-semibold text-gray-800">ai_companions</h4>
              <p className="text-sm text-gray-600 mb-2">AI personality configurations and evolution history</p>
              <div className="bg-gray-50 p-2 rounded text-xs font-mono">
                personality: {"{traits, boundaries, style}"}
              </div>
            </div>
            <div className="border-l-4 border-green-400 pl-4">
              <h4 className="font-semibold text-gray-800">conversations</h4>
              <p className="text-sm text-gray-600 mb-2">Conversation threads with emotional context and growth scoring</p>
              <div className="bg-gray-50 p-2 rounded text-xs font-mono">
                emotionalState: {"{mood, energy, openness}"}
              </div>
            </div>
            <div className="border-l-4 border-orange-400 pl-4">
              <h4 className="font-semibold text-gray-800">messages</h4>
              <p className="text-sm text-gray-600 mb-2">Individual messages with AI analysis and growth opportunities</p>
              <div className="bg-gray-50 p-2 rounded text-xs font-mono">
                aiAnalysis: {"{intent, emotion, growthOpp}"}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">📈 Growth Collections</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-red-400 pl-4">
              <h4 className="font-semibold text-gray-800">growth_challenges</h4>
              <p className="text-sm text-gray-600 mb-2">Personalized challenges for user development</p>
              <div className="bg-gray-50 p-2 rounded text-xs font-mono">
                parameters: {"{difficulty, focus, duration}"}
              </div>
            </div>
            <div className="border-l-4 border-indigo-400 pl-4">
              <h4 className="font-semibold text-gray-800">personality_evolution</h4>
              <p className="text-sm text-gray-600 mb-2">AI companion personality changes over time</p>
              <div className="bg-gray-50 p-2 rounded text-xs font-mono">
                trigger: {"{userBehavior, milestone, feedback}"}
              </div>
            </div>
            <div className="border-l-4 border-teal-400 pl-4">
              <h4 className="font-semibold text-gray-800">growth_metrics</h4>
              <p className="text-sm text-gray-600 mb-2">Quantified personal development tracking</p>
              <div className="bg-gray-50 p-2 rounded text-xs font-mono">
                breakdown: {"{emotional, social, cognitive}"}
              </div>
            </div>
            <div className="border-l-4 border-pink-400 pl-4">
              <h4 className="font-semibold text-gray-800">user_insights</h4>
              <p className="text-sm text-gray-600 mb-2">AI-generated insights about user progress</p>
              <div className="bg-gray-50 p-2 rounded text-xs font-mono">
                actionItems: {"{suggestions, goals, next_steps}"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">🔧 Firestore Advantages for Galatea AI</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">⚡</span>
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Real-time Updates</h4>
            <p className="text-gray-600 text-sm">
              Instant synchronization of AI responses and personality changes across all user devices
            </p>
          </div>
          <div className="text-center p-6 bg-purple-50 rounded-lg">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">🔄</span>
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Flexible Schema</h4>
            <p className="text-gray-600 text-sm">
              Dynamic personality traits and conversation metadata without rigid table structures
            </p>
          </div>
          <div className="text-center p-6 bg-green-50 rounded-lg">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">📱</span>
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Offline Support</h4>
            <p className="text-gray-600 text-sm">
              Conversations continue offline and sync when connection is restored
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">🔒 Security Rules Example</h3>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <pre>{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // AI companions belong to specific users
    match /ai_companions/{companionId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
    
    // Conversations are private to participants
    match /conversations/{conversationId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
  }
}`}</pre>
        </div>
      </div>
    </div>
  );
};