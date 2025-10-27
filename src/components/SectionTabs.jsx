import { useState } from "react";
import {
  Home,
  Receipt,
  Users,
  CreditCard,
  Shield,
  Plus,
  CheckCircle2,
  TrendingUp,
  ArrowDownRight,
  Coins,
  Wallet,
  PieChart,
  Activity,
} from "lucide-react";

export default function SectionTabs({ value, onChange }) {
  const [internal, setInternal] = useState("dashboard");
  const tab = value ?? internal;
  const setTab = onChange ?? setInternal;

  const tabs = [
    { key: "dashboard", label: "Dashboard", icon: Home },
    { key: "transactions", label: "Transactions", icon: Receipt },
    { key: "members", label: "Members", icon: Users },
    { key: "splitbill", label: "Splitbill", icon: CreditCard },
    { key: "admin", label: "Admin", icon: Shield },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 pb-16">
      {/* Mobile Tabs */}
      <div className="sm:hidden sticky top-[56px] z-10 bg-neutral-950/90 backdrop-blur border-b border-neutral-800">
        <div className="flex overflow-x-auto no-scrollbar">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex-1 min-w-[44%] inline-flex items-center justify-center gap-2 px-4 py-3 text-sm ${
                tab === key ? "text-white border-b-2 border-emerald-500" : "text-neutral-400"
              }`}
            >
              <Icon className="size-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content (mobile) */}
      <div id="dashboard" className="mt-6 sm:hidden">
        {tab === "dashboard" && <DashboardPanel />}
        {tab === "transactions" && <TransactionsPanel />}
        {tab === "members" && <MembersPanel />}
        {tab === "splitbill" && <SplitbillPanel />}
        {tab === "admin" && <AdminPanel />}
      </div>

      {/* Desktop layout with side nav */}
      <div className="hidden sm:grid sm:grid-cols-12 gap-6">
        <aside className="sm:col-span-3 lg:col-span-2">
          <div className="sticky top-[72px] rounded-xl border border-neutral-800 bg-neutral-900/40 p-2">
            {tabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`w-full text-left inline-flex items-center gap-3 px-3 py-2 rounded-md mb-1 transition-colors ${
                  tab === key ? "bg-neutral-800 text-white" : "text-neutral-300 hover:bg-neutral-800"
                }`}
              >
                <Icon className="size-4" />
                <span className="text-sm">{label}</span>
              </button>
            ))}
          </div>
        </aside>
        <main className="sm:col-span-9 lg:col-span-10">
          {tab === "dashboard" && <DashboardPanel />}
          {tab === "transactions" && <TransactionsPanel />}
          {tab === "members" && <MembersPanel />}
          {tab === "splitbill" && <SplitbillPanel />}
          {tab === "admin" && <AdminPanel />}
        </main>
      </div>
    </section>
  );
}

function StatCard({ title, value, sub, icon: Icon, tone = "neutral" }) {
  const toneStyles =
    tone === "up"
      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
      : tone === "down"
      ? "bg-red-500/10 text-red-400 border-red-500/30"
      : "bg-neutral-900/40 text-white border-neutral-800";
  return (
    <div className={`rounded-xl border p-4 ${tone === "neutral" ? "bg-neutral-900/40 border-neutral-800" : toneStyles}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-neutral-400">{title}</p>
          <p className="mt-1 text-xl font-semibold text-white">{value}</p>
          {sub && <p className="mt-1 text-xs text-neutral-400">{sub}</p>}
        </div>
        {Icon && (
          <div className="rounded-lg bg-neutral-800/60 border border-neutral-700 p-2">
            <Icon className="size-4 text-neutral-300" />
          </div>
        )}
      </div>
    </div>
  );
}

function Sparkline({ points, positive = true }) {
  const width = 220;
  const height = 60;
  const maxY = Math.max(...points);
  const minY = Math.min(...points);
  const norm = (v) => (1 - (v - minY) / (maxY - minY || 1)) * (height - 6) + 3;
  const step = width / (points.length - 1);
  const d = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${i * step},${norm(p)}`)
    .join(" ");
  const gradientId = positive ? "gradUp" : "gradDown";
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-16">
      <defs>
        <linearGradient id="gradUp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(16,185,129)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="rgb(16,185,129)" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="gradDown" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(248,113,113)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="rgb(248,113,113)" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <path d={d} fill="none" stroke={positive ? "#34d399" : "#f87171"} strokeWidth="2" />
      <path
        d={`${d} L ${width},${height} L 0,${height} Z`}
        fill={`url(#${gradientId})`}
        opacity="0.4"
      />
    </svg>
  );
}

function Donut({ segments }) {
  const size = 140;
  const radius = 52;
  const circ = 2 * Math.PI * radius;
  let offset = 0;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-36 h-36">
      <g transform={`translate(${size / 2}, ${size / 2})`}>
        <circle r={radius} fill="none" stroke="#262626" strokeWidth="10" />
        {segments.map((s, i) => {
          const len = (s.value / 100) * circ;
          const dashArray = `${len} ${circ - len}`;
          const el = (
            <circle
              key={i}
              r={radius}
              fill="none"
              stroke={s.color}
              strokeWidth="10"
              strokeDasharray={dashArray}
              strokeDashoffset={-offset}
              transform="-rotate(90)"
            />
          );
          offset += len;
          return el;
        })}
        <circle r={32} fill="#0a0a0a" />
      </g>
    </svg>
  );
}

function DashboardPanel() {
  const spark = [10, 12, 11, 14, 16, 15, 19, 22, 20, 24, 29, 32];
  const alloc = [
    { label: "Operations", value: 40, color: "#34d399" },
    { label: "Savings", value: 25, color: "#60a5fa" },
    { label: "Events", value: 20, color: "#fbbf24" },
    { label: "Misc", value: 15, color: "#f472b6" },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard title="Fund Balance" value="$12,480" sub="+3.2% this month" icon={Wallet} tone="neutral" />
        <StatCard title="Avg. Contribution" value="$210" sub="18 contributors" icon={Coins} tone="neutral" />
        <StatCard title="Growth" value="+12.4%" sub="30d change" icon={TrendingUp} tone="up" />
        <StatCard title="Pending Bills" value="2" sub="$185 total" icon={ArrowDownRight} tone="down" />
      </div>

      {/* Balance + Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl border border-neutral-800 bg-neutral-900/40 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-300">Portfolio Balance</p>
              <p className="mt-1 text-2xl font-semibold text-white">$12,480</p>
              <div className="mt-1 inline-flex items-center gap-2 text-xs text-emerald-400">
                <TrendingUp className="size-4" />
                <span>+$380 today</span>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-3 text-xs">
              <span className="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">Live</span>
              <span className="px-2 py-1 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700">30d</span>
            </div>
          </div>
          <div className="mt-3 -mx-2">
            <Sparkline points={spark} positive />
          </div>
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {[
              { k: "Inflows", v: "+$2,450", c: "text-emerald-400" },
              { k: "Outflows", v: "-$1,120", c: "text-red-400" },
              { k: "Net 30d", v: "+$1,330", c: "text-emerald-400" },
              { k: "Runway", v: "6.2 mo", c: "text-neutral-300" },
            ].map((m) => (
              <div key={m.k} className="rounded-lg bg-neutral-900/50 border border-neutral-800 p-2">
                <p className="text-neutral-400">{m.k}</p>
                <p className={`font-medium ${m.c}`}>{m.v}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-neutral-300">Allocation</p>
            <PieChart className="size-4 text-neutral-400" />
          </div>
          <div className="mt-2 flex items-center gap-5">
            <Donut segments={alloc} />
            <ul className="space-y-2 text-xs">
              {alloc.map((a) => (
                <li key={a.label} className="flex items-center gap-2">
                  <span className="size-2 rounded-sm" style={{ backgroundColor: a.color }} />
                  <span className="text-neutral-300">{a.label}</span>
                  <span className="ml-auto font-medium text-white">{a.value}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Activity + Upcoming */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl border border-neutral-800 bg-neutral-900/40">
          <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
            <div className="inline-flex items-center gap-2 text-sm text-neutral-300">
              <Activity className="size-4" /> Recent Activity
            </div>
            <div className="text-xs text-neutral-400">Last 7 days</div>
          </div>
          <ul className="divide-y divide-neutral-800">
            {[
              { t: "Contribution • Ayo", a: "+$200", ts: "2h ago" },
              { t: "Internet reimbursement", a: "-$65", ts: "1d ago" },
              { t: "Splitbill • Lunch", a: "-$120", ts: "3d ago" },
              { t: "Contribution • Zara", a: "+$250", ts: "4d ago" },
            ].map((i, idx) => (
              <li key={idx} className="p-4 flex items-center justify-between text-sm">
                <span className="text-neutral-300">{i.t}</span>
                <div className="flex items-center gap-4">
                  <span className={`font-medium ${i.a.startsWith("+") ? "text-emerald-400" : "text-red-400"}`}>{i.a}</span>
                  <span className="text-xs text-neutral-500">{i.ts}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4">
          <p className="text-sm text-neutral-300">Upcoming Bills</p>
          <ul className="mt-3 space-y-3">
            {[
              { t: "Cloud subscription", d: "Oct 30", a: 89 },
              { t: "Office snacks", d: "Nov 02", a: 45 },
            ].map((u) => (
              <li key={u.t} className="flex items-center justify-between text-sm">
                <div>
                  <p className="text-white">{u.t}</p>
                  <p className="text-xs text-neutral-500">Due {u.d}</p>
                </div>
                <span className="text-red-400">-${u.a}</span>
              </li>
            ))}
          </ul>
          <button className="mt-4 w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-neutral-800 text-white text-sm hover:bg-neutral-700">
            <Plus className="size-4" /> Add bill
          </button>
        </div>
      </div>
    </div>
  );
}

function TransactionsPanel() {
  const items = [
    { id: "TX-9201", label: "Cloud subscription", amount: -89, date: "Oct 12" },
    { id: "TX-9200", label: "Member contribution • Zara", amount: 200, date: "Oct 10" },
    { id: "TX-9199", label: "Stationery", amount: -34.5, date: "Oct 09" },
  ];
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/40">
      <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
        <p className="text-sm text-neutral-300">All Transactions</p>
        <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-neutral-800 text-white text-sm hover:bg-neutral-700">
          <Plus className="size-4" />
          Add entry
        </button>
      </div>
      <ul className="divide-y divide-neutral-800">
        {items.map((tx) => (
          <li key={tx.id} className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-white">{tx.label}</p>
              <p className="text-xs text-neutral-500">{tx.id} • {tx.date}</p>
            </div>
            <span className={`text-sm font-medium ${tx.amount >= 0 ? "text-emerald-400" : "text-red-400"}`}>
              {tx.amount >= 0 ? "+$" + tx.amount : "-$" + Math.abs(tx.amount)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MembersPanel() {
  const members = [
    { name: "Ayo Adeleke", status: "Active" },
    { name: "Zara Bello", status: "Active" },
    { name: "Kemi Okoye", status: "Pending" },
    { name: "Tunde Akin", status: "Active" },
  ];
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/40">
      <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
        <p className="text-sm text-neutral-300">Members</p>
        <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-neutral-800 text-white text-sm hover:bg-neutral-700">
          <Plus className="size-4" />
          Add member
        </button>
      </div>
      <ul className="divide-y divide-neutral-800">
        {members.map((m) => (
          <li key={m.name} className="p-4 flex items-center justify-between">
            <p className="text-sm text-white">{m.name}</p>
            <span className={`text-xs px-2 py-1 rounded-full border ${
              m.status === "Active" ? "border-emerald-500 text-emerald-400" : "border-yellow-500 text-yellow-400"
            }`}>
              {m.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SplitbillPanel() {
  return (
    <div id="splitbill" className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4">
      <p className="text-sm text-neutral-300">New Splitbill</p>
      <form className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <input className="col-span-1 sm:col-span-1 bg-neutral-800 text-white text-sm rounded-md px-3 py-2 outline-none border border-neutral-700 focus:border-emerald-500" placeholder="Title (e.g., Team Lunch)" />
        <input type="number" className="col-span-1 bg-neutral-800 text-white text-sm rounded-md px-3 py-2 outline-none border border-neutral-700 focus:border-emerald-500" placeholder="Total amount" />
        <input className="col-span-1 bg-neutral-800 text-white text-sm rounded-md px-3 py-2 outline-none border border-neutral-700 focus:border-emerald-500" placeholder="Participants (comma separated)" />
        <div className="col-span-1 sm:col-span-3 flex items-center justify-between">
          <button type="button" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-emerald-500 text-neutral-950 font-medium hover:bg-emerald-400">
            Create request
          </button>
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <CheckCircle2 className="size-4 text-emerald-400" />
            Admin will review and confirm
          </div>
        </div>
      </form>
    </div>
  );
}

function AdminPanel() {
  return (
    <div className="max-w-md">
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4">
        <p className="text-sm text-neutral-300">Admin Login</p>
        <form className="mt-4 space-y-3">
          <input type="email" className="w-full bg-neutral-800 text-white text-sm rounded-md px-3 py-2 outline-none border border-neutral-700 focus:border-emerald-500" placeholder="Email" />
          <input type="password" className="w-full bg-neutral-800 text-white text-sm rounded-md px-3 py-2 outline-none border border-neutral-700 focus:border-emerald-500" placeholder="Password" />
          <button type="button" className="w-full px-4 py-2 rounded-md bg-emerald-500 text-neutral-950 font-medium hover:bg-emerald-400">Sign in</button>
          <p className="text-xs text-neutral-400 text-center">Protected area • Admin confirmation required for splitbills</p>
        </form>
      </div>
    </div>
  );
}
