import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testes componente <NotFound />', () => {
  test('Teste se contém um heading h2 com o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);
    const perdido = screen.getByRole('heading');
    expect(perdido).toHaveTextContent('Page requested not found');
  });

  test('Teste se página mostra a imagem', () => {
    renderWithRouter(<NotFound />);
    const img = screen.getAllByRole('img');
    expect(img[1].src).toContain('kNSeTs31XBZ3G');
  });
});

// acessar elementos da tela

// interagir com os elementos (se for necessário)

// fazer os testes
