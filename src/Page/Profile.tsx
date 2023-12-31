import React, { useState, useEffect } from 'react'
import  {Socket}  from 'socket.io-client';
import io from 'socket.io-client';

function Profile() {
  const [ws, setWs] = useState<Socket | null>(null);

  const connectWebSocket = () => {
    // 開啟WebSocket連接
    setWs(io('http://localhost:8888'));
  };

    useEffect(()=>{
        if(ws){
            //連線成功在 console 中打印訊息
            console.log('success connect!')
            //設定監聽
            initWebSocket()
        }
    },[ws])

    const initWebSocket = () => {
      // 對 getMessage 設定監聽，如果 server 有透過 getMessage 傳送訊息，將會在此被捕捉
      ws?.on('getMessage', (message: string) => {
        console.log(message);
      });
    };
  
    const sendMessage = () => {
      // 以 emit 送訊息，並以 getMessage 為名稱送給 server 捕捉
      ws?.emit('getMessage', '只回傳給發送訊息的 client');
    };

  return (
    <div>Profile
      <div>
            <input className="btn" type='button' value='連線' onClick={connectWebSocket} />
            <input className="btn" type='button' value='送出訊息' onClick={sendMessage} />
        </div>
    </div>
  )
}

export default Profile