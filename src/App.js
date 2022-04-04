import { useState } from "react";
import robot from "./robot.gif";

function App() {
  const [joke, setJoke] = useState("");
  const [lang, setLang] = useState(0);
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

    utterance.voice = synthesis.getVoices()[lang];

    if (synthesis.speaking) {
      synthesis.cancel();

      setTimeout(function () {
        synthesis.speak(utterance);
      }, 250);
    } else {
      synthesis.speak(utterance);
    }
  };

  const onChangeHandler = (e) => {
    const index = e.target.selectedIndex;
    const option = e.target.childNodes[index];
    const id = option.getAttribute("id");
    setLang(id);
  };

  return (
    <section className="main">
      <img src={robot} alt="IMG" />
      <button
        onClick={() => {
          tellJoke();
        }}
      >
        Tell me a joke
      </button>
      <select onChange={onChangeHandler}>
        <option value="default">Select Voice</option>
        {voice.map((lang, index) => {
          return (
            <option key={index} value={lang} id={index}>
              {lang}
            </option>
          );
        })}
      </select>
      <h1>{joke}</h1>
    </section>
  );
}

export default App;
