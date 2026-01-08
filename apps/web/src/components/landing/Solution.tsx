import { Calculator, MessageCircle, ShieldCheck } from "lucide-react";

export function Solution() {
    return (
        <section className="bg-brand-50 py-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                        Storix-এর স্মার্ট সমাধান
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        আপনার দোকান পরিচালনার সব ঝামেলা এখন এক অ্যাপে
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-brand-100">
                        <div className="h-12 w-12 rounded-full bg-brand-100 flex items-center justify-center mb-4">
                            <Calculator className="h-6 w-6 text-brand-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">অটোমেটিক হিসাব</h3>
                        <p className="text-slate-600">
                            বিক্রয় বা খরচ লিখলেই লাভ-ক্ষতি ও বকির হিসাব অটোমেটিক তৈরি হবে।
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-brand-100">
                        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                            <MessageCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">ফ্রি এসএমএস অ্যালার্ট</h3>
                        <p className="text-slate-600">
                            বাকি আদায়ের জন্য কাস্টমারকে ফ্রি রিমাইন্ডার ও ইনভয়েস পাঠান।
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-brand-100">
                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                            <ShieldCheck className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">১০০% সুরক্ষিত</h3>
                        <p className="text-slate-600">
                            মোবাইল হারালেও আপনার হিসাব হারাবে না। লগইন করলেই সব তথ্য ফিরে পাবেন।
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
