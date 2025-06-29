import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import LoadingPage from './pages/LoadingPage'
import ProfileSetupPage from './pages/ProfileSetupPage'
import StartSwipingPage from './pages/StartSwipingPage'
import DashboardPage from './pages/DashboardPage'
import DiscoverPage from './pages/DiscoverPage'
import MessagesPage from './pages/MessagesPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/loading" element={<LoadingPage />} />
      <Route path="/profile-setup" element={<ProfileSetupPage />} />
      <Route path="/start-swiping" element={<StartSwipingPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/dashboard/discover" element={<DiscoverPage />} />
      <Route path="/dashboard/messages" element={<MessagesPage />} />
    </Routes>
  )
}

export default App