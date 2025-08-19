"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, Clock, Dumbbell, Target, EyeOff, Zap, ChevronDown, ChevronUp } from "lucide-react"
import { ParticlesBackground } from "./particles-background"
import { LazyVideo } from "./lazy-video"
import { MuscleActivationMap } from "./muscle-activation-map"

interface Exercise {
  name: string
  equipment: string
  sets: string
  reps: string
  notes?: string
  targetMuscle: string
  videoUrl: string
  muscleIllustration?: string
}

interface WorkoutDay {
  day: string
  muscles: string[]
  exercises: Exercise[]
  color: string
}

const warmupExercises: Exercise[] = [
  {
    name: "Jumping Jacks",
    equipment: "Body Weight",
    sets: "2",
    reps: "30 seconds",
    targetMuscle: "Full Body",
    notes: "Get your heart rate up",
    videoUrl: "https://www.youtube.com/embed/c4DAnQ6DtF8",
  },
  {
    name: "Push-ups",
    equipment: "Body Weight",
    sets: "2",
    reps: "10-15",
    targetMuscle: "Upper Body",
    videoUrl: "https://www.youtube.com/embed/IODxDxX7oi4",
  },
  {
    name: "Bodyweight Squats",
    equipment: "Body Weight",
    sets: "2",
    reps: "15-20",
    targetMuscle: "Lower Body",
    videoUrl: "https://www.youtube.com/embed/YaXPRqUwItQ",
  },
  {
    name: "Pull-ups/Chin-ups",
    equipment: "Pull Up Bar",
    sets: "2",
    reps: "5-10",
    targetMuscle: "Upper Body",
    videoUrl: "https://www.youtube.com/embed/eGo4IYlbE5g",
  },
  {
    name: "Plank",
    equipment: "Body Weight",
    sets: "2",
    reps: "30-60 seconds",
    targetMuscle: "Core",
    videoUrl: "https://www.youtube.com/embed/ASdvN_XEl_c",
  },
  {
    name: "Lunges",
    equipment: "Body Weight",
    sets: "2",
    reps: "10 each leg",
    targetMuscle: "Lower Body",
    videoUrl: "https://www.youtube.com/embed/QOVaHwm-Q6U",
  },
  {
    name: "Arm Circles",
    equipment: "Body Weight",
    sets: "2",
    reps: "15 each direction",
    targetMuscle: "Shoulders",
    videoUrl: "https://www.youtube.com/embed/1Vf5VwD129Y",
  },
  {
    name: "High Knees",
    equipment: "Body Weight",
    sets: "2",
    reps: "30 seconds",
    targetMuscle: "Full Body",
    videoUrl: "https://www.youtube.com/embed/8opcQdC-V-U",
  },
  {
    name: "Butt Kicks",
    equipment: "Body Weight",
    sets: "2",
    reps: "30 seconds",
    targetMuscle: "Lower Body",
    videoUrl: "https://www.youtube.com/embed/6up9-rGFjbI",
  },
  {
    name: "Dynamic Stretching",
    equipment: "Body Weight",
    sets: "1",
    reps: "5-10 each",
    targetMuscle: "Full Body",
    videoUrl: "https://www.youtube.com/embed/FSSDLDhbacc",
  },
]

const workoutPlan: WorkoutDay[] = [
  {
    day: "Sunday",
    muscles: ["Chest", "Triceps"],
    color: "bg-gray-700",
    exercises: [
      {
        name: "Barbell Bench Press",
        equipment: "Barbell + Flat Bench",
        sets: "4",
        reps: "8-10",
        targetMuscle: "Chest",
        notes: "Focus on controlled movement",
        videoUrl: "https://www.youtube.com/embed/rT7DgCr-3pg",
        muscleIllustration: "/images/muscle-diagrams/barbell-bench-press-muscles.png",
      },
      {
        name: "Incline Barbell Press",
        equipment: "Barbell + Incline Bench",
        sets: "4",
        reps: "8-10",
        targetMuscle: "Chest",
        notes: "Upper chest focus - 30-45 degree incline",
        videoUrl: "https://www.youtube.com/embed/DbFgADa2PL8",
        muscleIllustration: "/images/muscle-diagrams/incline-barbell-press-muscles.png",
      },
      {
        name: "Flat Barbell Bench Press",
        equipment: "Barbell + Flat Bench",
        sets: "4",
        reps: "8-10",
        targetMuscle: "Chest",
        notes: "Middle chest focus - full range of motion",
        videoUrl: "https://www.youtube.com/embed/esQi683XR44",
        muscleIllustration: "/images/muscle-diagrams/barbell-bench-press-muscles.png",
      },
      {
        name: "Decline Barbell Press",
        equipment: "Barbell + Decline Bench",
        sets: "3",
        reps: "10-12",
        targetMuscle: "Chest",
        notes: "Lower chest focus - controlled movement",
        videoUrl: "https://www.youtube.com/embed/LfyQBUKR8SE",
        muscleIllustration: "/images/muscle-diagrams/decline-barbell-press-muscles.png",
      },
      {
        name: "Incline Dumbbell Flyes",
        equipment: "Dumbbells + Incline Bench",
        sets: "3",
        reps: "12-15",
        targetMuscle: "Chest",
        notes: "Upper chest isolation - stretch at bottom",
        videoUrl: "https://www.youtube.com/embed/eozdVDA78K0",
        muscleIllustration: "/images/muscle-diagrams/incline-dumbbell-flyes-muscles.png",
      },
      {
        name: "Flat Dumbbell Flyes",
        equipment: "Dumbbells + Flat Bench",
        sets: "3",
        reps: "12-15",
        targetMuscle: "Chest",
        notes: "Middle chest isolation - wide arc motion",
        videoUrl: "https://www.youtube.com/embed/QENKPHhQVi4",
        muscleIllustration: "/images/muscle-diagrams/flat-dumbbell-flyes-muscles.png",
      },
      {
        name: "Dips",
        equipment: "Dip (Parallel) Bar",
        sets: "3",
        reps: "10-15",
        targetMuscle: "Triceps",
        notes: "Lateral & medial heads - lean forward slightly",
        videoUrl: "https://www.youtube.com/embed/2z8JmcrW-As",
        muscleIllustration: "/images/muscle-diagrams/dips-muscles.png",
      },
      {
        name: "Close-Grip Bench Press",
        equipment: "Barbell + Flat Bench",
        sets: "4",
        reps: "8-10",
        targetMuscle: "Triceps",
        notes: "All tricep heads - hands shoulder-width apart",
        videoUrl: "https://www.youtube.com/embed/nEF0bv2FW94",
        muscleIllustration: "/images/muscle-diagrams/close-grip-bench-muscles.png",
      },
      {
        name: "Overhead Dumbbell Extension",
        equipment: "Dumbbells",
        sets: "3",
        reps: "12-15",
        targetMuscle: "Triceps",
        notes: "Long head focus - stretch at bottom",
        videoUrl: "https://www.youtube.com/embed/YbX7Wd8jQ-Q",
        muscleIllustration: "/images/muscle-diagrams/overhead-dumbbell-extension-muscles.png",
      },
      {
        name: "Diamond Push-ups",
        equipment: "Body Weight",
        sets: "3",
        reps: "8-12",
        targetMuscle: "Triceps",
        notes: "Medial head focus - hands form diamond shape",
        videoUrl: "https://www.youtube.com/embed/J0DnG1_S92I",
        muscleIllustration: "/images/muscle-diagrams/diamond-pushups-muscles.png",
      },
    ],
  },
  {
    day: "Monday",
    muscles: ["Back", "Biceps"],
    color: "bg-gray-600",
    exercises: [
      {
        name: "Pull-ups",
        equipment: "Pull Up Bar",
        sets: "4",
        reps: "6-10",
        targetMuscle: "Back",
        notes: "Use assisted if needed",
        videoUrl: "https://www.youtube.com/embed/eGo4IYlbE5g",
        muscleIllustration: "/images/muscle-diagrams/pullup-muscles.png",
      },
      {
        name: "Wide-Grip Pull-ups",
        equipment: "Pull Up Bar",
        sets: "4",
        reps: "6-10",
        targetMuscle: "Back",
        notes: "Lats focus - wide grip, pull to upper chest",
        videoUrl: "https://www.youtube.com/embed/iywjAHVnzSE",
        muscleIllustration: "/images/muscle-diagrams/wide-grip-pullups-muscles.png",
      },
      {
        name: "Close-Grip Pull-ups",
        equipment: "Pull Up Bar",
        sets: "3",
        reps: "8-12",
        targetMuscle: "Back",
        notes: "Middle traps & rhomboids - hands closer together",
        videoUrl: "https://www.youtube.com/embed/brhRXlOhkAM",
        muscleIllustration: "/images/muscle-diagrams/close-grip-pullups-muscles.png",
      },
      {
        name: "Lat Pulldown",
        equipment: "Lat Pulldown Cable",
        sets: "4",
        reps: "10-12",
        targetMuscle: "Back",
        videoUrl: "https://www.youtube.com/embed/CAwf7n6Luuc",
        muscleIllustration: "/images/muscle-diagrams/lat-pulldown-muscles.png",
      },
      {
        name: "Wide-Grip Lat Pulldown",
        equipment: "Lat Pulldown Cable",
        sets: "4",
        reps: "10-12",
        targetMuscle: "Back",
        notes: "Lats isolation - pull to upper chest",
        videoUrl: "https://www.youtube.com/embed/X5M-5zI-n0E",
        muscleIllustration: "/images/muscle-diagrams/lat-pulldown-muscles.png",
      },
      {
        name: "Barbell Rows",
        equipment: "Barbell",
        sets: "4",
        reps: "8-10",
        targetMuscle: "Back",
        videoUrl: "https://www.youtube.com/embed/FWJR5Ve8bnQ",
        muscleIllustration: "/images/muscle-diagrams/bent-over-barbell-rows-muscles.png",
      },
      {
        name: "Bent-Over Barbell Rows",
        equipment: "Barbell",
        sets: "4",
        reps: "8-10",
        targetMuscle: "Back",
        notes: "Middle traps & rhomboids - pull to lower chest",
        videoUrl: "https://www.youtube.com/embed/9efgcAjQe7E",
        muscleIllustration: "/images/muscle-diagrams/bent-over-barbell-rows-muscles.png",
      },
      {
        name: "T-Bar Rows",
        equipment: "T Bar",
        sets: "3",
        reps: "10-12",
        targetMuscle: "Back",
        notes: "Middle back thickness - squeeze shoulder blades",
        videoUrl: "https://www.youtube.com/embed/j3Igk5nyZE4",
        muscleIllustration: "/images/muscle-diagrams/t-bar-rows-muscles.png",
      },
      {
        name: "Cable Rows",
        equipment: "Crossover Cable",
        sets: "3",
        reps: "12-15",
        targetMuscle: "Back",
        videoUrl: "https://www.youtube.com/embed/xQNrFHEMhI4",
        muscleIllustration: "/images/muscle-diagrams/cable-rows-low-muscles.png",
      },
      {
        name: "Cable Rows (Low)",
        equipment: "Crossover Cable",
        sets: "3",
        reps: "12-15",
        targetMuscle: "Back",
        notes: "Lower lats & rhomboids - pull to lower abdomen",
        videoUrl: "https://www.youtube.com/embed/UCXxvVItLoM",
        muscleIllustration: "/images/muscle-diagrams/cable-rows-low-muscles.png",
      },
      {
        name: "Barbell Curls",
        equipment: "Barbell",
        sets: "4",
        reps: "10-12",
        targetMuscle: "Biceps",
        notes: "Both heads - shoulder-width grip",
        videoUrl: "https://www.youtube.com/embed/ykJmrZ5v0Oo",
        muscleIllustration: "/images/muscle-diagrams/barbell-curls-muscles.png",
      },
      {
        name: "Incline Dumbbell Curls",
        equipment: "Dumbbells + Incline Bench",
        sets: "3",
        reps: "10-12",
        targetMuscle: "Biceps",
        notes: "Long head focus - arms behind body",
        videoUrl: "https://www.youtube.com/embed/soxrZlIl35U",
        muscleIllustration: "/images/muscle-diagrams/incline-dumbbell-curls-muscles.png",
      },
      {
        name: "Hammer Curls",
        equipment: "Dumbbells",
        sets: "3",
        reps: "12-15",
        targetMuscle: "Biceps",
        notes: "Brachialis & long head - neutral grip",
        videoUrl: "https://www.youtube.com/embed/zC3nLlEvin4",
        muscleIllustration: "/images/muscle-diagrams/hammer-curls-muscles.png",
      },
      {
        name: "Concentration Curls",
        equipment: "Dumbbells",
        sets: "3",
        reps: "12-15",
        targetMuscle: "Biceps",
        notes: "Short head focus - elbow against thigh",
        videoUrl: "https://www.youtube.com/embed/0AUGkch3tzc",
        muscleIllustration: "/images/muscle-diagrams/concentration-curls-muscles.png",
      },
    ],
  },
  {
    day: "Tuesday",
    muscles: ["Shoulders", "Abs/Core"],
    color: "bg-gray-500",
    exercises: [
      {
        name: "Overhead Press",
        equipment: "Barbell",
        sets: "4",
        reps: "8-10",
        targetMuscle: "Shoulders",
        notes: "Anterior deltoid focus - press straight up",
        videoUrl: "https://www.youtube.com/embed/2yjwXTZQDDI",
        muscleIllustration: "/images/muscle-diagrams/overhead-press-muscles.png",
      },
      {
        name: "Dumbbell Shoulder Press",
        equipment: "Dumbbells",
        sets: "3",
        reps: "10-12",
        targetMuscle: "Shoulders",
        notes: "All deltoids - full range of motion",
        videoUrl: "https://www.youtube.com/embed/qEwKCR5JCog",
        muscleIllustration: "/images/muscle-diagrams/dumbbell-shoulder-press-muscles.png",
      },
      {
        name: "Lateral Raises",
        equipment: "Dumbbells",
        sets: "4",
        reps: "12-15",
        targetMuscle: "Shoulders",
        notes: "Medial deltoid isolation - lift to shoulder height",
        videoUrl: "https://www.youtube.com/embed/3VcKaXpzqRo",
        muscleIllustration: "/images/muscle-diagrams/lateral-raises-muscles.png",
      },
      {
        name: "Front Raises",
        equipment: "Dumbbells",
        sets: "3",
        reps: "12-15",
        targetMuscle: "Shoulders",
        notes: "Anterior deltoid isolation - lift to eye level",
        videoUrl: "https://www.youtube.com/embed/qzaKUHI8WoI",
        muscleIllustration: "/images/muscle-diagrams/front-raises-muscles.png",
      },
      {
        name: "Rear Delt Flyes",
        equipment: "Dumbbells",
        sets: "4",
        reps: "12-15",
        targetMuscle: "Shoulders",
        notes: "Posterior deltoid isolation - squeeze shoulder blades",
        videoUrl: "https://www.youtube.com/embed/EA7u4Q_8HQ0",
        muscleIllustration: "/images/muscle-diagrams/rear-delt-flyes-muscles.png",
      },
      {
        name: "Plank",
        equipment: "Body Weight",
        sets: "3",
        reps: "30-60 seconds",
        targetMuscle: "Abs/Core",
        notes: "Full core activation - maintain straight line",
        videoUrl: "https://www.youtube.com/embed/ASdvN_XEl_c",
        muscleIllustration: "/images/muscle-diagrams/plank-muscles.png",
      },
      {
        name: "Ab Wheel Rollouts",
        equipment: "Ab Wheel",
        sets: "3",
        reps: "8-12",
        targetMuscle: "Abs/Core",
        notes: "Rectus abdominis & deep core - control the movement",
        videoUrl: "https://www.youtube.com/embed/UbzugdvOiPk",
        muscleIllustration: "/images/muscle-diagrams/ab-wheel-muscles.png",
      },
      {
        name: "Russian Twists",
        equipment: "Dumbbells",
        sets: "3",
        reps: "20 each side",
        targetMuscle: "Abs/Core",
        notes: "Obliques focus - rotate torso, not just arms",
        videoUrl: "https://www.youtube.com/embed/wkD8rjkodUI",
        muscleIllustration: "/images/muscle-diagrams/russian-twists-muscles.png",
      },
      {
        name: "Dead Bug",
        equipment: "Body Weight",
        sets: "3",
        reps: "10 each side",
        targetMuscle: "Abs/Core",
        notes: "Deep core stability - opposite arm and leg",
        videoUrl: "https://www.youtube.com/embed/g_BYB0R-4Ws",
        muscleIllustration: "/images/muscle-diagrams/dead-bug-muscles.png",
      },
      {
        name: "Mountain Climbers",
        equipment: "Body Weight",
        sets: "3",
        reps: "30 seconds",
        targetMuscle: "Abs/Core",
        notes: "Dynamic core & cardio - maintain plank position",
        videoUrl: "https://www.youtube.com/embed/nmwgirgXLYM",
        muscleIllustration: "/images/muscle-diagrams/mountain-climbers-muscles.png",
      },
      {
        name: "Hanging Knee Raises",
        equipment: "Pull Up Bar",
        sets: "3",
        reps: "10-15",
        targetMuscle: "Abs/Core",
        notes: "Lower abs focus - control the swing",
        videoUrl: "https://www.youtube.com/embed/hdng3Nm1x_E",
        muscleIllustration: "/images/muscle-diagrams/hanging-knee-raises-muscles.png",
      },
      {
        name: "Side Plank",
        equipment: "Body Weight",
        sets: "2",
        reps: "30-45 seconds each side",
        targetMuscle: "Abs/Core",
        notes: "Obliques & lateral core - straight body line",
        videoUrl: "https://www.youtube.com/embed/K2VljzCC16g",
        muscleIllustration: "/images/muscle-diagrams/side-plank-muscles.png",
      },
      {
        name: "Bicycle Crunches",
        equipment: "Body Weight",
        sets: "3",
        reps: "20 each side",
        targetMuscle: "Abs/Core",
        notes: "Upper abs & obliques - slow controlled movement",
        videoUrl: "https://www.youtube.com/embed/9FGilxCbdz8",
        muscleIllustration: "/images/muscle-diagrams/bicycle-crunches-muscles.png",
      },
    ],
  },
  {
    day: "Friday",
    muscles: ["Shoulders", "Legs"],
    color: "bg-gray-400",
    exercises: [
      {
        name: "Overhead Press",
        equipment: "Barbell",
        sets: "4",
        reps: "8-10",
        targetMuscle: "Shoulders",
        notes: "Anterior deltoid focus - press straight up",
        videoUrl: "https://www.youtube.com/embed/2yjwXTZQDDI",
        muscleIllustration: "/images/muscle-diagrams/overhead-press-muscles.png",
      },
      {
        name: "Dumbbell Shoulder Press",
        equipment: "Dumbbells",
        sets: "3",
        reps: "10-12",
        targetMuscle: "Shoulders",
        notes: "All deltoids - full range of motion",
        videoUrl: "https://www.youtube.com/embed/qEwKCR5JCog",
        muscleIllustration: "/images/muscle-diagrams/dumbbell-shoulder-press-muscles.png",
      },
      {
        name: "Lateral Raises",
        equipment: "Dumbbells",
        sets: "4",
        reps: "12-15",
        targetMuscle: "Shoulders",
        notes: "Medial deltoid isolation - lift to shoulder height",
        videoUrl: "https://www.youtube.com/embed/3VcKaXpzqRo",
        muscleIllustration: "/images/muscle-diagrams/lateral-raises-muscles.png",
      },
      {
        name: "Front Raises",
        equipment: "Dumbbells",
        sets: "3",
        reps: "12-15",
        targetMuscle: "Shoulders",
        notes: "Anterior deltoid isolation - lift to eye level",
        videoUrl: "https://www.youtube.com/embed/qzaKUHI8WoI",
        muscleIllustration: "/images/muscle-diagrams/front-raises-muscles.png",
      },
      {
        name: "Rear Delt Flyes",
        equipment: "Dumbbells",
        sets: "4",
        reps: "12-15",
        targetMuscle: "Shoulders",
        notes: "Posterior deltoid isolation - squeeze shoulder blades",
        videoUrl: "https://www.youtube.com/embed/EA7u4Q_8HQ0",
        muscleIllustration: "/images/muscle-diagrams/rear-delt-flyes-muscles.png",
      },
      {
        name: "Barbell Squats",
        equipment: "Barbell + Squat Rack",
        sets: "4",
        reps: "8-10",
        targetMuscle: "Legs",
        notes: "Quads & glutes focus - full depth squat",
        videoUrl: "https://www.youtube.com/embed/ultWZbUMPL8",
        muscleIllustration: "/images/muscle-diagrams/barbell-squats-muscles.png",
      },
      {
        name: "Leg Press",
        equipment: "Leg Press Machine",
        sets: "4",
        reps: "12-15",
        targetMuscle: "Legs",
        notes: "Quads & glutes - controlled movement",
        videoUrl: "https://www.youtube.com/embed/IZxyjW7MPJQ",
        muscleIllustration: "/images/muscle-diagrams/leg-press-muscles.png",
      },
      {
        name: "Romanian Deadlifts",
        equipment: "Barbell",
        sets: "4",
        reps: "10-12",
        targetMuscle: "Legs",
        notes: "Hamstrings & glutes - hip hinge movement",
        videoUrl: "https://www.youtube.com/embed/jEy_czb3RKA",
        muscleIllustration: "/images/muscle-diagrams/romanian-deadlifts-muscles.png",
      },
      {
        name: "Walking Lunges",
        equipment: "Dumbbells",
        sets: "3",
        reps: "12 each leg",
        targetMuscle: "Legs",
        notes: "Quads & glutes - step forward and down",
        videoUrl: "https://www.youtube.com/embed/D7KaRcUTQeE",
        muscleIllustration: "/images/muscle-diagrams/walking-lunges-muscles.png",
      },
      {
        name: "Leg Extensions",
        equipment: "Leg Extension Machine",
        sets: "3",
        reps: "12-15",
        targetMuscle: "Legs",
        notes: "Quadriceps isolation - squeeze at top",
        videoUrl: "https://www.youtube.com/embed/YyvSfVjQeL0",
        muscleIllustration: "/images/muscle-diagrams/leg-extensions-muscles.png",
      },
      {
        name: "Calf Raises",
        equipment: "Dumbbells",
        sets: "4",
        reps: "15-20",
        targetMuscle: "Legs",
        notes: "Calves focus - full range of motion",
        videoUrl: "https://www.youtube.com/embed/gwLzBJYoWlI",
        muscleIllustration: "/images/muscle-diagrams/calf-raises-muscles.png",

      },
    ],
  },
]

function WorkoutScheduler() {
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set())
  const [activeDay, setActiveDay] = useState("Warmup")
  const [hiddenVideos, setHiddenVideos] = useState<Set<string>>(new Set())
  const [openMuscleMap, setOpenMuscleMap] = useState<string | null>(null)
  const tabsScrollRef = useRef<HTMLDivElement>(null)

  // Load from localStorage on component mount
  useEffect(() => {
    const savedDay = localStorage.getItem('workout-selected-day')

    if (savedDay) {
      setActiveDay(savedDay)
    }
  }, [])

  // Save to localStorage when activeDay changes
  const handleDayChange = (day: string) => {
    setActiveDay(day)
    localStorage.setItem('workout-selected-day', day)
  }

  const getMuscleGroupColors = (muscle: string) => {
    switch (muscle) {
      case "Chest":
        return {
          card: "bg-blue-50",
          shadow: "shadow-[20px_20px_60px_#bfdbfe,-20px_-20px_60px_#ffffff]",
          icon: "text-blue-500",
          gradient: "from-blue-400 via-blue-500 to-blue-600",
          subtitle: "Build upper body strength"
        }
      case "Triceps":
        return {
          card: "bg-indigo-50",
          shadow: "shadow-[20px_20px_60px_#c7d2fe,-20px_-20px_60px_#ffffff]",
          icon: "text-indigo-500",
          gradient: "from-indigo-400 via-indigo-500 to-purple-600",
          subtitle: "Sculpt your arms"
        }
      case "Back":
        return {
          card: "bg-green-50",
          shadow: "shadow-[20px_20px_60px_#bbf7d0,-20px_-20px_60px_#ffffff]",
          icon: "text-green-500",
          gradient: "from-green-400 via-green-500 to-emerald-600",
          subtitle: "Strengthen your foundation"
        }
      case "Biceps":
        return {
          card: "bg-emerald-50",
          shadow: "shadow-[20px_20px_60px_#a7f3d0,-20px_-20px_60px_#ffffff]",
          icon: "text-emerald-500",
          gradient: "from-emerald-400 via-emerald-500 to-teal-600",
          subtitle: "Power up your pulls"
        }
      case "Shoulders":
        return {
          card: "bg-orange-50",
          shadow: "shadow-[20px_20px_60px_#fed7aa,-20px_-20px_60px_#ffffff]",
          icon: "text-orange-500",
          gradient: "from-orange-400 via-orange-500 to-red-500",
          subtitle: "Build broad shoulders"
        }
      case "Abs/Core":
        return {
          card: "bg-purple-50",
          shadow: "shadow-[20px_20px_60px_#ddd6fe,-20px_-20px_60px_#ffffff]",
          icon: "text-purple-500",
          gradient: "from-purple-400 via-purple-500 to-pink-500",
          subtitle: "Strengthen your core"
        }
      case "Legs":
        return {
          card: "bg-red-50",
          shadow: "shadow-[20px_20px_60px_#fecaca,-20px_-20px_60px_#ffffff]",
          icon: "text-red-500",
          gradient: "from-red-400 via-red-500 to-rose-600",
          subtitle: "Power through leg day"
        }
      default:
        return {
          card: "bg-white",
          shadow: "shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff]",
          icon: "text-yellow-500",
          gradient: "from-yellow-400 via-yellow-500 to-orange-500",
          subtitle: "Get stronger today"
        }
    }
  }

  const toggleExercise = (dayIndex: number, exerciseIndex: number) => {
    const key = `${dayIndex}-${exerciseIndex}`
    const newCompleted = new Set(completedExercises)
    if (newCompleted.has(key)) {
      newCompleted.delete(key)
    } else {
      newCompleted.add(key)
    }
    setCompletedExercises(newCompleted)
  }

  const toggleVideo = (exerciseKey: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const newHidden = new Set(hiddenVideos)
    if (newHidden.has(exerciseKey)) {
      newHidden.delete(exerciseKey)
    } else {
      newHidden.add(exerciseKey)
    }
    setHiddenVideos(newHidden)
  }

  const getWeekSchedule = () => {
    return [
      { day: "Sunday", workout: workoutPlan[0] },
      { day: "Monday", workout: workoutPlan[1] },
      { day: "Tuesday", workout: workoutPlan[2] },
      { day: "Wednesday", workout: workoutPlan[0] },
      { day: "Thursday", workout: workoutPlan[1] },
      { day: "Friday", workout: workoutPlan[3] },
      { day: "Saturday", workout: null },
    ]
  }

  const mapDayToWorkout = (day: string) => {
    switch (day) {
      case "Wednesday":
        return "Sunday"
      case "Thursday":
        return "Monday"
      case "Friday":
        return "Friday"
      default:
        return day
    }
  }

  const scrollToActiveTab = (tabValue: string) => {
    if (tabsScrollRef.current) {
      const activeTab = tabsScrollRef.current.querySelector(`[data-state="active"]`) as HTMLElement
      if (activeTab) {
        const container = tabsScrollRef.current
        const containerRect = container.getBoundingClientRect()
        const tabRect = activeTab.getBoundingClientRect()

        const scrollLeft = tabRect.left - containerRect.left + container.scrollLeft - (containerRect.width / 2) + (tabRect.width / 2)

        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        })
      }
    }
  }

  const handleDayClick = (day: string) => {
    const workoutDay = mapDayToWorkout(day)
    handleDayChange(workoutDay)
    // Small delay to ensure the tab state is updated before scrolling
    setTimeout(() => scrollToActiveTab(workoutDay), 100)
  }

  useEffect(() => {
    // Scroll to active tab when activeDay changes
    setTimeout(() => scrollToActiveTab(activeDay), 100)
  }, [activeDay])

  const getMuscleActivation = (exerciseName: string, targetMuscle: string) => {
    const activationMap: { [key: string]: { primary: string[], secondary: string[] } } = {
      // Chest exercises
      "Barbell Bench Press": { primary: ["Pectorals", "Anterior Deltoids"], secondary: ["Triceps", "Serratus Anterior"] },
      "Incline Barbell Press": { primary: ["Upper Pectorals", "Anterior Deltoids"], secondary: ["Triceps", "Serratus Anterior"] },
      "Flat Barbell Bench Press": { primary: ["Middle Pectorals", "Anterior Deltoids"], secondary: ["Triceps", "Serratus Anterior"] },
      "Decline Barbell Press": { primary: ["Lower Pectorals", "Anterior Deltoids"], secondary: ["Triceps", "Serratus Anterior"] },
      "Incline Dumbbell Flyes": { primary: ["Upper Pectorals"], secondary: ["Anterior Deltoids", "Serratus Anterior"] },
      "Flat Dumbbell Flyes": { primary: ["Middle Pectorals"], secondary: ["Anterior Deltoids", "Serratus Anterior"] },

      // Triceps exercises
      "Dips": { primary: ["Triceps", "Lower Pectorals"], secondary: ["Anterior Deltoids", "Rhomboids"] },
      "Close-Grip Bench Press": { primary: ["Triceps", "Inner Pectorals"], secondary: ["Anterior Deltoids"] },
      "Overhead Dumbbell Extension": { primary: ["Triceps Long Head"], secondary: ["Triceps Lateral Head", "Core"] },
      "Diamond Push-ups": { primary: ["Triceps", "Inner Pectorals"], secondary: ["Anterior Deltoids", "Core"] },

      // Back exercises
      "Pull-ups": { primary: ["Latissimus Dorsi", "Rhomboids"], secondary: ["Biceps", "Middle Trapezius", "Rear Deltoids"] },
      "Wide-Grip Pull-ups": { primary: ["Latissimus Dorsi", "Teres Major"], secondary: ["Biceps", "Rhomboids"] },
      "Close-Grip Pull-ups": { primary: ["Middle Trapezius", "Rhomboids"], secondary: ["Latissimus Dorsi", "Biceps"] },
      "Lat Pulldown": { primary: ["Latissimus Dorsi"], secondary: ["Biceps", "Rhomboids", "Middle Trapezius"] },
      "Wide-Grip Lat Pulldown": { primary: ["Latissimus Dorsi", "Teres Major"], secondary: ["Biceps", "Rhomboids"] },
      "Barbell Rows": { primary: ["Middle Trapezius", "Rhomboids"], secondary: ["Latissimus Dorsi", "Biceps", "Rear Deltoids"] },
      "Bent-Over Barbell Rows": { primary: ["Middle Trapezius", "Rhomboids"], secondary: ["Latissimus Dorsi", "Biceps", "Rear Deltoids"] },
      "T-Bar Rows": { primary: ["Middle Trapezius", "Rhomboids"], secondary: ["Latissimus Dorsi", "Biceps"] },
      "Cable Rows": { primary: ["Middle Trapezius", "Rhomboids"], secondary: ["Latissimus Dorsi", "Biceps"] },
      "Cable Rows (Low)": { primary: ["Lower Latissimus Dorsi", "Rhomboids"], secondary: ["Middle Trapezius", "Biceps"] },

      // Biceps exercises
      "Barbell Curls": { primary: ["Biceps Brachii"], secondary: ["Brachialis", "Brachioradialis"] },
      "Incline Dumbbell Curls": { primary: ["Biceps Long Head"], secondary: ["Biceps Short Head", "Brachialis"] },
      "Hammer Curls": { primary: ["Brachialis", "Brachioradialis"], secondary: ["Biceps Long Head"] },
      "Concentration Curls": { primary: ["Biceps Short Head"], secondary: ["Brachialis"] },

      // Shoulder exercises
      "Overhead Press": { primary: ["Anterior Deltoids", "Medial Deltoids"], secondary: ["Triceps", "Upper Trapezius"] },
      "Dumbbell Shoulder Press": { primary: ["Anterior Deltoids", "Medial Deltoids"], secondary: ["Triceps", "Upper Trapezius"] },
      "Lateral Raises": { primary: ["Medial Deltoids"], secondary: ["Anterior Deltoids", "Upper Trapezius"] },
      "Front Raises": { primary: ["Anterior Deltoids"], secondary: ["Medial Deltoids", "Upper Pectorals"] },
      "Rear Delt Flyes": { primary: ["Posterior Deltoids"], secondary: ["Middle Trapezius", "Rhomboids"] },

      // Core exercises
      "Plank": { primary: ["Rectus Abdominis", "Transverse Abdominis"], secondary: ["Obliques", "Erector Spinae"] },
      "Ab Wheel Rollouts": { primary: ["Rectus Abdominis", "Transverse Abdominis"], secondary: ["Obliques", "Latissimus Dorsi"] },
      "Russian Twists": { primary: ["Obliques"], secondary: ["Rectus Abdominis", "Transverse Abdominis"] },
      "Dead Bug": { primary: ["Transverse Abdominis", "Multifidus"], secondary: ["Rectus Abdominis", "Obliques"] },
      "Mountain Climbers": { primary: ["Rectus Abdominis", "Hip Flexors"], secondary: ["Obliques", "Shoulders"] },
      "Hanging Knee Raises": { primary: ["Lower Rectus Abdominis", "Hip Flexors"], secondary: ["Obliques"] },
      "Side Plank": { primary: ["Obliques", "Quadratus Lumborum"], secondary: ["Transverse Abdominis", "Medial Deltoids"] },
      "Bicycle Crunches": { primary: ["Rectus Abdominis", "Obliques"], secondary: ["Hip Flexors"] },

      // Leg exercises
      "Barbell Squats": { primary: ["Quadriceps", "Glutes"], secondary: ["Hamstrings", "Calves", "Core"] },
      "Leg Press": { primary: ["Quadriceps", "Glutes"], secondary: ["Hamstrings", "Calves"] },
      "Romanian Deadlifts": { primary: ["Hamstrings", "Glutes"], secondary: ["Erector Spinae", "Quadriceps"] },
      "Walking Lunges": { primary: ["Quadriceps", "Glutes"], secondary: ["Hamstrings", "Calves", "Core"] },
      "Leg Extensions": { primary: ["Quadriceps"], secondary: [] },
      "Calf Raises": { primary: ["Calves"], secondary: ["Soleus"] },

      // Warmup exercises
      "Jumping Jacks": { primary: ["Full Body"], secondary: ["Cardiovascular System"] },
      "Push-ups": { primary: ["Pectorals", "Triceps"], secondary: ["Anterior Deltoids", "Core"] },
      "Bodyweight Squats": { primary: ["Quadriceps", "Glutes"], secondary: ["Hamstrings", "Calves"] },
      "Lunges": { primary: ["Quadriceps", "Glutes"], secondary: ["Hamstrings", "Calves", "Core"] },
      "Arm Circles": { primary: ["Deltoids"], secondary: ["Rotator Cuff"] },
      "High Knees": { primary: ["Hip Flexors", "Quadriceps"], secondary: ["Calves", "Core"] },
      "Butt Kicks": { primary: ["Hamstrings", "Glutes"], secondary: ["Calves"] },
      "Dynamic Stretching": { primary: ["Full Body Mobility"], secondary: ["Joint Preparation"] }
    }

    return activationMap[exerciseName] || { primary: [targetMuscle], secondary: [] }
  }

  return (
    <div className="relative">
      <ParticlesBackground />
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 relative z-20">
          <Card className="mb-10 bg-white shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] border-0 rounded-3xl">
            <CardHeader className="pb-4 sm:pb-6 px-4 sm:px-6">
              <CardTitle className="relative">
                <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 rounded-2xl shadow-[inset_8px_8px_16px_rgba(255,255,255,0.3),inset_-8px_-8px_16px_rgba(0,0,0,0.1)] text-white">
                  <div className="p-2 sm:p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <Clock className="h-5 w-5 sm:h-7 sm:w-7 text-white drop-shadow-sm" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-2xl font-bold tracking-wide drop-shadow-sm">Weekly Workout Schedule</h2>
                    <p className="text-xs sm:text-sm text-white/80 font-medium mt-1">Plan your fitness journey</p>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
                {getWeekSchedule().map((item, index) => {
                  const isActive = item.workout && (
                    activeDay === "Warmup" ||
                    activeDay === mapDayToWorkout(item.day)
                  )

                  return (
                    <div
                      key={index}
                      className={`p-3 sm:p-5 rounded-2xl text-center transition-all duration-300 select-none ${item.workout
                        ? isActive
                          ? "bg-yellow-100 text-yellow-800 cursor-pointer shadow-[inset_12px_12px_20px_#d4af37,inset_-12px_-12px_20px_#ffeb3b] border-2 border-yellow-300"
                          : "bg-gray-100 text-gray-800 cursor-pointer hover:scale-105 shadow-[inset_8px_8px_16px_#bebebe,inset_-8px_-8px_16px_#ffffff] hover:shadow-[inset_12px_12px_20px_#bebebe,inset_-12px_-12px_20px_#ffffff] hover:bg-yellow-50"
                        : "bg-gray-50 text-gray-400 border-2 border-dashed border-gray-300 shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff]"
                        }`}
                      onClick={() => item.workout && handleDayClick(item.day)}
                    >
                      <div className="font-bold text-sm sm:text-base mb-1 sm:mb-2">{item.day}</div>
                      <div className="text-xs sm:text-sm opacity-90 font-medium">
                        {item.workout ? item.workout.muscles.join(" & ") : "Rest Day"}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <h4 className="font-bold text-gray-800 text-lg sm:text-2xl">Select your Day or Exercise</h4>
          <Tabs value={activeDay} onValueChange={handleDayChange}>
            <div ref={tabsScrollRef} className="mb-10 bg-gray-100 p-4 rounded-3xl shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] border-0 select-none overflow-x-auto">
              <TabsList className="flex w-max min-w-full gap-3 bg-transparent p-0">
                <TabsTrigger
                  value="Warmup"
                  className="data-[state=active]:bg-yellow-400 data-[state=active]:text-white data-[state=active]:shadow-[inset_8px_8px_16px_#d4af37,inset_-8px_-8px_16px_#ffeb3b] rounded-2xl font-semibold text-gray-700 transition-all duration-200 select-none shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] hover:shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] py-4 px-6 text-sm whitespace-nowrap flex-shrink-0"
                >
                  Warmup
                </TabsTrigger>
                <TabsTrigger
                  value="Sunday"
                  className="data-[state=active]:bg-yellow-400 data-[state=active]:text-white data-[state=active]:shadow-[inset_8px_8px_16px_#d4af37,inset_-8px_-8px_16px_#ffeb3b] rounded-2xl font-semibold text-gray-700 transition-all duration-200 select-none shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] hover:shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] py-4 px-6 text-sm whitespace-nowrap flex-shrink-0"
                >
                  Chest & Triceps
                </TabsTrigger>
                <TabsTrigger
                  value="Monday"
                  className="data-[state=active]:bg-yellow-400 data-[state=active]:text-white data-[state=active]:shadow-[inset_8px_8px_16px_#d4af37,inset_-8px_-8px_16px_#ffeb3b] rounded-2xl font-semibold text-gray-700 transition-all duration-200 select-none shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] hover:shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] py-4 px-6 text-sm whitespace-nowrap flex-shrink-0"
                >
                  Back & Biceps
                </TabsTrigger>
                <TabsTrigger
                  value="Tuesday"
                  className="data-[state=active]:bg-yellow-400 data-[state=active]:text-white data-[state=active]:shadow-[inset_8px_8px_16px_#d4af37,inset_-8px_-8px_16px_#ffeb3b] rounded-2xl font-semibold text-gray-700 transition-all duration-200 select-none shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] hover:shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] py-4 px-6 text-sm whitespace-nowrap flex-shrink-0"
                >
                  Shoulders & Abs
                </TabsTrigger>
                <TabsTrigger
                  value="Friday"
                  className="data-[state=active]:bg-yellow-400 data-[state=active]:text-white data-[state=active]:shadow-[inset_8px_8px_16px_#d4af37,inset_-8px_-8px_16px_#ffeb3b] rounded-2xl font-semibold text-gray-700 transition-all duration-200 select-none shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] hover:shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] py-4 px-6 text-sm whitespace-nowrap flex-shrink-0"
                >
                  Shoulders & Legs
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="Warmup">
              <Card className="bg-white shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] border-0 rounded-3xl">
                <CardHeader className="pb-4 sm:pb-6 px-4 sm:px-6">
                  <CardTitle className="relative">
                    <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 rounded-2xl shadow-[inset_8px_8px_16px_rgba(255,255,255,0.3),inset_-8px_-8px_16px_rgba(0,0,0,0.1)] text-white">
                      <div className="p-2 sm:p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                        <Zap className="h-5 w-5 sm:h-7 sm:w-7 text-white drop-shadow-sm" />
                      </div>
                      <div>
                        <h2 className="text-lg sm:text-2xl font-bold tracking-wide drop-shadow-sm">Warmup Exercises</h2>
                        <p className="text-xs sm:text-sm text-white/80 font-medium mt-1">Prepare your body for action</p>
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-8 px-4 sm:px-6">
                  {warmupExercises.map((exercise, exerciseIndex) => {
                    const isCompleted = completedExercises.has(`warmup-${exerciseIndex}`)
                    const exerciseKey = `warmup-${exerciseIndex}`
                    const isVideoHidden = hiddenVideos.has(exerciseKey)

                    return (
                      <div
                        key={exerciseIndex}
                        className={`p-4 sm:p-8 rounded-3xl transition-all duration-300 cursor-pointer select-none ${isCompleted
                          ? "bg-yellow-50 shadow-[inset_20px_20px_60px_#e6d700,inset_-20px_-20px_60px_#ffff00] border-2 border-yellow-200"
                          : "bg-gray-50 shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] hover:shadow-[inset_8px_8px_16px_#bebebe,inset_-8px_-8px_16px_#ffffff] hover:bg-gray-100"
                          }`}
                        onClick={() => {
                          const key = `warmup-${exerciseIndex}`
                          const newCompleted = new Set(completedExercises)
                          if (newCompleted.has(key)) {
                            newCompleted.delete(key)
                          } else {
                            newCompleted.add(key)
                          }
                          setCompletedExercises(newCompleted)
                        }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6 select-none">
                              <h4 className="font-bold text-gray-800 text-lg sm:text-2xl">{exercise.name}</h4>
                              {isCompleted && <CheckCircle2 className="h-5 w-5 sm:h-7 sm:w-7 text-yellow-500" />}
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-10 w-10 p-0 text-gray-600 hover:text-gray-800 ml-auto rounded-2xl select-none shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] hover:shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] bg-gray-100"
                                onClick={(e) => toggleVideo(exerciseKey, e)}
                                title={isVideoHidden ? "Show video" : "Hide video"}
                              >
                                <EyeOff className="h-5 w-5" />
                              </Button>
                            </div>
                            {!isVideoHidden && (
                              <div className="mb-8">
                                <LazyVideo videoUrl={exercise.videoUrl} title={`${exercise.name} demonstration`} />
                              </div>
                            )}
                            <div className="space-y-6 mb-8">
                              <div className="flex items-center gap-4 select-none">
                                <Dumbbell className="h-6 w-6 text-gray-600" />
                                <span className="text-lg text-gray-700 font-semibold">{exercise.equipment}</span>
                              </div>
                              <div className="flex gap-4 flex-wrap select-none">
                                <Badge
                                  variant="outline"
                                  className="text-base bg-gray-100 text-gray-700 border-0 px-4 py-2 font-semibold select-none shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] rounded-2xl"
                                >
                                  {exercise.sets} sets
                                </Badge>
                                <Badge
                                  variant="outline"
                                  className="text-base bg-yellow-100 text-yellow-700 border-0 px-4 py-2 font-semibold select-none shadow-[8px_8px_16px_#d4af37,-8px_-8px_16px_#ffeb3b] rounded-2xl"
                                >
                                  {exercise.reps} reps
                                </Badge>
                              </div>
                              {exercise.notes && (
                                <div className="bg-yellow-50 p-6 rounded-3xl shadow-[inset_20px_20px_60px_#e6d700,inset_-20px_-20px_60px_#ffff00] border-2 border-yellow-200 select-none">
                                  <div className="flex items-start gap-4 select-none">
                                    <Target className="h-6 w-6 text-yellow-600 mt-1 flex-shrink-0" />
                                    <p className="text-lg font-bold text-gray-800 leading-relaxed">{exercise.notes}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="mt-6 pt-6 border-t-2 border-gray-200 select-none">
                              <Button
                                variant="ghost"
                                onClick={() => setOpenMuscleMap(openMuscleMap === exerciseKey ? null : exerciseKey)}
                                className="w-full justify-between p-0 h-auto hover:bg-transparent"
                              >
                                <div className="flex items-center gap-3 mb-4 select-none">
                                  <Target className="h-6 w-6 text-orange-600" />
                                  <h5 className="text-lg sm:text-xl font-bold text-gray-800">Muscle Activation</h5>
                                </div>
                                {openMuscleMap === exerciseKey ? (
                                  <ChevronUp className="h-5 w-5 text-gray-600" />
                                ) : (
                                  <ChevronDown className="h-5 w-5 text-gray-600" />
                                )}
                              </Button>

                              {openMuscleMap === exerciseKey && (
                                (() => {
                                  const activation = getMuscleActivation(exercise.name, exercise.targetMuscle)
                                  return (
                                    <div className="bg-gradient-to-br from-orange-50 to-red-50 p-4 sm:p-6 rounded-2xl shadow-[inset_12px_12px_24px_rgba(251,146,60,0.1),inset_-12px_-12px_24px_rgba(255,255,255,0.8)] border border-orange-100">
                                      <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
                                        <div>
                                          <MuscleActivationMap
                                            primaryMuscles={activation.primary.map(m => m.toLowerCase().replace(/ /g, '-'))}
                                            secondaryMuscles={activation.secondary.map(m => m.toLowerCase().replace(/ /g, '-'))}
                                            colors={{ icon: "text-orange-500" }}
                                          />
                                        </div>
                                        <div className="space-y-4">
                                          <div>
                                            <h6 className="text-sm font-bold text-orange-800 mb-3 flex items-center gap-2">
                                              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                              Primary Muscles
                                            </h6>
                                            <div className="flex flex-wrap gap-2">
                                              {activation.primary.map((muscle, idx) => (
                                                <span key={idx} className="px-3 py-1.5 bg-orange-500 text-white text-xs sm:text-sm font-semibold rounded-full shadow-sm">
                                                  {muscle}
                                                </span>
                                              ))}
                                            </div>
                                          </div>
                                          {activation.secondary.length > 0 && (
                                            <div>
                                              <h6 className="text-sm font-bold text-orange-700 mb-3 flex items-center gap-2">
                                                <div className="w-3 h-3 bg-orange-300 rounded-full"></div>
                                                Secondary Muscles
                                              </h6>
                                              <div className="flex flex-wrap gap-2">
                                                {activation.secondary.map((muscle, idx) => (
                                                  <span key={idx} className="px-3 py-1.5 bg-orange-200 text-orange-800 text-xs sm:text-sm font-medium rounded-full shadow-sm">
                                                    {muscle}
                                                  </span>
                                                ))}
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  )
                                })()
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </TabsContent>

            {workoutPlan.map((workout, dayIndex) => (
              <TabsContent key={workout.day} value={workout.day}>
                <div className="grid gap-4 sm:gap-6 lg:gap-10 lg:grid-cols-2">
                  {workout.muscles.map((muscle) => {
                    const colors = getMuscleGroupColors(muscle)
                    return (
                      <Card
                        key={muscle}
                        className={`${colors.card} ${colors.shadow} border-0 rounded-3xl`}
                      >
                        <CardHeader className="pb-4 sm:pb-6 px-4 sm:px-6">
                          <CardTitle className="relative">
                            <div className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gradient-to-r ${colors.gradient} rounded-xl shadow-[inset_6px_6px_12px_rgba(255,255,255,0.3),inset_-6px_-6px_12px_rgba(0,0,0,0.1)] text-white`}>
                              <div className="p-1.5 sm:p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                <Target className="h-4 w-4 sm:h-6 sm:w-6 text-white drop-shadow-sm" />
                              </div>
                              <div>
                                <h3 className="text-base sm:text-xl font-bold tracking-wide drop-shadow-sm">{muscle} Exercises</h3>
                                <p className="text-xs text-white/80 font-medium mt-0.5">{colors.subtitle}</p>
                              </div>
                            </div>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 sm:space-y-8 px-4 sm:px-6">
                          {workout.exercises
                            .filter((ex) => ex.targetMuscle === muscle)
                            .map((exercise, exerciseIndex) => {
                              const globalIndex = workout.exercises.findIndex((ex) => ex === exercise)
                              const isCompleted = completedExercises.has(`${dayIndex}-${globalIndex}`)
                              const exerciseKey = `${dayIndex}-${globalIndex}`
                              const isVideoHidden = hiddenVideos.has(exerciseKey)

                              return (
                                <div
                                  key={exerciseIndex}
                                  className={`p-4 sm:p-8 rounded-3xl transition-all duration-300 cursor-pointer select-none ${isCompleted
                                    ? "bg-yellow-50 shadow-[inset_20px_20px_60px_#e6d700,inset_-20px_-20px_60px_#ffff00] border-2 border-yellow-200"
                                    : "bg-gray-50 shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] hover:shadow-[inset_8px_8px_16px_#bebebe,inset_-8px_-8px_16px_#ffffff] hover:bg-gray-100"
                                    }`}
                                  onClick={() => toggleExercise(dayIndex, globalIndex)}
                                >
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6 select-none">
                                        <h4 className="font-bold text-gray-800 text-lg sm:text-2xl">{exercise.name}</h4>
                                        {isCompleted && <CheckCircle2 className="h-5 w-5 sm:h-7 sm:w-7 text-yellow-500" />}
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          className="h-10 w-10 p-0 text-gray-600 hover:text-gray-800 ml-auto rounded-2xl select-none shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] hover:shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] bg-gray-100"
                                          onClick={(e) => toggleVideo(exerciseKey, e)}
                                          title={isVideoHidden ? "Show video" : "Hide video"}
                                        >
                                          <EyeOff className="h-5 w-5" />
                                        </Button>
                                      </div>
                                      {!isVideoHidden && (
                                        <div className="mb-8">
                                          <LazyVideo
                                            videoUrl={exercise.videoUrl}
                                            title={`${exercise.name} demonstration`}
                                          />
                                        </div>
                                      )}
                                      <div className="space-y-6 mb-8">
                                        <div className="flex items-center gap-4 select-none">
                                          <Dumbbell className="h-6 w-6 text-gray-600" />
                                          <span className="text-lg text-gray-700 font-semibold">
                                            {exercise.equipment}
                                          </span>
                                        </div>
                                        <div className="flex gap-4 flex-wrap select-none">
                                          <Badge
                                            variant="outline"
                                            className="text-base bg-gray-100 text-gray-700 border-0 px-4 py-2 font-semibold select-none shadow-[8px_8px_16px_#bebebe,-8px_-8px_16px_#ffffff] rounded-2xl"
                                          >
                                            {exercise.sets} sets
                                          </Badge>
                                          <Badge
                                            variant="outline"
                                            className="text-base bg-yellow-100 text-yellow-700 border-0 px-4 py-2 font-semibold select-none shadow-[8px_8px_16px_#d4af37,-8px_-8px_16px_#ffeb3b] rounded-2xl"
                                          >
                                            {exercise.reps} reps
                                          </Badge>
                                        </div>
                                        {exercise.notes && (
                                          <div className="bg-yellow-50 p-6 rounded-3xl shadow-[inset_20px_20px_60px_#e6d700,inset_-20px_-20px_60px_#ffff00] border-2 border-yellow-200 select-none">
                                            <div className="flex items-start gap-4 select-none">
                                              <Target className="h-6 w-6 text-yellow-600 mt-1 flex-shrink-0" />
                                              <p className="text-lg font-bold text-gray-800 leading-relaxed">
                                                {exercise.notes}
                                              </p>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                      <div className="mt-6 pt-6 border-t-2 border-gray-200 select-none">
                                        <Button
                                          variant="ghost"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setOpenMuscleMap(openMuscleMap === exerciseKey ? null : exerciseKey)
                                          }}
                                          className="w-full justify-between p-0 h-auto hover:bg-transparent"
                                        >
                                          <div className="flex items-center gap-3 mb-4 select-none">
                                            <Target className={`h-6 w-6 ${colors.icon.replace('-500', '-600')}`} />
                                            <h5 className="text-lg sm:text-xl font-bold text-gray-800">Muscle Activation</h5>
                                          </div>
                                          {openMuscleMap === exerciseKey ? (
                                            <ChevronUp className="h-5 w-5 text-gray-600" />
                                          ) : (
                                            <ChevronDown className="h-5 w-5 text-gray-600" />
                                          )}
                                        </Button>

                                        {openMuscleMap === exerciseKey && (
                                          (() => {
                                            const activation = getMuscleActivation(exercise.name, exercise.targetMuscle)
                                            const primaryColor = colors.icon.replace('text-', '').replace('-500', '')
                                            return (
                                              <div className="bg-white/50 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-[inset_8px_8px_16px_rgba(0,0,0,0.05),inset_-8px_-8px_16px_rgba(255,255,255,0.8)] border border-gray-200">
                                                <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
                                                  <div>
                                                    <MuscleActivationMap
                                                      primaryMuscles={activation.primary.map(m => m.toLowerCase().replace(/ /g, '-'))}
                                                      secondaryMuscles={activation.secondary.map(m => m.toLowerCase().replace(/ /g, '-'))}
                                                      colors={colors}
                                                    />
                                                  </div>
                                                  <div className="space-y-4">
                                                    <div>
                                                      <h6 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                                                        <div className={`w-3 h-3 ${colors.icon.replace('text-', 'bg-')} rounded-full`}></div>
                                                        Primary Muscles
                                                      </h6>
                                                      <div className="flex flex-wrap gap-2">
                                                        {activation.primary.map((muscle, idx) => (
                                                          <span key={idx} className={`px-3 py-1.5 ${colors.icon.replace('text-', 'bg-')} text-white text-xs sm:text-sm font-semibold rounded-full shadow-sm`}>
                                                            {muscle}
                                                          </span>
                                                        ))}
                                                      </div>
                                                    </div>
                                                    {activation.secondary.length > 0 && (
                                                      <div>
                                                        <h6 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                                                          <div className={`w-3 h-3 ${colors.icon.replace('text-', 'bg-').replace('-500', '-300')} rounded-full`}></div>
                                                          Secondary Muscles
                                                        </h6>
                                                        <div className="flex flex-wrap gap-2">
                                                          {activation.secondary.map((muscle, idx) => (
                                                            <span key={idx} className={`px-3 py-1.5 ${colors.icon.replace('text-', 'bg-').replace('-500', '-200')} ${colors.icon.replace('-500', '-800')} text-xs sm:text-sm font-medium rounded-full shadow-sm`}>
                                                              {muscle}
                                                            </span>
                                                          ))}
                                                        </div>
                                                      </div>
                                                    )}
                                                  </div>
                                                </div>
                                              </div>
                                            )
                                          })()
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )
                            })}
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <Card className="mt-6 sm:mt-10 bg-white shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] border-0 rounded-3xl">
            <CardHeader className="px-4 sm:px-6">
              <CardTitle className="relative">
                <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-gradient-to-r from-green-400 via-teal-500 to-cyan-500 rounded-2xl shadow-[inset_8px_8px_16px_rgba(255,255,255,0.3),inset_-8px_-8px_16px_rgba(0,0,0,0.1)] text-white">
                  <div className="p-2 sm:p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <CheckCircle2 className="h-5 w-5 sm:h-7 sm:w-7 text-white drop-shadow-sm" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-2xl font-bold tracking-wide drop-shadow-sm">Today&apos;s Progress</h2>
                    <p className="text-xs sm:text-sm text-white/80 font-medium mt-1">Track your achievements</p>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <span className="text-gray-700 text-lg sm:text-xl font-semibold">
                  Completed: {completedExercises.size} exercises
                </span>
                <Button
                  onClick={() => setCompletedExercises(new Set())}
                  variant="outline"
                  size="lg"
                  className="bg-yellow-100 border-0 text-yellow-700 font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-2xl select-none shadow-[20px_20px_60px_#d4af37,-8px_-20px_60px_#ffeb3b] hover:shadow-[inset_8px_8px_16px_#d4af37,inset_-8px_-8px_16px_#ffeb3b] hover:bg-yellow-200 transition-all duration-300 text-sm sm:text-base"
                >
                  Reset Progress
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default WorkoutScheduler
export { WorkoutScheduler }
