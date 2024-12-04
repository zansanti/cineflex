import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import MovieDetails from './components/MovieDetails';
import SeatSelection from './components/SeatSelection'; // Importando o componente de seleção de assentos
import Confirmation from './components/Confirmation'; // Importando o novo componente de confirmação

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/movie/:movieId/session/:sessionId" element={<SeatSelection />} /> {/* Rota para seleção de assentos */}
        <Route path="/confirmation" element={<Confirmation />} /> {/* Rota para confirmação */}
      </Routes>
    </Router>
  );
};

export default App;