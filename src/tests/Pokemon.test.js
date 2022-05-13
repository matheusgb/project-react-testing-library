import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testes componente <Pokemons />', () => {
  test('É renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);

    const nome = screen.getByText('Pikachu');
    expect(nome).toBeInTheDocument();

    const tipo = screen.getByTestId('pokemon-type');
    expect(tipo).toHaveTextContent('Electric');

    const peso = screen.getByText(/Average weight: 6.0 kg/i);
    expect(peso).toBeInTheDocument();

    const img = screen.getAllByRole('img');
    expect(img[0].src).toContain('025');
    expect(img[0].alt).toContain('Pikachu sprite');
  });

  test('O link deve possuir a URL do id do Pokémon;', () => {
    const { history } = renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  test('Clicar no link de navegação, é feito o redirecionamento para detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const next = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(next);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);
    expect(history.location.pathname).toBe('/pokemons/4');
  });

  test('A URL exibida no navegador muda para /pokemon/<id>;', () => {
    const { history } = renderWithRouter(<App />);
    const next = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(next);
    userEvent.click(next);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);
    expect(history.location.pathname).toBe('/pokemons/10');
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);
    const favorito = screen.getByText(/pokémon favoritado?/i);
    userEvent.click(favorito);
    const home = screen.getByRole('link', { name: /home/i });
    userEvent.click(home);

    const img = screen.getAllByRole('img');
    expect(img[1].src).toContain('star');
    expect(img[1].alt).toContain('Pikachu is marked');
  });
});

// acessar elementos da tela

// interagir com os elementos (se for necessário)

// fazer os testes
