import { Navbar } from "@/components/layout/Navbar";
// Footer was likely in landing or layout. I need to find where it was.
// Based on backup Home.tsx, it wasn't imported there. It was likely in the main Layout.tsx of Vite.
// I will check the file structure again or assume it's in components/landing/Footer or components/layout/Footer.
// I see Home.tsx didn't have Footer. The recovered Layout.tsx had it.
// I will import it from where it ends up. I'll guess @/components/layout/Footer or @/components/landing/Footer based on previous knowledge.
// Actually, earlier view_file showed `import { Footer } from "@/components/landing/Footer";` in recovered Layout.tsx.

import { Footer } from "@/components/landing/Footer";

export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background font-bangla antialiased flex flex-col">
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
}
