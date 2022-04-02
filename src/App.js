import { useState } from "react";

function App() {
  const [joke, setJoke] = useState("");
  const synthesis = window.speechSynthesis;

  window.onload = function () {
    synthesis.cancel();
  };

  const tellJoke = async () => {
    const response = await fetch(
      "https://v2.jokeapi.dev/joke/Programming,Pun?type=single"
    );
    const jokeData = await response.json();
    setJoke(jokeData.joke);

    const utterance = new SpeechSynthesisUtterance(jokeData.joke);

    if (synthesis.speaking) {
      synthesis.cancel();

      setTimeout(function () {
        synthesis.speak(utterance);
      }, 250);
    } else {
      synthesis.speak(utterance);
    }
  };

  return (
    <>
      <button
        onClick={() => {
          tellJoke();
        }}
      >
        Tell me a joke
      </button>
      <h1>{joke}</h1>
    </>
  );
}

export default App;
