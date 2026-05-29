import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { TaskItem } from './TaskItem'
import type { Task } from '../types'

const incompleteTask: Task = { id: 'abc-1', text: 'Buy milk', completed: false }
const completedTask: Task = { id: 'abc-2', text: 'Buy eggs', completed: true }

describe('TaskItem', () => {
  it('renders the task text', () => {
    render(<TaskItem task={incompleteTask} onToggle={vi.fn()} onDelete={vi.fn()} />)
    expect(screen.getByText('Buy milk')).toBeInTheDocument()
  })

  it('renders an unchecked checkbox for an incomplete task', () => {
    render(<TaskItem task={incompleteTask} onToggle={vi.fn()} onDelete={vi.fn()} />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
  })

  it('renders a checked checkbox for a completed task', () => {
    render(<TaskItem task={completedTask} onToggle={vi.fn()} onDelete={vi.fn()} />)
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('calls onToggle with the task id when the checkbox is clicked', async () => {
    const user = userEvent.setup()
    const onToggle = vi.fn()
    render(<TaskItem task={incompleteTask} onToggle={onToggle} onDelete={vi.fn()} />)
    await user.click(screen.getByRole('checkbox'))
    expect(onToggle).toHaveBeenCalledOnce()
    expect(onToggle).toHaveBeenCalledWith('abc-1')
  })

  it('applies line-through styling to a completed task text', () => {
    render(<TaskItem task={completedTask} onToggle={vi.fn()} onDelete={vi.fn()} />)
    const label = screen.getByText('Buy eggs')
    expect(label.className).toMatch(/line-through/)
  })

  it('does not apply line-through styling to an incomplete task', () => {
    render(<TaskItem task={incompleteTask} onToggle={vi.fn()} onDelete={vi.fn()} />)
    const label = screen.getByText('Buy milk')
    expect(label.className).not.toMatch(/line-through/)
  })

  it('applies muted colour class to completed task text (T-0015)', () => {
    render(<TaskItem task={completedTask} onToggle={vi.fn()} onDelete={vi.fn()} />)
    const label = screen.getByText('Buy eggs')
    expect(label.className).toMatch(/text-slate-300/)
  })

  it('does not apply muted colour to incomplete task text (T-0015)', () => {
    render(<TaskItem task={incompleteTask} onToggle={vi.fn()} onDelete={vi.fn()} />)
    const label = screen.getByText('Buy milk')
    expect(label.className).toMatch(/text-slate-700/)
  })

  it('renders a delete button', () => {
    render(<TaskItem task={incompleteTask} onToggle={vi.fn()} onDelete={vi.fn()} />)
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument()
  })

  it('calls onDelete with the task id when the delete button is clicked', async () => {
    const user = userEvent.setup()
    const onDelete = vi.fn()
    render(<TaskItem task={incompleteTask} onToggle={vi.fn()} onDelete={onDelete} />)
    await user.click(screen.getByRole('button', { name: /delete/i }))
    expect(onDelete).toHaveBeenCalledOnce()
    expect(onDelete).toHaveBeenCalledWith('abc-1')
  })
})
