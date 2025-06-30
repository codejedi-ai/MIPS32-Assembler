import React from 'react';
import { PlayArrow, GitHub, Code, Rocket } from '@mui/icons-material';

export const GetStarted: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          🚀 Get Started with Galatea AI
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Ready to build the future of ethical AI companionship? Follow these steps to set up 
          your development environment and start contributing to Galatea AI.
        </p>
      </div>

      {/* Quick Start */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-white">
        <div className="flex items-center space-x-3 mb-6">
          <PlayArrow className="w-8 h-8" />
          <h2 className="text-2xl font-bold">Quick Start</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Prerequisites</h3>
            <ul className="space-y-2 opacity-90">
              <li>• Node.js 18+ installed</li>
              <li>• Firebase CLI installed</li>
              <li>• Git for version control</li>
              <li>• OpenAI API key</li>
              <li>• Firebase project setup</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Installation</h3>
            <div className="bg-black/20 p-4 rounded-lg font-mono text-sm">
              <div className="mb-2">git clone https://github.com/your-repo/galatea-ai</div>
              <div className="mb-2">cd galatea-ai</div>
              <div className="mb-2">npm install</div>
              <div>npm run dev</div>
            </div>
          </div>
        </div>
      </div>

      {/* Setup Steps */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">📋 Detailed Setup Guide</h2>
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">1</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Firebase Project Setup</h3>
              <p className="text-gray-600 mb-3">Create a new Firebase project and configure the necessary services.</p>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Required Firebase Services:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Authentication (Email/Password, Google, Apple)</li>
                  <li>• Firestore Database</li>
                  <li>• Cloud Functions</li>
                  <li>• Firebase Storage</li>
                  <li>• Firebase Hosting</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">2</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Environment Configuration</h3>
              <p className="text-gray-600 mb-3">Set up your environment variables for API keys and Firebase config.</p>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                <div className="mb-1"># .env.local</div>
                <div className="mb-1">NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key</div>
                <div className="mb-1">NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain</div>
                <div className="mb-1">NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id</div>
                <div className="mb-1">OPENAI_API_KEY=your_openai_key</div>
                <div>PINECONE_API_KEY=your_pinecone_key</div>
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">3</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Database Initialization</h3>
              <p className="text-gray-600 mb-3">Set up Firestore collections and security rules.</p>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Run initialization scripts:</h4>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm">
                  <div className="mb-1">npm run firebase:init</div>
                  <div>npm run db:seed</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">4</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">AI Services Setup</h3>
              <p className="text-gray-600 mb-3">Configure OpenAI, Pinecone, and custom AI personality engine.</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">OpenAI Setup</h4>
                  <p className="text-sm text-blue-700">Configure GPT-4 for conversation generation</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">Vector Database</h4>
                  <p className="text-sm text-purple-700">Set up Pinecone for conversation memory</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Development Commands */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">⚙️ Development Commands</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Frontend Development</h3>
            <div className="space-y-3">
              <div className="bg-gray-100 p-3 rounded-lg">
                <div className="font-mono text-sm text-gray-800 mb-1">npm run dev</div>
                <p className="text-xs text-gray-600">Start development server</p>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg">
                <div className="font-mono text-sm text-gray-800 mb-1">npm run build</div>
                <p className="text-xs text-gray-600">Build for production</p>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg">
                <div className="font-mono text-sm text-gray-800 mb-1">npm run test</div>
                <p className="text-xs text-gray-600">Run test suite</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Firebase Commands</h3>
            <div className="space-y-3">
              <div className="bg-gray-100 p-3 rounded-lg">
                <div className="font-mono text-sm text-gray-800 mb-1">firebase emulators:start</div>
                <p className="text-xs text-gray-600">Start local Firebase emulators</p>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg">
                <div className="font-mono text-sm text-gray-800 mb-1">firebase deploy</div>
                <p className="text-xs text-gray-600">Deploy to Firebase</p>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg">
                <div className="font-mono text-sm text-gray-800 mb-1">firebase functions:log</div>
                <p className="text-xs text-gray-600">View function logs</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contributing */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-6">
          <GitHub className="text-gray-800 w-8 h-8" />
          <h2 className="text-2xl font-semibold text-gray-800">Contributing to Galatea AI</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Code className="text-white w-6 h-6" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Code Contributions</h3>
            <p className="text-gray-600 text-sm mb-4">
              Help improve the AI personality engine, user interface, or add new features.
            </p>
            <a href="#" className="text-blue-600 hover:text-blue-800 font-medium text-sm">
              View Issues →
            </a>
          </div>
          <div className="text-center p-6 bg-purple-50 rounded-lg">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">📝</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Documentation</h3>
            <p className="text-gray-600 text-sm mb-4">
              Improve documentation, write tutorials, or create examples.
            </p>
            <a href="#" className="text-purple-600 hover:text-purple-800 font-medium text-sm">
              Edit Docs →
            </a>
          </div>
          <div className="text-center p-6 bg-green-50 rounded-lg">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">🧪</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Testing & Feedback</h3>
            <p className="text-gray-600 text-sm mb-4">
              Test the AI interactions, report bugs, or suggest improvements.
            </p>
            <a href="#" className="text-green-600 hover:text-green-800 font-medium text-sm">
              Report Issues →
            </a>
          </div>
        </div>
      </div>

      {/* Resources */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">📚 Additional Resources</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Documentation</h3>
            <div className="space-y-2">
              <a href="#" className="block text-blue-600 hover:text-blue-800 text-sm">
                • API Reference Documentation
              </a>
              <a href="#" className="block text-blue-600 hover:text-blue-800 text-sm">
                • AI Personality Engine Guide
              </a>
              <a href="#" className="block text-blue-600 hover:text-blue-800 text-sm">
                • Firebase Integration Tutorial
              </a>
              <a href="#" className="block text-blue-600 hover:text-blue-800 text-sm">
                • Deployment Guide
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Community</h3>
            <div className="space-y-2">
              <a href="#" className="block text-purple-600 hover:text-purple-800 text-sm">
                • Discord Community Server
              </a>
              <a href="#" className="block text-purple-600 hover:text-purple-800 text-sm">
                • GitHub Discussions
              </a>
              <a href="#" className="block text-purple-600 hover:text-purple-800 text-sm">
                • Weekly Development Updates
              </a>
              <a href="#" className="block text-purple-600 hover:text-purple-800 text-sm">
                • Ethics & AI Discussion Forum
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-white text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Rocket className="w-8 h-8" />
          <h2 className="text-2xl font-bold">Ready to Build the Future?</h2>
        </div>
        <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
          Join us in creating AI companions that foster genuine human growth and connection. 
          Together, we can build technology that makes people better, not just entertained.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="https://github.com/your-repo/galatea-ai" 
            className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            View on GitHub
          </a>
          <a 
            href="#" 
            className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
          >
            Join Our Community
          </a>
        </div>
      </div>
    </div>
  );
};