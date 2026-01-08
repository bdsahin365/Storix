import { Lock, Phone, UserCheck } from "lucide-react";

export function TrustSection() {
    return (
        <section className="bg-slate-900 py-20 text-white">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <h2 className="text-3xl font-bold mb-12">
                    কেন হাজারো দোকানি Storix ব্যবহার করছেন?
                </h2>
                <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
                    <div className="flex flex-col items-center">
                        <div className="bg-slate-800 p-4 rounded-full mb-4">
                            <UserCheck className="h-8 w-8 text-brand-400" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">সহজ ব্যবহার</h3>
                        <p className="text-slate-400">
                            কোনো ট্রেনিং লাগে না। অ্যাপ ইন্সটল করেই হিসাব রাখা শুরু করা যায়।
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="bg-slate-800 p-4 rounded-full mb-4">
                            <Lock className="h-8 w-8 text-brand-400" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">তথ্য থাকে প্রাইভেট</h3>
                        <p className="text-slate-400">
                            আপনার দোকানের হিসাব আপনি ছাড়া আর কেউ দেখবে না।
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="bg-slate-800 p-4 rounded-full mb-4">
                            <Phone className="h-8 w-8 text-brand-400" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">সার্বক্ষণিক সাপোর্ট</h3>
                        <p className="text-slate-400">
                            যেকোনো সমস্যায় আমাদের কল সেন্টার এবং WhatsApp সাপোর্ট খোলা আছে।
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
