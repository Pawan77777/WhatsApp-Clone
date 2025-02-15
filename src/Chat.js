import React, { useEffect, useState } from "react";
import "./Chat.css";
import { useParams, useSearchParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { InsertEmoticon, Mic, MicExternalOn } from "@mui/icons-material";
import db from "./firebase";
import {
  collection,
  doc,
  query,
  orderBy,
  onSnapshot,
  FieldValue,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useStateValue } from "./StateProvider";

function Chat() {
  const [{ user }, dispatch] = useStateValue();
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const { roomId } = useParams();
  useEffect(() => {
    if (roomId) {
      const roomRef = doc(db, "rooms", roomId);

      const unsubscribeRoom = onSnapshot(roomRef, (snapshot) => {
        if (snapshot.exists()) {
          setRoomName(snapshot.data().name);
        }
      });

      const messagesQuery = query(
        collection(db, "rooms", roomId, "messages"),
        orderBy("timestamp", "asc")
      );
      const unsubscribeMessages = onSnapshot(messagesQuery, (snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });

      return () => {
        unsubscribeRoom();
        unsubscribeMessages();
      };
    }
  }, [roomId]);
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input) return;

    try {
      await addDoc(collection(db, "rooms", roomId, "messages"), {
        message: input,
        name: user.displayName,
        timestamp: serverTimestamp(),
      });
      setInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar
          src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${seed}`}
        />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            last seen{" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton>
            <AttachFileOutlinedIcon />
          </IconButton>
          <IconButton>
            <MoreVertOutlinedIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message) => (
          <p
            className={`chat_message
         ${message.name === user.displayName && "chat_reciever"}`}
          >
            <span className="chat_name">{message.name}</span>
            {message.message}
            <span className="chat_timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
          />
          <button onClick={sendMessage} type="submit">
            Send a Message
          </button>
        </form>
        <Mic />
      </div>
    </div>
  );
}

export default Chat;
