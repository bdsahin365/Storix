import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, TrendingUp, Users, Package, ArrowRight, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-bold text-slate-900">ড্যাশবোর্ড</h1>
                <p className="text-slate-500 mt-2">আজকের ব্যবসার সারাংশ</p>
            </div>

            {/* Summary Cards - Enhanced with gradients and better styling */}
            <div className="grid gap-6 md:grid-cols-3">
                {/* Today's Sales Card */}
                <Card className="border-0 shadow-lg bg-gradient-to-br from-brand-600 to-brand-700 text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
                        <CardTitle className="text-sm font-medium text-white/90">
                            আজকের বিক্রি
                        </CardTitle>
                        <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                            <TrendingUp className="h-5 w-5 text-white" />
                        </div>
                    </CardHeader>
                    <CardContent className="relative z-10">
                        <div className="text-3xl font-bold money">৳১২,৫০০</div>
                        <p className="text-sm text-white/80 mt-2">১৫টি লেনদেন</p>
                    </CardContent>
                </Card>

                {/* Total Outstanding Card */}
                <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
                        <CardTitle className="text-sm font-medium text-white/90">
                            মোট বাকি
                        </CardTitle>
                        <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                            <DollarSign className="h-5 w-5 text-white" />
                        </div>
                    </CardHeader>
                    <CardContent className="relative z-10">
                        <div className="text-3xl font-bold money">৳৮,৩০০</div>
                        <p className="text-sm text-white/80 mt-2">৮ জন কাস্টমার</p>
                    </CardContent>
                </Card>

                {/* Stock Warning Card */}
                <Card className="border-0 shadow-lg bg-gradient-to-br from-red-500 to-red-600 text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
                        <CardTitle className="text-sm font-medium text-white/90">
                            স্টক সতর্কতা
                        </CardTitle>
                        <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                            <Package className="h-5 w-5 text-white" />
                        </div>
                    </CardHeader>
                    <CardContent className="relative z-10">
                        <div className="text-3xl font-bold">৩টি পণ্য</div>
                        <p className="text-sm text-white/80 mt-2">কম স্টক</p>
                    </CardContent>
                </Card>
            </div>

            {/* Low Stock Alert - Enhanced */}
            <Alert className="border-l-4 border-l-orange-500 bg-orange-50 border-orange-200">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                <AlertDescription className="text-orange-800">
                    <span className="font-semibold">স্টক সতর্কতা:</span> ৩টি পণ্যের স্টক কম আছে।
                    <Link href="/dashboard/stock" className="ml-2 underline hover:text-orange-900">
                        স্টক যোগ করুন →
                    </Link>
                </AlertDescription>
            </Alert>

            {/* Two Column Layout for Lists */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Top Customers with Outstanding Balance */}
                <Card className="shadow-md border-slate-200">
                    <CardHeader className="border-b bg-slate-50">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">বেশি বাকি নেওয়া কাস্টমার</CardTitle>
                            <Link href="/dashboard/customers">
                                <Button variant="ghost" size="sm" className="text-brand-600 hover:text-brand-700">
                                    সব দেখুন
                                    <ArrowRight className="ml-1 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y">
                            {[
                                { name: "রহিম মিয়া", phone: "০১৭১২৩৪৫৬৭৮", balance: 2500 },
                                { name: "করিম সাহেব", phone: "০১৮১২৩৪৫৬৭৮", balance: 1800 },
                                { name: "সালমা বেগম", phone: "০১৯১২৩৪৫৬৭৮", balance: 1500 },
                            ].map((customer, i) => (
                                <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-brand-100 flex items-center justify-center">
                                            <Users className="h-5 w-5 text-brand-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900">{customer.name}</p>
                                            <p className="text-sm text-slate-500">{customer.phone}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold money text-orange-600 text-lg">৳{customer.balance.toLocaleString()}</p>
                                        <Badge variant="outline" className="text-xs border-orange-300 text-orange-700">বাকি</Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Low Stock Products */}
                <Card className="shadow-md border-slate-200">
                    <CardHeader className="border-b bg-slate-50">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">স্টক সতর্কতা</CardTitle>
                            <Link href="/dashboard/products">
                                <Button variant="ghost" size="sm" className="text-brand-600 hover:text-brand-700">
                                    সব দেখুন
                                    <ArrowRight className="ml-1 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y">
                            {[
                                { name: "চাল (১ কেজি)", stock: 5, unit: "বস্তা" },
                                { name: "ডাল (১ কেজি)", stock: 3, unit: "কেজি" },
                                { name: "তেল (১ লিটার)", stock: 2, unit: "লিটার" },
                            ].map((product, i) => (
                                <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                                            <Package className="h-5 w-5 text-red-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900">{product.name}</p>
                                            <p className="text-sm text-slate-500">বর্তমান স্টক</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="destructive" className="money font-semibold">
                                            {product.stock} {product.unit}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
