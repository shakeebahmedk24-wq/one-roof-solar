import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';

export function AdminLogin() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/admin');
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/admin');
    } catch (error) {
      console.error('Login failed', error);
      alert('Login failed. Please check console for details.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 max-w-sm w-full text-center">
        <h1 className="text-2xl font-display font-semibold mb-2">Admin Login</h1>
        <p className="text-slate-600 mb-8 text-sm">Sign in to manage Oneroof Solar content.</p>
        <button 
          onClick={handleLogin}
          className="w-full py-3 bg-brand-500 text-white rounded-lg font-medium hover:bg-brand-600 transition"
        >
          Sign In with Google
        </button>
        <p className="text-xs text-slate-500 mt-6">Only authorized admins can make changes.</p>
      </div>
    </div>
  );
}
