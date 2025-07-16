import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, MapPin, Bed, Bath, Square, GraduationCap, Clock, Users } from 'lucide-react'

const mockProperties = [
  {
    id: '1',
    title: '123 Main Street',
    address: '123 Main St, Downtown, NY 10001',
    type: 'Apartment',
    price: 450000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    status: 'available'
  },
  {
    id: '2',
    title: 'Oak Avenue House',
    address: '456 Oak Ave, Suburbs, NY 10002',
    type: 'House',
    price: 750000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2400,
    status: 'pending'
  }
]

const mockCourses = [
  {
    id: '1',
    title: 'Advanced React Development',
    description: 'Master modern React patterns and best practices',
    price: 299,
    duration: '8 weeks',
    level: 'Advanced',
    category: 'Web Development',
    students: 1250,
    status: 'active'
  },
  {
    id: '2',
    title: 'Data Science Fundamentals',
    description: 'Learn Python, statistics, and machine learning basics',
    price: 199,
    duration: '12 weeks',
    level: 'Beginner',
    category: 'Data Science',
    students: 890,
    status: 'active'
  }
]

export function Properties() {
  const [activeTab, setActiveTab] = useState('properties')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Properties & Courses</h1>
          <p className="text-muted-foreground">
            Manage your real estate listings and educational courses
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add {activeTab === 'properties' ? 'Property' : 'Course'}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="properties">Real Estate Properties</TabsTrigger>
          <TabsTrigger value="courses">EdTech Courses</TabsTrigger>
        </TabsList>

        <TabsContent value="properties" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {mockProperties.map((property) => (
              <Card key={property.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{property.title}</CardTitle>
                    <Badge variant={property.status === 'available' ? 'default' : 'secondary'}>
                      {property.status}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {property.address}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-2xl font-bold text-primary">
                    ${property.price.toLocaleString()}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center">
                      <Bed className="w-4 h-4 mr-1 text-muted-foreground" />
                      {property.bedrooms} bed
                    </div>
                    <div className="flex items-center">
                      <Bath className="w-4 h-4 mr-1 text-muted-foreground" />
                      {property.bathrooms} bath
                    </div>
                    <div className="flex items-center">
                      <Square className="w-4 h-4 mr-1 text-muted-foreground" />
                      {property.sqft} sqft
                    </div>
                  </div>

                  <Badge variant="outline">{property.type}</Badge>
                  
                  <div className="flex space-x-2 pt-2">
                    <Button size="sm" className="flex-1">View Details</Button>
                    <Button size="sm" variant="outline" className="flex-1">Edit</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {mockCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <Badge variant={course.status === 'active' ? 'default' : 'secondary'}>
                      {course.status}
                    </Badge>
                  </div>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-2xl font-bold text-primary">
                    ${course.price}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1 text-muted-foreground" />
                      {course.duration}
                    </div>
                    <div className="flex items-center">
                      <GraduationCap className="w-4 h-4 mr-1 text-muted-foreground" />
                      {course.level}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1 text-muted-foreground" />
                      {course.students} students
                    </div>
                  </div>

                  <Badge variant="outline">{course.category}</Badge>
                  
                  <div className="flex space-x-2 pt-2">
                    <Button size="sm" className="flex-1">View Details</Button>
                    <Button size="sm" variant="outline" className="flex-1">Edit</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}