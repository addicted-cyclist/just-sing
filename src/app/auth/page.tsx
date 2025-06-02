"use client";

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (isLogin) {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push('/dashboard');
      }
    } else {
      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
          });

          if (result?.error) {
            setError(result.error);
          } else {
            router.push('/dashboard');
          }
        } else {
          setError(data.error || 'Registration failed');
        }
      } catch (error) {
        setError('Registration failed');
      }
    }
  };

  return (
    <div>
      <h1>{isLogin ? 'Log in into your account' : 'Create a new account'}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        {isLogin && (
          <p>
            <a href="/forgot-password" style={{ fontSize: '0.8rem' }}>
              Forgot Password?
            </a>
          </p>
        )}
        <button type="submit">{isLogin ? 'Log in' : 'Sign up'}</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Create a new account' : 'Login'}
      </button>
    </div>
  );
};

export default AuthPage;
