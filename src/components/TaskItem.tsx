import type { Task } from '../types'

interface Props {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TaskItem({ task, onToggle, onDelete }: Props) {
  return (
    <li className="group flex items-center gap-3 px-2 py-2.5 hover:bg-slate-50 rounded-xl">
      <input
        type="checkbox"
        id={`task-${task.id}`}
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="w-5 h-5 accent-blue-500 cursor-pointer flex-shrink-0"
      />
      <label
        htmlFor={`task-${task.id}`}
        className={`flex-1 text-sm cursor-pointer select-none ${
          task.completed
            ? 'line-through text-slate-300'
            : 'text-slate-700'
        }`}
      >
        {task.text}
      </label>
      <button
        type="button"
        onClick={() => onDelete(task.id)}
        aria-label={`Delete ${task.text}`}
        className="opacity-0 group-hover:opacity-100 focus:opacity-100 p-1 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all duration-150"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
          <path d="M10 11v6M14 11v6" />
          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
        </svg>
      </button>
    </li>
  )
}
