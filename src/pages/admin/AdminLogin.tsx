import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const { login, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Already logged in
  if (isAuthenticated) {
    navigate("/admin/dashboard", { replace: true });
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const success = login(email, password);
      if (success) {
        navigate("/admin/dashboard", { replace: true });
      } else {
        setError("Invalid email or password.");
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg border border-stone-200 p-8">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-stone-900 rounded-full flex items-center justify-center mb-3">
            <ShieldCheck size={24} className="text-amber-400" />
          </div>
          <h1 className="font-playfair text-2xl font-bold text-stone-900">
            Bambika Admin
          </h1>
          <p className="text-sm text-stone-500 mt-1">Sign in to your admin panel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-stone-700 text-sm">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@bambika.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="border-stone-300 focus:border-amber-500 focus:ring-amber-500/20"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-stone-700 text-sm">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="border-stone-300 focus:border-amber-500 focus:ring-amber-500/20 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-md px-3 py-2">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-stone-900 hover:bg-stone-800 text-white"
          >
            {loading ? "Signing in…" : "Sign In"}
          </Button>
        </form>

        <p className="text-center text-xs text-stone-400 mt-6">
          This area is restricted to authorised personnel only.
        </p>
      </div>
    </div>
  );
}
