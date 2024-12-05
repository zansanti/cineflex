import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Estilizando o contêiner principal
const Container = styled.div`
  background-color: #0e0e0e;
  color: white;
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
  height: calc(100vh - 40px);
  justify-content: space-between; 
`;

// Estilizando o título
const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  background-color: #ce4b8c;
  padding: 10px;
  border-radius: 5px;
`;

// Estilizando a lista de assentos
const SeatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 10px;
  margin-bottom: 20px;
`;

// Estilizando cada assento
const Seat = styled.button`
  background-color: #1e1e1e; /* Cor padrão para assento */
  border: 1px solid #7b7b7b; /* Borda padrão */
  color: white; /* Cor do texto padrão */
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;

  &.selected {
    background-color: #FFFF00; /* Amarelo */
    border: 2px solid #ce4b8c; /* Borda rosa */
    color: white; /* Deve manter o número visível em amarelo */
  }

  &.available {
    background-color: #00FF00; /* Verde */
    color: black; /* Cor do texto (número) visível */
  }

  &.unavailable {
    background-color: #008080; /* Azulado */
    color: #008080; /* Mesma cor que o fundo para esconder o número */
    cursor: not-allowed; /* Cursor não permitido para assentos indisponíveis */
    pointer-events: all; /* Permite que o evento de clique seja capturado */
  }
`;

// Estilizando o campo de entrada
const InputField = styled.input`
  width: 95%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

// Estilizando o botão de reserva
const ReserveButton = styled.button`
  background-color: #ce4b8c;
  color: white;
  padding: 10px;
  width: 100%;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #b73d5e;
  }
`;

const SeatSelection = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [buyerName, setBuyerName] = useState('');
  const [buyerCpf, setBuyerCpf] = useState('');
  const [movieTitle, setMovieTitle] = useState('');
  const [sessionDate, setSessionDate] = useState('');
  const [sessionTime, setSessionTime] = useState('');
  const [message, setMessage] = useState(''); // Estado para a mensagem de aviso

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${sessionId}/seats`);
        setSeats(response.data.seats);
        setMovieTitle(response.data.movie.title);
        setSessionDate(response.data.day.date);
        setSessionTime(response.data.name);
      } catch (error) {
        console.error('Erro ao buscar assentos:', error);
      }
    };

    fetchSeats();
  }, [sessionId]);

  const handleSeatClick = (seat) => {
    if (seat.isAvailable) {
      // Se o assento está disponível, permite selecionar
      if (selectedSeats.includes(seat.id)) {
        setSelectedSeats(selectedSeats.filter((s) => s !== seat.id));
        setMessage(''); // Limpa a mensagem
      } else {
        setSelectedSeats([...selectedSeats, seat.id]);
        setMessage(''); // Limpa a mensagem
      }
    } else {
      // Se o assento não está disponível, exibe a mensagem
      setMessage("Esse assento não está disponível."); 
    }
  };

  const handleReserve = async () => {
    // Verifica se algum assento foi selecionado
    if (selectedSeats.length === 0) {
      alert('Por favor, selecione pelo menos um assento.');
      return; // Impede a navegação
    }

    // Verifica se o nome e o CPF estão preenchidos
    if (buyerName.trim() === '' || buyerCpf.trim() === '') {
      alert('Por favor, preencha o nome e o CPF.');
      return; // Impede a navegação
    }

    const reservationData = {
      ids: selectedSeats,
      name: buyerName,
      cpf: buyerCpf,
    };

    try {
      await axios.post('https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many', reservationData);

      // Navega para a página de confirmação
      navigate('/confirmation', {
        state: { 
          movieDetails: { title: movieTitle, date: sessionDate, time: sessionTime },
          seats: selectedSeats.map(seatId => {
            const seat = seats.find(s => s.id === seatId);
            return seat ? seat.name : '';
          }), 
          buyer: { name: buyerName, cpf: buyerCpf },
        },
      });
    } catch (error) {
      console.error('Erro ao reservar assentos:', error);
      alert('Ocorreu um erro ao fazer a reserva. Tente novamente.');
    }
  };
  return (
    <Container>
      <Title>Cineflex</Title>
      <h2>Selecione o(s) assento(s)</h2>

      {message && <p style={{ color: 'red' }}>{message}</p>} {/* Mensagem de aviso */}

      <SeatsContainer>
        {seats.map((seat) => (
          <Seat
            key={seat.id}
            className={`${seat.isAvailable ? (selectedSeats.includes(seat.id) ? 'selected' : 'available') : 'unavailable'}`}
            onClick={() => handleSeatClick(seat)} // Chama a função ao clicar
          >
            {seat.name}
          </Seat>
        ))}
      </SeatsContainer>

      <InputField 
        type="text" 
        placeholder="Nome do comprador(a)" 
        value={buyerName}
        onChange={(e) => setBuyerName(e.target.value)}
      />
      <InputField 
        type="text" 
        placeholder="CPF do comprador(a)" 
        value={buyerCpf}
        onChange={(e) => setBuyerCpf(e.target.value)}
      />
      <ReserveButton onClick={handleReserve}>Reservar assento(s)</ReserveButton>
    </Container>
  );
};

export default SeatSelection;