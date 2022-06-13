import { useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const newPasswordInputRef = useRef();
  const history = useHistory();

  const authCtx = useContext(AuthContext)

  const tokenId = authCtx.token;

  const submitHandler = (event) => {
    event.preventDefault()

    const enteredNewPassword = newPasswordInputRef.current.value;

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDpky5gbey6T9uoW2m-BRlfqTzQzi4lj4k', {
      method: 'POST',
      body: JSON.stringify({
        idToken: tokenId,
        password: enteredNewPassword,
        returnSecureToken: true
      }), 
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      history.replace('/')
    })
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength='7' ref={newPasswordInputRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
