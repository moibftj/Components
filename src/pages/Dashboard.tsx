import { useAuth } from '../hooks/useAuth'
import Header from '../components/layout/Header'
import UserDashboard from '../components/dashboard/UserDashboard'
import LawyerDashboard from '../components/dashboard/LawyerDashboard'
import AdminDashboard from '../components/dashboard/AdminDashboard'

export default function Dashboard() {
  const { profile } = useAuth()

  const renderDashboard = () => {
    switch (profile?.role) {
      case 'lawyer':
        return <LawyerDashboard />
      case 'admin':
        return <AdminDashboard />
      default:
        return <UserDashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto py-6 px-4 md:px-6">
        {renderDashboard()}
      </main>
    </div>
  )
}