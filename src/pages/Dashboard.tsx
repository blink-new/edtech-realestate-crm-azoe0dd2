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
  GraduationCap
} from 'lucide-react'

const kpiData = [
  {
    title: 'Total Leads',
    value: '1,234',
    change: '+12%',
    trend: 'up',
    icon: UserPlus,
    color: 'text-blue-600'
  },
  {
    title: 'Active Contacts',
    value: '856',
    change: '+8%',
    trend: 'up',
    icon: Users,
    color: 'text-green-600'
  },
  {
    title: 'Open Deals',
    value: '42',
    change: '-3%',
    trend: 'down',
    icon: Handshake,
    color: 'text-orange-600'
  },
  {
    title: 'Revenue',
    value: '$124,500',
    change: '+15%',
    trend: 'up',
    icon: DollarSign,
    color: 'text-emerald-600'
  }
]

const recentActivities = [
  {
    id: 1,
    type: 'lead',
    title: 'New lead from website',
    description: 'Sarah Johnson submitted contact form',
    time: '2 minutes ago',
    icon: UserPlus
  },
  {
    id: 2,
    type: 'deal',
    title: 'Deal moved to negotiation',
    description: 'Enterprise Software License - $45,000',
    time: '1 hour ago',
    icon: Handshake
  },
  {
    id: 3,
    type: 'contact',
    title: 'Meeting scheduled',
    description: 'Demo call with TechCorp on Friday',
    time: '3 hours ago',
    icon: Calendar
  },
  {
    id: 4,
    type: 'property',
    title: 'Property listing updated',
    description: '123 Main St - Price reduced to $450,000',
    time: '5 hours ago',
    icon: Building
  }
]

const upcomingTasks = [
  {
    id: 1,
    title: 'Follow up with ABC Corp',
    dueDate: 'Today, 2:00 PM',
    priority: 'high'
  },
  {
    id: 2,
    title: 'Prepare demo for TechStart',
    dueDate: 'Tomorrow, 10:00 AM',
    priority: 'medium'
  },
  {
    id: 3,
    title: 'Send proposal to EduTech Inc',
    dueDate: 'Friday, 9:00 AM',
    priority: 'high'
  },
  {
    id: 4,
    title: 'Property inspection at Oak Street',
    dueDate: 'Monday, 3:00 PM',
    priority: 'low'
  }
]

export function Dashboard() {
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
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                      <activity.icon className="w-4 h-4 text-muted-foreground" />
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
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
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
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{task.title}</p>
                    <p className="text-xs text-muted-foreground">{task.dueDate}</p>
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
              ))}
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