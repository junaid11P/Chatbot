import React, { useState } from 'react';
import { NhostReactProvider, useAuth } from '@nhost/react';
import { ApolloProvider } from '@apollo/client';
import { nhost } from './nhost';
import { client } from './apollo';
import { Login, Signup, Logout } from './Auth';
import ChatList from './ChatList';
import ChatView from './ChatView';
import SendMessage from './SendMessage';
import NewChat from './NewChat';

function MainApp() {
  const { isAuthenticated } = useAuth();
  const [chatId, setChatId] = useState(null);

  if (!isAuthenticated) {
    return (
      <div>
        <Login />
        <Signup />
      </div>
    );
  }

  return (
    <div>
      <Logout />
      <NewChat onCreated={setChatId} />
      <ChatList onSelect={setChatId} />
      {chatId && (
        <>
          <ChatView chatId={chatId} />
          <SendMessage chatId={chatId} />
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <NhostReactProvider nhost={nhost}>
      <ApolloProvider client={client}>
        <MainApp />
      </ApolloProvider>
    </NhostReactProvider>
  );
}