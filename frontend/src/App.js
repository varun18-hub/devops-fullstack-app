import { useState, useEffect } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const backendURL = "/api";

  const fetchMessages = () => {
    fetch(`${backendURL}/messages`)
      .then(res => res.json())
      .then(data => setMessages(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const sendMessage = async () => {
    if (!text.trim()) return;

    await fetch(`${backendURL}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    setText("");
    fetchMessages();
  };

  return (
    <div style={styles.page}>
      <div style={styles.navbar}>
        <h2 style={{ margin: 0 }}>DevOps Cloud App 🚀</h2>
        <span style={styles.counter}>
          Messages: {messages.length}
        </span>
      </div>

      <div style={styles.container}>
        <div style={styles.card}>
          <h3 style={{ marginBottom: "15px" }}>
            Send a Message
          </h3>

          <div style={styles.inputContainer}>
            <input
              style={styles.input}
              type="text"
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Enter your message..."
            />
            <button style={styles.button} onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>

        <div style={styles.card}>
          <h3>Message Feed</h3>

          <div style={styles.feed}>
            {messages.length === 0 ? (
              <p style={{ color: "#aaa" }}>No messages yet...</p>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} style={styles.message}>
                  <div>{msg.text}</div>
                  <small style={{ color: "#888" }}>
                    ID: {msg.id}
                  </small>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0f172a",
    fontFamily: "Arial, sans-serif",
    color: "#fff"
  },
  navbar: {
    background: "#1e293b",
    padding: "15px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.3)"
  },
  counter: {
    background: "#334155",
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "14px"
  },
  container: {
    display: "flex",
    gap: "20px",
    padding: "40px",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  card: {
    background: "#1e293b",
    padding: "25px",
    borderRadius: "12px",
    width: "350px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.3)"
  },
  inputContainer: {
    display: "flex",
    marginTop: "10px"
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px 0 0 6px",
    border: "none",
    outline: "none"
  },
  button: {
    padding: "10px 18px",
    borderRadius: "0 6px 6px 0",
    border: "none",
    background: "#3b82f6",
    color: "#fff",
    cursor: "pointer"
  },
  feed: {
    marginTop: "15px",
    maxHeight: "300px",
    overflowY: "auto"
  },
  message: {
    background: "#334155",
    padding: "10px",
    borderRadius: "6px",
    marginBottom: "10px"
  }
};

export default App;

