import type { Meta, StoryObj } from '@storybook/react'
import { TaskItem } from './TaskItem'
import type { Task } from '../types'

const incomplete: Task = { id: 'story-1', text: 'Buy groceries', completed: false }
const completed: Task = { id: 'story-2', text: 'Finish report', completed: true }

const meta: Meta<typeof TaskItem> = {
  title: 'Components/TaskItem',
  component: TaskItem,
  tags: ['autodocs'],
  argTypes: {
    onToggle: { action: 'onToggle' },
    onDelete: { action: 'onDelete' },
  },
  decorators: [
    (Story) => (
      <ul className="max-w-md mx-auto p-4 bg-white rounded-2xl shadow">
        <Story />
      </ul>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof TaskItem>

/** Default unchecked task row. */
export const Incomplete: Story = {
  args: { task: incomplete },
}

/** Completed task — shows strikethrough + muted text. */
export const Completed: Story = {
  args: { task: completed },
}

/** Long text wraps gracefully within the row. */
export const LongText: Story = {
  args: {
    task: {
      id: 'story-3',
      text: 'This is a very long task description that should wrap nicely inside the list item row without breaking the layout',
      completed: false,
    },
  },
}
