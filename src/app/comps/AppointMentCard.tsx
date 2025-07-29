// components/DoctorVisitCard.tsx
import { CalendarIcon, ClockIcon, StethoscopeIcon } from "lucide-react"

type Props = {
  doctorName: string
  specialization: string
  dayOfWeek: number
  startTime: string
  endTime: string
}

const dayMap = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export default function DoctorVisitCard({
  doctorName,
  specialization,
  dayOfWeek,
  startTime,
  endTime,
}: Props) {
  return (
    <div className="bg-white p-4 rounded-lg border shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2 font-semibold text-gray-800">
          <StethoscopeIcon className="w-4 h-4 text-blue-600" />
          {doctorName}
        </div>
        <span className="text-sm text-gray-500">{specialization}</span>
      </div>

      <div className="flex items-center text-sm text-gray-600 gap-2">
        <CalendarIcon className="w-4 h-4" />
        {dayMap[dayOfWeek]}
      </div>
      <div className="flex items-center text-sm text-gray-600 gap-2 mt-1">
        <ClockIcon className="w-4 h-4" />
        {startTime} – {endTime}
      </div>
    </div>
  )
}
