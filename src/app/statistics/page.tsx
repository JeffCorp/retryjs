import { StatisticsDashboard } from '@/components/StatisticsDashboard'
import { DashboardHeader } from '@/components/DashboardHeader'

export default function StatisticsPage() {
  return (
    <main className="container mx-auto p-4">
      <DashboardHeader />
      <StatisticsDashboard />
    </main>
  )
} 