import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Home Page', () => {
     it('renders the home page', () => {
          render(<Home />);

          const button = screen.getByRole('button', { name: /hola mundo/i });
          expect(button).toBeInTheDocument();
     });

     it('button has correct text', () => {
          render(<Home />);

          const button = screen.getByText('Hola mundo');
          expect(button).toBeInTheDocument();
     });
});
