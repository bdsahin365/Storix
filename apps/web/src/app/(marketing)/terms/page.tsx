export default function Terms() {
    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">

                    <div className="bg-slate-50 border-b border-slate-200 px-8 py-6">
                        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">ব্যবহার বিধি (Terms of Use)</h1>
                        <p className="text-slate-500 mt-2">Storix Pro ব্যবহারের নিয়মাবলী</p>
                    </div>

                    <div className="p-8 md:p-12 space-y-8">
                        <p className="text-lg text-slate-700">
                            Storix Pro অ্যাপ ও ওয়েবসাইট ব্যবহার করার কিছু নির্দিষ্ট নিয়ম নিচে উল্লেখ করা হলো। অ্যাপটি ব্যবহারের মাধ্যমে আপনি এই শর্তাবলীতে সম্মত হচ্ছেন।
                        </p>

                        <section>
                            <h2 className="text-xl font-bold text-brand-800 mb-3 flex items-center gap-2">
                                <span className="bg-brand-100 text-brand-800 w-8 h-8 rounded-full flex items-center justify-center text-sm">১</span>
                                অ্যাকাউন্ট ও নিরাপত্তা
                            </h2>
                            <div className="pl-10 text-slate-700 leading-relaxed">
                                আপনার অ্যাকাউন্টের পাসওয়ার্ড বা পিন গোপন রাখার সম্পূর্ণ দায়িত্ব আপনার। আপনার অ্যাকাউন্টের মাধ্যমে করা যেকোনো লেনদেন বা পরিবর্তনের জন্য Storix কর্তৃপক্ষ দায়ী থাকবে না।
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-brand-800 mb-3 flex items-center gap-2">
                                <span className="bg-brand-100 text-brand-800 w-8 h-8 rounded-full flex items-center justify-center text-sm">২</span>
                                স্টাফ বা কর্মচারীর দায়িত্ব
                            </h2>
                            <div className="pl-10 text-slate-700 leading-relaxed bg-brand-50/50 p-4 rounded-lg border border-brand-50">
                                দোকানের মালিক হিসেবে আপনি যদি কোনো কর্মচারীকে (Staff) অ্যাপ ব্যবহারের অনুমতি দেন, তবে তাদের করা যেকোনো ভুল বা ডাটা পরিবর্তনের দায়ভার মালিকের উপর বর্তাবে। স্টাফ অ্যাড করার সময় সতর্ক থাকুন।
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-brand-800 mb-3 flex items-center gap-2">
                                <span className="bg-brand-100 text-brand-800 w-8 h-8 rounded-full flex items-center justify-center text-sm">৩</span>
                                সঠিক তথ্যের ব্যবহার
                            </h2>
                            <div className="pl-10 text-slate-700 leading-relaxed">
                                অ্যাপে ভুল তথ্য (যেমন: ভুল মোবাইল নম্বর বা লেনদেনের পরিমাণ) দিলে তার জন্য Storix দায়ী নয়। এটি একটি হিসাব রাখার টুল মাত্র, কোনো আইনি নথি নয়।
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-brand-800 mb-3 flex items-center gap-2">
                                <span className="bg-brand-100 text-brand-800 w-8 h-8 rounded-full flex items-center justify-center text-sm">৪</span>
                                ভয়েস কমান্ডের সঠিক ব্যবহার
                            </h2>
                            <div className="pl-10 text-slate-700 leading-relaxed">
                                ভয়েস কমান্ড ব্যবহার করার সময় পরিষ্কারভাবে কথা বলুন এবং প্রতিবার কমান্ড নিশ্চিত (Confirm) করে সেভ করুন। অ্যাপের ভুলের কারণে কোনো আর্থিক ক্ষতি হলে তার দায়ভার ব্যবহারকারীর।
                            </div>
                        </section>
                    </div>

                </div>
            </div>
        </div>
    );
}
