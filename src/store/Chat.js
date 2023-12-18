import { createContext, useState } from "react";

export const ChatContext = createContext({
  contacts: [],
  messages: [],
  loadContacts: async () => {},
  loadChat: async (senderId, receiverId) => {},
  sendMessage: async (message, senderId, receiverId) => {},
});

function ChatContextProvider({ children }) {
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const token = sessionStorage.getItem("token");
  const loadContacts = async () => {
    const response = await fetch(`${process.env.REACT_APP_PUBLIC_URL}/guests`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    setContacts(data);
  };
  const loadChat = async (senderId, receiverId) => {
    const response = await fetch(
      `${process.env.REACT_APP_PUBLIC_URL}/chat/${senderId}/${receiverId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    setMessages(data);
  };
  const sendMessage = async (message, senderId, receiverId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_PUBLIC_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message, senderId, receiverId }),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();

      const responseLoadChat = await fetch(
        `${process.env.REACT_APP_PUBLIC_URL}/chat/${senderId}/${receiverId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newChat = await responseLoadChat.json();
      setMessages(newChat);
      return data;
    } catch (error) {
      console.log("error", error);
    }
  };

  const value = {
    contacts,
    messages,
    loadContacts,
    loadChat,
    sendMessage,
  };
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export default ChatContextProvider;
