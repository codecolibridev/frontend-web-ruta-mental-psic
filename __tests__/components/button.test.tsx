import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/shadcn/components/ui/button';

describe('Button Component', () => {
     it('renders button with text', () => {
          render(<Button>Click me</Button>);

          const button = screen.getByRole('button', { name: /click me/i });
          expect(button).toBeInTheDocument();
     });

     it('calls onClick handler when clicked', async () => {
          const handleClick = jest.fn();
          const user = userEvent.setup();

          render(<Button onClick={handleClick}>Click me</Button>);

          const button = screen.getByRole('button', { name: /click me/i });
          await user.click(button);

          expect(handleClick).toHaveBeenCalledTimes(1);
     });

     it('renders with default variant', () => {
          render(<Button>Default Button</Button>);

          const button = screen.getByRole('button');
          expect(button).toHaveClass('bg-primary');
     });

     it('renders with destructive variant', () => {
          render(<Button variant="destructive">Delete</Button>);

          const button = screen.getByRole('button');
          expect(button).toHaveClass('bg-destructive');
     });

     it('renders with outline variant', () => {
          render(<Button variant="outline">Outline Button</Button>);

          const button = screen.getByRole('button');
          expect(button).toHaveClass('border');
     });

     it('renders with small size', () => {
          render(<Button size="sm">Small</Button>);

          const button = screen.getByRole('button');
          expect(button).toHaveClass('h-8');
     });

     it('renders with large size', () => {
          render(<Button size="lg">Large</Button>);

          const button = screen.getByRole('button');
          expect(button).toHaveClass('h-10');
     });

     it('is disabled when disabled prop is true', () => {
          render(<Button disabled>Disabled Button</Button>);

          const button = screen.getByRole('button');
          expect(button).toBeDisabled();
     });

     it('accepts custom className', () => {
          render(<Button className="custom-class">Custom</Button>);

          const button = screen.getByRole('button');
          expect(button).toHaveClass('custom-class');
     });
});
