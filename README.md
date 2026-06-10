# P2P Web Share

## Objective

P2P Web Share is a browser-to-browser file transfer application that allows users to send files directly between devices using WebRTC. The signaling server is only used for connection establishment and does not store or process file data.

## Features Implemented

- Direct Peer-to-Peer File Transfer
- Peer Connection using PeerJS (WebRTC)
- Room Creation and Joining
- File Selection and Sending
- Real-Time Connection Status
- Transfer Progress Indicator
- Browser-Based User Interface
- Socket.io Signaling Server

## Tech Stack

### Frontend
- React.js
- Vite
- PeerJS

### Backend
- Node.js
- Express.js
- Socket.io

## Project Structure

```text
P2P-WebShare/
├── client/
├── server/
```

## Installation

### Backend

```bash
cd server
npm install
node index.js
```

### Frontend

```bash
cd client
npm install
npm run dev
```

## Usage

1. Start backend server.
2. Start frontend application.
3. Open the application in two browser tabs.
4. Copy Peer ID from one tab.
5. Paste it into the other tab.
6. Click Connect.
7. Select a file.
8. Click Send File.
9. The receiver gets the file directly through the P2P connection.

## Current Status

Completed MVP:
- Peer Connection
- File Transfer
- Room Management
- Progress Indicator
- Connection Status

## Future Improvements

- Chunk-Based Transfer
- SHA-256 Verification
- End-to-End Encryption
- Multi-Peer Support
- Resume Interrupted Transfers

## Author

Divyansh Pandey
IIT Roorkee
