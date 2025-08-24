import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";

export default function Login() {
  const [show, setShow] = useState(false);

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to manage your registrations and keep up with the latest events."
      footer={
        <>
          Don’t have an account?{" "}
          <Link to="/signup" className="font-semibold text-indigo-600 hover:underline">
            Create one
          </Link>
        </>
      }
    >
      <form className="space-y-4">
        <div>
          <input
            type="email"
            required
            placeholder="you@aust.edu"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
          />
        </div>

        <div>
          <div className="mt-1 relative">
            <input
              type={show ? "text" : "password"}
              required
              placeholder="••••••••"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 pr-10 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 text-xs hover:text-slate-700"
              aria-label="Toggle password visibility"
            >
              {show ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="inline-flex items-center gap-2 text-slate-700">
            <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-indigo-600" />
            Remember me
          </label>
          <Link to="/forgot" className="font-medium text-indigo-600 hover:underline">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-indigo-600 py-2.5 text-white font-semibold shadow hover:bg-indigo-700"
        >
          Log In
        </button>

        {/* Divider */}
        <div className="relative my-3">
          <div className="h-px bg-slate-200" />
          <span className="absolute left-1/2 -translate-x-1/2 -top-2 bg-white px-2 text-[11px] text-slate-500">
            or continue with
          </span>
        </div>

        {/* Social buttons (optional) */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="rounded-xl border border-slate-300 bg-white py-2 text-sm font-semibold hover:bg-slate-50"
          >
            Google
          </button>
          <button
            type="button"
            className="rounded-xl border border-slate-300 bg-white py-2 text-sm font-semibold hover:bg-slate-50"
          >
            GitHub
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
