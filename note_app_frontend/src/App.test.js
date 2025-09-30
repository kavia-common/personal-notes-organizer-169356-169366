import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header brand', () => {
  render(<App />);
  const headerText = screen.getByText(/Notes · Ocean/i);
  expect(headerText).toBeInTheDocument();
});
