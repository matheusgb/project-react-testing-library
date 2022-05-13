import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testes componente <App.js />', () => {
  test('O topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const menu = screen.getByRole('navigation');
    expect(menu).toBeInTheDocument();
    expect(menu).toHaveTextContent('Home');
    expect(menu).toHaveTextContent('About');
    expect(menu).toHaveTextContent('Favorite Pokémons');
  });

  test('O primeiro link deve possuir o texto Home', () => {
    renderWithRouter(<App />);
    const menu = screen.getAllByRole('link');
    expect(menu[0]).toHaveTextContent('Home');
  });

  test('O segundo link deve possuir o texto About', () => {
    renderWithRouter(<App />);
    const menu = screen.getAllByRole('link');
    expect(menu[1]).toHaveTextContent('About');
  });

  test('O terceiro link deve possuir o texto Favorite Pokémons', () => {
    renderWithRouter(<App />);
    const menu = screen.getAllByRole('link');
    expect(menu[2]).toHaveTextContent('Favorite Pokémons');
  });

  test('É redirecionado para a página inicial, ao clicar no Home na navegação', () => {
    const { history } = renderWithRouter(<App />);
    const menu = screen.getAllByRole('link');
    const home = menu[0];
    userEvent.click(home);

    expect(history.location.pathname).toBe('/');
  });

  test('É redirecionado para a página About, ao clicar no About na navegação', () => {
    const { history } = renderWithRouter(<App />);
    const menu = screen.getAllByRole('link');
    const about = menu[1];
    userEvent.click(about);

    expect(history.location.pathname).toBe('/about');
  });

  test('Redirecionado para Favoritados, ao clicar Favorite Pokémons na navegação', () => {
    const { history } = renderWithRouter(<App />);
    const menu = screen.getAllByRole('link');
    const favorite = menu[2];
    userEvent.click(favorite);

    expect(history.location.pathname).toBe('/favorites');
  });

  test('Redirecionado para Notfound, ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/xablau');
    const notFound = screen.getAllByRole('heading');

    expect(notFound[1]).toHaveTextContent(/page/i);
  });
});

// acessar elementos da tela

// interagir com os elementos (se for necessário)

// fazer os testes
