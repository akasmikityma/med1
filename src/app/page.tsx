"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import LandingPage from "./comps/LandingPage"
export default function HomePage() {
  const { data: session } = useSession()

  return (
    <div>
      <LandingPage/>
    </div>
  )
}
