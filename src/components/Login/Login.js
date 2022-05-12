import React, { useState, useEffect } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import { useReducer } from 'react';

const formReducer = (prevState, action) => {
  if(action.type === 'EMAIL_INPUT') {
    return {
      ...prevState,
      enteredEmail:action.emailValue,
    }
  }
  if(action.type === 'PASSWORD_INPUT') {
    return {
      ...prevState,
      enteredPassword:action.passwordValue,
    }
  }

  if(action.type === "EMAIL_BLUR") {
    return {
      ...prevState,
      emailIsValid: prevState.enteredEmail.includes('@'),
    }
  }
  if(action.type === "PASSWORD_BLUR") {
    return {
      ...prevState,
      passwordIsValid: prevState.enteredPassword.trim().length > 6,
    }
  }
//  return {
//    enteredEmail:'',
//    enteredPassword:'',
//    emailIsValid:'',
//    passwordIsValid:''
//  }

}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [formState, dispatchForm] = useReducer(formReducer, {
    enteredEmail: '',
    emailIsValid: '',
    enteredPassword: '',
    passwordIsValid: '',
  })

  //debouncing, debounce

  useEffect(() => {

    const timer = setTimeout(() => {
      // setFormIsValid(enteredEmail.includes('@') && 
      // enteredPassword.trim().length > 6);
      setFormIsValid(formState.enteredEmail.includes('@') && formState.enteredPassword.trim().length > 6)
    }, 500)

    //clean up function - возвращает useEffect
    return () => {
      clearTimeout(timer)
    }
    
  }, [formState.enteredEmail, formState.enteredPassword])

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchForm({type: 'EMAIL_INPUT', emailValue: event.target.value} )
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchForm({type: 'PASSWORD_INPUT', passwordValue: event.target.value})
  };

  // const formChangeHandler = event => {
  //   dispatchForm({type: 'INPUT_USER', formValue: event.target.value})
  // }

  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes('@'));
    dispatchForm({type: "EMAIL_BLUR"})
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchForm({type: "PASSWORD_BLUR"})
  };

  // const validateFormHandler = () => {
  //   dispatchForm({type: 'INPUT_BLUR'})
  // }

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(formState.enteredEmail, formState.enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            formState.emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={formState.enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            formState.passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formState.enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
