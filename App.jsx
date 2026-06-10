import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "peerjs";
const socket = io("http://localhost:5000");

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [joinRoomId, setJoinRoomId] = useState("");
  const [connectionStatus, setConnectionStatus] = useState("Not Connected");
  const [myPeerId, setMyPeerId] = useState("");
  const [targetPeerId, setTargetPeerId] = useState("");
  const [connection, setConnection] = useState(null);
  const [peer, setPeer] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
  const myPeer = new Peer();

  myPeer.on("open", (id) => {
    console.log("My Peer ID:", id);
    setMyPeerId(id);
    setPeer(myPeer);
  });

  myPeer.on("connection", (conn) => {
    console.log("Incoming connection");

    setConnection(conn);
    setConnectionStatus("Connected");

    conn.on("data", (data) => {
      console.log("Received:", data);

      if (typeof data === "object" && data.fileData) {
        const link = document.createElement("a");

        link.href = data.fileData;
        link.download = data.fileName;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setReceivedMessage(`Received file: ${data.fileName}`);
      } else {
        setReceivedMessage(
          typeof data === "string"
            ? data
            : JSON.stringify(data)
        );
      }
    });
  });

  return () => {
    myPeer.destroy();
  };
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

const connectToPeer = () => {
  if (!peer) return;

  const conn = peer.connect(targetPeerId);

  conn.on("open", () => {
    console.log("Connected!");
    setConnectionStatus("Connected");
    setConnection(conn);

    conn.send("Hello from sender!");
  });

  conn.on("data", (data) => {
  console.log("Received:", data);

if (typeof data === "object" && data.fileData) {
  const link = document.createElement("a");

  link.href = data.fileData;
  link.download = data.fileName;

  link.click();

  setReceivedMessage(`Received file: ${data.fileName}`);
} 
else {
  setReceivedMessage(
    typeof data === "string"
      ? data
      : JSON.stringify(data)
  );
}
});
};
const sendFile = () => {
  if (!selectedFile || !connection) {
    alert("Select a file and connect first!");
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    connection.send({
      fileName: selectedFile.name,
      fileData: reader.result,
    });

    console.log("File sent!");
    setProgress(100);
  };

  reader.readAsDataURL(selectedFile);
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
          <button
  onClick={sendFile}
  style={{
    padding: "12px 24px",
    marginTop: "20px",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  Send File
</button>
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
<div style={{ marginTop: "20px" }}>
  <h3>Status</h3>
  <p>{connectionStatus}</p>

  <h3>Transfer Progress</h3>

  <div
    style={{
      width: "300px",
      height: "20px",
      border: "1px solid white",
      margin: "auto",
    }}
  >
    <div
      style={{
        width: `${progress}%`,
        height: "100%",
        backgroundColor: "limegreen",
      }}
    />
  </div>

  <p>{progress}%</p>

  <h3>Received Message</h3>
<p>{receivedMessage}</p>
</div>
<div style={{ marginTop: "20px" }}>
  <h3>My Peer ID</h3>
  <p>{myPeerId}</p>
</div>
<div style={{ marginTop: "20px" }}>
  <h3>Connect To Peer</h3>

  <input
    type="text"
    placeholder="Enter Peer ID"
    value={targetPeerId}
    onChange={(e) => setTargetPeerId(e.target.value)}
    style={{
      padding: "12px",
      width: "300px",
      borderRadius: "8px",
      marginRight: "10px",
    }}
  />

  <button onClick={connectToPeer}>
  Connect
</button>
</div>
      </div>
    </div>
  );
}

export default App;