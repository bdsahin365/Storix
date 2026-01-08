import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-white border-t border-slate-200 py-12">
            <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-col items-center md:items-start">
                    <Link href="/">
                        <img src="/logo.svg" alt="Storix" className="h-8 mb-2" />
                    </Link>
                    <p className="text-sm text-slate-500 mt-2">
                        © {new Date().getFullYear()} Storix. সর্বস্বত্ব সংরক্ষিত।
                    </p>
                </div>
                <div className="flex gap-6 text-sm text-slate-600">
                    <Link href="/about" className="hover:text-brand-600 hover:underline">আমাদের সম্পর্কে</Link>
                    <Link href="/terms" className="hover:text-brand-600 hover:underline">ব্যবহার বিধি</Link>
                    <Link href="/privacy" className="hover:text-brand-600 hover:underline">প্রাইভেসি পলিসি</Link>
                </div>
            </div>
        </footer>
    );
}
