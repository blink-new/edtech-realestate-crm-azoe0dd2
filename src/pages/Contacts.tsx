import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Plus, Mail, Phone, Building } from 'lucide-react'

const mockContacts = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@techcorp.com',
    phone: '+1 (555) 123-4567',
    company: 'TechCorp Solutions',
    position: 'CTO',
    industry: 'Technology',
    lastContact: '2 days ago'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@edustart.com',
    phone: '+1 (555) 234-5678',
    company: 'EduStart Inc',
    position: 'Product Manager',
    industry: 'Education',
    lastContact: '1 week ago'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.r@realestate.com',
    phone: '+1 (555) 345-6789',
    company: 'Prime Properties',
    position: 'Sales Director',
    industry: 'Real Estate',
    lastContact: '3 days ago'
  }
]

export function Contacts() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contacts</h1>
          <p className="text-muted-foreground">
            Manage your business relationships
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Contact
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockContacts.map((contact) => (
          <Card key={contact.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {contact.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg">{contact.name}</CardTitle>
                  <CardDescription>{contact.position}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2 text-sm">
                <Building className="w-4 h-4 text-muted-foreground" />
                <span>{contact.company}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="truncate">{contact.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span>{contact.phone}</span>
              </div>
              <div className="flex items-center justify-between">
                <Badge variant="outline">{contact.industry}</Badge>
                <span className="text-xs text-muted-foreground">
                  Last contact: {contact.lastContact}
                </span>
              </div>
              <div className="flex space-x-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Mail className="w-4 h-4 mr-1" />
                  Email
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Phone className="w-4 h-4 mr-1" />
                  Call
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}