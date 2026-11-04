import type { Meta, StoryObj } from '@storybook/react-vite';

import { BrandMark } from './BrandMark';

const meta = {
	title: 'App/Landing/Components/BrandMark',
	component: BrandMark,
	tags: ['autodocs'],
	parameters: { spec: 'none' },
} satisfies Meta<typeof BrandMark>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
