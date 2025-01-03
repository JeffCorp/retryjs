import { FailedTransactionsDashboard } from '@/components/FailedTransactionsDashboard'
import { DashboardHeader } from '@/components/DashboardHeader'

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <DashboardHeader />
      <FailedTransactionsDashboard />
    </main>
  )
}
