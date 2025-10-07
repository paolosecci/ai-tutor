'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn('credentials', { email, password, redirect: false });
    if (res?.ok) {
      router.push('/dashboard');
    } else {
      setError('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Login</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="border p-2 mb-2 w-full"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="border p-2 mb-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 w-full">Login</button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}