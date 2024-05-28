import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { HomePage } from './pages/HomePage/HomePage';
import { DetailPage } from './pages/DetailPage/DetailPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';

export const App = () => (
  <Router>
    <Header></Header>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/pokemon/:id" element={<DetailPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
);
