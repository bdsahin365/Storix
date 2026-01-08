import { BookX, FileWarning, SearchX } from "lucide-react";

export function Problem() {
    return (
        <section className="bg-white py-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                        খাতায় হিসাব রাখা কি নিরাপদ?
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        সনাতন পদ্ধতিতে হিসাব রাখলে যে সমস্যাগুলো হয়
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    <div className="flex flex-col items-center text-center p-6 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                            <BookX className="h-6 w-6 text-red-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">খাতা হারিয়ে যাওয়া</h3>
                        <p className="text-slate-600">
                            জরুরি প্রয়োজনে হিসাবের খাতা খুঁজে পাওয়া যায় না বা হারিয়ে যায়।
                        </p>
                    </div>

                    <div className="flex flex-col items-center text-center p-6 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                            <FileWarning className="h-6 w-6 text-orange-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">হিসাবে ভুল</h3>
                        <p className="text-slate-600">
                            কাটাকাটি আর যোগ-বিয়োগে ভুলের কারণে মাস শেষে লস হয়।
                        </p>
                    </div>

                    <div className="flex flex-col items-center text-center p-6 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
                            <SearchX className="h-6 w-6 text-yellow-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">বাকি আদায়ে দেরি</h3>
                        <p className="text-slate-600">
                            কার কাছে কত টাকা পাবেন তা বের করা কঠিন হয়ে পড়ে।
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
