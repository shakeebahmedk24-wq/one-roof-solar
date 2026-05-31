import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export function AdminLayout() {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-8 text-center">Loading Admin...</div>;

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="flex h-screen bg-slate-100">
      <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col gap-6">
        <h1 className="text-xl font-bold font-display tracking-tight text-white/90">Oneroof Admin</h1>
        <nav className="flex flex-col gap-2">
          <Link to="/admin" className="px-3 py-2 rounded hover:bg-slate-800 transition">Dashboard</Link>
          <div className="text-xs uppercase font-semibold text-slate-500 mt-4 px-3">Pages</div>
          <Link to="/admin/pages/home" className="px-3 py-2 text-sm rounded hover:bg-slate-800 transition">Home Page</Link>
          <Link to="/admin/pages/about" className="px-3 py-2 text-sm rounded hover:bg-slate-800 transition">About Page</Link>
          <Link to="/admin/pages/contact" className="px-3 py-2 text-sm rounded hover:bg-slate-800 transition">Contact Page</Link>
          
          <div className="text-xs uppercase font-semibold text-slate-500 mt-4 px-3">Collections</div>
          <Link to="/admin/collections/services" className="px-3 py-2 text-sm rounded hover:bg-slate-800 transition">Services</Link>
          <Link to="/admin/collections/products" className="px-3 py-2 text-sm rounded hover:bg-slate-800 transition">Products</Link>
          <Link to="/admin/collections/systems" className="px-3 py-2 text-sm rounded hover:bg-slate-800 transition">Solar Systems</Link>
        </nav>
        <div className="mt-auto">
          <Link to="/" className="text-sm text-slate-400 hover:text-white">← Back to Site</Link>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
