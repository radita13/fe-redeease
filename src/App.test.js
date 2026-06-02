import { render, waitFor, screen } from '@testing-library/react';
import App from './App';

test('renders loading spinner on initial load and resolves landing page', async () => {
  render(<App />);
  
  // 1. Pastikan loading spinner muncul pada awal render
  const spinner = screen.getByTestId('loading-spinner');
  expect(spinner).toBeInTheDocument();
  
  // 2. Tunggu sampai loading spinner hilang (menandakan lazy component selesai dimuat)
  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  }, { timeout: 3000 });
});

