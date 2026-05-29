import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { FilterBar } from './FilterBar'
import type { Filter } from '../types'

const meta: Meta<typeof FilterBar> = {
  title: 'Components/FilterBar',
  component: FilterBar,
  tags: ['autodocs'],
  argTypes: {
    filter: {
      control: 'radio',
      options: ['all', 'active', 'completed'] satisfies Filter[],
    },
    onChange: { action: 'onChange' },
  },
  decorators: [
    (Story) => (
      <div className="max-w-md mx-auto p-4 bg-white rounded-2xl shadow">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof FilterBar>

/** "All" selected by default. */
export const AllSelected: Story = {
  args: { filter: 'all' },
}

/** "Active" selected. */
export const ActiveSelected: Story = {
  args: { filter: 'active' },
}

/** "Completed" selected. */
export const CompletedSelected: Story = {
  args: { filter: 'completed' },
}

/** Interactive — clicking cycles through filters. */
export const Interactive: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [filter, setFilter] = useState<Filter>('all')
    return <FilterBar filter={filter} onChange={setFilter} />
  },
}
