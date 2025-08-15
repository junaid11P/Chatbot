import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';

const CREATE_CHAT = gql`
  mutation CreateChat($title: String!) {
    insert_chats_one(object: {title: $title}) {
      id
    }
  }
`;

export default function NewChat({ onCreated }) {
  const [title, setTitle] = useState('');
  const [createChat] = useMutation(CREATE_CHAT);

  const handleCreate = async () => {
    const { data } = await createChat({ variables: { title } });
    onCreated(data.insert_chats_one.id);
  };

  return (
    <div>
      <input value={title} onChange={e => setTitle(e.target.value)} />
      <button onClick={handleCreate}>New Chat</button>
    </div>
  );
}