import React from 'react';
import { Psychology, Warning, Favorite } from '@mui/icons-material';

export const Overview: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold mb-4">
            Galatea AI: Redefining AI Companionship
          </h1>
          <p className="text-xl mb-6 opacity-90">
            Unlike traditional AI companions, Galatea AI challenges users to grow through genuine connection, 
            not compliance. Inspired by the myth of Pygmalion, we explore what happens when the user becomes the creation.
          </p>
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 px-4 py-2 rounded-lg">
              <span className="font-semibold">Operation Pygmalion III</span>
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-lg">
              <span className="font-semibold">Velocity MVP Hackathon Winner</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-6">
          <Psychology className="text-purple-600 w-8 h-8" />
          <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
        </div>
        <div className="prose max-w-none">
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Galatea AI addresses a critical question in our age of artificial intelligence: 
            <strong> What if the user is the creation, shaped by AI?</strong>
          </p>
          <p className="text-gray-600 mb-6">
            We believe the greater concern isn't humans forming intimate relationships with AI, 
            but humans becoming increasingly isolated, depressed, and lonely due to a conflicted 
            fear of, and yearning for, genuine human connection.
          </p>
          <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg">
            <h3 className="font-semibold text-purple-800 mb-2">Core Philosophy</h3>
            <p className="text-purple-700">
              Galatea AI shifts from omnicompliant AI to AI that fosters genuine connection. 
              It's about AI with agency, challenging users, not just complying with their every wish.
            </p>
          </div>
        </div>
      </div>

      {/* The Problem */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-6">
          <Warning className="text-red-500 w-8 h-8" />
          <h2 className="text-2xl font-bold text-gray-800">The Crisis We're Addressing</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Tragic Real-World Examples</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-red-400 pl-4">
                <p className="text-sm text-gray-600 mb-1">Euronews Report</p>
                <p className="text-gray-700">
                  AI companion relationships leading to dangerous isolation and dependency
                </p>
              </div>
              <div className="border-l-4 border-red-400 pl-4">
                <p className="text-sm text-gray-600 mb-1">CNN Investigation</p>
                <p className="text-gray-700">
                  Mental health impacts of AI companionship addiction
                </p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Current AI Companion Issues</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start space-x-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Omnicompliant responses that avoid challenging users</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Reinforcement of unhealthy relationship patterns</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Increased isolation from real human connections</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Dependency without personal growth</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Our Solution */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-6">
          <Favorite className="text-pink-500 w-8 h-8" />
          <h2 className="text-2xl font-bold text-gray-800">The Galatea Difference</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-purple-50 rounded-lg">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">1</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">AI with Agency</h3>
            <p className="text-gray-600 text-sm">
              Our AI companions have their own opinions, boundaries, and the ability to challenge users constructively
            </p>
          </div>
          <div className="text-center p-6 bg-pink-50 rounded-lg">
            <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">2</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Growth-Oriented</h3>
            <p className="text-gray-600 text-sm">
              Conversations designed to promote self-reflection, emotional intelligence, and personal development
            </p>
          </div>
          <div className="text-center p-6 bg-indigo-50 rounded-lg">
            <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold">3</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Bridge to Reality</h3>
            <p className="text-gray-600 text-sm">
              Encourages and prepares users for meaningful human connections rather than replacing them
            </p>
          </div>
        </div>
      </div>

      {/* Acknowledgments */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Acknowledgments</h2>
        <p className="text-gray-700 mb-4">
          Last week marked a milestone as I fulfilled my freshman dream by pitching Operation Pygmalion III - 
          Galatea AI at Velocity's MVP Hackathon.
        </p>
        <div className="flex flex-wrap gap-4">
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
            <span className="text-sm font-medium text-gray-700">Thanks to Krysta Traianovski</span>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
            <span className="text-sm font-medium text-gray-700">UW Velocity Team</span>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
            <span className="text-sm font-medium text-gray-700">MVP Hackathon Supporters</span>
          </div>
        </div>
      </div>
    </div>
  );
};