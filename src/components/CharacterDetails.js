import React from "react";

const CharacterDetails = ({ character }) => {
  return (
    <div className="character-details" id="character-details">
      <h2>{character.name}</h2> {/*Karakterin ismi*/}
      <p>Status: {character.status}</p> {/*Karakterin durumu*/}
      <p>Species: {character.species}</p> {/*Karakterin türü*/}
      <p>Gender: {character.gender}</p> {/*Karakterin cinsiyeti*/}
      <p>Origin: {character.origin.name}</p> {/*Karakterin kökeni*/}
      <p>Location: {character.location.name}</p> {/*Karakterin konumu*/}
      <img src={character.image} alt={character.name} />{/*Karakterin fotoğrafı*/}
    </div>
  );
};

export default CharacterDetails;
