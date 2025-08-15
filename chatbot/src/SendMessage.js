import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';

const SEND_MESSAGE = gql`
  mutation SendMessage($chat_id: uuid!, $content: String!) {
    sendMessage(chat_id: $chat_id, content: $content) {
      reply
    }
  }
`;

export default function SendMessage({ chatId }) {
  const [content, setContent] = useState('');
  const [sendMessage, { loading }] = useMutation(SEND_MESSAGE);

  const handleSend = async () => {
    if (!content) return;
    await sendMessage({ variables: { chat_id: chatId, content } });
    setContent('');
  };

  return (
    <div>
      <input value={content} onChange={e => setContent(e.target.value)} />
      <button onClick={handleSend} disabled={loading}>Send</button>
    </div>
  );
}