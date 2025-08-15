import React, { useState } from 'react';
import { NhostReactProvider, useAuthenticationStatus } from '@nhost/react';
import { ApolloProvider } from '@apollo/client';
import { nhost } from './nhost';
import { client } from './apollo';
import { Login, Signup, Logout } from './Auth';
import ChatList from './ChatList';
import ChatView from './ChatView';
import SendMessage from './SendMessage';
import NewChat from './NewChat';

function MainApp() {
  const { isAuthenticated } = useAuthenticationStatus();
  const [chatId, setChatId] = useState(null);
  const [showSignup, setShowSignup] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="card p-4 shadow" style={{ minWidth: 350 }}>
          {showSignup ? (
            <>
              <Signup />
              <button
                className="btn btn-link mt-2"
                onClick={() => setShowSignup(false)}
              >
                Already have an account? Sign In
              </button>
            </>
          ) : (
            <>
              <Login />
              <button
                className="btn btn-link mt-2"
                onClick={() => setShowSignup(true)}
              >
                New user? Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col items-center justify-center animate-fadeIn">
      <Logout />
      <NewChat onCreated={setChatId} />
      <ChatList onSelect={setChatId} />
      {chatId && (
        <div className="w-full max-w-xl mt-4 p-4 bg-white rounded-lg shadow-lg animate-slideUp">
          <ChatView chatId={chatId} />
          <SendMessage chatId={chatId} />
        </div>
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