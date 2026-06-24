const API_KEY = import.meta.env.VITE_ODDS_API_KEY;

const BASE_URL = "https://api.the-odds-api.com/v4";

export async function getSports() {
  const response = await fetch(
    `${BASE_URL}/sports?apiKey=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Error obteniendo deportes");
  }

  return response.json();
}