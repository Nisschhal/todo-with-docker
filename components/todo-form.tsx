"use client"

import { useRef, useTransition } from "react"
import { createTodo } from "@/actions"
import { Plus, Loader2 } from "lucide-react"

export default function TodoForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [isPending, startTransition] = useTransition()

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      await createTodo(formData)
      formRef.current?.reset()
    })
  }

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      className="flex flex-col sm:flex-row gap-4"
    >
      <input
        name="title"
        type="text"
        placeholder="What needs to get done today?"
        className="flex-1 px-5 py-4 rounded-2xl border border-gray-200 dark:border-gray-600 bg-white/80 dark:bg-gray-900/80 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:focus:ring-indigo-400/50 text-lg placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all"
        required
        minLength={2}
        disabled={isPending}
      />
      <button
        type="submit"
        disabled={isPending}
        className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 min-w-[140px]"
      >
        {isPending ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Plus className="w-5 h-5" />
        )}
        Add Task
      </button>
    </form>
  )
}
