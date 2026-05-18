import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <Link href="/" className="flex items-center space-x-2 text-[#2563EB]">
        <BookOpen size={28} />
        <span className="text-2xl font-bold tracking-tight">EasyLearn</span>
      </Link>
      <div className="flex space-x-4">
        <Link href="/sorting" className="text-gray-600 hover:text-[#2563EB] font-medium transition-colors">
          Sorting
        </Link>
      </div>
    </nav>
  );
}
