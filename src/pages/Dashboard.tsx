import { useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Users,
  UserPlus,
  Handshake,
  TrendingUp,
  DollarSign,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Building,
  GraduationCap,
  Mail,
  Phone,
  FileText
} from 'lucide-react'
import { useAnalytics, useActivities, useTasks } from '@/hooks/useData'
import { dataService } from '@/services/dataService'

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'lead': return UserPlus
    case 'contact': return Users
    case 'deal': return Handshake
    case 'property': return Building
    case 'course': return GraduationCap
    case 'call': return Phone
    case 'email': return Mail
    case 'meeting': return Calendar
    default: return FileText
  }
}

const formatTimeAgo = (dateString: string) => {
  const now = new Date()
  const date = new Date(dateString)
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
  
  if (diffInMinutes < 1) return 'Just now'
  if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`
  
  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) return `${diffInHours} hours ago`
  
  const diffInDays = Math.floor(diffInHours / 24)
  return `${diffInDays} days ago`
}

const formatDueDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = (date.getTime() - now.getTime()) / (1000 * 60 * 60)
  
  if (diffInHours < 24 && diffInHours > 0) {
    return `Today, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
  } else if (diffInHours < 48 && diffInHours > 24) {
    return `Tomorrow, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
  } else {
    return date.toLocaleDateString([], { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
}

export function Dashboard() {
  const { analytics, loading: analyticsLoading } = useAnalytics()
  const { activities, loading: activitiesLoading } = useActivities()
  const { tasks, loading: tasksLoading } = useTasks()

  // Initialize sample data on first load
  useEffect(() => {
    dataService.initializeSampleData()
  }, [])

  if (analyticsLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const kpiData = [
    {
      title: 'Total Leads',
      value: analytics?.totalLeads?.toString() || '0',
      change: '+12%',
      trend: 'up',
      icon: UserPlus,
      color: 'text-blue-600'
    },
    {
      title: 'Active Contacts',
      value: analytics?.totalContacts?.toString() || '0',
      change: '+8%',
      trend: 'up',
      icon: Users,
      color: 'text-green-600'
    },
    {
      title: 'Open Deals',
      value: analytics?.openDeals?.toString() || '0',
      change: '-3%',
      trend: 'down',
      icon: Handshake,
      color: 'text-orange-600'
    },
    {
      title: 'Revenue',
      value: `${analytics?.totalRevenue?.toLocaleString() || '0'}`,
      change: '+15%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-emerald-600'
    }
  ]

  const upcomingTasks = tasks
    ?.filter(task => task.status === 'pending')
    ?.sort((a, b) => new Date(a.dueDate || '').getTime() - new Date(b.dueDate || '').getTime())
    ?.slice(0, 4) || []
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your business.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Building className="w-4 h-4 mr-2" />
            Real Estate
          </Button>
          <Button variant="outline">
            <GraduationCap className="w-4 h-4 mr-2" />
            EdTech
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {kpi.title}
              </CardTitle>
              <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {kpi.trend === 'up' ? (
                  <ArrowUpRight className="w-3 h-3 text-green-500 mr-1" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 text-red-500 mr-1" />
                )}
                <span className={kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                  {kpi.change}
                </span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>
              Latest updates from your CRM
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activitiesLoading ? (
                <div className="space-y-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-muted rounded-full animate-pulse" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-muted rounded animate-pulse" />
                        <div className="h-3 bg-muted rounded w-3/4 animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : activities && activities.length > 0 ? (
                activities.slice(0, 4).map((activity) => {
                  const ActivityIcon = getActivityIcon(activity.type)
                  return (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                          <ActivityIcon className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">
                          {activity.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {activity.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatTimeAgo(activity.createdAt)}
                        </p>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No recent activities</p>
                </div>
              )}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Activities
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
            <CardDescription>
              Don't miss these important follow-ups
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tasksLoading ? (
                <div className="space-y-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-muted rounded animate-pulse" />
                        <div className="h-3 bg-muted rounded w-1/2 animate-pulse" />
                      </div>
                      <div className="w-16 h-6 bg-muted rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              ) : upcomingTasks && upcomingTasks.length > 0 ? (
                upcomingTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{task.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {task.dueDate ? formatDueDate(task.dueDate) : 'No due date'}
                      </p>
                    </div>
                    <Badge
                      variant={
                        task.priority === 'high'
                          ? 'destructive'
                          : task.priority === 'medium'
                          ? 'default'
                          : 'secondary'
                      }
                    >
                      {task.priority}
                    </Badge>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No upcoming tasks</p>
                </div>
              )}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Tasks
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks to help you stay productive
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button className="h-20 flex-col space-y-2">
              <UserPlus className="w-6 h-6" />
              <span>Add Lead</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Users className="w-6 h-6" />
              <span>New Contact</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Handshake className="w-6 h-6" />
              <span>Create Deal</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Building className="w-6 h-6" />
              <span>Add Property</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}