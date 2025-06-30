import React from 'react';
import { MermaidRenderer } from '../MermaidRenderer';

export const UserFlow: React.FC = () => {
  const userFlowDiagram = `
    graph TD
      START([User Opens Galatea AI]) --> LANDING{First Time User?}
      
      %% Onboarding Flow
      LANDING -->|Yes| SIGNUP[Sign Up with Firebase Auth]
      SIGNUP --> VERIFY[Email Verification]
      VERIFY --> PERSONALITY_QUIZ[Personality Assessment]
      PERSONALITY_QUIZ --> AI_INTRO[Meet Your AI Companion]
      AI_INTRO --> FIRST_CHALLENGE[First Growth Challenge]
      
      %% Returning User Flow
      LANDING -->|No| LOGIN{Logged In?}
      LOGIN -->|No| AUTH[Firebase Authentication]
      LOGIN -->|Yes| DASHBOARD[Personal Dashboard]
      AUTH --> DASHBOARD
      
      %% Dashboard Options
      DASHBOARD --> CONTINUE_CONV[Continue Conversation]
      DASHBOARD --> GROWTH_PROGRESS[View Growth Progress]
      DASHBOARD --> PERSONALITY_ADJUST[Adjust AI Personality]
      DASHBOARD --> CHALLENGE_HISTORY[Challenge History]
      
      %% Main Conversation Flow
      CONTINUE_CONV --> CHAT_INTERFACE[Chat Interface]
      FIRST_CHALLENGE --> CHAT_INTERFACE
      
      CHAT_INTERFACE --> USER_MESSAGE[User Sends Message]
      USER_MESSAGE --> AI_ANALYSIS[AI Analyzes Intent & Growth Opportunity]
      AI_ANALYSIS --> RESPONSE_TYPE{Response Strategy}
      
      %% AI Response Types
      RESPONSE_TYPE -->|Support Needed| SUPPORTIVE[Supportive Response]
      RESPONSE_TYPE -->|Growth Opportunity| CHALLENGE_USER[Challenge User's Perspective]
      RESPONSE_TYPE -->|Boundary Setting| SET_BOUNDARY[AI Sets Healthy Boundary]
      RESPONSE_TYPE -->|Reflection Prompt| REFLECTION[Encourage Self-Reflection]
      
      %% Response Processing
      SUPPORTIVE --> UPDATE_MEMORY[Update Conversation Memory]
      CHALLENGE_USER --> UPDATE_MEMORY
      SET_BOUNDARY --> UPDATE_MEMORY
      REFLECTION --> UPDATE_MEMORY
      
      UPDATE_MEMORY --> GROWTH_TRACKING[Track User Growth Metrics]
      GROWTH_TRACKING --> PERSONALITY_EVOLUTION[Evolve AI Personality]
      PERSONALITY_EVOLUTION --> CHAT_INTERFACE
      
      %% Growth Features
      GROWTH_PROGRESS --> INSIGHTS[Personal Growth Insights]
      INSIGHTS --> GOALS[Set Growth Goals]
      GOALS --> DASHBOARD
      
      %% Personality Customization
      PERSONALITY_ADJUST --> TRAIT_SLIDERS[Adjust AI Traits]
      TRAIT_SLIDERS --> COMMUNICATION_STYLE[Set Communication Preferences]
      COMMUNICATION_STYLE --> CHALLENGE_LEVEL[Set Challenge Intensity]
      CHALLENGE_LEVEL --> SAVE_SETTINGS[Save Personality Settings]
      SAVE_SETTINGS --> DASHBOARD
      
      %% Challenge System
      CHALLENGE_HISTORY --> VIEW_CHALLENGES[View Past Challenges]
      VIEW_CHALLENGES --> CHALLENGE_INSIGHTS[Challenge Success Insights]
      CHALLENGE_INSIGHTS --> NEW_CHALLENGE[Generate New Challenge]
      NEW_CHALLENGE --> CHAT_INTERFACE
      
      %% Premium Features
      CHAT_INTERFACE --> PREMIUM_CHECK{Premium User?}
      PREMIUM_CHECK -->|No| FREE_LIMITS[Daily Message Limits]
      FREE_LIMITS --> UPGRADE_PROMPT[Upgrade to Premium]
      UPGRADE_PROMPT --> PAYMENT[Firebase + Stripe Payment]
      PAYMENT --> PREMIUM_FEATURES[Unlock Premium Features]
      
      PREMIUM_CHECK -->|Yes| UNLIMITED[Unlimited Conversations]
      UNLIMITED --> ADVANCED_AI[Advanced AI Models]
      ADVANCED_AI --> VOICE_MESSAGES[Voice Message Support]
      VOICE_MESSAGES --> EXPORT_INSIGHTS[Export Growth Insights]
      
      %% Settings & Profile
      DASHBOARD --> SETTINGS[Account Settings]
      SETTINGS --> PRIVACY[Privacy Controls]
      SETTINGS --> DATA_EXPORT[Export Personal Data]
      SETTINGS --> ACCOUNT_DELETE[Delete Account]
      
      style START fill:#e8f5e8
      style CHAT_INTERFACE fill:#e1f5fe
      style CHALLENGE_USER fill:#ffebee
      style SET_BOUNDARY fill:#fff3e0
      style GROWTH_TRACKING fill:#f3e5f5
      style PREMIUM_FEATURES fill:#e0f2f1
  `;

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          👤 User Flow & Experience
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Galatea AI's user journey is designed around growth, challenge, and authentic connection. 
          Unlike traditional AI companions, our flow emphasizes personal development over mere compliance.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Complete User Journey
        </h2>
        <MermaidRenderer chart={userFlowDiagram} id="user-flow" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            🎯 Onboarding Experience
          </h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-purple-600 text-xs font-bold">1</span>
              </div>
              <div>
                <p className="font-medium text-gray-800">Personality Assessment</p>
                <p className="text-sm text-gray-600">Understanding user's current emotional state and growth areas</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-purple-600 text-xs font-bold">2</span>
              </div>
              <div>
                <p className="font-medium text-gray-800">AI Companion Introduction</p>
                <p className="text-sm text-gray-600">Meeting the AI with established boundaries and personality</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-purple-600 text-xs font-bold">3</span>
              </div>
              <div>
                <p className="font-medium text-gray-800">First Growth Challenge</p>
                <p className="text-sm text-gray-600">Immediate engagement with growth-oriented conversation</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            🧠 AI Response System
          </h3>
          <div className="space-y-3">
            <div className="border-l-4 border-green-400 pl-3">
              <p className="font-medium text-gray-800">Supportive Response</p>
              <p className="text-sm text-gray-600">When user needs emotional support</p>
            </div>
            <div className="border-l-4 border-red-400 pl-3">
              <p className="font-medium text-gray-800">Challenge Perspective</p>
              <p className="text-sm text-gray-600">When growth opportunity is identified</p>
            </div>
            <div className="border-l-4 border-orange-400 pl-3">
              <p className="font-medium text-gray-800">Set Boundaries</p>
              <p className="text-sm text-gray-600">Healthy relationship modeling</p>
            </div>
            <div className="border-l-4 border-blue-400 pl-3">
              <p className="font-medium text-gray-800">Reflection Prompts</p>
              <p className="text-sm text-gray-600">Encouraging self-awareness</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            📈 Growth Tracking
          </h3>
          <div className="space-y-3">
            <div className="bg-purple-50 p-3 rounded-lg">
              <p className="font-medium text-purple-800">Personal Insights</p>
              <p className="text-sm text-purple-600">Track emotional intelligence development</p>
            </div>
            <div className="bg-pink-50 p-3 rounded-lg">
              <p className="font-medium text-pink-800">Challenge Progress</p>
              <p className="text-sm text-pink-600">Monitor growth challenge completion</p>
            </div>
            <div className="bg-indigo-50 p-3 rounded-lg">
              <p className="font-medium text-indigo-800">Relationship Health</p>
              <p className="text-sm text-indigo-600">Assess AI-human interaction quality</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">🌟 Key Differentiators</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Traditional AI Companions</h4>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center space-x-2">
                <span className="text-red-500">✗</span>
                <span>Always agreeable and compliant</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-red-500">✗</span>
                <span>Avoid challenging conversations</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-red-500">✗</span>
                <span>Focus on user satisfaction over growth</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-red-500">✗</span>
                <span>No boundaries or authentic personality</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Galatea AI Approach</h4>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span>Has opinions and can disagree respectfully</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span>Actively creates growth opportunities</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span>Prioritizes user development over comfort</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span>Maintains healthy boundaries and authentic responses</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};