import { gql, useSubscription } from '@apollo/client';

const MESSAGES_SUB = gql`
  subscription ChatMessages($chat_id: uuid!) {
    messages(where: {chat_id: {_eq: $chat_id}}, order_by: {created_at: asc}) {
      id
      content
      role
      created_at
    }
  }
`;

export default function ChatView({ chatId }) {
  const { data, loading } = useSubscription(MESSAGES_SUB, { variables: { chat_id: chatId } });
  if (loading) return <div>Loading...</div>;
  return (
    <div>
      {data.messages.map(msg => (
        <div key={msg.id} style={{ textAlign: msg.role === 'user' ? 'right' : 'left' }}>
          <b>{msg.role}:</b> {msg.content}
        </div>
      ))}
    </div>
  );
}