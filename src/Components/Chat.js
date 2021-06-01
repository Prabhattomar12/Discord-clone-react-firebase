import React, { useState, useEffect } from 'react';
import './chat.css';
import { useSelector } from 'react-redux';
import ChatHeader from './ChatHeader';
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
import GifTwoToneIcon from '@material-ui/icons/GifTwoTone';
import CardGiftcardTwoToneIcon from '@material-ui/icons/CardGiftcardTwoTone';
import EmojiEmotionsTwoToneIcon from '@material-ui/icons/EmojiEmotionsTwoTone';
import Message from './Message';
import { selectChannelId, selectChannelName } from '../features/appSlice';
import db from '../firebase';
import firebase from 'firebase';
import { isPlainObject } from '@reduxjs/toolkit';
import { selectUser } from '../features/userSlice';

function Chat() {
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  console.log(channelId, channelName);

  useEffect(() => {
    if (channelId) {
      db.collection('channels')
        .doc(channelId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) => {
          console.log('snapshot ', snapshot);
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [channelId]);

  console.log('messages ', messages);

  const postMessage = (e) => {
    e.preventDefault();

    if (input !== '' && channelId) {
      db.collection('channels').doc(channelId).collection('messages').add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        text: input,
        username: user.username,
        photo: user.photo,
      });
    }

    setInput('');
  };

  return (
    <div className='chat'>
      <ChatHeader channelName={channelName} />

      <div className='chat_messages'>
        {messages.map(({ username, text, photo, timestamp }, idx) => (
          <Message
            key={idx}
            username={username}
            text={text}
            timestamp={timestamp}
            photo={photo}
          />
        ))}
      </div>

      <div className='chat_input'>
        <AddCircleOutlineTwoToneIcon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type='text'
            placeholder={'Type Message'}
          />
          <button onClick={postMessage} type='submit'>
            send
          </button>
        </form>
        <div className='chatInput_icons'>
          <CardGiftcardTwoToneIcon />
          <GifTwoToneIcon />
          <EmojiEmotionsTwoToneIcon />
        </div>
      </div>
    </div>
  );
}

export default Chat;
