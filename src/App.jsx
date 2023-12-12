import React from "react";
import { BrowserRouter } from "react-router-dom";
import RouteList from "./RouteList";
import EventContextProvider from "./store/Events";
import ChatContextProvider from "./store/Chat";

function App() {
  return (
    <EventContextProvider>
      <ChatContextProvider>
        <BrowserRouter>
          <RouteList />
        </BrowserRouter>
      </ChatContextProvider>
    </EventContextProvider>
  );
}

export default App;
