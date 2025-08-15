import { useSignInEmailPassword, useSignUpEmailPassword, useSignOut } from '@nhost/react';
import { useState } from 'react';

export function Login() {
  const { signInEmailPassword, isLoading, error } = useSignInEmailPassword();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async () => {
    await signInEmailPassword(email, password);
  };
  return (
    <div className="mb-3">
      <h2>Login</h2>
      <input className="form-control mb-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input className="form-control mb-2" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button className="btn btn-primary" onClick={handleLogin} disabled={isLoading}>Sign In</button>
      {error && <div className="text-danger mt-2">{error.message}</div>}
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
    <div className="mb-3">
      <h2>Sign Up</h2>
      <input className="form-control mb-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input className="form-control mb-2" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button className="btn btn-success" onClick={handleSignup} disabled={isLoading}>Sign Up</button>
      {error && <div className="text-danger mt-2">{error.message}</div>}
    </div>
  );
}

export function Logout() {
  const { signOut } = useSignOut();
  return <button className="btn btn-outline-secondary mb-3" onClick={signOut}>Logout</button>;
}