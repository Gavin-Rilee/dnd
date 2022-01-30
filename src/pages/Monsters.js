import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

export default function Monsters() {
  const [monsters, setMonsters] = useState([]);
  const [currentMonster, setCurrentMonster] = useState(null);

  useEffect(() => {
    axios
      .get("https://www.dnd5eapi.co/api/monsters/")
      .then((response) => {
        const allMonsters = response.data.results;
        setMonsters(allMonsters);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleClick = (url) => {
    axios
      .get(`https://www.dnd5eapi.co${url}`)
      .then((response) => {
        console.log(response.data);
        setCurrentMonster(response.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <StyledHeader>Dungeons and Dragons Monsters!</StyledHeader>
      <StyledContainer className="monsterContainer">
        {monsters.map((monster) => (
          <StyledDiv
            onClick={() => handleClick(monster.url)}
            className="card"
            key={Math.random()}
          >
            <h1>{monster.name}</h1>
          </StyledDiv>
        ))}
      </StyledContainer>
    </div>
  );
}

const StyledDiv = styled.div`
  min-height: 30vh;
  padding: 2rem;
  margin: 10rem;
  box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.3);
  text-align: center;
  border-radius: 1rem;
  cursor: pointer;
  overflow: hidden;
`;
const StyledHeader = styled.h1`
  display: flex;
  justify-content: center;
`;

const StyledContainer = styled.div`
display: flex-wrap;

`
