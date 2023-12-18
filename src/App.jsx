import React from "react";
import { BrowserRouter } from "react-router-dom";
import RouteList from "./RouteList";
import EventContextProvider from "./store/Events";
import ChatContextProvider from "./store/Chat";
import ProfileContextProvider from "./store/Profile";

function App() {
  return (
    <EventContextProvider>
      <ChatContextProvider>
        <ProfileContextProvider>
          <BrowserRouter>
            <RouteList />
          </BrowserRouter>
        </ProfileContextProvider>
      </ChatContextProvider>
    </EventContextProvider>
  );
}

export default App;
