import React, { useState, useEffect } from "react";
import axios from "axios";

import CardList from './CardList.jsx';
import SubmitName from './SubmitName.jsx';
import "../styles/app.css";
import LeaderBoard from "./LeaderBoard.jsx";

const App = () => {
  // const kanjiSamples = [
  //   { name: "fire", meaning: "fire", flipped: false},
  //   { name: "火", meaning: "fire", flipped: false},
  //   { name: "water", meaning: "water", flipped: false},
  //   { name: "水", meaning: "water", flipped: false},
  //   { name: "earth", meaning: "earth", flipped: false},
  //   { name: "土", meaning: "earth", flipped: false},
  //   { name: "tree", meaning: "tree", flipped: false},
  //   { name: "木", meaning: "tree", flipped: false}
  // ];

  const [cards, setCards] = useState([]);
  const [cardsFlipped, setCardsFlipped] = useState(null);
  const [currentCard, setCurrentCard] = useState(null);
  const [choice1, setChoice1] = useState(null);
  const [choice2, setChoice2] = useState(null);
  const [turns, setTurns] = useState(0);

  const getAllCards = async () => {
    const res = await axios.get("/kanji");
    const allCards = res.data;
    // const allCards = kanjiSamples;

    const shuffledCards = allCards.sort(() => 0.5 - Math.random());
    setCards(shuffledCards);
  };

  const setNewGame = async () => {
    await getAllCards();
    setTurns(0);
    setCardsFlipped(0);
  };

  const cardClickHandler = (card) => {
    card.flipped = true;
    setTurns(turns + 1);
    setCurrentCard(card);
    setChoices();
  };

  const setChoices = () => {
    if (!choice1) {
      setChoice1(currentCard);
    } else {
      setChoice2(currentCard);
    }
  };

  const checkMatch = () => {
    choice1.flipped = choice1.meaning === choice2.meaning;
    choice2.flipped = choice1.flipped;

    if (choice1.flipped) setCardsFlipped(cardsFlipped + 2);
    console.log(choice1.flipped ? "MATCH" : "DIDN'T MATCH");

    setChoice1(null);
    setChoice2(null);
  };

  useEffect(() => {
    if (cardsFlipped === cards.length) console.log("YOU WON");
  }, [cardsFlipped]);

  useEffect(() => {
    if (choice2) checkMatch();
  }, [choice2]);

  const [showLeaderBoard, setShowLeaderBoard] = useState(false);
  const displayLeaderBoard = ()=>{
    showLeaderBoard ? setShowLeaderBoard(false):setShowLeaderBoard(true)
  }

  return (
    <div>
      <h1>Kanji Memory Game</h1>
      <button className="new-game-btn" onClick={setNewGame}>New Game</button>

      {cardsFlipped === cards.length && <SubmitName />}

      <CardList cards={cards} cardClickHandler={cardClickHandler} />

      {cards.length > 0 && <div className="display-turns"><h2>Turns: {turns}</h2></div>}

      <button className="board-btn" onClick={displayLeaderBoard}>Leader Board</button>
      {showLeaderBoard && <LeaderBoard />}
    </div>
  );
};

export default App;