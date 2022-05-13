import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testes componente <FavoritePokemons />', () => {
  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const menu = screen.getAllByRole('link');
    userEvent.click(menu[3]);
    const favoritar = screen.getByText(/pokémon favoritado?/i);
    userEvent.click(favoritar);
    userEvent.click(menu[2]);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });

  test('é exibido a mensagem No favorite pokemon found, se não tiver favoritos.', () => {
    renderWithRouter(<FavoritePokemons />);
    const nada = screen.getByText(/No favorite pokemon found/i);
    expect(nada).toHaveTextContent('No favorite pokemon found');
  });
});

// acessar elementos da tela

// interagir com os elementos (se for necessário)

// fazer os testes
