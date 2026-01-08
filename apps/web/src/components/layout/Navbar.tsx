import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-2">
                    <Link href="/">
                        <img src="/logo.svg" alt="Storix" className="h-8" />
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    <Button asChild variant="default" className="font-semibold shadow-sm">
                        <Link href="/onboarding">
                            ফ্রি শুরু করুন
                        </Link>
                    </Button>
                </div>
            </div>
        </nav>
    );
}
