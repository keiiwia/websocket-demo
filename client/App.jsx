import { useState, useEffect } from "react";

export function App() {
  let [id, setId] = useState();
  let [connected, setConnected] = useState([]);
  let [messages, setMessages] = useState([]);

  let [socket, setSocket] = useState(null);

  useEffect(() => {
    let socket = "REPLACE_THIS"; // Create a websocket

    function handler({ data }) {
      let event = JSON.parse(data);

      if (event.type === "welcome") {
        // How do you respond to this
        // What other messages do you need to respond to?
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
      <input
        value={currentMessage}
        onChange={(event) => setCurrentMessage(event.target.value)}
      ></input>
      <button
        onClick={() => {
          /* Do something here */
        }}
      >
        Send
      </button>
    </>
  );
}

function Message({ sender, time, isLocal, content }) {
  return <div className={`message${isLocal ? " local" : ""}`}>
    <div className="sender">{sender}</div>
    {/* EXERCISE 4: Look up Javascript's Date object and figure out how to render this */}
    <div className="time">{time}</div>
    <p>{content}</p>
  </div>;
}

// EXERCISE 5: Add some CSS to your index.html to style things