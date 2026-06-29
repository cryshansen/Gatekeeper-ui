import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the GatekeeperAuth shell without crashing', async () => {
  render(<App />);
  expect(await screen.findByText(/gatekeeperauth/i)).toBeInTheDocument();
});
