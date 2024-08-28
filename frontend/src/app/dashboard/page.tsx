"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent
} from "@/components/ui/tooltip"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Property } from '@/types/property'
import Link from "next/link"
import CRMMessaging from './CRMMessaging'

export default function Dashboard() {
  const router = useRouter()

  const properties: Property[] = [
    {
      id: 1,
      address: "Apgujeong-dong",
      description: "Luxury apartment",
      title: "Luxurious Apartment in Apgujeong-dong",
      price: 1000000,
      bedrooms: 3,
      bathrooms: 2,
      pyeong: 85,
      created_at: '2024-01-01T12:00:00Z',
    },
    {
      id: 2,
      address: "Hyehwa-dong",
      description: "Cozy studio near university",
      title: "Cozy Studio in Hyehwa-dong",
      price: 500000,
      bedrooms: 1,
      bathrooms: 1,
      pyeong: 30,
      created_at: '2024-02-01T12:00:00Z',
    },
    {
      id: 3,
      address: "Gahoe-dong",
      description: "Traditional hanok house",
      title: "Traditional Hanok House in Gahoe-dong",
      price: 2000000,
      bedrooms: 4,
      bathrooms: 3,
      pyeong: 120,
      created_at: '2024-03-01T12:00:00Z',
    },
  ]

  const [editingProperty, setEditingProperty] = useState<Property | null>(null)
  const handleEditProperty = (property: Property) => {
    setEditingProperty(property)
  }

  const [isOwner, setIsOwner] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [showCRMMessaging, setShowCRMMessaging] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get('/api/users/me')
        setIsOwner(userResponse.data.is_owner)

        if (userResponse.data.is_owner) {
          const propertiesResponse = await axios.get('/api/properties/my_properties')
          setProperties(propertiesResponse.data)
        } else {
          // Fetch tenant's properties
          const tenantResponse = await axios.get('/api/tenants/me')
          if (tenantResponse.data.properties) {
            setProperties(tenantResponse.data.properties)
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property)
  }

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
    setShowCRMMessaging(tab === 'tenants')
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="sticky top-0 z-30 flex flex-col bg-background px-6 py-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Real Estate Dashboard</h2>
          <nav className="flex items-center gap-4">
            <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
              Properties
            </Link>
            <Link 
                href="#" 
                className="text-muted-foreground hover:text-foreground" 
                prefetch={false}
                onClick={() => handleTabClick('tenants')}
            >
              Tenants
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
              Maintenance
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
              Settings
            </Link>
          </nav>
        </div>
      </header>
      <div className="flex flex-1 gap-4 p-4 sm:px-6 sm:py-4">
        <aside className="hidden w-14 flex-col border-r bg-background sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    prefetch={false}
                  >
                    <HomeIcon className="h-5 w-5" />
                    <span className="sr-only">Dashboard</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Dashboard</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    prefetch={false}
                  >
                    <BuildingIcon className="h-5 w-5" />
                    <span className="sr-only">Properties</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Properties</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    prefetch={false}
                  >
                    <UsersIcon className="h-5 w-5" />
                    <span className="sr-only">Tenants</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Tenants</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                    prefetch={false}
                  >
                    <SettingsIcon className="h-5 w-5" />
                    <span className="sr-only">Settings</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Settings</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>
        </aside>
        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>{isOwner ? "Property Overview" : "My Rentals"}</CardTitle>
                <CardDescription>{isOwner ? "Manage your properties" : "View your rental details"}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {properties.map((property) => (
                    <div key={property.id} className="flex items-center justify-between cursor-pointer" onClick={() => handlePropertyClick(property)}>
                      <div>
                        <div className="text-sm font-medium">{property.address}</div>
                        <div className="text-muted-foreground">{property.description}</div>
                      </div>
                      <HomeIcon className="h-6 w-6 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            {selectedProperty && (
              <Card>
                <CardHeader>
                  <CardTitle>Selected Rental Details</CardTitle>
                  <CardDescription>{selectedProperty.address}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <div>
                      <span className="font-medium">Price:</span> ${selectedProperty.price}
                    </div>
                    <div>
                      <span className="font-medium">Bedrooms:</span> {selectedProperty.bedrooms}
                    </div>
                    <div>
                      <span className="font-medium">Bathrooms:</span> {selectedProperty.bathrooms}
                    </div>
                    <div>
                      <span className="font-medium">Size:</span> {selectedProperty.pyeong} pyeong
                    </div>
                    <div>
                      <span className="font-medium">Description:</span> {selectedProperty.description}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            {isOwner && (
              <Card>
                <CardHeader>
                  <CardTitle>Occupancy Rate</CardTitle>
                  <CardDescription>Current occupancy across all properties</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">Overall Occupancy</div>
                        <div className="text-muted-foreground">85%</div>
                      </div>
                      <Progress value={85} aria-label="Overall Occupancy" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            <Card>
              <CardHeader>
                <CardTitle>Maintenance Requests</CardTitle>
                <CardDescription>Recent maintenance issues</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">Plumbing Issue</div>
                      <div className="text-muted-foreground">Reported on June 15, 2023</div>
                    </div>
                    <WrenchIcon className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">HVAC Maintenance</div>
                      <div className="text-muted-foreground">Scheduled for July 1, 2023</div>
                    </div>
                    <ThermometerIcon className="h-6 w-6 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        {showCRMMessaging && <CRMMessaging />}
      </div>
    </div>
  )
}

function HomeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

function BuildingIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  )
}

function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function SettingsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function WrenchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  )
}

function ThermometerIcon(props: React.SVGProps<SVGSVGElement>) {3
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
    </svg>
  )
}