import { render, screen } from '@testing-library/react';
import Home from './page'; // ajuste o caminho se necessário

describe('Home', () => {
  it('renderiza o texto "teste"', () => {
    render(<Home />);
    expect(screen.getByText('teste')).toBeInTheDocument();
  });
});