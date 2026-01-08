import { BarChart3, Mic, ShieldCheck, Smartphone, Users } from "lucide-react";

export default function About() {
    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            {/* Page Header */}
            <div className="bg-brand-900 text-white py-20 relative overflow-hidden">
                {/* Background blobs */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 rounded-full bg-brand-800 blur-3xl w-96 h-96 opacity-50"></div>
                <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">আমাদের সম্পর্কে</h1>
                    <p className="text-brand-100 text-lg md:text-xl max-w-2xl mx-auto">
                        সাধারণ দোকানের জন্য অসাধারণ প্রযুক্তি। Storix Pro—দোকানের স্মার্ট অ্যাসিস্ট্যান্ট।
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 -mt-16 relative z-20">
                <div className="bg-white rounded-xl shadow-xl border border-slate-100 p-8 md:p-12 max-w-4xl mx-auto">

                    <div className="prose prose-slate max-w-none">
                        <p className="text-lg text-slate-700 leading-relaxed mb-8">
                            <strong>Storix Pro</strong> শুধুমাত্র একটি বাকি খাতা নয়। এটি বাংলাদেশের ছোট ও মাঝারি ব্যবসায়ীদের জন্য তৈরি একটি পূর্ণাঙ্গ অপারেটিং সিস্টেম। আমাদের লক্ষ্য হলো, একজন দোকানদার যেন খাতা-কলম বা ক্যালকুলেটর ছাড়াই পুরো ব্যবসা চালাতে পারেন—শুধুমাত্র মুখের কথায়।
                        </p>

                        <div className="grid md:grid-cols-2 gap-8 mb-10">
                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                                <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                    <Mic className="h-5 w-5 text-brand-600" />
                                    ভয়েস টেকনোলজি
                                </h3>
                                <p className="text-sm text-slate-600">
                                    টাইপ করা এখন অতীত। আমাদের অত্যাধুনিক ভয়েস রিকগনিশন সিস্টেম আপনার মুখের কথা শুনেই হিসাব লিখে রাখতে পারে। এটি বাংলা ভাষা এবং বিভিন্ন আঞ্চলিক টান বুঝতে সক্ষম।
                                </p>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                                <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                    <BarChart3 className="h-5 w-5 text-brand-600" />
                                    ব্যবসায়িক বুদ্ধি
                                </h3>
                                <p className="text-sm text-slate-600">
                                    আজ কত লাভ হলো? কোন কাস্টমার বেশি বাকি নেয়? স্টকে কোন মাল কম আছে? Storix Pro এই সব প্রশ্নের উত্তর দেয় এক ক্লিকেই।
                                </p>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b pb-2">আমাদের বৈশিষ্ট্য</h2>

                        <div className="grid md:grid-cols-3 gap-6 mb-10">
                            <div className="text-center">
                                <ShieldCheck className="h-10 w-10 text-brand-600 mx-auto mb-3" />
                                <h3 className="font-bold text-slate-900 mb-1">নিরাপদ ডাটা</h3>
                                <p className="text-xs text-slate-500">ক্লাউড ব্যাকআপ ও এনক্রিপশন</p>
                            </div>
                            <div className="text-center">
                                <Smartphone className="h-10 w-10 text-brand-600 mx-auto mb-3" />
                                <h3 className="font-bold text-slate-900 mb-1">অফলাইন ফার্স্ট</h3>
                                <p className="text-xs text-slate-500">ইন্টারনেট ছাড়াই কাজ করে</p>
                            </div>
                            <div className="text-center">
                                <Users className="h-10 w-10 text-brand-600 mx-auto mb-3" />
                                <h3 className="font-bold text-slate-900 mb-1">স্টাফ ম্যানেজমেন্ট</h3>
                                <p className="text-xs text-slate-500">কর্মচারীদের কাজের হিসাব</p>
                            </div>
                        </div>

                        <p className="text-slate-700 leading-relaxed text-center italic border-t pt-6 bg-slate-50 p-4 rounded-lg">
                            "আমরা বিশ্বাস করি, প্রযুক্তি ব্যবহারের জন্য ইঞ্জিনিয়ার হওয়ার প্রয়োজন নেই। প্রয়োজন শুধু সদিচ্ছার।"
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}
