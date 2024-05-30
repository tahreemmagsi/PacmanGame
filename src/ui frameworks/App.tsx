import React from 'react';
import PacManGame from '../interface/Game';

const App: React.FC = () => {
  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-3xl font-bold text-yellow-400 mb-4">Pac-Man Game</h1>
      <PacManGame />
    </div>
  );
}

export default App;
