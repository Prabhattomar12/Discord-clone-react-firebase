import { Avatar } from '@material-ui/core';
import React from 'react';
import './message.css';
function Message({ photo, timestamp, text, username }) {
  return (
    <div className='message'>
      <Avatar src={photo} />
      <div className='message_info'>
        <h3>
          {username}
          <span>{new Date(timestamp?.toDate()).toUTCString()}</span>
        </h3>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default Message;
