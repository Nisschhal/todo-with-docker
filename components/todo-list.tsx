"use client"

import { useOptimistic, useTransition } from "react"
import { Todo, toggleTodo, deleteTodo } from "@/actions"
import TodoItem from "./todo-item"

type Props = {
  initialTodos: Todo[]
}

export default function TodoList({ initialTodos }: Props) {
  const [optimisticTodos, setOptimisticTodos] = useOptimistic(
    initialTodos,
    // Updater: just replace with new array
    (_: Todo[], newTodos: Todo[]) => newTodos,
  )

  const [isPending, startTransition] = useTransition()

  const handleToggle = (id: string, currentCompleted: boolean) => {
    startTransition(async () => {
      const newTodos = optimisticTodos.map((t) =>
        t.id === id ? { ...t, completed: !currentCompleted } : t,
      )
      setOptimisticTodos(newTodos)

      await toggleTodo(id, currentCompleted)
    })
  }

  const handleDelete = (id: string) => {
    startTransition(async () => {
      const newTodos = optimisticTodos.filter((t) => t.id !== id)
      setOptimisticTodos(newTodos)

      await deleteTodo(id)
    })
  }

  return (
    <div className="space-y-4 mt-2">
      {optimisticTodos.length === 0 ? (
        <div className="text-center py-16 text-gray-500 dark:text-gray-400 italic">
          Nothing here yet — add your first task above ↑
        </div>
      ) : (
        optimisticTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={() => handleToggle(todo.id, todo.completed)}
            onDelete={() => handleDelete(todo.id)}
            disabled={isPending}
          />
        ))
      )}
    </div>
  )
}
