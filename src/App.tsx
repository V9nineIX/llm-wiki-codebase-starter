import { useState } from 'react'
import { useTodos } from './hooks/useTodos'
import { AddTaskInput } from './components/AddTaskInput'
import { TaskItem } from './components/TaskItem'
import { FilterBar } from './components/FilterBar'
import type { Filter } from './types'

export default function App() {
  const { tasks, addTask, toggleTask, deleteTask } = useTodos()
  const [filter, setFilter] = useState<Filter>('all')

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 flex items-start justify-center pt-16 px-4">
      <div className="bg-white rounded-2xl shadow-xl shadow-blue-100/50 p-6 sm:p-8 max-w-xl mx-auto w-full">
        <header className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
              <line x1="9" y1="12" x2="15" y2="12" />
              <line x1="9" y1="16" x2="13" y2="16" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-slate-800">Tasks</h1>
        </header>

        <AddTaskInput onAddTask={addTask} />

        <FilterBar filter={filter} onChange={setFilter} />

        {/* min-h prevents layout shift when the filtered list is empty */}
        <ul className="mt-4 space-y-0.5 min-h-[4rem]" aria-label="Task list">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))}
          {filteredTasks.length === 0 && (
            <li className="text-center text-slate-400 text-sm py-4" aria-live="polite">
              {filter === 'all' ? 'No tasks yet — add one above!' : `No ${filter} tasks.`}
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}
