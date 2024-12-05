// components/Confirmation.js
import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

const ConfirmationContainer = styled.div`
  background-color: #0E0E0E;
  color: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  margin: auto;
`;

const Title = styled.h1`
  color: #FF5C00;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: #FF5C00;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const Confirmation = () => {
  const location = useLocation();
  const { movieDetails, seats, buyer } = location.state;

  return (
    <ConfirmationContainer>
      <Title>Pedido finalizado!</Title>
      <Section>
        <h2>Filme e sessão</h2>
        <p>{movieDetails.title}</p>
        <p>{movieDetails.date} às {movieDetails.time}</p>
      </Section>
      <Section>
        <h2>Ingressos</h2>
        {seats.map(seat => (
          <p key={seat}>Assento {seat}</p> // Aqui deve mostrar o número do assento
        ))}
      </Section>
      <Section>
        <h2>Comprador(a)</h2>
        <p>Nome: {buyer.name}</p>
        <p>CPF: {buyer.cpf}</p>
      </Section>
      <Button onClick={() => window.location.href = '/'}>Voltar para tela inicial</Button>
    </ConfirmationContainer>
  );
};

export default Confirmation;