import React, { useState, useEffect } from 'react';
import './sidebar.css';
import { useSelector } from 'react-redux';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import SidebarChannel from './SidebarChannel';
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import InfoIcon from '@material-ui/icons/Info';
import CallIcon from '@material-ui/icons/Call';
import { Avatar } from '@material-ui/core';
import MicIcon from '@material-ui/icons/Mic';
import HeadsetIcon from '@material-ui/icons/Headset';
import SettingsIcon from '@material-ui/icons/Settings';
import { selectUser } from '../features/userSlice';
import db, { auth } from '../firebase';

function Sidebar() {
  const user = useSelector(selectUser);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    db.collection('channels').onSnapshot((snapshot) => {
      setChannels(
        snapshot.docs.map((doc) => ({ id: doc.id, channel: doc.data() }))
      );
    });
  }, []);

  const addChannel = () => {
    const newChannel = prompt('Enter new channel name');
    if (newChannel) {
      db.collection('channels').add({
        channelName: newChannel,
      });
    }
  };
  console.log('channels ', channels);
  return (
    <div className='sidebar'>
      <div className='sidebar_top'>
        <h2>{user.username}</h2>
        <ExpandMoreIcon />
      </div>

      <div className='sidebar_channels'>
        <div className='sidebar_addChannel_row'>
          <div className='sidebar_addChannel_row_left'>
            <ExpandMoreIcon />
            <h3>Add Channel</h3>
          </div>

          <AddIcon onClick={addChannel} className='add_icon' />
        </div>

        <div className='sidebar_channel_list'>
          {channels.map(({ id, channel }) => (
            <SidebarChannel key={id} id={id} channelName={channel.channelName} />
          ))}
        </div>
      </div>

      <div className='sidebar_voice'>
        <SignalCellularAltIcon className='voice_signal_icon' fontSize='large' />
        <div className='voice_info'>
          <h3>Voice Connected</h3>
          <p>Stream</p>
        </div>
        <div className='voice_icons'>
          <InfoIcon />
          <CallIcon />
        </div>
      </div>

      <div className='sidebar_profile'>
        <Avatar onClick={() => auth.signOut()} src={user?.photo} />
        <div className='profile_info'>
          <h3>{user?.username}</h3>
          <p>{user?.uid?.substring(0, 5)}</p>
        </div>
        <div className='profile_icons'>
          <MicIcon />
          <HeadsetIcon />
          <SettingsIcon />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
