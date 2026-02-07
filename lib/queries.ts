import prisma from "./prisma"
import { Todo } from "@/types/todos"

export async function getTodos(): Promise<Todo[]> {
  return prisma.todo.findMany({
    orderBy: { createdAt: "desc" },
  })
}
