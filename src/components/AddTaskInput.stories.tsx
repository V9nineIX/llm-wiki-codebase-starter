import type { Meta, StoryObj } from '@storybook/react'
import { AddTaskInput } from './AddTaskInput'

const meta: Meta<typeof AddTaskInput> = {
  title: 'Components/AddTaskInput',
  component: AddTaskInput,
  tags: ['autodocs'],
  argTypes: {
    onAddTask: { action: 'onAddTask' },
  },
  decorators: [
    (Story) => (
      <div className="max-w-md mx-auto p-6">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof AddTaskInput>

/** Default empty state — ready for user input. */
export const Default: Story = {}

/** Demonstrates the input and button layout in a constrained container. */
export const NarrowContainer: Story = {
  decorators: [
    (Story) => (
      <div className="max-w-xs mx-auto p-4">
        <Story />
      </div>
    ),
  ],
}
