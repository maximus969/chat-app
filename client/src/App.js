import './App.css';
import io from 'socket.io-client'
import { useState } from 'react'
import { Chat } from './Chat/Chat';


const socket = io.connect("https://react-realtimechat.herokuapp.com/")

function App() {

  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('free')
  const [showChat, setShowChat] = useState(false)

  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit("join_room", room);
      setShowChat(true)
    }
  };

  return (
    <div className="App">
      <div className='chatWindow'>
        {!showChat ? 
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input type='text' placeholder='Name...' onChange={(e) => setUsername(e.target.value)}/>
          {/* <input type='text' placeholder='Room...' onChange={(e) => setRoom(e.target.value)}/> */}
          <button onClick={joinRoom}>Join A Room</button>
        </div>
        : <Chat socket={socket} username={username} room={room}/>
    } 
      </div>
    </div>
  );
}

export default App;
