import React from 'react';
import { 
  Home, 
  Architecture, 
  AccountTree, 
  Storage, 
  Star, 
  Psychology, 
  Code, 
  PlayArrow 
} from '@mui/icons-material';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'architecture', label: 'System Architecture', icon: Architecture },
    { id: 'user-flow', label: 'User Flow', icon: AccountTree },
    { id: 'database', label: 'Database Schema', icon: Storage },
    { id: 'features', label: 'Core Features', icon: Star },
    { id: 'ethics', label: 'AI Ethics & Vision', icon: Psychology },
    { id: 'technical', label: 'Technical Specs', icon: Code },
    { id: 'get-started', label: 'Get Started', icon: PlayArrow },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 z-10">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">G</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Galatea AI</h1>
            <p className="text-sm text-gray-500">Documentation</p>
          </div>
        </div>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeSection === item.id
                      ? 'bg-purple-100 text-purple-700 border-l-4 border-purple-600'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-2">Operation Pygmalion III</p>
          <a 
            href="https://github.com/your-repo/galatea-ai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-purple-600 hover:text-purple-800 font-medium"
          >
            View on GitHub →
          </a>
        </div>
      </div>
    </div>
  );
};