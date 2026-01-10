"use client";

import {
    LayoutDashboard,
    Users,
    ShoppingCart,
    Package,
    Warehouse,
    CreditCard,
    FileText,
    BarChart3,
    BookOpen,
    BadgeCheck,
    Settings,
} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";

const menuItems = [
    { title: "ড্যাশবোর্ড", url: "/dashboard", icon: LayoutDashboard },
    { title: "কাস্টমার", url: "/customers", icon: Users },
    { title: "বিক্রি", url: "/sales", icon: ShoppingCart },
    { title: "পেমেন্ট", url: "/payments", icon: CreditCard },
    { title: "প্রোডাক্ট", url: "/products", icon: Package },
    { title: "স্টক যোগ", url: "/stock", icon: Warehouse },
    { title: "ইনভেন্টরি", url: "/inventory", icon: BookOpen },
    { title: "হালখাতা", url: "/halkhata", icon: FileText },
    { title: "রিপোর্ট", url: "/reports", icon: BarChart3 },
    { title: "সেটিংস", url: "/settings", icon: Settings },
];

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Store, UserCircle } from "lucide-react";

export function AppSidebar() {
    const [shopDetails, setShopDetails] = useState<any>(null);
    const [userData, setUserData] = useState({ name: '' });
    const [loading, setLoading] = useState(true);

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
                        setUserData({
                            name: mockSession.user.user_metadata?.full_name || 'Admin',
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
                                name: data.user.full_name,
                            });
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching sidebar details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, []);

    return (
        <Sidebar className="border-r-2">
            <SidebarHeader className="border-b-2 px-6 py-5">
                <Link href="/dashboard" className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center">
                        <Image
                            src="/icon.svg"
                            alt="Storix"
                            width={40}
                            height={40}
                            className="h-full w-full"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-base font-bold text-slate-900">Storix</span>
                        <div className="flex items-center gap-1.5">
                            <span className="text-sm text-brand-600 font-semibold">Pro</span>
                            <BadgeCheck className="h-4 w-4 text-brand-600 fill-brand-100" />
                        </div>
                    </div>
                </Link>
            </SidebarHeader>

            <SidebarContent className="px-3 py-4">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-xs font-semibold text-slate-600 px-3 mb-2">
                        মেনু
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-1">
                            {menuItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild className="h-11 text-[15px] font-medium hover:bg-brand-50 hover:text-brand-700 data-[active=true]:bg-brand-100 data-[active=true]:text-brand-700 data-[active=true]:font-semibold">
                                        <Link href={item.url} className="flex items-center gap-3 px-3">
                                            <item.icon className="h-5 w-5 flex-shrink-0" strokeWidth={2} />
                                            <span className="flex-1">{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
