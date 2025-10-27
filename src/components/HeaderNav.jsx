import { Home, Receipt, Users, CreditCard, Shield } from "lucide-react";

export default function HeaderNav({ onSelect, active }) {
  const items = [
    { key: "dashboard", label: "Dashboard", icon: Home },
    { key: "transactions", label: "Transactions", icon: Receipt },
    { key: "members", label: "Members", icon: Users },
    { key: "splitbill", label: "Splitbill", icon: CreditCard },
    { key: "admin", label: "Admin", icon: Shield },
  ];

  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/60 bg-neutral-950/80 border-b border-neutral-800">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-3 rounded-full bg-emerald-400 shadow-[0_0_20px_4px_rgba(16,185,129,0.4)]" />
          <span className="font-semibold tracking-tight text-neutral-100">ClearFund</span>
        </div>
        <nav className="hidden sm:flex items-center gap-1">
          {items.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => onSelect(key)}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                active === key
                  ? "bg-neutral-800 text-white"
                  : "text-neutral-300 hover:text-white hover:bg-neutral-800"
              }`}
            >
              <Icon className="size-4" />
              {label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
