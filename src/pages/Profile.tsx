import Header from '../components/layout/Header'
import ProfileForm from '../components/profile/ProfileForm'

export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto py-6 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Profile Settings</h1>
            <p className="text-muted-foreground">
              Manage your account settings and preferences.
            </p>
          </div>
          <ProfileForm />
        </div>
      </main>
    </div>
  )
}