import { BarChart3, Mic, Printer, ShieldCheck } from "lucide-react";

const features = [
    {
        title: "ভয়েস কমান্ড সিস্টেম",
        description: "টাইপ করার ঝামেলা শেষ। মুখে বললেই বাকি বা বেচা-বিক্রি সেভ হয়ে যাবে।",
        icon: Mic,
        color: "bg-blue-100 text-blue-700",
    },
    {
        title: "স্টক ও লাভ-ক্ষতি",
        description: "কোন পণ্য কতটুক আছে আর আজকের দিনে কত লাভ হলো, এক ক্লিকেই দেখুন।",
        icon: BarChart3,
        color: "bg-green-100 text-green-700",
    },
    {
        title: "ডিজিটাল হালখাতা",
        description: "কাস্টমারদের জন্য সুন্দর কার্ড তৈরি করুন এবং WhatsApp-এ শেয়ার করুন।",
        icon: Printer,
        color: "bg-purple-100 text-purple-700",
    },
    {
        title: "সিকিউরিটি ও ব্যাকআপ",
        description: "ফোন হারালেও চিন্তার কিছু নেই। আপনার সব হিসাব ক্লাউডে ১০০% সুরক্ষিত।",
        icon: ShieldCheck,
        color: "bg-orange-100 text-orange-700",
    },
];

export function Features() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">
                        পুরো দোকানের নিয়ন্ত্রণ, আপনার হাতে
                    </h2>
                    <p className="text-lg text-slate-600">
                        Storix Pro শুধুমাত্র বাকি খাতা নয়, এটি আপনার পুরো ব্যবসার অপারেটিং সিস্টেম।
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-100/50 transition-all duration-300"
                        >
                            <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <feature.icon className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-700 transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
