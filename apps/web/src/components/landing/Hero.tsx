import { Button } from "@/components/ui/button";
import { Mic, Smartphone, WifiOff } from "lucide-react";
import Link from "next/link";

export function Hero() {
    return (
        <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32 bg-white">
            {/* Premium Background Layer */}
            <div className="absolute inset-0 z-0">
                {/* 1. Base Gradient Orbs for "Premium Color" */}
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-100/40 blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-100/40 blur-[120px]" />

                {/* 2. Aesthetic Grid Pattern with Mask */}
                <div
                    className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
                    style={{
                        maskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)',
                        WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)'
                    }}
                />
            </div>

            <div className="container relative mx-auto px-4 md:px-6 text-center">

                {/* Badge */}
                <div className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1 text-sm font-medium text-brand-800 mb-8 border border-brand-200">
                    <Mic className="h-4 w-4" />
                    <span>মুখে বললেই হিসাব - ১ সেকেন্ডে</span>
                </div>

                <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl mb-6">
                    <span className="block text-brand-900">দোকানের স্মার্ট হিসাব</span>
                    <span className="block text-brand-600 mt-2">এখন মুখের কথায়</span>
                </h1>

                <p className="mx-auto max-w-2xl text-lg text-slate-600 mb-10 leading-relaxed">
                    বাকি, স্টক, লাভ-ক্ষতি এবং হালখাতা ম্যানেজ করুন সবচেয়ে সহজে।
                    ইন্টারনেট না থাকলেও চলে। ছোট ও মাঝারি দোকানের জন্য তৈরি
                    <strong> Storix Pro</strong>।
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button asChild size="lg" className="w-full sm:w-auto h-14 px-8 text-lg gap-2 shadow-lg shadow-brand-200/50">
                        <Link href="/onboarding">
                            <Smartphone className="h-5 w-5" />
                            শুরু করুন
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-lg">
                        <Link href="/onboarding">
                            WhatsApp-এ জানুন
                        </Link>
                    </Button>
                </div>

                <div className="mt-12 flex items-center justify-center gap-6 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                        <WifiOff className="h-4 w-4" />
                        <span>ইন্টারনেট লাগে না</span>
                    </div>
                    <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                    <div>
                        <span>✅ ১০০% ফ্রি শুরু</span>
                    </div>
                </div>

            </div>
        </section>
    );
}
