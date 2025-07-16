import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Plus, DollarSign, Calendar, User } from 'lucide-react'

const dealStages = [
  { name: 'Prospecting', deals: 8, value: 45000 },
  { name: 'Qualification', deals: 5, value: 78000 },
  { name: 'Proposal', deals: 3, value: 125000 },
  { name: 'Negotiation', deals: 2, value: 89000 },
  { name: 'Closed Won', deals: 4, value: 156000 }
]

const mockDeals = [
  {
    id: '1',
    title: 'Enterprise Software License',
    contact: 'Sarah Johnson',
    company: 'TechCorp Solutions',
    value: 45000,
    stage: 'Proposal',
    probability: 75,
    closeDate: '2024-02-15'
  },
  {
    id: '2',
    title: 'Learning Management System',
    contact: 'Michael Chen',
    company: 'EduStart Inc',
    value: 28000,
    stage: 'Negotiation',
    probability: 60,
    closeDate: '2024-02-20'
  },
  {
    id: '3',
    title: 'Commercial Property Sale',
    contact: 'Emily Rodriguez',
    company: 'Prime Properties',
    value: 850000,
    stage: 'Qualification',
    probability: 40,
    closeDate: '2024-03-01'
  }
]

export function Deals() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Deals</h1>
          <p className="text-muted-foreground">
            Track your sales pipeline and opportunities
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Deal
        </Button>
      </div>

      {/* Pipeline Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Pipeline</CardTitle>
          <CardDescription>
            Overview of deals by stage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            {dealStages.map((stage) => (
              <div key={stage.name} className="text-center">
                <div className="bg-muted rounded-lg p-4 mb-2">
                  <div className="text-2xl font-bold">{stage.deals}</div>
                  <div className="text-sm text-muted-foreground">deals</div>
                </div>
                <div className="font-medium text-sm">{stage.name}</div>
                <div className="text-xs text-muted-foreground">
                  ${stage.value.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Deals */}
      <Card>
        <CardHeader>
          <CardTitle>Active Deals</CardTitle>
          <CardDescription>
            Deals currently in progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockDeals.map((deal) => (
              <div key={deal.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">{deal.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {deal.contact}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-1" />
                        ${deal.value.toLocaleString()}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {deal.closeDate}
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline">{deal.stage}</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Probability</span>
                    <span>{deal.probability}%</span>
                  </div>
                  <Progress value={deal.probability} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}