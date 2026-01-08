import { Button } from "@/components/ui/button";
import { Download, Star } from "lucide-react";

export function AppDownload() {
    return (
        <section className="py-24 bg-slate-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="bg-brand-900 rounded-3xl overflow-hidden shadow-2xl relative">

                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-800 rounded-full blur-3xl -mr-16 -mt-16 opacity-50"></div>

                    <div className="grid md:grid-cols-2 gap-8 items-center p-8 md:p-16 relative z-10">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                আজই ডাউনলোড করুন <span className="text-brand-300">Storix Pro</span>
                            </h2>
                            <p className="text-brand-100 text-lg mb-8 max-w-md">
                                আপনার ব্যবসাকে ডিজিটাল করার প্রথম ধাপ। প্লে-স্টোর থেকে ডাউনলোড করুন সম্পূর্ণ ফ্রিতে।
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button size="lg" className="h-16 px-8 text-lg bg-white text-brand-900 hover:bg-brand-50 border-0 flex items-center gap-3">
                                    <Download className="h-6 w-6" />
                                    <div className="text-left">
                                        <div className="text-xs font-normal">Download on</div>
                                        <div className="font-bold -mt-1">Google Play</div>
                                    </div>
                                </Button>
                            </div>

                            <div className="mt-8 flex items-center gap-4 text-brand-200 text-sm">
                                <div className="flex gap-1 text-yellow-400">
                                    <Star className="h-4 w-4 fill-current" />
                                    <Star className="h-4 w-4 fill-current" />
                                    <Star className="h-4 w-4 fill-current" />
                                    <Star className="h-4 w-4 fill-current" />
                                    <Star className="h-4 w-4 fill-current" />
                                </div>
                                <span>৫০০০+ দোকানদার ব্যবহার করছেন</span>
                            </div>
                        </div>

                        <div className="relative hidden md:block">
                            {/* Abstract Phone Mockup */}
                            <div className="mx-auto w-64 h-[400px] bg-slate-900 rounded-[2rem] border-8 border-slate-800 shadow-2xl transform rotate-6 border-opacity-50">
                                <div className="w-full h-full bg-white rounded-[1.5rem] overflow-hidden relative">
                                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-900 rounded-full"></div>
                                    <div className="h-full w-full bg-brand-50 flex flex-col items-center justify-center text-brand-200">
                                        <span className="font-bold text-4xl opacity-20">Storix</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
