import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom'; // Importando useNavigate
import axios from 'axios';

// Estilizando o contêiner principal
const Container = styled.div`
  background-color: #0e0e0e;
  color: white;
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
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

// Estilizando a lista de horários
const ScheduleList = styled.div`
  margin: 20px 0;
`;

// Estilizando cada dia
const Day = styled.div`
  margin-bottom: 10px;
`;

// Estilizando os horários
const TimeButton = styled.button`
  background-color: transparent;
  border: 1px solid #ce4b8c;
  color: #ce4b8c;
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #ce4b8c;
    color: white;
  }
`;

const MovieDetails = () => {
  const { id } = useParams(); // Obtendo o ID do filme
  const [showtimes, setShowtimes] = useState([]); // Estado para armazenar as sessões
  const [movieTitle, setMovieTitle] = useState(''); // Novo estado para armazenar o título do filme
  const navigate = useNavigate(); // Hook para navegação

  useEffect(() => {
    const fetchShowtimes = async () => {
      try {
        const response = await axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${id}/showtimes`);
        setShowtimes(response.data.days); // Atualiza o estado com os dias e sessões
        setMovieTitle(response.data.title); // Armazena o título do filme
      } catch (error) {
        console.error('Erro ao buscar sessões:', error);
      }
    };

    fetchShowtimes(); // Chama a função para buscar sessões
  }, [id]); // O ID do filme é uma dependência

  const handleTimeClick = (showtimeId) => {
    // Navega para a página de seleção de assentos e passa o ID do filme, título do filme e da sessão
    navigate(`/movie/${id}/session/${showtimeId}`, { state: { movieTitle } });
  };

  return (
    <Container>
      <Title>Cineflex</Title>
      <h2>Selecione o horário</h2>

      <ScheduleList>
        {showtimes.map((day) => (
          <Day key={day.id}>
            <h3>{`${day.weekday}, ${day.date}`}</h3>
            {day.showtimes.map((showtime) => (
              <TimeButton key={showtime.id} onClick={() => handleTimeClick(showtime.id)}>
                {showtime.name}
              </TimeButton>
            ))}
          </Day>
        ))}
      </ScheduleList>
    </Container>
  );
};

export default MovieDetails;