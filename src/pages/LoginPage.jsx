import React from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';

const submitLogin = () => {

};

function LoginPage() {
  return (
    <div className="page-container login-page">
      <section className="page-content">
        <h1>Login</h1>
        <InputField type="email" placeholder="Email" />
        <InputField type="password" placeholder="Password" />
        <Button type="button" text="Enter" onClick={submitLogin} />
      </section>
    </div>

  );
}

export default LoginPage;
