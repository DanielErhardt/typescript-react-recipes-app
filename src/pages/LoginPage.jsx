import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKeyPress } from '../hooks/KeyboardEventListeners';
import EmailInputField from '../components/inputs/EmailInputField';
import PasswordInputField from '../components/inputs/PasswordInputField';
import {
  saveMealsToken, saveCocktailsToken, saveUser,
} from '../services/LocalStorageManager';

function LoginPage() {
  const [input, setInput] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const isLoginValid = () => {
    // Regex taken from https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
    const EMAIL_VALIDATION_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const PW_MINIMUM_LENGTH = 6;
    const { email, password } = input;
    return EMAIL_VALIDATION_REGEX.test(email)
      && password.length >= PW_MINIMUM_LENGTH;
  };

  const onInputChange = ({ target }) => {
    setInput({
      ...input,
      [target.name]: target.value,
    });
  };

  const submitLogin = () => {
    // Fetch user credentials. If valid, proceed.
    // Fetch user tokens.
    saveUser(input.email);
    saveCocktailsToken(1);
    saveMealsToken(1);
    navigate('/foods');
  };

  useKeyPress('Enter', () => isLoginValid() && submitLogin());
  useKeyPress('NumpadEnter', () => isLoginValid() && submitLogin());

  return (
    <div className="page-wrapper">
      <section className="page-content login-page-content">
        <h1>Login</h1>
        <EmailInputField
          onChange={onInputChange}
        />
        <PasswordInputField
          onChange={onInputChange}
        />
        <button
          type="button"
          disabled={!isLoginValid()}
          onClick={submitLogin}
        >
          Enter
        </button>
      </section>
    </div>
  );
}

export default LoginPage;
