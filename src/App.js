import { useEffect, useState } from "react";

function App() {
  const [joke, setJoke] = useState();

  const fetchJoke = async () => {
    const response = await fetch(
      "https://v2.jokeapi.dev/joke/Programming,Pun?type=single"
    );
    const jokeData = await response.json();
    setJoke(jokeData);
    console.log(jokeData);
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <>
      <h1>{joke.joke}</h1>
      <button onClick={fetchJoke}>Tell me a joke</button>
    </>
  );
}

export default App;
