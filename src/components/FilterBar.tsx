import type { Filter } from '../types'

interface Props {
  filter: Filter
  onChange: (filter: Filter) => void
}

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
]

export function FilterBar({ filter, onChange }: Props) {
  return (
    <div role="group" aria-label="Filter tasks" className="flex gap-1 mt-4">
      {FILTERS.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          aria-pressed={filter === value}
          onClick={() => onChange(value)}
          className={
            filter === value
              ? 'flex-1 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md transition-all duration-200'
              : 'flex-1 py-2.5 text-sm rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-all duration-200'
          }
        >
          {label}
        </button>
      ))}
    </div>
  )
}
