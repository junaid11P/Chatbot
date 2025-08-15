import { gql, useQuery } from '@apollo/client';

const CHATS_QUERY = gql`
  query MyChats {
    chats(order_by: {created_at: desc}) {
      id
      title
      created_at
    }
  }
`;

export default function ChatList({ onSelect }) {
  const { data, loading } = useQuery(CHATS_QUERY);
  if (loading) return <div>Loading...</div>;
  return (
    <ul>
      {data.chats.map(chat => (
        <li key={chat.id} onClick={() => onSelect(chat.id)}>{chat.title}</li>
      ))}
    </ul>
  );
}