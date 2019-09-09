import React, { useState, useEffect } from 'react'
import './App.css';
import { login } from "./api/login"
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket('ws://localhost:5000');

const App: React.FC = () => {
  const [user, setName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  useEffect(() => {
    client.onmessage = (message) => {
      console.log(message);
    };
  }, [])
  const handleLogin = async () => {
    const res = await login({user, password})
    console.log(res)
  }
  return (
    <div className="App">
      <input type="text" placeholder="请输入用户名" onChange={e => setName(e.target.value)} value={user}/>
      <br/>
      <input type="text" placeholder="请输入密码" onChange={e => setPassword(e.target.value)} value={password}/>
      <br/>
      <button onClick={handleLogin}>提交</button>
    </div>
  );
}

export default App;
