import { blink } from '@/blink/client'

// Types
export interface Lead {
  id: string
  userId: string
  name: string
  email: string
  phone?: string
  company?: string
  position?: string
  source: string
  status: 'new' | 'qualified' | 'contacted' | 'nurturing' | 'converted' | 'lost'
  industry?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface Contact {
  id: string
  userId: string
  name: string
  email: string
  phone?: string
  company?: string
  position?: string
  industry?: string
  notes?: string
  lastContactDate?: string
  createdAt: string
  updatedAt: string
}

export interface Deal {
  id: string
  userId: string
  title: string
  description?: string
  value?: number
  stage: 'prospecting' | 'qualification' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost'
  probability: number
  expectedCloseDate?: string
  contactId?: string
  leadId?: string
  createdAt: string
  updatedAt: string
}

export interface Property {
  id: string
  userId: string
  title: string
  description?: string
  address?: string
  price?: number
  propertyType: string
  bedrooms?: number
  bathrooms?: number
  squareFeet?: number
  status: 'available' | 'pending' | 'sold' | 'off-market'
  contactId?: string
  createdAt: string
  updatedAt: string
}

export interface Course {
  id: string
  userId: string
  title: string
  description?: string
  price?: number
  durationHours?: number
  level: 'beginner' | 'intermediate' | 'advanced'
  category: string
  status: 'active' | 'inactive' | 'draft'
  enrollmentCount: number
  createdAt: string
  updatedAt: string
}

export interface Activity {
  id: string
  userId: string
  type: 'lead' | 'contact' | 'deal' | 'property' | 'course' | 'call' | 'email' | 'meeting' | 'note'
  title: string
  description?: string
  relatedType?: string
  relatedId?: string
  createdAt: string
}

export interface Task {
  id: string
  userId: string
  title: string
  description?: string
  dueDate?: string
  priority: 'low' | 'medium' | 'high'
  status: 'pending' | 'completed' | 'cancelled'
  relatedType?: string
  relatedId?: string
  createdAt: string
  updatedAt: string
}

// Data Service Class
class DataService {
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  private getCurrentUserId(): string {
    // This will be replaced with actual user ID from auth
    return 'current-user-id'
  }

  // Generic CRUD operations
  private async getItems<T>(key: string): Promise<T[]> {
    try {
      const data = localStorage.getItem(key)
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error(`Error getting ${key}:`, error)
      return []
    }
  }

  private async setItems<T>(key: string, items: T[]): Promise<void> {
    try {
      localStorage.setItem(key, JSON.stringify(items))
    } catch (error) {
      console.error(`Error setting ${key}:`, error)
    }
  }

  // Leads
  async getLeads(): Promise<Lead[]> {
    const leads = await this.getItems<Lead>('crm_leads')
    return leads.filter(lead => lead.userId === this.getCurrentUserId())
  }

  async createLead(leadData: Omit<Lead, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<Lead> {
    const leads = await this.getItems<Lead>('crm_leads')
    const newLead: Lead = {
      ...leadData,
      id: this.generateId(),
      userId: this.getCurrentUserId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    leads.push(newLead)
    await this.setItems('crm_leads', leads)
    
    // Create activity
    await this.createActivity({
      type: 'lead',
      title: 'New lead created',
      description: `${newLead.name} from ${newLead.company || 'Unknown company'}`,
      relatedType: 'lead',
      relatedId: newLead.id
    })
    
    return newLead
  }

  async updateLead(id: string, updates: Partial<Lead>): Promise<Lead | null> {
    const leads = await this.getItems<Lead>('crm_leads')
    const index = leads.findIndex(lead => lead.id === id && lead.userId === this.getCurrentUserId())
    
    if (index === -1) return null
    
    leads[index] = {
      ...leads[index],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    
    await this.setItems('crm_leads', leads)
    return leads[index]
  }

  async deleteLead(id: string): Promise<boolean> {
    const leads = await this.getItems<Lead>('crm_leads')
    const filteredLeads = leads.filter(lead => !(lead.id === id && lead.userId === this.getCurrentUserId()))
    
    if (filteredLeads.length === leads.length) return false
    
    await this.setItems('crm_leads', filteredLeads)
    return true
  }

  // Contacts
  async getContacts(): Promise<Contact[]> {
    const contacts = await this.getItems<Contact>('crm_contacts')
    return contacts.filter(contact => contact.userId === this.getCurrentUserId())
  }

  async createContact(contactData: Omit<Contact, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<Contact> {
    const contacts = await this.getItems<Contact>('crm_contacts')
    const newContact: Contact = {
      ...contactData,
      id: this.generateId(),
      userId: this.getCurrentUserId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    contacts.push(newContact)
    await this.setItems('crm_contacts', contacts)
    
    await this.createActivity({
      type: 'contact',
      title: 'New contact added',
      description: `${newContact.name} from ${newContact.company || 'Unknown company'}`,
      relatedType: 'contact',
      relatedId: newContact.id
    })
    
    return newContact
  }

  async updateContact(id: string, updates: Partial<Contact>): Promise<Contact | null> {
    const contacts = await this.getItems<Contact>('crm_contacts')
    const index = contacts.findIndex(contact => contact.id === id && contact.userId === this.getCurrentUserId())
    
    if (index === -1) return null
    
    contacts[index] = {
      ...contacts[index],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    
    await this.setItems('crm_contacts', contacts)
    return contacts[index]
  }

  // Deals
  async getDeals(): Promise<Deal[]> {
    const deals = await this.getItems<Deal>('crm_deals')
    return deals.filter(deal => deal.userId === this.getCurrentUserId())
  }

  async createDeal(dealData: Omit<Deal, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<Deal> {
    const deals = await this.getItems<Deal>('crm_deals')
    const newDeal: Deal = {
      ...dealData,
      id: this.generateId(),
      userId: this.getCurrentUserId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    deals.push(newDeal)
    await this.setItems('crm_deals', deals)
    
    await this.createActivity({
      type: 'deal',
      title: 'New deal created',
      description: `${newDeal.title} - $${newDeal.value?.toLocaleString() || '0'}`,
      relatedType: 'deal',
      relatedId: newDeal.id
    })
    
    return newDeal
  }

  async updateDeal(id: string, updates: Partial<Deal>): Promise<Deal | null> {
    const deals = await this.getItems<Deal>('crm_deals')
    const index = deals.findIndex(deal => deal.id === id && deal.userId === this.getCurrentUserId())
    
    if (index === -1) return null
    
    const oldStage = deals[index].stage
    deals[index] = {
      ...deals[index],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    
    // Create activity if stage changed
    if (updates.stage && updates.stage !== oldStage) {
      await this.createActivity({
        type: 'deal',
        title: 'Deal stage updated',
        description: `${deals[index].title} moved to ${updates.stage}`,
        relatedType: 'deal',
        relatedId: deals[index].id
      })
    }
    
    await this.setItems('crm_deals', deals)
    return deals[index]
  }

  // Properties
  async getProperties(): Promise<Property[]> {
    const properties = await this.getItems<Property>('crm_properties')
    return properties.filter(property => property.userId === this.getCurrentUserId())
  }

  async createProperty(propertyData: Omit<Property, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<Property> {
    const properties = await this.getItems<Property>('crm_properties')
    const newProperty: Property = {
      ...propertyData,
      id: this.generateId(),
      userId: this.getCurrentUserId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    properties.push(newProperty)
    await this.setItems('crm_properties', properties)
    
    await this.createActivity({
      type: 'property',
      title: 'New property listed',
      description: `${newProperty.title} - $${newProperty.price?.toLocaleString() || '0'}`,
      relatedType: 'property',
      relatedId: newProperty.id
    })
    
    return newProperty
  }

  // Courses
  async getCourses(): Promise<Course[]> {
    const courses = await this.getItems<Course>('crm_courses')
    return courses.filter(course => course.userId === this.getCurrentUserId())
  }

  async createCourse(courseData: Omit<Course, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<Course> {
    const courses = await this.getItems<Course>('crm_courses')
    const newCourse: Course = {
      ...courseData,
      id: this.generateId(),
      userId: this.getCurrentUserId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    courses.push(newCourse)
    await this.setItems('crm_courses', courses)
    
    await this.createActivity({
      type: 'course',
      title: 'New course created',
      description: `${newCourse.title} - ${newCourse.level} level`,
      relatedType: 'course',
      relatedId: newCourse.id
    })
    
    return newCourse
  }

  // Activities
  async getActivities(limit: number = 50): Promise<Activity[]> {
    const activities = await this.getItems<Activity>('crm_activities')
    return activities
      .filter(activity => activity.userId === this.getCurrentUserId())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit)
  }

  async createActivity(activityData: Omit<Activity, 'id' | 'userId' | 'createdAt'>): Promise<Activity> {
    const activities = await this.getItems<Activity>('crm_activities')
    const newActivity: Activity = {
      ...activityData,
      id: this.generateId(),
      userId: this.getCurrentUserId(),
      createdAt: new Date().toISOString()
    }
    activities.push(newActivity)
    await this.setItems('crm_activities', activities)
    return newActivity
  }

  // Tasks
  async getTasks(): Promise<Task[]> {
    const tasks = await this.getItems<Task>('crm_tasks')
    return tasks.filter(task => task.userId === this.getCurrentUserId())
  }

  async createTask(taskData: Omit<Task, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    const tasks = await this.getItems<Task>('crm_tasks')
    const newTask: Task = {
      ...taskData,
      id: this.generateId(),
      userId: this.getCurrentUserId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    tasks.push(newTask)
    await this.setItems('crm_tasks', tasks)
    return newTask
  }

  async updateTask(id: string, updates: Partial<Task>): Promise<Task | null> {
    const tasks = await this.getItems<Task>('crm_tasks')
    const index = tasks.findIndex(task => task.id === id && task.userId === this.getCurrentUserId())
    
    if (index === -1) return null
    
    tasks[index] = {
      ...tasks[index],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    
    await this.setItems('crm_tasks', tasks)
    return tasks[index]
  }

  // Analytics
  async getAnalytics() {
    const [leads, contacts, deals, properties, courses, activities] = await Promise.all([
      this.getLeads(),
      this.getContacts(),
      this.getDeals(),
      this.getProperties(),
      this.getCourses(),
      this.getActivities()
    ])

    const totalRevenue = deals
      .filter(deal => deal.stage === 'closed-won')
      .reduce((sum, deal) => sum + (deal.value || 0), 0)

    const conversionRate = leads.length > 0 
      ? (leads.filter(lead => lead.status === 'converted').length / leads.length) * 100 
      : 0

    return {
      totalLeads: leads.length,
      totalContacts: contacts.length,
      totalDeals: deals.length,
      openDeals: deals.filter(deal => !['closed-won', 'closed-lost'].includes(deal.stage)).length,
      totalRevenue,
      conversionRate: Math.round(conversionRate),
      recentActivities: activities.slice(0, 10),
      leadsByStatus: {
        new: leads.filter(l => l.status === 'new').length,
        qualified: leads.filter(l => l.status === 'qualified').length,
        contacted: leads.filter(l => l.status === 'contacted').length,
        nurturing: leads.filter(l => l.status === 'nurturing').length,
        converted: leads.filter(l => l.status === 'converted').length,
        lost: leads.filter(l => l.status === 'lost').length
      },
      dealsByStage: {
        prospecting: deals.filter(d => d.stage === 'prospecting').length,
        qualification: deals.filter(d => d.stage === 'qualification').length,
        proposal: deals.filter(d => d.stage === 'proposal').length,
        negotiation: deals.filter(d => d.stage === 'negotiation').length,
        'closed-won': deals.filter(d => d.stage === 'closed-won').length,
        'closed-lost': deals.filter(d => d.stage === 'closed-lost').length
      }
    }
  }

  // Initialize with sample data
  async initializeSampleData(): Promise<void> {
    const existingLeads = await this.getLeads()
    if (existingLeads.length > 0) return // Already has data

    // Sample leads
    const sampleLeads = [
      {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@techcorp.com',
        phone: '+1 (555) 123-4567',
        company: 'TechCorp Solutions',
        position: 'CTO',
        source: 'Website',
        status: 'new' as const,
        industry: 'Technology'
      },
      {
        name: 'Michael Chen',
        email: 'michael.chen@edustart.com',
        phone: '+1 (555) 234-5678',
        company: 'EduStart Inc',
        position: 'Product Manager',
        source: 'LinkedIn',
        status: 'qualified' as const,
        industry: 'Education'
      },
      {
        name: 'Emily Rodriguez',
        email: 'emily.r@realestate.com',
        phone: '+1 (555) 345-6789',
        company: 'Prime Properties',
        position: 'Sales Director',
        source: 'Referral',
        status: 'contacted' as const,
        industry: 'Real Estate'
      }
    ]

    for (const leadData of sampleLeads) {
      await this.createLead(leadData)
    }

    // Sample contacts
    const sampleContacts = [
      {
        name: 'David Kim',
        email: 'david.kim@learningtech.com',
        phone: '+1 (555) 456-7890',
        company: 'Learning Tech',
        position: 'CEO',
        industry: 'EdTech',
        lastContactDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]

    for (const contactData of sampleContacts) {
      await this.createContact(contactData)
    }

    // Sample deals
    const sampleDeals = [
      {
        title: 'Enterprise Software License',
        description: 'Annual license for 100 users',
        value: 45000,
        stage: 'negotiation' as const,
        probability: 75,
        expectedCloseDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        title: 'Real Estate Commission',
        description: 'Property sale at 123 Main St',
        value: 15000,
        stage: 'proposal' as const,
        probability: 60,
        expectedCloseDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]

    for (const dealData of sampleDeals) {
      await this.createDeal(dealData)
    }

    // Sample tasks
    const sampleTasks = [
      {
        title: 'Follow up with ABC Corp',
        description: 'Send proposal and schedule demo',
        dueDate: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
        priority: 'high' as const,
        status: 'pending' as const
      },
      {
        title: 'Prepare demo for TechStart',
        description: 'Customize demo for their use case',
        dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
        priority: 'medium' as const,
        status: 'pending' as const
      }
    ]

    for (const taskData of sampleTasks) {
      await this.createTask(taskData)
    }
  }
}

export const dataService = new DataService()