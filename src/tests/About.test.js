import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Testes componente <About.js />', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const menu = screen.getAllByText(/Pokémons/i);
    const titulo = screen.getByRole('heading');
    expect(menu).toHaveLength(2);
    expect(titulo).toHaveTextContent('About');
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const titulo = screen.getByRole('heading');
    expect(titulo).toHaveTextContent('About Pokédex');
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const menu = screen.getAllByText(/Pokémons/i);
    expect(menu).toHaveLength(2);
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const imagem = screen.getByRole('img');
    expect(imagem.src).toContain('Gen_I_Pok%C3%A9dex.png');
  });
});

// acessar elementos da tela

// interagir com os elementos (se for necessário)

// fazer os testes
