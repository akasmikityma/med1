"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, Search, User, Bell, Settings, LogOut, Home, FileText, CreditCard } from "lucide-react"
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

interface PatientSidebarProps {
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

const navigationItems = [
  {
    title: "Dashboard",
    url: "/patient/dashboard",
    icon: Home,
  },
  {
    title: "Find Doctors",
    url: "/patient/doctor",
    icon: Search,
  },
  {
    title: "My Appointments",
    url: "/patient/appointments",
    icon: Calendar,
  },
  {
    title: "Medical Records",
    url: "/patient/records",
    icon: FileText,
  },
  {
    title: "Billing",
    url: "/patient/billing",
    icon: CreditCard,
  },
]

const accountItems = [
  {
    title: "Profile",
    url: "/patient/profile",
    icon: User,
  },
  {
    title: "Notifications",
    url: "/patient/notifications",
    icon: Bell,
  },
  {
    title: "Settings",
    url: "/patient/settings",
    icon: Settings,
  },
]

export function PatientSidebarU({ user }: PatientSidebarProps) {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center space-x-3 px-2 py-2">
          <div className="text-2xl">🏥</div>
          <div>
            <h1 className="text-xl font-bold text-sidebar-foreground">QuickDoc</h1>
            <p className="text-xs text-sidebar-foreground/70">Patient Portal</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
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
                    src={user?.image || "/placeholder.svg?height=32&width=32&query=profile"}
                    alt="Profile"
                    className="w-6 h-6 rounded-full"
                  />
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium truncate">{user?.name || "User"}</span>
                    <span className="text-xs text-sidebar-foreground/70 truncate">{user?.email}</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/patient/profile">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/patient/settings">
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
