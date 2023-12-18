import React, { useContext, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import { ChatContext } from "../../store/Chat";

export default function ContactList({ onContact }) {
  const { loadContacts, contacts } = useContext(ChatContext);

  useEffect(() => {
    if (!contacts.length) {
      loadContacts();
    }
  }, [contacts, loadContacts]);

  return (
    <div className="flex-none w-1/4 bg-gray-200 p-4 overflow-y-auto">
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className="mb-4 cursor-pointer"
          onClick={() => onContact(contact)}
        >
          <div className="flex items-center">
            <Avatar
              src={contact.avatar}
              alt={contact.username}
              className="w-10 h-10 rounded-full mr-4"
            />
            <div>
              <p className="font-bold">{contact.username}</p>
              {/*   <p className="text-gray-500">{contact.lastMessage}</p> */}
            </div>
          </div>
          {/* <p className="text-gray-500 text-sm text-right">
            {contact.lastMessageTime}
          </p> */}
        </div>
      ))}
    </div>
  );
}
