'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, LogIn, Mail, Lock, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login gagal');
      }

      // Redirect ke dashboard setelah login berhasil
      router.push('/dashboard');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-primary/5 via-background to-accent/5 p-3 sm:p-4 md:p-6">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl overflow-hidden">
          <div className="bg-linear-to-r from-primary to-primary/80 p-6 sm:p-8 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-foreground rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
              <LogIn className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-primary-foreground mb-1 sm:mb-2">
              Selamat Datang
            </h1>
            <p className="text-primary-foreground/90 text-xs sm:text-sm">
             login dulu lort
            </p>
          </div>

          <div className="p-5 sm:p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {error && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-lg p-3 sm:p-4 flex items-start gap-2 sm:gap-3 animate-shake">
                  <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 shrink-0" />
                  <p className="text-xs sm:text-sm">{error}</p>
                </div>
              )}

              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="email" className="text-sm sm:text-base text-foreground font-semibold">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="nama@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="pl-9 sm:pl-10 h-10 sm:h-12 text-sm sm:text-base border-2 focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="password" className="text-sm sm:text-base text-foreground font-semibold">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="pl-9 sm:pl-10 pr-9 sm:pr-10 h-10 sm:h-12 text-sm sm:text-base border-2 focus:border-primary transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-10 sm:h-12 text-sm sm:text-base font-semibold bg-linear-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all mt-6"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    <span>Memproses...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <LogIn className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Masuk</span>
                  </div>
                )}
              </Button>
            </form>

            <div className="relative my-6 sm:my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs sm:text-sm">
                <span className="px-3 sm:px-4 bg-card text-muted-foreground">
                  Belum punya akun?
                </span>
              </div>
            </div>

            <div className="text-center">
              <Link href="/register">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-10 sm:h-12 text-sm sm:text-base font-semibold border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                >
                  Daftar Sekarang
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <p className="text-center text-xs sm:text-sm text-muted-foreground mt-4 sm:mt-6 px-4">
          © 2025 Childcare Staffing. All rights reserved.
        </p>
      </div>
    </div>
  );
}
