import React, { useContext, useState } from "react";
import ContactList from "./ContactList";
import Message from "./Message";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { ChatContext } from "../../store/Chat";
import { getMyUser } from "../../hooks/UseMyUser";
import { formatDate } from "../../utils/utils";
const opciones = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  timeZoneName: "short",
};
export default function ChatComponent() {
  const [newMessage, setNewMessage] = useState("");
  const [receiver, setReceiver] = useState({});

  const user = getMyUser();

  const { loadChat, messages, sendMessage } = useContext(ChatContext);

  const handleContactClick = (contact) => {
    loadChat(user.id, contact.id);
    setReceiver(contact);
  };

  const submitHandler = () => {
    try {
      sendMessage(newMessage, user.id, receiver.id);
      loadChat(user.id, receiver.id);
      setReceiver(null);
      setNewMessage("");
    } catch (error) {}
  };
  return (
    <div className="flex h-[85vh]">
      <ContactList onContact={handleContactClick} />
      <div className="flex flex-col justify-between w-full border">
        <div className="flex items-center p-4 border-b-2">
          <img
            src={receiver.avatar}
            alt="Avatar"
            className="w-10 h-10 rounded-full mr-4"
          />
          <p className="font-bold">{receiver.username}</p>
        </div>
        <div className="flex-1  h-fit bg-gray-100 p-4 overflow-y-auto">
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
          <div className="flex items-center">
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
          </div>
        </div>
      </div>
    </div>
  );
}
