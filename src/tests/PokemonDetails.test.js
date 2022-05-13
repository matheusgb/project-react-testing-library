import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testes componente <PokemonDetails />', () => {
  test('As informações detalhadas do Pokémon selecionado são mostradas na tela.', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);

    const titulo = screen.getAllByRole('heading');
    expect(titulo[1]).toHaveTextContent('Pikachu');
    expect(details).not.toBeInTheDocument();
    expect(titulo[2]).toHaveTextContent('Summary');
    const summary = screen.getByText(/This intelligent Pokémon/i);
    expect(summary).toBeInTheDocument();

    const pikachu = screen.getByText('Electric');
    expect(pikachu).toBeInTheDocument();
    const peso = screen.getByText(/Average weight: 6.0 kg/i);
    expect(peso).toBeInTheDocument();
    const img = screen.getAllByRole('img');
    expect(img[0].src).toContain('025');
    expect(img[0].alt).toContain('Pikachu sprite');
  });

  test('Existe na página uma seção com os mapas contendo as localizações', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);

    const titulo = screen.getAllByRole('heading');
    expect(titulo[3]).toHaveTextContent(/Game Locations of Pikachu/i);

    const locations = screen.getAllByAltText(/pikachu location/i);
    expect(locations).toHaveLength(2);

    const imgs = screen.getAllByRole('img');
    const IMAGES = 3;
    expect(imgs).toHaveLength(IMAGES);
    expect(imgs[2].src).toContain('bulbagarden');
  });

  test('O usuário pode favoritar um pokémon através da página de detalhes.', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);
    const favorito = screen.getByText(/pokémon favoritado?/i);
    userEvent.click(favorito);
    const img = screen.getAllByRole('img');
    expect(img[1].src).toContain('star');
    expect(img[1].alt).toContain('Pikachu is marked');
    userEvent.click(favorito);
    expect(img[1]).not.toBeInTheDocument();
    expect(favorito).toBeInTheDocument();
  });
});

// acessar elementos da tela

// interagir com os elementos (se for necessário)

// fazer os testes
