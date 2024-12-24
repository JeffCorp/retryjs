'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DateRangePicker } from '@/components/DateRangePicker'
import { FailureRateChart } from '@/components/FailureRateChart'
import { 
  CalendarDays, 
  AlertCircle, 
  RefreshCw, 
  CheckCircle2 
} from 'lucide-react'

type DateRange = {
  from: Date
  to: Date
} | undefined

export function StatisticsDashboard() {
  const [dateRange, setDateRange] = useState<DateRange>()

  // In a real app, these would come from an API
  const stats = {
    currentFailed: 150,
    totalFailed: 1250,
    totalRetries: 1100,
    successRate: '88%',
  }

  // Sample data for the chart
  const chartData = [
    { date: '2024-03-01', count: 45 },
    { date: '2024-03-02', count: 52 },
    { date: '2024-03-03', count: 38 },
    { date: '2024-03-04', count: 65 },
    { date: '2024-03-05', count: 41 },
    { date: '2024-03-06', count: 58 },
    { date: '2024-03-07', count: 43 },
  ]

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Current Failed
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.currentFailed}</div>
            <p className="text-xs text-muted-foreground">
              Active failed registrations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Failed
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalFailed}</div>
            <p className="text-xs text-muted-foreground">
              All time failed attempts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Retries
            </CardTitle>
            <RefreshCw className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRetries}</div>
            <p className="text-xs text-muted-foreground">
              Successful retry attempts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Success Rate
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.successRate}</div>
            <p className="text-xs text-muted-foreground">
              Retry success rate
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Failed Registration Attempts</CardTitle>
            <DateRangePicker 
              dateRange={dateRange} 
              onDateRangeChange={(range) => {
                if (range) {
                  setDateRange({
                    from: range.from || new Date(),
                    to: range.to || new Date()
                  });
                }
              }}
            />
          </div>
        </CardHeader>
        <CardContent>
          <FailureRateChart data={chartData} />
        </CardContent>
      </Card>
    </div>
  )
} 