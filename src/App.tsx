import { Route, Routes } from 'react-router-dom';
import './App.scss';
import HomePage from './pages/HomePage/HomePage';
import PersonPage from './pages/PersonPage/PersonPage';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/people/:id" element={<PersonPage />} />
      </Routes>
    </div>
  );
}

export default App;
