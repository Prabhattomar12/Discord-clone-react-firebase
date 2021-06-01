import React from 'react';
import { useDispatch } from 'react-redux';
import { setChannelInfo } from '../features/appSlice';
import './sidebar_channel.css';

function SidebarChannel({ id, channelName }) {
  const dispatch = useDispatch();

  const changeChannel = () => {
    if (channelName) {
      dispatch(
        setChannelInfo({
          channelId: id,
          channelName: channelName,
        })
      );
    }
  };

  return (
    <div className='sidebar_channel' onClick={changeChannel}>
      <h4>
        <span className='channel_hash'>#</span>
        {channelName}
      </h4>
    </div>
  );
}

export default SidebarChannel;
