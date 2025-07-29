"use client"

import { Bell } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

interface PatientHeaderProps {
  title: string
  subtitle?: string
}

export function PatientHeader({ title, subtitle }: PatientHeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <div className="flex-1">
        <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
        {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
      </div>
      <Button variant="ghost" size="icon">
        <Bell className="w-5 h-5" />
      </Button>
    </header>
  )
}
