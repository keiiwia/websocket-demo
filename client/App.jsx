import { useState, useEffect } from "react";

export function App() {
  let [id, setId] = useState();
  let [connected, setConnected] = useState();
  let [messages, setMessages] = useState([]);

  let [socket, setSocket] = useState(null);

  useEffect(() => {
    let socket = new WebSocket("ws://149.31.229.86:3000"); // Create a websocket

    function handler({ data }) {
      let event = JSON.parse(data);

      if (event.type === "welcome") {
        // How do you respond to this
        // What other messages do you need to respond to?
        // if connected -> setconnected
        console.log(event);
        setId(event.id);
        setMessages(event.messages);
      }
    }

    setSocket(socket);
    socket.addEventListener("message", handler);

    return () => {
      socket.removeEventListener("message", handler);
    };
  }, []);

  let [currentMessage, setCurrentMessage] = useState("");

  return (
    <>
      <section id="messages">
        {messages.map((data) => (
          <Message />
        ))}
      </section>
      <span>id:{id}</span>
      <input value={currentMessage} onChange={(event) => setCurrentMessage(event.target.value)}></input>
      <button
        onClick={() => {
          /* set message -> app */
          socket.send(JSON.stringify({type: "client_message", content: currentMessage}))
        }}>Send</button>
    </>
  );
}

function Message({ ...props }) {
  return <div></div>;
}
