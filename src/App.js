import { useState } from "react";

function App() {
  const [joke, setJoke] = useState([]);

  const synthesis = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(joke.joke);

  const fetchJoke = async () => {
    const response = await fetch(
      "https://v2.jokeapi.dev/joke/Programming,Pun?type=single"
    );
    const jokeData = await response.json();
    setJoke(jokeData);
  };

  const speakJoke = () => {
    if (synthesis.speaking) {
      synthesis.cancel();

      setTimeout(function () {
        synthesis.speak(utterance);
      }, 250);
    } else {
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <>
      {joke !== undefined ? <h1>{joke.joke}</h1> : ""}
      <button
        onClick={() => {
          fetchJoke();
          speakJoke();
        }}
      >
        Tell me a joke
      </button>
    </>
  );
}

export default App;
