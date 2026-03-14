export default function Footer() {
  console.log(process.env.NEXT_PUBLIC_API_BASE_URL)
  return (
    <footer className="border-t border-white/10 py-6 text-center text-sm text-zinc-400">
      © 2026 Rohit Gupta. Built with Next.js, TypeScript, Node, Express, and MongoDB.
    </footer>
  );
}