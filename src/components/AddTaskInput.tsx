import { useRef, useState } from 'react'

interface Props {
  onAddTask: (text: string) => void
}

export function AddTaskInput({ onAddTask }: Props) {
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) return
    onAddTask(trimmed)
    setValue('')
    inputRef.current?.focus()
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add a task…"
        aria-label="New task"
        className="flex-1 bg-slate-50 focus:bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
      />
      <button
        type="submit"
        className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all duration-200"
      >
        Add
      </button>
    </form>
  )
}
