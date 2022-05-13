import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testes componente <Pokedex />', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const encountered = screen.getByRole('heading', { name: 'Encountered pokémons' });
    expect(encountered).toHaveTextContent('Encountered pokémons');
  });

  test('Teste se é exibido próximo Pokémon da lista quando o botão é clicado', () => {
    renderWithRouter(<App />);
    const prox = screen.getByRole('button', { name: /próximo pokémon/i });
    const pikachu = screen.getByText(/6.0/);
    expect(pikachu).toBeInTheDocument();
    userEvent.click(prox);
    const charmander = screen.getByText(/8.5/);
    expect(charmander).toBeInTheDocument();
  });

  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const pokemons = screen.getAllByTestId('pokemon-weight');
    expect(pokemons).toHaveLength(1);
  });

  test('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    const MAX_BUTTONS = 9;
    const botoes = screen.getAllByRole('button');
    expect(botoes).toHaveLength(MAX_BUTTONS);
    expect(botoes[4]).toHaveTextContent('Poison');
    expect(botoes[3]).not.toHaveTextContent('Poison');
    expect(botoes[0]).toBeInTheDocument();

    userEvent.click(botoes[4]);
    const ekans = screen.getByText(/6.9/);
    expect(ekans).toBeInTheDocument();
    expect(botoes[0]).toBeInTheDocument();
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const botoes = screen.getAllByTestId('pokemon-type-button');
    const all = screen.getByRole('button', { name: /all/i });
    expect(botoes[0]).toHaveTextContent('Electric');
    const pikachu = screen.getByText(/6.0/);
    expect(pikachu).toBeInTheDocument();

    userEvent.click(all);
    expect(pikachu).toBeInTheDocument();

    const prox = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(prox);
    const charmander = screen.getByText(/8.5/);
    expect(charmander).toBeInTheDocument();
  });
});

// acessar elementos da tela

// interagir com os elementos (se for necessário)

// fazer os testes
