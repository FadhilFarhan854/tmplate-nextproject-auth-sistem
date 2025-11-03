'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, User, Mail, Shield, Calendar } from 'lucide-react';

interface UserData {
  id: number;
  name: string | null;
  email: string;
  role: string;
  isactive: boolean;
  createdAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/me');
        
        if (!response.ok) {
          router.push('/login');
          return;
        }

        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error('Failed to fetch user:', error);
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
      router.push('/login');
      router.refresh();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-muted-foreground">Memuat...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-primary/5 via-background to-accent/5">
     
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Card */}
          <div className="bg-card border border-border rounded-2xl shadow-lg p-8 mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-linear-to-r from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg">
                <User className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-foreground">
                  Selamat Datang lort, {user.name || 'User'}!
                </h2>
                <p className="text-muted-foreground">Anda berhasil login ke sistem</p>
              </div>
            </div>

            {/* User Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-muted/50 rounded-lg p-4 border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-semibold text-foreground">{user.email}</p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Role</p>
                    <p className="font-semibold text-foreground capitalize">{user.role}</p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className="font-semibold text-foreground">
                      {user.isactive ? (
                        <span className="text-green-600 dark:text-green-400">Aktif</span>
                      ) : (
                        <span className="text-destructive">Tidak Aktif</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Terdaftar Sejak</p>
                    <p className="font-semibold text-foreground">
                      {new Date(user.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-linear-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-foreground mb-2">
              Template geming
            </h3>
            <p className="text-muted-foreground">
              aoaoaoaaooaaoao
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
