import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { At, Password } from 'phosphor-react';
import { defaultIconConfig as ic } from '../helpers';
import {
  saveMealsToken, saveCocktailsToken, saveUser,
} from '../services/LocalStorageManager';
import LabeledInput from '../components/LabeledInput';

type State = {
  email: string;
  password: string;
};

function LoginPage(): JSX.Element {
  const [input, setInput] = useState<State>({ email: '', password: '' });
  const navigate = useNavigate();

  const isLoginValid = (): boolean => {
    // Regex taken from https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
    const EMAIL_VALIDATION_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const PW_MINIMUM_LENGTH = 6;
    const { email, password } = input;
    return EMAIL_VALIDATION_REGEX.test(email)
      && password.length >= PW_MINIMUM_LENGTH;
  };

  const submitLogin = (): void => {
    // Fetch user credentials. If valid, proceed.
    // Fetch user tokens.
    saveUser(input.email);
    saveCocktailsToken('1');
    saveMealsToken('1');
    navigate('/meals');
  };

  const onInputChange = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    setInput({
      ...input,
      [target.name]: target.value,
    });
  };

  const onEnterPressed = ({ code }: KeyboardEvent<HTMLInputElement>): void => {
    if (code === 'Enter' || code === 'NumpadEnter') { submitLogin(); }
  };

  return (
    <main className="login-page">
      <h1>Login</h1>
      <LabeledInput
        parentClassName="email-input"
        label={<At weight={ic.weight} size={ic.size} color={ic.color} />}
        name="email"
        type="email"
        placeholder="Email"
        onChange={onInputChange}
        onKeyDown={onEnterPressed}
      />
      <LabeledInput
        parentClassName="password-input"
        label={<Password weight={ic.weight} size={ic.size} color={ic.color} />}
        name="password"
        type="password"
        placeholder="Password"
        onChange={onInputChange}
        onKeyDown={onEnterPressed}
      />
      <button
        className="button-padded"
        type="button"
        disabled={!isLoginValid()}
        onClick={submitLogin}
      >
        Enter
      </button>
    </main>
  );
}

export default LoginPage;
