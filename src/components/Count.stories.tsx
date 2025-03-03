import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, screen, userEvent, within } from '@storybook/test';
import { useArgs } from "@storybook/preview-api";
import { Count } from './Count';

export default {
    component: Count,
    tags: ['autodocs'],
    args: { count: 0, handleCountChange: fn(), handleIncrementChange: fn(), increment: 1 },
} satisfies Meta<typeof Count>;
  
type Story = StoryObj<typeof Count>;
  
export const Default: Story = {
    play: async ({ args, canvasElement }) => {
        const canvas = within(canvasElement);
        
        await expect(canvas.findByLabelText(/count/i)).resolves.toBeInTheDocument();
        await expect(canvas.findByLabelText(/count/i)).resolves.toHaveTextContent(args.count.toString());
        await expect(canvas.findByRole('button', { name: /increment/i })).resolves.toBeInTheDocument();
        await expect(canvas.findByRole('button', { name: /decrement/i })).resolves.toBeInTheDocument();
        await expect(canvas.findByRole('combobox', { name: /increment/i })).resolves.toBeInTheDocument();
        await expect(canvas.findByRole('button', { name: /clear count/i })).resolves.toBeInTheDocument();
    }
};

export const CanIncrement: Story = {
    play: async ({ args, canvasElement }) => {
        const canvas = within(canvasElement);
        const incrementButton = await canvas.findByRole('button', { name: /increment/i });

        await userEvent.click(incrementButton);
        expect(args.handleCountChange).toHaveBeenCalledWith(args.count + args.increment);
    }
};

export const CanDecrement: Story = {
    args: { count: 10 },
    play: async ({ args, canvasElement }) => {
        const canvas = within(canvasElement);
        const decrementButton = await canvas.findByRole('button', { name: /decrement/i });

        await userEvent.click(decrementButton);
        expect(args.handleCountChange).toHaveBeenCalledWith(args.count - args.increment);
    }
};

export const WillNotDecrementWhenCountIsZero: Story = {
    play: async ({ args, canvasElement }) => {
        const canvas = within(canvasElement);
        const decrementButton = await canvas.findByRole('button', { name: /decrement/i });

        await userEvent.click(decrementButton);
        expect(args.handleCountChange).not.toHaveBeenCalledWith();
    }
};

export const CanChangeIncrement: Story = {
    play: async ({ args, canvasElement }) => {
        const canvas = within(canvasElement);
        const incrementSelect = await canvas.findByRole('combobox', { name: /increment/i });

        await userEvent.click(incrementSelect);
        await expect(screen.findByRole('listbox')).resolves.toBeInTheDocument();
        await expect(screen.findByRole('option', { name: /50/i })).resolves.toBeInTheDocument();
        await userEvent.click(await screen.findByRole('option', { name: /50/i }));
        expect(args.handleIncrementChange).toHaveBeenCalledWith(50);
    }
};

export const CanClearCount: Story = {
    args: { count: 10 },
    play: async ({ args, canvasElement }) => {
        const canvas = within(canvasElement);
        const clearButton = await canvas.findByRole('button', { name: /clear count/i });

        await userEvent.click(clearButton);
        expect(args.handleCountChange).toHaveBeenCalledWith(0);
    }
};

export const WithState: Story = {
    render: (args) => {
        const [, updateArgs] = useArgs();
    
        return <Count {...args} handleCountChange={(count) => updateArgs({ count })} handleIncrementChange={(increment) => updateArgs({ increment })} />;
    },    
    play: async () => {}
};