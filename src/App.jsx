import { useState,useCallback,useEffect,useRef } from 'react'
import './App.css'
import './index.css'



function App() {
  const [length,setLength] = useState(8)
  const [number,setNumber]=useState(false)
  const [char,setChar]=useState(false)

  const [password,setPassword]=useState("")

  const passwordGenerator = useCallback(()=>{
    let pass =""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(number)
      str+="0123456789"
    if(char)
      str += "!@#$%^&*()_+-={}[]|:;<>,.?/~`";

    for (let i = 1; i <= length; i++) {
      let character = Math.floor(Math.random()*str.length+1);
      pass += str.charAt(character)
    }

    setPassword(pass)

  },[length,number,char,setPassword])

  useEffect(()=>{
    passwordGenerator()
  },[length,char,number,passwordGenerator])

  const copyPassword = useCallback(()=>{
    passwordRef.current.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  //useRef hook
  const passwordRef = useRef(null)

  return (
    <>
      <div className="grid place-items-center h-screen">
        <div className="w-full max-w-md mx-5 my-5 h-auto bg-orange-500 text-amber-100 font-bold text-xl rounded-2xl shadow-2xl shadow-orange-500/50 p-8 ">
          <h1 className="text-center font-black text-2xl">
            Password Generator
          </h1>
          <div className="flex overflow-hidden my-4">
            <input
              type="text"
              value={password}
              className="outline-none w-full py-1 px-3 bg-amber-50 rounded-l-lg text-black"
              placeholder="password"
              readOnly
              ref={passwordRef}
            />
            <button
              onClick={copyPassword}
              className="bg-indigo-300 px-2 rounded-r-lg cursor-pointer hover:text-white hover:inset-shadow-sm hover:inset-shadow-indigo-600"
            >
              Copy
            </button>
          </div>
          <div className="flex text-lg flex-col">
            <input
              type="range"
              className="cursor-pointer accent-indigo-300"
              min={6}
              max={20}
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length:{length}</label>

            <div className="flex gap-2">
              <input
                type="checkbox"
                defaultChecked={number}
                className="accent-indigo-300 w-4.5"
                id="numberInput"
                onChange={() => {
                  setNumber((prev) => !prev);
                }}
              />
              <label htmlFor="numberInput">Numbers</label>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                defaultChecked={char}
                className="accent-indigo-300 w-4.5"
                id="charInput"
                onChange={() => {
                  setChar((prev) => !prev);
                }}
              />
              <label htmlFor="charInput">Character</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App
