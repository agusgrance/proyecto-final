import React, { useContext, useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Avatar from "@mui/material/Avatar";
import ContactList from "./ContactList";
import Message from "./Message";
import clsx from "clsx";
import { ChatContext } from "../../store/Chat";
import { getMyUser } from "../../hooks/UseMyUser";
import { formatDate } from "../../utils/utils";

export default function ChatComponent() {
  const [newMessage, setNewMessage] = useState("");
  const [receiver, setReceiver] = useState({});
  const messagesRef = useRef(null);
  const { loadChat, messages, sendMessage } = useContext(ChatContext);

  const user = getMyUser();

  const handleContactClick = (contact) => {
    loadChat(user.id, contact.id);
    setReceiver(contact);
  };

  const submitHandler = () => {
    try {
      sendMessage(newMessage, user.id, receiver.id);
      loadChat(user.id, receiver.id);
      setNewMessage("");
    } catch (error) {}
  };
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <div className="flex h-[85vh]">
      <ContactList onContact={handleContactClick} />
      <div
        className={clsx("flex flex-col justify-between w-full border", {
          ["hidden"]: !receiver?.id,
        })}
      >
        <div className="flex items-center p-4 border-b-2">
          <Avatar
            src={receiver.avatar}
            alt={receiver.username}
            className="w-10 h-10 rounded-full mr-4"
          />
          <p className="font-bold">{receiver.username}</p>
        </div>
        <div
          className="flex-1  h-fit bg-gray-100 p-4 overflow-y-auto"
          ref={messagesRef}
        >
          {messages?.map((message, idx) => (
            <Message
              key={idx}
              text={message.message}
              isSender={user.id === message.senderId}
              time={formatDate(new Date(message.createdAt))}
            />
          ))}
        </div>
        <div className="aboslute bottom-0">
          <form className="flex items-center">
            <TextField
              label="Escribe tu mensaje"
              variant="outlined"
              fullWidth
              size="small"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              endIcon={<SendIcon />}
              onClick={submitHandler}
              disabled={!receiver?.id || !newMessage}
            >
              Enviar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
