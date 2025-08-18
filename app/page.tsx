import { WorkoutScheduler } from "@/components/workout-scheduler"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <div className="container mx-auto px-2 py-8">
        <div className="text-center mb-8">
          <h1 className="md:text-4xl text-2xl font-bold text-black mb-2">💪 Workout Scheduler by <br /> Sirish Titaju</h1>
          <p className="text-gray-800 text-lg">Your personalized 3-day split routine</p>
        </div>
        <WorkoutScheduler />
      </div>
    </main>
  )
}
