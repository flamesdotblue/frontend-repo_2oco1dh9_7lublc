export default function AppFooter() {
  return (
    <footer className="mt-12 border-t border-neutral-800 bg-neutral-950/80">
      <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-neutral-500">© {new Date().getFullYear()} ClearFund — Transparent shared funds</p>
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <a href="#" className="hover:text-white">Privacy</a>
          <span className="opacity-30">•</span>
          <a href="#" className="hover:text-white">Terms</a>
          <span className="opacity-30">•</span>
          <a href="#" className="hover:text-white">Support</a>
        </div>
      </div>
    </footer>
  );
}
