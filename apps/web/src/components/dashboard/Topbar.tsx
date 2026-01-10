"use client";

import { Menu, LogOut, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";


export function Topbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [shopDetails, setShopDetails] = useState<any>(null);
    const [userData, setUserData] = useState({ phone: '', name: '', shortName: '', role: '' });
    const [loading, setLoading] = useState(true);

    // Helper to translate roles
    const getRoleParams = (role: string) => {
        switch (role) {
            case 'OWNER': return { label: 'মালিক', className: 'text-brand-600 bg-brand-50' };
            case 'STAFF': return { label: 'স্টাফ', className: 'text-blue-600 bg-blue-50' };
            default: return { label: 'অ্যাডমিন', className: 'text-slate-600 bg-slate-100' };
        }
    };

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const supabase = createClient();
                let token = '';

                if (!supabase) {
                    const mockSessionStr = localStorage.getItem('mock_session');
                    if (mockSessionStr) {
                        const mockSession = JSON.parse(mockSessionStr);
                        token = mockSession.access_token;
                        // Initial mock data as fallback
                        setUserData({
                            phone: mockSession.user.phone || '',
                            name: mockSession.user.user_metadata?.full_name || 'User',
                            shortName: (mockSession.user.user_metadata?.full_name || 'User').charAt(0),
                            role: 'OWNER' // Mock default
                        });
                    }
                } else {
                    const { data: { session } } = await supabase.auth.getSession();
                    if (session) {
                        token = session.access_token;
                    }
                }

                if (token) {
                    const response = await fetch('/api/shops/my-shop', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (response.ok) {
                        const data = await response.json();
                        if (data.shop) {
                            setShopDetails(data.shop);
                        }
                        if (data.user && data.user.full_name) {
                            setUserData({
                                phone: data.user.phone || '',
                                name: data.user.full_name,
                                shortName: data.user.full_name.charAt(0),
                                role: data.user.role || 'OWNER'
                            });
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching dashboard details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, []);

    const handleLogout = async () => {
        const supabase = createClient();
        if (supabase) {
            await supabase.auth.signOut();
        } else {
            localStorage.removeItem('mock_session');
        }
        window.location.href = '/login';
    };

    const roleInfo = getRoleParams(userData.role);

    return (
        <div className="flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
            {/* Left Side: Sidebar Trigger */}
            <div className="flex items-center gap-4">
                <SidebarTrigger className="h-9 w-9" />
            </div>

            {/* Right Side: Shop Info + User Menu */}
            <div className="flex items-center gap-4">
                {/* Shop Info */}
                {!loading && shopDetails && (
                    <div className="hidden md:flex items-center gap-3 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                        <div className="h-8 w-8 rounded-full bg-white shadow-sm flex items-center justify-center border border-slate-100">
                            <Store className="h-4 w-4 text-brand-600" />
                        </div>
                        <div className="flex flex-col pr-1">
                            <p className="text-sm font-bold text-slate-800 leading-none mb-0.5">{shopDetails.name}</p>
                            <div className="flex items-center gap-1.5">
                                <span className="text-[11px] font-medium text-slate-600">{userData.name}</span>
                                <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                                <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full font-bold", roleInfo.className)}>
                                    {roleInfo.label}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {loading && (
                    <div className="hidden md:flex items-center gap-2 animate-pulse">
                        <div className="h-8 w-8 rounded-full bg-slate-200" />
                        <div className="space-y-1">
                            <div className="h-3 w-24 bg-slate-200 rounded" />
                            <div className="h-2 w-16 bg-slate-200 rounded" />
                        </div>
                    </div>
                )}

                {/* User Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild id="user-menu-trigger">
                        <Button variant="ghost" className="gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-brand-700 font-semibold uppercase">
                                {loading ? '...' : userData.shortName || 'U'}
                            </div>
                            <span className="hidden md:inline text-sm font-medium">{loading ? '...' : userData.name || 'User'}</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel>আমার অ্যাকাউন্ট</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-700 focus:bg-red-50 cursor-pointer">
                            <LogOut className="mr-2 h-4 w-4" />
                            লগ আউট
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
