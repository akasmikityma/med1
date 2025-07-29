// lib/axios.ts
import axios from "axios"

const instance = axios.create({
  baseURL: typeof window === "undefined"
    ? process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    : "", // browser uses relative paths
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // include cookies (for session)
})

export default instance
