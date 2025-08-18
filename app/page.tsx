import { WorkoutScheduler } from "@/components/workout-scheduler"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black mb-2">💪 Workout Schedule - Sirish Titaju</h1>
          <p className="text-gray-800 text-lg">My personalized 3-day split routine</p>
        </div>
        <WorkoutScheduler />
      </div>
    </main>
  )
}
