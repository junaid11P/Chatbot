import { useSignInEmailPassword, useSignUpEmailPassword, useAuth } from '@nhost/react';
import { useState } from 'react';

export function Login() {
  const { signInEmailPassword, isLoading, error } = useSignInEmailPassword();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async () => {
    await signInEmailPassword(email, password);
  };
  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin} disabled={isLoading}>Login</button>
      {error && <div>{error.message}</div>}
    </div>
  );
}

export function Signup() {
  const { signUpEmailPassword, isLoading, error } = useSignUpEmailPassword();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSignup = async () => {
    await signUpEmailPassword(email, password);
  };
  return (
    <div>
      <h2>Sign Up</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleSignup} disabled={isLoading}>Sign Up</button>
      {error && <div>{error.message}</div>}
    </div>
  );
}

export function Logout() {
  const { signOut } = useAuth();
  return <button onClick={signOut}>Logout</button>;
}