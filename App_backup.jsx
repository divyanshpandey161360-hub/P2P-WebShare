import { useState, useEffect } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000");

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [joinRoomId, setJoinRoomId] = useState("");
  useEffect(() => {
  console.log("Connected to backend");
}, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file);
    }
  };
 const createRoom = () => {
  const id = Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase();

  setRoomId(id);

  socket.emit("create-room", id);

  console.log("Room Created:", id);
};
const joinRoom = () => {
  socket.emit("join-room", joinRoomId);

  console.log("Joined Room:", joinRoomId);
};

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          width: "700px",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "white" }}>
  P2P Web Share
</h1>

        <p>
          Direct Browser-to-Browser File Transfer using WebRTC
        </p>

        <div
          style={{
            border: "2px dashed #64748b",
            borderRadius: "12px",
            padding: "40px",
            marginTop: "30px",
            marginBottom: "20px",
          }}
        >
          <p>Drag & Drop File Here</p>

          <input
            type="file"
            onChange={handleFileChange}
          />

          {selectedFile && (
            <div style={{ marginTop: "20px" }}>
              <p>
                <strong>File:</strong> {selectedFile.name}
              </p>

              <p>
                <strong>Size:</strong>{" "}
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          )}
        </div>

        <button
  onClick={createRoom}
  style={{
    padding: "12px 24px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  Create Room
</button>
{roomId && (
  <div style={{ marginTop: "20px" }}>
    <h3>Room Created</h3>

    <p>
      Room ID: <strong>{roomId}</strong>
    </p>
  </div>
)}
<div style={{ marginTop: "30px" }}>
  <h3>Join Existing Room</h3>

  <input
    type="text"
    placeholder="Enter Room ID"
    value={joinRoomId}
    onChange={(e) => setJoinRoomId(e.target.value)}
    style={{
      padding: "10px",
      borderRadius: "8px",
      marginRight: "10px",
    }}
  />

  <button
    onClick={joinRoom}
    style={{
      padding: "10px 20px",
      borderRadius: "8px",
      cursor: "pointer",
    }}
  >
    Join Room
  </button>
</div>
      </div>
    </div>
  );
}

export default App;