# Chatbot Application

## Features

- Email Sign In/Sign Up using Nhost Auth
- Real-time chat system (Hasura GraphQL queries, mutations, subscriptions)
- Chatbot powered by n8n workflow and OpenRouter API
- Row-Level Security: users can only access their own chats/messages

## Tech Stack

- **Frontend:** React, Apollo Client, @nhost/react
- **Backend:** Nhost (Hasura + Auth)
- **Bot:** n8n workflow + OpenRouter API

## Setup Instructions

### 1. Nhost & Hasura

- Create a project at [Nhost](https://console.nhost.io/)
- Enable Email/Password authentication
- In Hasura Console, create `chats` and `messages` tables:
  - `chats`: `id`, `user_id`, `title`, `created_at`
  - `messages`: `id`, `chat_id`, `user_id`, `content`, `role`, `created_at`
- Set permissions for `user` role:
  - `chats`: `{ user_id: { _eq: "X-Hasura-User-Id" } }`
  - `messages`: `{ chat: { user_id: { _eq: "X-Hasura-User-Id" } } }`
- Create an object relationship `chat` on `messages` (`chat_id` → `chats.id`)

### 2. Hasura Action

- Define the `sendMessage` Action in Hasura:
  ```graphql
  type Mutation {
    sendMessage(chat_id: uuid!, content: String!): ChatbotResponse!
  }

  type ChatbotResponse {
    reply: String!
  }
  ```
- Set the handler to your n8n webhook URL
- Set permissions: only `user` role

### 3. n8n Workflow

- Create a workflow with a Webhook node (POST)
- Validate user owns the chat via Hasura GraphQL
- Call OpenRouter API for chatbot response
- Insert bot reply into `messages` via Hasura GraphQL
- Return reply to Hasura

### 4. Frontend

- Clone this repo
- Install dependencies:
  ```sh
  npm install
  ```
- Update `/src/nhost.js` with your Nhost subdomain and region
- Run locally:
  ```sh
  npm start
  ```
- Deploy to Netlify for production

## Usage

1. Sign up or log in with your email
2. Create a new chat
3. Send messages and receive real-time bot replies

## Submission

```
Name: [Your Name]
Contact: [Your Contact]
Deployed: [Your Netlify Link]
```

---

**Demo:**  
Deployed: [your-netlify-link]

---

## License

