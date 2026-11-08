import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Login } from './pages/Auth/Login'
import { Signup } from './pages/Auth/Signup'
import { IdeasPage } from './pages/Ideas'
import { useAuthStore } from './stores/auth'
import { Members } from './pages/Members'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore()
  return isAuthenticated ? <>{children}</> : <Navigate to='/login' replace />
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore()
  return !isAuthenticated ? <>{children}</> : <Navigate to='/' replace />
}

function App() {
  return (
    <Layout>
      <Routes>
        <Route
          path='/login'
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path='/signup'
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <IdeasPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/members'
          element={
            <ProtectedRoute>
              <Members />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Layout>
  )
}

export default App
