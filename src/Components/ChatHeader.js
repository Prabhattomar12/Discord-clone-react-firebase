import React from 'react';
import './chatHeader.css';
import NotificationsIcon from '@material-ui/icons/Notifications';
import EditLocationIcon from '@material-ui/icons/EditLocation';
import SearchIcon from '@material-ui/icons/Search';
import HelpRoundedIcon from '@material-ui/icons/HelpRounded';
import GroupIcon from '@material-ui/icons/Group';
import SendRoundedIcon from '@material-ui/icons/SendRounded';

function ChatHeader({ channelName }) {
  return (
    <div className='chatHeader'>
      <div className='chatHeader_left'>
        <h3>
          <span>#</span>
          {channelName}
        </h3>
      </div>

      <div className='chatHeader_right'>
        <NotificationsIcon />
        <EditLocationIcon />
        <GroupIcon />
        <div className='chatHeader_search'>
          <input type='text' placeholder='Search' />
          <SearchIcon />
        </div>
        <SendRoundedIcon />
        <HelpRoundedIcon />
      </div>
    </div>
  );
}

export default ChatHeader;
