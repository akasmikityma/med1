// "use client";

// import { signIn, useSession } from "next-auth/react";
// import { useState } from "react";
// import RoleModal from "./RoleModal";

// export default function LandingPage() {
//   const { data: session } = useSession();
//   const [showRoleModal, setShowRoleModal] = useState(false);

//   const handleSignIn = async () => {
//     await signIn("google");
//   };

//   return (
//     <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-white">
//       <div className="text-center space-y-8 p-8">
//         <h1 className="text-5xl font-bold text-gray-800">
//           Welcome to MedioCure
//         </h1>
//         <p className="text-xl text-gray-600 max-w-md mx-auto">
//           Your one-stop solution for clinic management and appointment booking
//         </p>
        
//         {!session ? (
//           <button
//             onClick={handleSignIn}
//             className="bg-blue-500 text-white px-8 py-3 rounded-full 
//                      hover:bg-blue-600 transition-colors text-lg font-semibold"
//           >
//             Get Started with Google
//           </button>
//         ) : (
//           <button
//             onClick={() => setShowRoleModal(true)}
//             className="bg-green-500 text-white px-8 py-3 rounded-full 
//                      hover:bg-green-600 transition-colors text-lg font-semibold"
//           >
//             Choose Your Role
//           </button>
//         )}
//       </div>

//       {showRoleModal && (
//         <RoleModal
//           isOpen={showRoleModal}
//           onClose={() => setShowRoleModal(false)}
//         />
//       )}
//     </main>
//   );
// }

"use client"

import { signIn, useSession } from "next-auth/react"
import { useState } from "react"
import { Calendar, Clock, Users, Shield, ArrowRight, CheckCircle } from "lucide-react"
import RoleModal from "@/app/comps/RoleModal"

export default function LandingPage() {
  const { data: session } = useSession()
  const [showRoleModal, setShowRoleModal] = useState(false)

  const handleSignIn = async () => {
    await signIn("google")
  }

  const features = [
    {
      icon: Calendar,
      title: "Easy Scheduling",
      description: "Book appointments with your preferred doctors in just a few clicks",
    },
    {
      icon: Clock,
      title: "Real-time Availability",
      description: "See live doctor schedules and available time slots instantly",
    },
    {
      icon: Users,
      title: "Clinic Management",
      description: "Clinics can easily manage multiple doctors and their schedules",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your medical information is protected with enterprise-grade security",
    },
  ]

  const benefits = [
    "No more waiting on hold to book appointments",
    "Instant confirmation and reminders",
    "View and manage all your appointments in one place",
    "Connect with trusted healthcare providers",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="text-3xl">🏥</div>
            <span className="text-2xl font-bold text-gray-800">QuickDoc</span>
          </div>
          {session && (
            <div className="flex items-center space-x-4">
              <img src={session.user?.image || ""} alt="Profile" className="w-8 h-8 rounded-full" />
              <span className="text-sm text-gray-600">Welcome, {session.user?.name}</span>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Healthcare Appointments
            <span className="block text-blue-600">Made Simple</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Connect patients with doctors seamlessly. Book appointments instantly, manage schedules effortlessly, and
            focus on what matters most - your health.
          </p>

          {!session ? (
            <button
              onClick={handleSignIn}
              className="inline-flex items-center space-x-3 bg-blue-600 text-white px-8 py-4 rounded-full 
                       hover:bg-blue-700 transition-all duration-300 text-lg font-semibold shadow-lg 
                       hover:shadow-xl transform hover:-translate-y-1"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Sign in with Google</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={() => setShowRoleModal(true)}
              className="inline-flex items-center space-x-3 bg-green-600 text-white px-8 py-4 rounded-full 
                       hover:bg-green-700 transition-all duration-300 text-lg font-semibold shadow-lg 
                       hover:shadow-xl transform hover:-translate-y-1"
            >
              <span>Continue to Dashboard</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose QuickDoc?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're revolutionizing healthcare appointments with modern technology and user-friendly design.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <feature.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Transform Your Healthcare Experience</h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <p className="text-lg text-gray-700">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="text-center">
                  <div className="text-6xl mb-4">📱</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Available Everywhere</h3>
                  <p className="text-gray-600">
                    Access QuickDoc from any device, anywhere, anytime. Your healthcare is always at your fingertips.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of patients and healthcare providers who trust QuickDoc for their appointment management
            needs.
          </p>

          {!session && (
            <button
              onClick={handleSignIn}
              className="inline-flex items-center space-x-3 bg-blue-600 text-white px-8 py-4 rounded-full 
                       hover:bg-blue-700 transition-all duration-300 text-lg font-semibold shadow-lg 
                       hover:shadow-xl transform hover:-translate-y-1"
            >
              <span>Get Started Today</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="text-2xl">🏥</div>
            <span className="text-xl font-bold">QuickDoc</span>
          </div>
          <p className="text-gray-400">Making healthcare appointments simple and accessible for everyone.</p>
        </div>
      </footer>

      {/* Role Modal */}
      {showRoleModal && <RoleModal isOpen={showRoleModal} onClose={() => setShowRoleModal(false)} />}
    </div>
  )
}
