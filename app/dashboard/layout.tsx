import { ClerkProvider } from '@clerk/nextjs'
import DashboardLayout from '@/components/dashboard/DashboardLayout'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </ClerkProvider>
  )
}
