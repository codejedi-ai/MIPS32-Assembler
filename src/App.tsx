import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Overview } from './components/sections/Overview';
import { Architecture } from './components/sections/Architecture';
import { UserFlow } from './components/sections/UserFlow';
import { DatabaseSchema } from './components/sections/DatabaseSchema';
import { Features } from './components/sections/Features';
import { Ethics } from './components/sections/Ethics';
import { TechnicalSpecs } from './components/sections/TechnicalSpecs';
import { GetStarted } from './components/sections/GetStarted';

function App() {
  const [activeSection, setActiveSection] = useState('overview');

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <Overview />;
      case 'architecture':
        return <Architecture />;
      case 'user-flow':
        return <UserFlow />;
      case 'database':
        return <DatabaseSchema />;
      case 'features':
        return <Features />;
      case 'ethics':
        return <Ethics />;
      case 'technical':
        return <TechnicalSpecs />;
      case 'get-started':
        return <GetStarted />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 ml-64">
        <div className="max-w-6xl mx-auto px-8 py-8">
          {renderSection()}
        </div>
      </main>
    </div>
  );
}

export default App;