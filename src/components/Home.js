import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importando Axios

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

// Estilizando a lista de filmes
const MovieList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  justify-items: center;
`;

// Estilizando cada cartaz de filme
const MoviePoster = styled.img`
  width: 145px;
  height: 210px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  cursor: pointer; /* Adiciona um cursor de ponteiro */
`;

const Home = () => {
  const [movies, setMovies] = useState([]); // Estado para armazenar os filmes
  const navigate = useNavigate(); // Hook para navegação

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://mock-api.driven.com.br/api/v8/cineflex/movies');
        setMovies(response.data); // Atualiza o estado com a lista de filmes
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
      }
    };

    fetchMovies(); // Chama a função para buscar filmes
  }, []); // O array vazio significa que isso será executado apenas uma vez quando o componente for montado

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`); // Navega para a página de detalhes do filme
  };

  return (
    <Container>
      <Title>Cineflex</Title>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Em Cartaz</h2>
      <MovieList>
        {movies.map((movie) => (
          <MoviePoster
            key={movie.id}
            src={movie.posterURL}
            alt={movie.title}
            onClick={() => handleMovieClick(movie.id)} // Adiciona o evento de clique
          />
        ))}
      </MovieList>
    </Container>
  );
};

export default Home;