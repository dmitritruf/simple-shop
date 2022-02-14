import React, { useState } from 'react';
import authStore from '../store/authStore';

const RegistrationForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <div>
      <div>Registration</div>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => authStore.registration(email, password)}>
        Registration
      </button>
    </div>
  );
};

export default RegistrationForm;
