import React, { useState } from 'react';
import Login from '../../Login Page/LoginPage';
import SignUp from '../../Signup Page/SignupPage';

const Auth = () => {
  const [newUser, setNewUser] = useState(false);
  return (
    <>
      {newUser ? (
        <SignUp setNewUser={setNewUser} />
      ) : (
        <Login setNewUser={setNewUser} />
      )}
    </>
  );
};

export default Auth;