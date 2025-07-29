// "use client";

// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { Role } from "@prisma/client";

// interface RoleModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export default function RoleModal({ isOpen, onClose }: RoleModalProps) {
//   const router = useRouter();
//   const [selectedRole, setSelectedRole] = useState<Role | null>(null);

//   const handleRoleSelect = async () => {
//     if (!selectedRole) return;

//     try {
//       const response = await fetch("/api/user/role", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ role: selectedRole }),
//       });

//       if (response.ok) {
//         // Redirect based on role
//         switch (selectedRole) {
//           case "PATIENT":
//             router.push("/patient/dashboard");
//             break;
//           case "CLINIC":
//             router.push("/clinic/dashboard");
//             break;
//           case "ADMIN":
//             router.push("/admin/dashboard");
//             break;
//         }
//       }
//     } catch (error) {
//       console.error("Error updating role:", error);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="bg-white p-8 rounded-lg max-w-md w-full">
//         <h2 className="text-2xl font-bold mb-6">Choose Your Role</h2>
        
//         <div className="space-y-4">
//           {Object.values(Role).map((role) => (
//             <button
//               key={role}
//               onClick={() => setSelectedRole(role)}
//               className={`w-full p-4 rounded-lg border-2 transition-all
//                 ${
//                   selectedRole === role
//                     ? "border-blue-500 bg-blue-50"
//                     : "border-gray-200 hover:border-blue-300"
//                 }`}
//             >
//               {role.charAt(0) + role.slice(1).toLowerCase()}
//             </button>
//           ))}
//         </div>

//         <div className="mt-8 flex space-x-4">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 text-gray-600 hover:text-gray-800"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleRoleSelect}
//             disabled={!selectedRole}
//             className="px-4 py-2 bg-blue-500 text-white rounded-lg
//                      hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
//           >
//             Continue
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { X, User, Building2 } from "lucide-react"

// Define Role enum since we don't have access to Prisma types
enum Role {
  PATIENT = "PATIENT",
  CLINIC = "CLINIC",
  ADMIN = "ADMIN",
}

interface RoleModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function RoleModal({ isOpen, onClose }: RoleModalProps) {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleRoleSelect = async () => {
    if (!selectedRole) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/user/role", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: selectedRole }),
      })

      if (response.ok) {
        // Redirect based on role
        switch (selectedRole) {
          case Role.PATIENT:
            router.push("/patient/dashboard")
            break
          case Role.CLINIC:
            router.push("/clinic/dashboard")
            break
          case Role.ADMIN:
            router.push("/admin/dashboard")
            break
        }
      }
    } catch (error) {
      console.error("Error updating role:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const roleOptions = [
    {
      value: Role.PATIENT,
      label: "Patient",
      description: "Book appointments with doctors and manage your healthcare",
      icon: User,
      color: "blue",
    },
    {
      value: Role.CLINIC,
      label: "Clinic",
      description: "Manage doctor schedules and patient appointments",
      icon: Building2,
      color: "green",
    },
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Choose Your Role</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 mb-6">
            Select how you'll be using QuickDoc to get started with the right dashboard.
          </p>

          <div className="space-y-4">
            {roleOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedRole(option.value)}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left hover:shadow-md ${
                  selectedRole === option.value
                    ? `border-${option.color}-500 bg-${option.color}-50 shadow-md`
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`p-2 rounded-lg ${
                      selectedRole === option.value ? `bg-${option.color}-100` : "bg-gray-100"
                    }`}
                  >
                    <option.icon
                      className={`w-6 h-6 ${
                        selectedRole === option.value ? `text-${option.color}-600` : "text-gray-600"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">{option.label}</h3>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex space-x-4 p-6 border-t bg-gray-50 rounded-b-2xl">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleRoleSelect}
            disabled={!selectedRole || isLoading}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium
                     hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed 
                     transition-colors flex items-center justify-center"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Continue"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
