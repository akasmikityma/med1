"use client"

import type React from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { ClinicSidebar } from "./Components/ClinicSidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

export default function ClinicLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "loading") return // Still loading
    if (!session) {
      router.push("/") // Redirect to landing page
      return
    }
  }, [session, status, router])

  // Show loading while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render if not authenticated
  if (!session) {
    return null
  }

  return (
    <SidebarProvider>
      <ClinicSidebar user={session.user} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}


// "use client";

// import type React from "react"
// import { useSession } from "next-auth/react"
// import { useRouter } from "next/navigation"
// import { useEffect } from "react"
// import { ClinicSidebar } from "./Components/ClinicSidebar"
// import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

// // Remove all Recoil usage from layout
// export default function ClinicLayout({ children }: { children: React.ReactNode }) {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   if (status === "loading") {
//     return ; // Your loading component
//   }

//   if (!session) {
//     router.push("/");
//     return null;
//   }

//   return (
//     <SidebarProvider>
//       <ClinicSidebar user={session.user} />
//       <SidebarInset>
//         {/* Critical: Wrap children in a Recoil-compatible div */}
//         <div className="recoil-root">
//           {children}
//         </div>
//       </SidebarInset>
//     </SidebarProvider>
//   );
// }