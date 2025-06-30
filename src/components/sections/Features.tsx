import React from 'react';
import { 
  Psychology, 
  TrendingUp, 
  RecordVoiceOver, 
  Insights, 
  Security, 
  AutoAwesome 
} from '@mui/icons-material';

export const Features: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          🚀 Core Features
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Galatea AI's features are designed around fostering genuine growth and authentic connection, 
          not just entertainment or compliance.
        </p>
      </div>

      {/* Core Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Psychology className="text-purple-600 w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">AI with Agency</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Unlike compliant AI companions, Galatea AI has opinions, boundaries, and the ability to challenge users constructively.
          </p>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
              <span className="text-gray-700">Can disagree respectfully</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
              <span className="text-gray-700">Sets healthy boundaries</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
              <span className="text-gray-700">Authentic personality traits</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-red-600 w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Growth Challenges</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Personalized challenges designed to promote emotional intelligence, self-reflection, and personal development.
          </p>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <span className="w-2 h-2 bg-red-400 rounded-full"></span>
              <span className="text-gray-700">Adaptive difficulty levels</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <span className="w-2 h-2 bg-red-400 rounded-full"></span>
              <span className="text-gray-700">Progress tracking</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <span className="w-2 h-2 bg-red-400 rounded-full"></span>
              <span className="text-gray-700">Reflection prompts</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <AutoAwesome className="text-blue-600 w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Dynamic Personality</h3>
          </div>
          <p className="text-gray-600 mb-4">
            AI personality evolves based on interactions, creating a more authentic and engaging relationship over time.
          </p>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              <span className="text-gray-700">Learns from conversations</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              <span className="text-gray-700">Adapts communication style</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              <span className="text-gray-700">Maintains consistency</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Insights className="text-green-600 w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Growth Analytics</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Comprehensive tracking of personal development with insights, trends, and actionable recommendations.
          </p>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span className="text-gray-700">Emotional intelligence metrics</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span className="text-gray-700">Communication patterns</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span className="text-gray-700">Progress visualization</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <RecordVoiceOver className="text-orange-600 w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Voice & Multimodal</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Natural voice conversations and image sharing to create more immersive and authentic interactions.
          </p>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
              <span className="text-gray-700">Voice message support</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
              <span className="text-gray-700">Image context understanding</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
              <span className="text-gray-700">Emotional tone analysis</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Security className="text-indigo-600 w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Privacy & Security</h3>
          </div>
          <p className="text-gray-600 mb-4">
            End-to-end encryption and user-controlled data with transparent AI decision-making processes.
          </p>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
              <span className="text-gray-700">Encrypted conversations</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
              <span className="text-gray-700">Data export options</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
              <span className="text-gray-700">Transparent AI reasoning</span>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Comparison */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          📊 Feature Comparison: Galatea AI vs Traditional Companions
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-800">Feature</th>
                <th className="text-center py-3 px-4 font-semibold text-red-600">Traditional AI</th>
                <th className="text-center py-3 px-4 font-semibold text-purple-600">Galatea AI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-3 px-4 font-medium text-gray-800">Response Style</td>
                <td className="py-3 px-4 text-center">
                  <span className="text-red-500">Always Agreeable</span>
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="text-green-500">Constructively Challenging</span>
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="py-3 px-4 font-medium text-gray-800">Boundaries</td>
                <td className="py-3 px-4 text-center">
                  <span className="text-red-500">No Boundaries</span>
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="text-green-500">Healthy Boundaries</span>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-gray-800">Growth Focus</td>
                <td className="py-3 px-4 text-center">
                  <span className="text-red-500">Entertainment</span>
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="text-green-500">Personal Development</span>
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="py-3 px-4 font-medium text-gray-800">Personality</td>
                <td className="py-3 px-4 text-center">
                  <span className="text-red-500">Static</span>
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="text-green-500">Dynamic Evolution</span>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-gray-800">User Impact</td>
                <td className="py-3 px-4 text-center">
                  <span className="text-red-500">Potential Isolation</span>
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="text-green-500">Enhanced Human Connection</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Premium Features */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-white">
        <h2 className="text-2xl font-semibold mb-6">✨ Premium Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/20 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Unlimited Conversations</h3>
            <p className="text-sm opacity-90">No daily message limits</p>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Advanced AI Models</h3>
            <p className="text-sm opacity-90">Access to latest language models</p>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Voice Conversations</h3>
            <p className="text-sm opacity-90">Natural voice interactions</p>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Growth Insights Export</h3>
            <p className="text-sm opacity-90">Download your development data</p>
          </div>
        </div>
      </div>
    </div>
  );
};