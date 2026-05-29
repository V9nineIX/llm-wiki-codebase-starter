import type { Task } from '../types'

export interface UseTodosReturn {
  tasks: Task[]
  addTask: (text: string) => void
  toggleTask: (id: string) => void
  deleteTask: (id: string) => void
}

export function useTodos(): UseTodosReturn
