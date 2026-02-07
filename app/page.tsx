import TodoForm from "@/components/todo-form"
import TodoList from "@/components/todo-list"
import { getTodos } from "@/actions"

export const dynamic = "force-dynamic" // ← this disables static prerendering for this page

export default async function Home() {
  const todos = await getTodos()

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
            Flow<span className="text-indigo-600 dark:text-indigo-400">.</span>
          </h1>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-400 font-medium">
            Clear your mind. Own your day.
          </p>
        </header>

        {/* Form */}
        <div className="mb-12">
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700/40 ring-1 ring-black/5 dark:ring-white/5">
            <TodoForm />
          </div>
        </div>

        {/* List */}
        <div className="bg-white/60 dark:bg-gray-800/50 backdrop-blur-lg p-6 md:p-8 rounded-3xl shadow-xl border border-white/40 dark:border-gray-700/30">
          <TodoList initialTodos={todos} />
        </div>
      </div>
    </div>
  )
}
