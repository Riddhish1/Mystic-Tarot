import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface LoginFormProps {
  onSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    const success = login(email, password);
    
    if (success) {
      onSuccess();
    } else {
      setError('Invalid credentials. Try user@example.com / 123456');
    }
  };
  
  return (
    <div className="w-full max-w-md p-8 rounded-xl bg-gradient-to-br from-indigo-900/80 to-purple-900/80 backdrop-blur-md shadow-2xl border border-indigo-700/30">
      <h2 className="text-2xl font-bold text-center mb-6 text-white">Enter The Mystical Realm</h2>
      
      {error && (
        <div className="mb-4 p-2 bg-red-500/20 border border-red-500/50 rounded-md text-red-100 text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-indigo-200">
            Email
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-indigo-800/50 border border-indigo-600/50 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
              placeholder="user@example.com"
            />
            <div className="absolute inset-0 rounded-md pointer-events-none transition-opacity opacity-0 hover:opacity-100 focus-within:opacity-100">
              <div className="absolute inset-[-1px] rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-x"></div>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-indigo-200">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-indigo-800/50 border border-indigo-600/50 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
              placeholder="123456"
            />
            <div className="absolute inset-0 rounded-md pointer-events-none transition-opacity opacity-0 hover:opacity-100 focus-within:opacity-100">
              <div className="absolute inset-[-1px] rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-x"></div>
            </div>
          </div>
        </div>
        
        <div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-md hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 shadow-lg shadow-purple-700/30 transition-all duration-300 transform hover:scale-105"
          >
            Enter
          </button>
        </div>
      </form>
      
      <p className="mt-4 text-sm text-center text-indigo-300">
        Hint: Use <span className="text-indigo-200 font-medium">user@example.com</span> and <span className="text-indigo-200 font-medium">123456</span>
      </p>
    </div>
  );
};

export default LoginForm;