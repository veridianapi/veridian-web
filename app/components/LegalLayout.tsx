import Nav from "./Nav";
import Footer from "./Footer";

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export default function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
            <p className="text-sm text-gray-400">Last updated: {lastUpdated}</p>
          </div>
          <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed space-y-6">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
