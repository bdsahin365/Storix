"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
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
} from "lucide-react";

const navItems = [
    { href: "/dashboard", label: "ড্যাশবোর্ড", icon: LayoutDashboard },
    { href: "/dashboard/customers", label: "কাস্টমার", icon: Users },
    { href: "/dashboard/sales", label: "বিক্রি", icon: ShoppingCart },
    { href: "/dashboard/products", label: "প্রোডাক্ট", icon: Package },
    { href: "/dashboard/stock", label: "স্টক যোগ", icon: Warehouse },
    { href: "/dashboard/inventory", label: "ইনভেন্টরি", icon: BookOpen },
    { href: "/dashboard/payments", label: "পেমেন্ট", icon: CreditCard },
    { href: "/dashboard/halkhata", label: "হালখাতা", icon: FileText },
    { href: "/dashboard/reports", label: "রিপোর্ট", icon: BarChart3 },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="hidden md:flex h-full w-64 flex-col border-r bg-white">
            {/* Logo */}
            <div className="flex h-16 items-center border-b px-6">
                <Link href="/dashboard" className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-brand-600 font-bold text-white">
                        S
                    </div>
                    <span className="text-lg font-bold text-slate-900">Storix Pro</span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 p-4">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-brand-50 text-brand-700"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
