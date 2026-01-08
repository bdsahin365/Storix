import { AppDownload } from "@/components/landing/AppDownload";
import { Features } from "@/components/landing/Features";
import { HalkhataSection } from "@/components/landing/HalkhataSection";
import { Hero } from "@/components/landing/Hero";
import { TrustSection } from "@/components/landing/TrustSection";

export default function Home() {
    return (
        <>
            <Hero />
            <Features />
            <HalkhataSection />
            <AppDownload />
            <TrustSection />
        </>
    );
}
