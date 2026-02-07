"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/prisma" // create this file: lib/prisma.ts → export default new PrismaClient();

export type Todo = {
  id: string
  title: string
  completed: boolean
  createdAt: Date
  updatedAt: Date
}

export async function getTodos(): Promise<Todo[]> {
  return prisma.todo.findMany({
    orderBy: { createdAt: "desc" },
  })
}

export async function createTodo(formData: FormData) {
  const title = formData.get("title")?.toString().trim()
  if (!title || title.length < 2) return { error: "Title too short" }

  await prisma.todo.create({
    data: { title },
  })

  revalidatePath("/")
}

export async function toggleTodo(id: string, completed: boolean) {
  await prisma.todo.update({
    where: { id },
    data: { completed: !completed },
  })

  revalidatePath("/")
}

export async function deleteTodo(id: string) {
  await prisma.todo.delete({ where: { id } })
  revalidatePath("/")
}

export async function updateTodo(id: string, title: string) {
  const trimmed = title.trim()
  if (trimmed.length < 2) return

  await prisma.todo.update({
    where: { id },
    data: { title: trimmed },
  })

  revalidatePath("/")
}
