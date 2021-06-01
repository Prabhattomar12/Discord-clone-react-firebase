import { Button } from '@material-ui/core';
import React from 'react';
import './login.css';
import { auth, provider } from '../firebase';

function Login() {

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => console.log(result.user))
      .catch((error) => alert(error.message));
  };

  return (
    <div className='login'>
      <div className='login_'>
        <img src='https://www.pngitem.com/pimgs/m/519-5191479_join-discord-hd-png-download.png' />
      </div>
      <Button onClick={signIn}>Sign In With Google</Button>
    </div>
  );
}

export default Login;
