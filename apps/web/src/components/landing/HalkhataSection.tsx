import { Button } from "@/components/ui/button";
import { Download, FileText, Share2 } from "lucide-react";

export function HalkhataSection() {
    return (
        <section className="py-20 bg-brand-900 text-white overflow-hidden relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full bg-brand-800 px-3 py-1 text-sm font-medium text-brand-100 mb-6 border border-brand-700">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                            নতুন ফিচার
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            ডিজিটাল হালখাতা
                        </h2>
                        <p className="text-brand-100 text-lg mb-8 leading-relaxed">
                            পুরো বছরের হিসাব এখন এক ক্লিকেই পরিষ্কার। কাস্টমারদের জন্য অটোমেটিক হালখাতা কার্ড তৈরি করুন এবং প্রিন্ট বা শেয়ার করুন।
                        </p>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-3">
                                <div className="bg-brand-800 p-2 rounded-lg">
                                    <FileText className="h-5 w-5 text-brand-300" />
                                </div>
                                <span>সুন্দর হালখাতা কার্ড (PDF/Image)</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="bg-brand-800 p-2 rounded-lg">
                                    <Share2 className="h-5 w-5 text-brand-300" />
                                </div>
                                <span>WhatsApp-এ ১ ক্লিকেই শেয়ার</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="bg-brand-800 p-2 rounded-lg">
                                    <Download className="h-5 w-5 text-brand-300" />
                                </div>
                                <span>বাকি আদায়ের অটোমেটিক মেসেজ</span>
                            </div>
                        </div>

                        <Button size="lg" className="bg-white text-brand-900 hover:bg-brand-50 border-0 h-12 px-8 font-bold">
                            এখনই শুরু করুন
                        </Button>
                    </div>

                    <div className="relative">
                        {/* Visual representation of a Halkhata Card */}
                        <div className="bg-white text-slate-900 rounded-xl p-6 shadow-2xl transform md:rotate-3 transition-transform hover:rotate-0 duration-500 max-w-sm mx-auto border-4 border-brand-800/30">
                            <div className="text-center border-b-2 border-brand-100 pb-4 mb-4 border-dashed">
                                <h3 className="text-xl font-bold text-brand-900">ভাই ভাই স্টোর</h3>
                                <p className="text-sm text-slate-500">প্রোঃ মোঃ রহিম মিয়া</p>
                                <div className="mt-2 text-xs bg-red-100 text-red-700 px-2 py-1 rounded inline-block">শুভ হালখাতা ১৪৩১</div>
                            </div>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-600">কাস্টমার:</span>
                                    <span className="font-bold">আরিফ হোসেন</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">পূর্বের বকেয়া:</span>
                                    <span>৳ ৫,০০০</span>
                                </div>
                                <div className="flex justify-between border-t border-dashed pt-2">
                                    <span className="text-slate-600">জমা:</span>
                                    <span className="text-green-600 font-bold">- ৳ ৩,০০০</span>
                                </div>
                                <div className="flex justify-between bg-brand-50 p-2 rounded font-bold text-brand-900">
                                    <span>বর্তমান বকেয়া:</span>
                                    <span>৳ ২,০০০</span>
                                </div>
                            </div>
                            <div className="mt-6 text-center text-xs text-slate-400">
                                Storix অ্যাপ এর মাধ্যমে তৈরি
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
