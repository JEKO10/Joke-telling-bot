import { useState } from "react";

function App() {
  const [joke, setJoke] = useState("");
  const synthesis = window.speechSynthesis;
  const voices = synthesis.getVoices();
  let voice = [];

  for (var i = 0; i < voices.length; i++) {
    voice.push(voices[i].name + " (" + voices[i].lang + ")");
  }

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
      <select name="">
        <option value="default">Default</option>
        {voice.map((lang) => {
          return (
            <option key={lang} value={lang}>
              {lang}
            </option>
          );
        })}
      </select>
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
