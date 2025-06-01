import { useState } from "react";
import style from './App.module.css';
import Image from "./Image.gif";

function App() {
  const [result, setResult] = useState("Click the mic to ask...");
  const [input, setInput] = useState("");

  const onChange = (e) => setInput(e.target.value);

  const handleOnKeyDown = (e) => {
    if (e.key === "Enter") {
      data(input);
      setInput("");
    }
  };

  const speak = (text) => {
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.lang = "hi-IN"; // change to Hindi if needed
    text_speak.volume = 1;
    text_speak.rate = 1.1;
    text_speak.pitch = 1;
    window.speechSynthesis.speak(text_speak);
  };

  const data = async (promptText) => {
    try {
      const url = "https://6c7344b8-8b84-4d2e-a90f-f6b4807b6355-00-1deuo2nb7uq8m.sisko.replit.dev:5000/ask"; // 🔁 Update this with real URL
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptText })
      });
      const info = await response.json();
      setResult(info.response);
      speak(info.response);
    } catch (err) {
      console.error("Error calling backend:", err);
      setResult("❌ Failed to fetch response");
    }
  };

  return (
    <div className={style.body}>
      <img src={Image} alt="AI Animation" style={{ width: "80vw", height: "50px" }} />
      <input
        type="text"
        placeholder="Type and press Enter..."
        className={style.input}
        onChange={onChange}
        value={input}
        onKeyDown={handleOnKeyDown}
      />
      <div>
        <span className={style.jarvis}>{result}</span>
      </div>
    </div>
  );
}

export default App;