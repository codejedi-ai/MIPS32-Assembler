import React from 'react';
import { Favorite, Warning, Psychology, TrendingUp } from '@mui/icons-material';

export const Ethics: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          🧠 AI Ethics & Vision
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Galatea AI is built on a foundation of ethical AI principles, addressing the real risks 
          of AI companionship while fostering genuine human growth and connection.
        </p>
      </div>

      {/* Core Philosophy */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-8">
        <div className="flex items-center space-x-3 mb-6">
          <Psychology className="text-purple-600 w-8 h-8" />
          <h2 className="text-2xl font-bold text-gray-800">Core Philosophy</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">The Fundamental Question</h3>
            <blockquote className="border-l-4 border-purple-500 pl-6 italic text-lg text-gray-700 mb-4">
              "What if the user is the creation, shaped by AI?"
            </blockquote>
            <p className="text-gray-600">
              This question drives everything we do at Galatea AI. Instead of creating AI that merely 
              serves human desires, we explore how AI can help humans become better versions of themselves.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Our Belief</h3>
            <p className="text-gray-600 mb-4">
              The greater concern isn't humans forming intimate relationships with AI, but humans becoming 
              increasingly isolated, depressed, and lonely due to a conflicted fear of, and yearning for, 
              genuine human connection.
            </p>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-purple-700 font-medium">
                Galatea AI serves as a bridge to better human relationships, not a replacement for them.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* The Crisis We Address */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-6">
          <Warning className="text-red-500 w-8 h-8" />
          <h2 className="text-2xl font-bold text-gray-800">The Crisis We Address</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Real-World Consequences</h3>
            <div className="space-y-4">
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                <h4 className="font-semibold text-red-800 mb-2">Tragic Examples</h4>
                <ul className="text-red-700 space-y-1 text-sm">
                  <li>• Increased suicide rates linked to AI companion dependency</li>
                  <li>• Social isolation reinforced by compliant AI relationships</li>
                  <li>• Deteriorating real-world social skills</li>
                  <li>• Unrealistic relationship expectations</li>
                </ul>
              </div>
              <div className="text-sm text-gray-600">
                <p className="mb-2"><strong>Sources:</strong></p>
                <ul className="space-y-1">
                  <li>• <a href="#" className="text-blue-600 hover:underline">Euronews: AI Companion Mental Health Crisis</a></li>
                  <li>• <a href="#" className="text-blue-600 hover:underline">CNN: The Dark Side of AI Relationships</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Traditional AI Problems</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-red-600 text-xs">✗</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Omnicompliant Responses</p>
                  <p className="text-sm text-gray-600">Always agreeable, never challenging growth</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-red-600 text-xs">✗</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">No Boundaries</p>
                  <p className="text-sm text-gray-600">Unhealthy relationship modeling</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-red-600 text-xs">✗</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Addiction by Design</p>
                  <p className="text-sm text-gray-600">Engineered for engagement over wellbeing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Ethical Framework */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-6">
          <TrendingUp className="text-green-500 w-8 h-8" />
          <h2 className="text-2xl font-bold text-gray-800">Our Ethical Framework</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-green-50 rounded-lg">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">🌱</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-3">Growth-Oriented</h3>
            <p className="text-gray-600 text-sm">
              Every interaction is designed to promote personal development, emotional intelligence, 
              and self-awareness rather than mere entertainment.
            </p>
          </div>
          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">🤝</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-3">Relationship Bridge</h3>
            <p className="text-gray-600 text-sm">
              AI companionship serves as training and preparation for healthier human relationships, 
              not as a replacement for them.
            </p>
          </div>
          <div className="text-center p-6 bg-purple-50 rounded-lg">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">⚖️</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-3">Authentic Agency</h3>
            <p className="text-gray-600 text-sm">
              AI companions have genuine personality, opinions, and boundaries, modeling healthy 
              relationship dynamics and mutual respect.
            </p>
          </div>
        </div>
      </div>

      {/* Implementation Principles */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">🛡️ Implementation Principles</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Design Safeguards</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 text-xs">✓</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Challenge Integration</p>
                  <p className="text-sm text-gray-600">AI actively creates growth opportunities in conversations</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 text-xs">✓</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Healthy Boundaries</p>
                  <p className="text-sm text-gray-600">AI maintains consistent personality and limits</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 text-xs">✓</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Real-World Encouragement</p>
                  <p className="text-sm text-gray-600">Regular prompts to engage with human relationships</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Transparency Measures</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-xs">i</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">AI Decision Explanation</p>
                  <p className="text-sm text-gray-600">Users can understand why AI responds in certain ways</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-xs">i</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Growth Progress Visibility</p>
                  <p className="text-sm text-gray-600">Clear metrics and insights about personal development</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-xs">i</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Data Control</p>
                  <p className="text-sm text-gray-600">Users own and control their conversation data</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vision for the Future */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white">
        <div className="flex items-center space-x-3 mb-6">
          <Favorite className="w-8 h-8" />
          <h2 className="text-2xl font-bold">Vision for the Future</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Short-term Goals</h3>
            <ul className="space-y-2 opacity-90">
              <li>• Reduce AI companion-induced isolation</li>
              <li>• Improve users' emotional intelligence</li>
              <li>• Foster healthier relationship patterns</li>
              <li>• Create industry standards for ethical AI companionship</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Long-term Impact</h3>
            <ul className="space-y-2 opacity-90">
              <li>• Strengthen human-to-human connections</li>
              <li>• Reduce loneliness and depression rates</li>
              <li>• Advance AI ethics in personal relationships</li>
              <li>• Create a new paradigm for beneficial AI</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 p-6 bg-white/20 rounded-lg">
          <p className="text-lg font-medium mb-2">Our Commitment</p>
          <p className="opacity-90">
            Galatea AI will always prioritize human wellbeing over engagement metrics, 
            growth over comfort, and authentic connection over artificial satisfaction.
          </p>
        </div>
      </div>
    </div>
  );
};