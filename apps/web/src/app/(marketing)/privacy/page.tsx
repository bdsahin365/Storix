import { Lock, Mic, Server, Users } from "lucide-react";

export default function Privacy() {
    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">

                    <div className="bg-slate-50 border-b border-slate-200 px-8 py-6 flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">প্রাইভেসি পলিসি</h1>
                            <p className="text-slate-500 mt-2">Storix Pro আপনার তথ্যের সুরক্ষায় আপোষহীন</p>
                        </div>
                        <Lock className="h-8 w-8 text-brand-200" />
                    </div>

                    <div className="p-8 md:p-12 space-y-8">
                        <p className="text-lg text-slate-700">
                            Storix Pro ব্যবহার করার মাধ্যমে আপনি আমাদের প্রাইভেসি পলিসিতে সম্মত হচ্ছেন। আপনার ব্যবসার তথ্যের গোপনীয়তা রক্ষা করা আমাদের প্রধান দায়িত্ব।
                        </p>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="p-6 bg-blue-50 rounded-lg border border-blue-100">
                                <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                                    <Server className="h-4 w-4" />
                                    কী তথ্য সংগ্রহ করি?
                                </h3>
                                <ul className="list-disc pl-5 space-y-1 text-blue-800 text-sm">
                                    <li>দোকানের নাম, ঠিকানা ও মোবাইল নম্বর</li>
                                    <li>বাকি, বেচা-বিক্রি ও স্টকের হিসাব</li>
                                    <li>ভয়েস কমান্ডের অডিও (প্রসেসিং-এর জন্য)</li>
                                </ul>
                            </div>
                            <div className="p-6 bg-green-50 rounded-lg border border-green-100">
                                <h3 className="font-bold text-green-900 mb-2 flex items-center gap-2">
                                    <Lock className="h-4 w-4" />
                                    তথ্য কীভাবে ব্যবহার হয়?
                                </h3>
                                <ul className="list-disc pl-5 space-y-1 text-green-800 text-sm">
                                    <li>আপনার ব্যবসার ডিজিটাল রিপোর্ট তৈরি করতে</li>
                                    <li>অ্যাপের ফিচার ও ভয়েস সিস্টেম উন্নত করতে</li>
                                    <li>আপনার অ্যাকাউন্টের ব্যাকআপ রাখতে</li>
                                </ul>
                            </div>
                        </div>

                        <section>
                            <h2 className="text-xl font-bold text-slate-900 mb-3 border-b pb-2 flex items-center gap-2">
                                <Mic className="h-5 w-5 text-brand-600" />
                                ভয়েস ডাটা পলিসি
                            </h2>
                            <p className="text-slate-700 leading-relaxed">
                                অ্যাপের "ভয়েস কমান্ড" ফিচার ব্যবহারের সময় আমরা আপনার ভয়েস রেকর্ড প্রসেস করি। এই ডাটা শুধুমাত্র আপনার বলা কমান্ড (যেমন: "বাকি ৫০০ টাকা") বুঝতে ব্যবহার করা হয়। আমরা আপনার ব্যক্তিগত কথাবার্তা রেকর্ড বা সংরক্ষণ করি না।
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-slate-900 mb-3 border-b pb-2 flex items-center gap-2">
                                <Users className="h-5 w-5 text-brand-600" />
                                স্টাফ ও পারমিশন
                            </h2>
                            <p className="text-slate-700 leading-relaxed">
                                আপনি যদি দোকানে কর্মচারী (Staff) যুক্ত করেন, তবে তারা আপনার ব্যবসার কিছু নির্দিষ্ট তথ্য দেখতে পারবে (যেমন: বিক্রি বা বাকি)। স্টাফদের পারমিশন নিয়ন্ত্রণ করার পূর্ণ অধিকার দোকানের মালিকের (Admin) হাতে থাকে।
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-slate-900 mb-3 border-b pb-2">ডাটা শেয়ারিং ও সুরক্ষা</h2>
                            <p className="text-slate-700 leading-relaxed">
                                আমরা আপনার ব্যবসার তথ্য তৃতীয় কোনো কোম্পানির কাছে বিক্রি করি না। আপনার সকল ডাটা এনক্রিপ্ট করে ক্লাউডে রাখা হয়, যাতে ফোন হারিয়ে গেলেও আপনি অন্য ফোনে লগইন করে সব তথ্য ফিরে পান।
                            </p>
                        </section>
                    </div>

                </div>
            </div>
        </div>
    );
}
