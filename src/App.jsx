import { useState, useCallback, useEffect, useRef } from "react";

import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "@#$%^&*-_+={}[]~`";
    }
    for (let i = 1; i <= length; i++) {
      let charIndex = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(charIndex);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-800 px-2 py-4 rounded-lg drow-shadow-lg">
        <h1 className="text-4xl text-white text-center">Password Generator</h1>
        <div className="w-full flex my-2 rounded-lg">
          <input
            type="text"
            value={password}
            className="w-full outline-none px-2 py-1 rounded-l-md text-gray-500"
            placeholder="Password Generator..."
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyToClipboard}
            className="bg-blue-700 text-white px-2 py-1 rounded-r-md shrink-0"
          >
            Copy
          </button>
        </div>
        <div className="flex gap-x-4">
          <div className="flex gap-x-1 items-center">
            <input
              type="range"
              name="length"
              min={8}
              max={32}
              onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor="length" className="text-orange-600">
              Length {length}
            </label>
          </div>
          <div className="flex gap-x-1 items-center">
            <input
              defaultChecked={numberAllowed}
              id="numbers"
              type="checkbox"
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="numbers" className="text-orange-600">
              Numbers
            </label>
          </div>
          <div className="flex gap-x-1 items-center">
            <input
              defaultChecked={charAllowed}
              id="characters"
              type="checkbox"
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor="characters" className="text-orange-600">
              Characters
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
