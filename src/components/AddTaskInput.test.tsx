import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { AddTaskInput } from './AddTaskInput'

describe('AddTaskInput', () => {
  it('renders a text input with placeholder', () => {
    render(<AddTaskInput onAddTask={vi.fn()} />)
    expect(screen.getByPlaceholderText('Add a task…')).toBeInTheDocument()
  })

  it('renders a submit button with visible label', () => {
    render(<AddTaskInput onAddTask={vi.fn()} />)
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument()
  })

  it('calls onAddTask with trimmed text on Enter and clears the input', async () => {
    const user = userEvent.setup()
    const onAddTask = vi.fn()
    render(<AddTaskInput onAddTask={onAddTask} />)

    const input = screen.getByPlaceholderText('Add a task…')
    await user.type(input, '  Buy milk  ')
    await user.keyboard('{Enter}')

    expect(onAddTask).toHaveBeenCalledOnce()
    expect(onAddTask).toHaveBeenCalledWith('Buy milk')
    expect(input).toHaveValue('')
  })

  it('calls onAddTask with trimmed text on button click and clears the input', async () => {
    const user = userEvent.setup()
    const onAddTask = vi.fn()
    render(<AddTaskInput onAddTask={onAddTask} />)

    await user.type(screen.getByPlaceholderText('Add a task…'), 'Write tests')
    await user.click(screen.getByRole('button', { name: /add/i }))

    expect(onAddTask).toHaveBeenCalledOnce()
    expect(onAddTask).toHaveBeenCalledWith('Write tests')
    expect(screen.getByPlaceholderText('Add a task…')).toHaveValue('')
  })

  it('silently rejects whitespace-only input — onAddTask not called, input not cleared', async () => {
    const user = userEvent.setup()
    const onAddTask = vi.fn()
    render(<AddTaskInput onAddTask={onAddTask} />)

    const input = screen.getByPlaceholderText('Add a task…')
    await user.type(input, '   ')
    await user.keyboard('{Enter}')

    expect(onAddTask).not.toHaveBeenCalled()
    expect(input).toHaveValue('   ')
  })

  it('refocuses the input after a successful submission', async () => {
    const user = userEvent.setup()
    render(<AddTaskInput onAddTask={vi.fn()} />)

    const input = screen.getByPlaceholderText('Add a task…')
    await user.type(input, 'Some task')
    await user.keyboard('{Enter}')

    expect(input).toHaveFocus()
  })
})
