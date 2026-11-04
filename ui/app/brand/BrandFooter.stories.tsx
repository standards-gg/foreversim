import type { Meta, StoryObj } from '@storybook/react-vite';

import { BrandFooter } from './BrandFooter';

const meta = {
	title: 'App/Landing/Components/BrandFooter',
	component: BrandFooter,
	tags: ['autodocs'],
	parameters: { spec: 'none' },
} satisfies Meta<typeof BrandFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
