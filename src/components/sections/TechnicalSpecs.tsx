import React from 'react';
import { Code, Cloud, Security, Speed } from '@mui/icons-material';

export const TechnicalSpecs: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          ⚙️ Technical Specifications
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Galatea AI is built with modern, scalable technologies optimized for real-time AI interactions 
          and secure data handling using Firebase as the primary backend infrastructure.
        </p>
      </div>

      {/* Tech Stack Overview */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Code className="text-blue-600 w-8 h-8" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Frontend</h3>
          <div className="space-y-1 text-sm text-gray-600">
            <p>React 18+ / Next.js 14</p>
            <p>TypeScript</p>
            <p>Tailwind CSS</p>
            <p>Material-UI</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Cloud className="text-orange-600 w-8 h-8" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Backend</h3>
          <div className="space-y-1 text-sm text-gray-600">
            <p>Firebase Suite</p>
            <p>Cloud Functions</p>
            <p>Firestore Database</p>
            <p>Firebase Auth</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Speed className="text-purple-600 w-8 h-8" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">AI/ML</h3>
          <div className="space-y-1 text-sm text-gray-600">
            <p>OpenAI GPT-4</p>
            <p>Anthropic Claude</p>
            <p>Pinecone Vector DB</p>
            <p>Custom Personality Engine</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Security className="text-green-600 w-8 h-8" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">Security</h3>
          <div className="space-y-1 text-sm text-gray-600">
            <p>Firebase Security Rules</p>
            <p>End-to-End Encryption</p>
            <p>GDPR Compliance</p>
            <p>SOC 2 Type II</p>
          </div>
        </div>
      </div>

      {/* Detailed Architecture */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">🏗️ Detailed Architecture</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Frontend Architecture</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-400 pl-4">
                <h4 className="font-semibold text-gray-800">React + Next.js 14</h4>
                <p className="text-sm text-gray-600">App Router, Server Components, Streaming</p>
                <div className="mt-2 text-xs bg-gray-100 p-2 rounded font-mono">
                  /app/chat/[id]/page.tsx
                </div>
              </div>
              <div className="border-l-4 border-green-400 pl-4">
                <h4 className="font-semibold text-gray-800">State Management</h4>
                <p className="text-sm text-gray-600">Zustand for global state, React Query for server state</p>
                <div className="mt-2 text-xs bg-gray-100 p-2 rounded font-mono">
                  useConversationStore()
                </div>
              </div>
              <div className="border-l-4 border-purple-400 pl-4">
                <h4 className="font-semibold text-gray-800">Real-time Updates</h4>
                <p className="text-sm text-gray-600">Firebase SDK with real-time listeners</p>
                <div className="mt-2 text-xs bg-gray-100 p-2 rounded font-mono">
                  onSnapshot(conversationRef)
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Backend Architecture</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-orange-400 pl-4">
                <h4 className="font-semibold text-gray-800">Cloud Functions</h4>
                <p className="text-sm text-gray-600">Serverless AI processing and business logic</p>
                <div className="mt-2 text-xs bg-gray-100 p-2 rounded font-mono">
                  processMessage(data, context)
                </div>
              </div>
              <div className="border-l-4 border-red-400 pl-4">
                <h4 className="font-semibold text-gray-800">Firestore Database</h4>
                <p className="text-sm text-gray-600">NoSQL document database with real-time sync</p>
                <div className="mt-2 text-xs bg-gray-100 p-2 rounded font-mono">
                  /conversations/{id}/messages
                </div>
              </div>
              <div className="border-l-4 border-indigo-400 pl-4">
                <h4 className="font-semibold text-gray-800">Authentication</h4>
                <p className="text-sm text-gray-600">Firebase Auth with multiple providers</p>
                <div className="mt-2 text-xs bg-gray-100 p-2 rounded font-mono">
                  signInWithEmailAndPassword()
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI/ML Pipeline */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">🤖 AI/ML Pipeline</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-purple-50 rounded-lg p-6">
            <h3 className="font-semibold text-purple-800 mb-3">1. Message Processing</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                <span>Intent analysis</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                <span>Emotion detection</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                <span>Context retrieval</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                <span>Growth opportunity identification</span>
              </div>
            </div>
          </div>
          <div className="bg-pink-50 rounded-lg p-6">
            <h3 className="font-semibold text-pink-800 mb-3">2. Response Generation</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                <span>Personality application</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                <span>Challenge integration</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                <span>Boundary enforcement</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                <span>LLM query optimization</span>
              </div>
            </div>
          </div>
          <div className="bg-indigo-50 rounded-lg p-6">
            <h3 className="font-semibold text-indigo-800 mb-3">3. Learning & Evolution</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                <span>Conversation analysis</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                <span>Growth metric updates</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                <span>Personality evolution</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                <span>Memory consolidation</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance & Scalability */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">⚡ Performance & Scalability</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Metrics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="font-medium text-gray-800">Response Time</span>
                <span className="text-green-600 font-semibold">&lt; 2s</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="font-medium text-gray-800">Real-time Sync</span>
                <span className="text-blue-600 font-semibold">&lt; 100ms</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="font-medium text-gray-800">Uptime</span>
                <span className="text-purple-600 font-semibold">99.9%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                <span className="font-medium text-gray-800">Concurrent Users</span>
                <span className="text-orange-600 font-semibold">10K+</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Scalability Features</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 text-xs">✓</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Auto-scaling Cloud Functions</p>
                  <p className="text-sm text-gray-600">Serverless architecture scales with demand</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 text-xs">✓</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Global CDN Distribution</p>
                  <p className="text-sm text-gray-600">Firebase Hosting with worldwide edge locations</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 text-xs">✓</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Intelligent Caching</p>
                  <p className="text-sm text-gray-600">Multi-layer caching for optimal performance</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 text-xs">✓</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Load Balancing</p>
                  <p className="text-sm text-gray-600">Automatic traffic distribution</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Development & Deployment */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-8 text-white">
        <h2 className="text-2xl font-semibold mb-6">🚀 Development & Deployment</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Development Workflow</h3>
            <div className="space-y-3 text-sm">
              <div className="bg-white/10 p-3 rounded-lg font-mono">
                <span className="text-green-400">$</span> npm run dev
              </div>
              <div className="bg-white/10 p-3 rounded-lg font-mono">
                <span className="text-green-400">$</span> firebase emulators:start
              </div>
              <div className="bg-white/10 p-3 rounded-lg font-mono">
                <span className="text-green-400">$</span> npm run test
              </div>
              <div className="bg-white/10 p-3 rounded-lg font-mono">
                <span className="text-green-400">$</span> firebase deploy
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">CI/CD Pipeline</h3>
            <div className="space-y-2 text-sm opacity-90">
              <p>• GitHub Actions for automated testing</p>
              <p>• Firebase Hosting for frontend deployment</p>
              <p>• Cloud Functions automatic deployment</p>
              <p>• Firestore security rules validation</p>
              <p>• Performance monitoring integration</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};