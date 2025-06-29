import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatedBackground } from './components/animated-background'
import { Navbar } from './components/navbar'
import { HomePage } from './pages/HomePage'
import { SignInPage } from './pages/SignInPage'
import { SignUpPage } from './pages/SignUpPage'
import { DashboardPage } from './pages/DashboardPage'
import { DiscoverPage } from './pages/DiscoverPage'
import { MessagesPage } from './pages/MessagesPage'
import './index.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white relative">
        <AnimatedBackground />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/discover" element={<DiscoverPage />} />
          <Route path="/dashboard/messages" element={<MessagesPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App