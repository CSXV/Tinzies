import "./App.css";

import { useState } from "react";
import { nanoid } from "nanoid";

import Dice from "./Componenets/Dice";
import ReactConfetti from "react-confetti";

// ------------------------------------------------------------------------------------------------
function App() {
  const [diceFaces, setDiceFaces] = useState(() => generateRandomDice());

  const gameWon: boolean =
    diceFaces.every((d) => d.isHeld) &&
    diceFaces.every((d) => d.value == diceFaces[0].value);

  const diceElements = diceFaces.map((die) => (
    <Dice
      key={die.id}
      id={die.id}
      value={die.value}
      isHeld={die.isHeld}
      onClick={heldButtonState}
    />
  ));

  // -----------------------------------------------------------------------------------------------
  function rollDice() {
    gameWon
      ? setDiceFaces(generateRandomDice())
      : setDiceFaces((prev) =>
        prev.map((d) =>
          d.isHeld ? d : { ...d, value: Math.ceil(Math.random() * 6) },
        ),
      );
  }

  function heldButtonState(id: string) {
    setDiceFaces((prev) =>
      prev.map((d) => (d.id === id ? { ...d, isHeld: !d.isHeld } : d)),
    );
  }

  function generateRandomDice() {
    return new Array(10).fill(0).map(() => ({
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    }));
  }

  // -----------------------------------------------------------------------------------------------
  return (
    <main className="main-container">
      {gameWon && <ReactConfetti />}

      <h1 className="title">Tenzies</h1>
      <p className="text">
        Roll until all dice are the same.<br />
        Click each die to freeze it at its current value between rolls.
      </p>

      <div className="die-container">{diceElements}</div>

      <button className="roll-button" onClick={rollDice}>
        {!gameWon ? "Roll" : "New Game"}
      </button>

      <footer>
        <small>Made with love <a href="https://github.com/csxv">CSXV</a></small>
      </footer>
    </main>
  );
}

export default App;
