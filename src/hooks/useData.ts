import { useState, useEffect } from 'react'
import { dataService, Lead, Contact, Deal, Property, Course, Activity, Task } from '@/services/dataService'

// Custom hooks for data management
export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchLeads = async () => {
    try {
      setLoading(true)
      const data = await dataService.getLeads()
      setLeads(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch leads')
    } finally {
      setLoading(false)
    }
  }

  const createLead = async (leadData: Omit<Lead, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newLead = await dataService.createLead(leadData)
      setLeads(prev => [newLead, ...prev])
      return newLead
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create lead')
      throw err
    }
  }

  const updateLead = async (id: string, updates: Partial<Lead>) => {
    try {
      const updatedLead = await dataService.updateLead(id, updates)
      if (updatedLead) {
        setLeads(prev => prev.map(lead => lead.id === id ? updatedLead : lead))
      }
      return updatedLead
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update lead')
      throw err
    }
  }

  const deleteLead = async (id: string) => {
    try {
      const success = await dataService.deleteLead(id)
      if (success) {
        setLeads(prev => prev.filter(lead => lead.id !== id))
      }
      return success
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete lead')
      throw err
    }
  }

  useEffect(() => {
    fetchLeads()
  }, [])

  return {
    leads,
    loading,
    error,
    createLead,
    updateLead,
    deleteLead,
    refetch: fetchLeads
  }
}

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchContacts = async () => {
    try {
      setLoading(true)
      const data = await dataService.getContacts()
      setContacts(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch contacts')
    } finally {
      setLoading(false)
    }
  }

  const createContact = async (contactData: Omit<Contact, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newContact = await dataService.createContact(contactData)
      setContacts(prev => [newContact, ...prev])
      return newContact
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create contact')
      throw err
    }
  }

  const updateContact = async (id: string, updates: Partial<Contact>) => {
    try {
      const updatedContact = await dataService.updateContact(id, updates)
      if (updatedContact) {
        setContacts(prev => prev.map(contact => contact.id === id ? updatedContact : contact))
      }
      return updatedContact
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update contact')
      throw err
    }
  }

  useEffect(() => {
    fetchContacts()
  }, [])

  return {
    contacts,
    loading,
    error,
    createContact,
    updateContact,
    refetch: fetchContacts
  }
}

export function useDeals() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDeals = async () => {
    try {
      setLoading(true)
      const data = await dataService.getDeals()
      setDeals(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch deals')
    } finally {
      setLoading(false)
    }
  }

  const createDeal = async (dealData: Omit<Deal, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newDeal = await dataService.createDeal(dealData)
      setDeals(prev => [newDeal, ...prev])
      return newDeal
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create deal')
      throw err
    }
  }

  const updateDeal = async (id: string, updates: Partial<Deal>) => {
    try {
      const updatedDeal = await dataService.updateDeal(id, updates)
      if (updatedDeal) {
        setDeals(prev => prev.map(deal => deal.id === id ? updatedDeal : deal))
      }
      return updatedDeal
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update deal')
      throw err
    }
  }

  useEffect(() => {
    fetchDeals()
  }, [])

  return {
    deals,
    loading,
    error,
    createDeal,
    updateDeal,
    refetch: fetchDeals
  }
}

export function useProperties() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProperties = async () => {
    try {
      setLoading(true)
      const data = await dataService.getProperties()
      setProperties(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch properties')
    } finally {
      setLoading(false)
    }
  }

  const createProperty = async (propertyData: Omit<Property, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newProperty = await dataService.createProperty(propertyData)
      setProperties(prev => [newProperty, ...prev])
      return newProperty
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create property')
      throw err
    }
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  return {
    properties,
    loading,
    error,
    createProperty,
    refetch: fetchProperties
  }
}

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCourses = async () => {
    try {
      setLoading(true)
      const data = await dataService.getCourses()
      setCourses(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch courses')
    } finally {
      setLoading(false)
    }
  }

  const createCourse = async (courseData: Omit<Course, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newCourse = await dataService.createCourse(courseData)
      setCourses(prev => [newCourse, ...prev])
      return newCourse
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create course')
      throw err
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  return {
    courses,
    loading,
    error,
    createCourse,
    refetch: fetchCourses
  }
}

export function useActivities() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchActivities = async () => {
    try {
      setLoading(true)
      const data = await dataService.getActivities()
      setActivities(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch activities')
    } finally {
      setLoading(false)
    }
  }

  const createActivity = async (activityData: Omit<Activity, 'id' | 'userId' | 'createdAt'>) => {
    try {
      const newActivity = await dataService.createActivity(activityData)
      setActivities(prev => [newActivity, ...prev])
      return newActivity
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create activity')
      throw err
    }
  }

  useEffect(() => {
    fetchActivities()
  }, [])

  return {
    activities,
    loading,
    error,
    createActivity,
    refetch: fetchActivities
  }
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const data = await dataService.getTasks()
      setTasks(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tasks')
    } finally {
      setLoading(false)
    }
  }

  const createTask = async (taskData: Omit<Task, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newTask = await dataService.createTask(taskData)
      setTasks(prev => [newTask, ...prev])
      return newTask
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create task')
      throw err
    }
  }

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      const updatedTask = await dataService.updateTask(id, updates)
      if (updatedTask) {
        setTasks(prev => prev.map(task => task.id === id ? updatedTask : task))
      }
      return updatedTask
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task')
      throw err
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    refetch: fetchTasks
  }
}

export function useAnalytics() {
  const [analytics, setAnalytics] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      const data = await dataService.getAnalytics()
      setAnalytics(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch analytics')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnalytics()
  }, [])

  return {
    analytics,
    loading,
    error,
    refetch: fetchAnalytics
  }
}