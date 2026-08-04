import React from 'react';
import { Link } from 'react-router-dom';
import { AlertOctagon } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-3xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mb-6">
        <AlertOctagon className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-extrabold text-slate-100 mb-2">404 - Page Not Found</h1>
      <p className="text-slate-400 text-sm max-w-md mb-6">
        The route you are trying to access does not exist or has been moved.
      </p>
      <Link
        to="/dashboard"
        className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm transition-colors shadow-lg shadow-brand-500/20"
      >
        Return to Dashboard
      </Link>
    </div>
  );
};
