'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, UserPlus, Mail, Lock, User, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setIsLoading(true);

    // Validasi password
    if (formData.password !== formData.confirmPassword) {
      setError('Password dan konfirmasi password tidak cocok');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password minimal 6 karakter');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registrasi gagal');
      }

      setSuccess(true);
      
      // Redirect ke login setelah 2 detik
      setTimeout(() => {
        router.push('/login');
      }, 2000);
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
        {/* Card Container */}
        <div className="bg-card border border-border rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-linear-to-r from-primary to-primary/80 p-6 sm:p-8 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-foreground rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
              <UserPlus className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-primary-foreground mb-1 sm:mb-2">
              Buat Akun Baru
            </h1>
            <p className="text-primary-foreground/90 text-xs sm:text-sm">
              daftar lort
            </p>
          </div>

          {/* Form Section */}
          <div className="p-5 sm:p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
              {/* Error Alert */}
              {error && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-lg p-3 sm:p-4 flex items-start gap-2 sm:gap-3 animate-shake">
                  <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 shrink-0" />
                  <p className="text-xs sm:text-sm">{error}</p>
                </div>
              )}

              {/* Success Alert */}
              {success && (
                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 rounded-lg p-3 sm:p-4 flex items-start gap-2 sm:gap-3 animate-fade-in">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 shrink-0" />
                  <div className="text-xs sm:text-sm">
                    <p className="font-semibold">Registrasi berhasil!</p>
                    <p className="mt-1">Anda akan diarahkan ke halaman login...</p>
                  </div>
                </div>
              )}

              {/* Name Field */}
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="name" className="text-sm sm:text-base text-foreground font-semibold">
                  Nama Lengkap
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isLoading || success}
                    className="pl-9 sm:pl-10 h-10 sm:h-12 text-sm sm:text-base border-2 focus:border-primary transition-all"
                  />
                </div>
              </div>

              {/* Email Field */}
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
                    disabled={isLoading || success}
                    className="pl-9 sm:pl-10 h-10 sm:h-12 text-sm sm:text-base border-2 focus:border-primary transition-all"
                  />
                </div>
              </div>

              {/* Password Field */}
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
                    placeholder="Minimal 6 karakter"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={isLoading || success}
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

              {/* Confirm Password Field */}
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm sm:text-base text-foreground font-semibold">
                  Konfirmasi Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Ulangi password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    disabled={isLoading || success}
                    className="pl-9 sm:pl-10 pr-9 sm:pr-10 h-10 sm:h-12 text-sm sm:text-base border-2 focus:border-primary transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading || success}
                className="w-full h-10 sm:h-12 text-sm sm:text-base font-semibold bg-linear-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all mt-5 sm:mt-6"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    <span>Memproses...</span>
                  </div>
                ) : success ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Berhasil!</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Daftar</span>
                  </div>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6 sm:my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs sm:text-sm">
                <span className="px-3 sm:px-4 bg-card text-muted-foreground">
                  Sudah punya akun?
                </span>
              </div>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <Link href="/login">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-10 sm:h-12 text-sm sm:text-base font-semibold border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                >
                  Masuk
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs sm:text-sm text-muted-foreground mt-4 sm:mt-6 px-4">
          © 2025 Childcare Staffing. All rights reserved.
        </p>
      </div>
    </div>
  );
}
