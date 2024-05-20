import { useEffect, useState } from "react";
import styled from "styled-components";
import { Box } from "./Box";
function TicTacToe() {
  const [turn, setTurn] = useState(true);
  const [player, setPlayer] = useState("");
  const [boxes, setBoxes] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const [resultDeclared, setresultDeclared] = useState(false);

  useEffect(() => {
    turn ? setPlayer("X") : setPlayer("O");
  }, [turn]);

  const clickBox = (index) => {
    const arr = boxes;
    arr[index] = player;
    setBoxes([...arr]);
    let bool = false;
    for (let set of winningSets) {
      if (set.every((el) => boxes[el] === player)) {
        setresultDeclared(!resultDeclared);
        bool = true;
        break;
      }
    }
    if (boxes.every((box) => box !== null)) {
      setresultDeclared(!resultDeclared);
      bool = true;
      setPlayer("NOBODY");
    }
    !bool && setTurn(!turn);
  };

  const okay = () => {
    setBoxes([null, null, null, null, null, null, null, null, null]);
    setresultDeclared(!resultDeclared);
    setPlayer("X");
  };

  return (
    <>
      <br />
      <br />
      <Board>
        {boxes.map((box, index) => {
          return (
            <Box
              mark={box}
              player={player}
              index={index}
              clickBox={clickBox}
              result={resultDeclared}
            />
          );
        })}
      </Board>
      {resultDeclared && (
        <Result>
          <p>The winner is {player}</p>
          <Button onClick={okay}>OKAY!</Button>
        </Result>
      )}
    </>
  );
}

export default TicTacToe;

const Board = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: auto auto auto;
  justify-content: center;
  margin: 3rem auto;
`;

const Result = styled.div`
  width: max-content;
  font-family: "Raleway", sans-serif;
  margin: auto;
  p{
    font-size: x-large;
  }
`;

const Head = styled.div`
  text-align: center;
  padding: 2.5rem;
  font-family: "Raleway", sans-serif;
  font-size: xx-large;
  background: white;
  
`;
const Button = styled.div`
  padding: 1rem 1.2rem;
  font-weight: 700;
  background-color: rosybrown;
  color: white;
  border: 3px solid white;
  border-radius: 12px;
  cursor: pointer;
  text-align: center;
`;

const winningSets = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];

