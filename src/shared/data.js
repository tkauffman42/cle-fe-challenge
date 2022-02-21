import * as axios from "axios";

// API call to get an indiviual player information
const getPlayerInformation = async function (playerId) {
  const response = await axios.get(
    "https://cle-be-challenge-tkauffman.vercel.app/api/players?playerId=" +
      playerId
  );
  return response;
};

// API call to get all of the players
const getPlayers = async function () {
  const playerResponse = await axios.get(
    "https://cle-be-challenge-tkauffman.vercel.app/api/players"
  );
  return playerResponse;
};

// API call to get the pitch data by player ID
const getPitchData = async function (playerId) {
  const pitchResponse = await axios.get(
    "https://cle-be-challenge-tkauffman.vercel.app/api/pitches?playerId=" +
      playerId
  );
  return pitchResponse;
};

// Exporting an individual player information
export const playerInformationData = {
  getPlayerInformation
};

// Exporting all of our player information
export const allPlayerData = {
  getPlayers
};

// Export pitch data
export const pitchData = {
  getPitchData
};
