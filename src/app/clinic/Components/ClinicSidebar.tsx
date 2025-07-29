"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, Users, Clock, Settings, LogOut, Home, FileText, BarChart3, UserPlus, Bell } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { signOut } from "next-auth/react"

interface ClinicSidebarProps {
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

const navigationItems = [
  {
    title: "Dashboard",
    url: "/clinic/dashboard",
    icon: Home,
  },
  {
    title: "Appointments",
    url: "/clinic/appointments",
    icon: Calendar,
  },
  {
    title: "Doctors",
    url: "/clinic/doctors",
    icon: Users,
  },
  {
    title: "Schedules",
    url: "/clinic/schedules",
    icon: Clock,
  },
  {
    title: "Patients",
    url: "/clinic/patients",
    icon: UserPlus,
  },
  {
    title: "Reports",
    url: "/clinic/reports",
    icon: BarChart3,
  },
]

const accountItems = [
  {
    title: "Clinic Profile",
    url: "/clinic/profile",
    icon: FileText,
  },
  {
    title: "Notifications",
    url: "/clinic/notifications",
    icon: Bell,
  },
  {
    title: "Settings",
    url: "/clinic/settings",
    icon: Settings,
  },
]

export function ClinicSidebar({ user }: ClinicSidebarProps) {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center space-x-3 px-2 py-2">
          <div className="text-2xl">🏥</div>
          <div>
            <h1 className="text-xl font-bold text-sidebar-foreground">QuickDoc</h1>
            <p className="text-xs text-sidebar-foreground/70">Clinic Portal</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Account Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full">
                  <img
                    src={user?.image || "/placeholder.svg?height=32&width=32&query=clinic"}
                    alt="Profile"
                    className="w-6 h-6 rounded-full"
                  />
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium truncate">{user?.name || "Clinic"}</span>
                    <span className="text-xs text-sidebar-foreground/70 truncate">{user?.email}</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/clinic/profile">
                    <FileText className="w-4 h-4 mr-2" />
                    Clinic Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/clinic/settings">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
