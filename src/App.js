import "./App.css";
import Toast from './Toast/Toast'
import ProgressBar from "./ProgressBar/ProgressBar";
import BasicCalculator from "./Calculator/BasicCalculator";
import Circle from "./Circles/Circle";
import Header from "./Header/Header";
import React, {useState} from "react";
import Shape from "./Shape/Shape";
import TicTacToe from "./TicTacToe/TicTacToe";
function App() {

  const [selectedComponent, setSelectedComponent] = useState(null);

  // Function to handle card click
  const handleCardClick = (component) => {
    setSelectedComponent(component);
  };

  const handleGoBack = () => {
    setSelectedComponent(null);
  };

  return (
    <>
      <Header header="Machine Coding" onClick={handleGoBack} />

      {selectedComponent === null ? (
        // Render the list of cards when no component is selected
        <div className="card-container">
          <div className="card" onClick={() => handleCardClick('Circle')}>
            <h3>Circle</h3>
          </div>
          <div className="card" onClick={() => handleCardClick('Toast')}>
            <h3>Toast</h3>
          </div>
          <div className="card" onClick={() => handleCardClick('ProgressBar')}>
            <h3>ProgressBar</h3>
          </div>
          <div className="card" onClick={() => handleCardClick('BasicCalculator')}>
            <h3>Basic Calculator</h3>
          </div>
          <div className="card" onClick={() => handleCardClick('Shape')}>
            <h3>Shape Box</h3>
          </div>
          <div className="card" onClick={() => handleCardClick('TicTacToe')}>
            <h3>TicTacToe Game</h3>
          </div>
        </div>
      ) : (
        // Render the selected component with the "Back" button
        <div className="component-container">
          {selectedComponent === 'Circle' && <Circle />}
          {selectedComponent === 'Toast' && <Toast />}
          {selectedComponent === 'ProgressBar' && <ProgressBar />}
          {selectedComponent === 'BasicCalculator' && <BasicCalculator />}
          {selectedComponent === 'Shape' && <Shape />}
          {selectedComponent === 'TicTacToe' && <TicTacToe />}
        </div>
      )}
    </>
  );
}

export default App;
