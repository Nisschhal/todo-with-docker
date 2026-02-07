"use client"

import { Todo } from "@/actions"
import { Check, Trash2, Pencil } from "lucide-react"
import { useState, useTransition } from "react"
import { updateTodo } from "@/actions"

type Props = {
  todo: Todo
  onToggle: () => void
  onDelete: () => void
  disabled: boolean
}

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  disabled,
}: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(todo.title)
  const [isPending, startTransition] = useTransition()

  const handleSave = () => {
    if (title.trim() === todo.title) {
      setIsEditing(false)
      return
    }

    startTransition(async () => {
      await updateTodo(todo.id, title)
      setIsEditing(false)
    })
  }

  return (
    <div
      className={`group flex items-center gap-4 p-5 rounded-2xl bg-white/80 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-100 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all duration-200 ${
        todo.completed ? "opacity-75" : ""
      } ${disabled ? "opacity-60 pointer-events-none" : ""}`}
    >
      <button
        onClick={onToggle}
        disabled={disabled || isPending}
        className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-colors ${
          todo.completed
            ? "bg-indigo-600 border-indigo-600 text-white"
            : "border-gray-300 dark:border-gray-500 hover:border-indigo-500"
        }`}
      >
        {todo.completed && <Check className="w-5 h-5" />}
      </button>

      {isEditing ? (
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          autoFocus
          className={`flex-1 bg-transparent outline-none text-lg font-medium dark:text-gray-100 ${isEditing && "border-b"}`}
        />
      ) : (
        <span
          className={`flex-1 text-lg font-medium ${
            todo.completed
              ? "line-through text-gray-500 dark:text-gray-400"
              : "text-gray-900 dark:text-gray-100"
          }`}
        >
          {todo.title}
        </span>
      )}

      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => setIsEditing(true)}
          disabled={disabled || isPending}
          className="p-2 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-colors"
        >
          <Pencil size={18} />
        </button>

        <button
          onClick={onDelete}
          disabled={disabled || isPending}
          className="p-2 text-gray-500 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  )
}
