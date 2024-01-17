import React, { useContext, useState, useEffect } from 'react';
import './Login.css';
import { UserContext } from './App';

const Login = () => {
  const defaultUsers = [
    {
      index: 1,
      name: 'Baibhav Saxena',
      userID: 'BS1',
      password: 'Baibhav@123',
    },
    {
      index: 2,
      name: 'SS',
      userID: 'SS1',
      password: 'Baibhav@123',
    },
  ];

  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const authUserList = JSON.parse(localStorage.getItem('authUserList')) || defaultUsers
  const [userList, setUserList] = useState(authUserList);

  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [successfulLogin, setSuccessfulLogin] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('authUserList', JSON.stringify(userList));
  }, [userList]);

  const toggleSignupModal = () => {
    setIsSignupModalOpen(!isSignupModalOpen);
  };

  const handleLogin = () => {
    let successfulLoginFlag = false;

    userList.map((item) => {
      if (
        item.userID.toLowerCase() === userName.toLowerCase() &&
        item.password === userPassword
      ) {
        console.log('User is verified');
        successfulLoginFlag = true;
        return setIsLoggedIn(true);
      }
      return null;
    });

    if (!successfulLoginFlag) {
      alert('Invalid username or password');
    }

    setUserPassword('');
    setUserName('');
  };

  const handleSignupSubmit = (event) => {
      event.preventDefault();
      const newUser = {
          index: authUserList.length + 1,
          name: event.target?.[0].value,
          userID:event.target?.[1].value,
          password: event.target?.[2].value,
      }
      setUserList([...userList, newUser])
    // localStorage.setItem('authUserList', JSON.stringify(userList));

    setIsSignupModalOpen(false);
};
console.log('userList1',userList)

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <label>User ID</label>
        <input
          type="string"
          placeholder="Enter user id"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <br />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <button onClick={handleLogin} disabled={userName.length === 0}>
          Login
        </button>
        <button onClick={toggleSignupModal}>Sign Up</button>
      </div>

      {isSignupModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleSignupModal}>
              &times;
            </span>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignupSubmit}>
              <input type="text" placeholder="Username" required />
              <input type="text" placeholder="userID" required />
              <input type="password" placeholder="Password" required />
              <button type="submit">Sign Up</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
