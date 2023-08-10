import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [names] = useState(["Kişi 1", "Kişi 2", "Kişi 3", "Kişi 4"]);
  const [predictions, setPredictions] = useState([null, null, null, null]);
  const [winningIndex, setWinningIndex] = useState(null);
  const [diceRoll, setDiceRoll] = useState(null);
  const [round, setRound] = useState(0);
  const [scores, setScores] = useState([0, 0, 0, 0]);

  const diceImages = [
    "/dice-1.png",
    "/dice-2.png",
    "/dice-3.png",
    "/dice-4.png",
    "/dice-5.png",
    "/dice-6.png"
  ];

  const handleRollDice = () => {
    // Zar at
    const randomDiceRoll = Math.floor(Math.random() * 6) + 1;
    setDiceRoll(randomDiceRoll);

    // Rastgele tahminler üret
    const newPredictions = names.map(() => Math.floor(Math.random() * 6) + 1);
    setPredictions(newPredictions);

    // Kazananı kontrol et
    const winnerIndex = newPredictions.findIndex(
      (prediction) => prediction === randomDiceRoll
    );
    setWinningIndex(winnerIndex);

    // Puanları güncelle
    const newScores = [...scores];
    if (winnerIndex !== -1) {
      newScores[winnerIndex] += 100;
    } else {
      names.forEach((_, index) => {
        if (index !== winningIndex) {
          newScores[index] -= 50;
        }
      });
    }
    setScores(newScores);

    // El sayısını kontrol et
    setRound(round + 1);
  };

  const handleNextRound = () => {
    // El sayısını sıfırla
    setRound(0);
    // Puanları sıfırla
    setScores([0, 0, 0, 0]);
    // Tahminleri sıfırla
    setPredictions([null, null, null, null]);
    // Kazananı sıfırla
    setWinningIndex(null);
    // Zar atma sonucunu sıfırla
    setDiceRoll(null);
  };

  useEffect(() => {
    if (round >= 3) {
      // Toplam 3 el oynandı, puanları sıfırla
      handleNextRound();
    }
  }, [round]);

  return (
    <div className="App">
      <div className="button-container">
        {round < 3 ? (
          <button onClick={handleRollDice}>Tahmin Et</button>
        ) : (
          <button onClick={handleNextRound}>Yeni Oyun</button>
        )}
      </div>
      <div className="person-container">
        {names.map((name, index) => (
          <div className="person-box" key={index}>
            <p>{name}</p>
            <p className="result">
              Tahmin: {predictions[index] === null ? "?" : predictions[index]}
            </p>
            <p>Puan: {scores[index]}</p>
          </div>
        ))}
      </div>
      <div>
        {diceRoll === null ? (
          <p>Zar atmak için "Tahmin Et" butonuna tıklayın</p>
        ) : (
          <div>
            <p>Zarın attığı sayı: {diceRoll}</p>
            <img
              src={diceImages[diceRoll - 1]}
              alt={`Zar ${diceRoll}`}
              className="dice-image"
              id={`dice-${diceRoll}`} // Zar resmi için id ekledik
            />
          </div>
        )}
        {winningIndex !== null ? (
          <p>Kazanan: {names[winningIndex]}</p>
        ) : (
          <p className="no-winner">Hiç kazanan olmadı</p>
        )}
      </div>
    </div>
  );
}

export default App;
