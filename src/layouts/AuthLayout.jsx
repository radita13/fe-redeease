import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-container-low text-on-surface">
      <div className="w-full max-w-md p-6 bg-surface rounded-3xl border border-outline-variant/30 shadow-xl">
        <Outlet />
      </div>
    </div>
  );
}
