import type { Meta, StoryObj } from '@storybook/react'
import { CarouselGallery } from './CarouselGallery'

const meta: Meta<typeof CarouselGallery> = {
  title: 'Components/CarouselGallery',
  component: CarouselGallery,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CarouselGallery>

export const Default: Story = {
  args: {
    images: [
      'https://picsum.photos/seed/1/600/400',
      'https://picsum.photos/seed/2/600/400',
      'https://picsum.photos/seed/3/600/400',
    ],
    autoPlay: false,
    interval: 3000,
  },
}

export const AutoPlaying: Story = {
  args: {
    images: [
      'https://picsum.photos/seed/4/600/400',
      'https://picsum.photos/seed/5/600/400',
    ],
    autoPlay: true,
    interval: 2000,
  },
}
