import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import App from './App'

beforeEach(() => {
  vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null)
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {})
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('App — T-0002: addTask wiring', () => {
  it('renders the AddTaskInput field', () => {
    render(<App />)
    expect(screen.getByPlaceholderText('Add a task…')).toBeInTheDocument()
  })

  it('adds a task and shows it at the top of the list immediately', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.type(screen.getByPlaceholderText('Add a task…'), 'My first task')
    await user.click(screen.getByRole('button', { name: /add/i }))
    expect(screen.getByText('My first task')).toBeInTheDocument()
  })

  it('prepends new tasks — newest appears first', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByPlaceholderText('Add a task…'), 'First task')
    await user.click(screen.getByRole('button', { name: /add/i }))

    await user.type(screen.getByPlaceholderText('Add a task…'), 'Second task')
    await user.click(screen.getByRole('button', { name: /add/i }))

    const items = screen.getAllByRole('listitem')
    expect(within(items[0]).getByText('Second task')).toBeInTheDocument()
    expect(within(items[1]).getByText('First task')).toBeInTheDocument()
  })
})

describe('App — T-0007: toggleTask wiring', () => {
  it('marks a task completed when its checkbox is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.type(screen.getByPlaceholderText('Add a task…'), 'Toggle me')
    await user.click(screen.getByRole('button', { name: /add/i }))

    await user.click(screen.getByRole('checkbox'))

    expect(screen.getByRole('checkbox')).toBeChecked()
    expect(screen.getByText('Toggle me').className).toMatch(/line-through/)
  })
})

describe('App — T-0009: deleteTask wiring', () => {
  it('removes a task when its delete button is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.type(screen.getByPlaceholderText('Add a task…'), 'Delete me')
    await user.click(screen.getByRole('button', { name: /add/i }))

    await user.click(screen.getByRole('button', { name: /delete/i }))

    expect(screen.queryByText('Delete me')).not.toBeInTheDocument()
  })
})

describe('App — T-0011: FilterBar wiring', () => {
  it('renders the FilterBar with All/Active/Completed buttons', () => {
    render(<App />)
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Active' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Completed' })).toBeInTheDocument()
  })

  it('defaults filter to All — shows all tasks', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.type(screen.getByPlaceholderText('Add a task…'), 'Task A')
    await user.click(screen.getByRole('button', { name: /add/i }))
    await user.type(screen.getByPlaceholderText('Add a task…'), 'Task B')
    await user.click(screen.getByRole('button', { name: /add/i }))
    await user.click(screen.getAllByRole('checkbox')[0]) // complete Task B

    // All filter — both tasks visible
    expect(screen.getByText('Task A')).toBeInTheDocument()
    expect(screen.getByText('Task B')).toBeInTheDocument()
  })

  it('Active filter shows only incomplete tasks', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.type(screen.getByPlaceholderText('Add a task…'), 'Active task')
    await user.click(screen.getByRole('button', { name: /add/i }))
    await user.type(screen.getByPlaceholderText('Add a task…'), 'Done task')
    await user.click(screen.getByRole('button', { name: /add/i }))
    await user.click(screen.getAllByRole('checkbox')[0]) // complete 'Done task' (newest first)

    await user.click(screen.getByRole('button', { name: 'Active' }))

    expect(screen.getByText('Active task')).toBeInTheDocument()
    expect(screen.queryByText('Done task')).not.toBeInTheDocument()
  })

  it('Completed filter shows only completed tasks', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.type(screen.getByPlaceholderText('Add a task…'), 'Active task')
    await user.click(screen.getByRole('button', { name: /add/i }))
    await user.type(screen.getByPlaceholderText('Add a task…'), 'Done task')
    await user.click(screen.getByRole('button', { name: /add/i }))
    await user.click(screen.getAllByRole('checkbox')[0]) // complete 'Done task'

    await user.click(screen.getByRole('button', { name: 'Completed' }))

    expect(screen.queryByText('Active task')).not.toBeInTheDocument()
    expect(screen.getByText('Done task')).toBeInTheDocument()
  })
})
