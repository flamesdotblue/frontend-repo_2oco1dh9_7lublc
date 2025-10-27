import { useState } from "react";
import { Home, Receipt, Users, CreditCard, Shield, Plus, CheckCircle2 } from "lucide-react";

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

      {/* Content */}
      <div id="dashboard" className="mt-6">
        {tab === "dashboard" && <DashboardPanel />}
        {tab === "transactions" && <TransactionsPanel />}
        {tab === "members" && <MembersPanel />}
        {tab === "splitbill" && <SplitbillPanel />}
        {tab === "admin" && <AdminPanel />}
      </div>

      {/* Desktop side tabs */}
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

function StatCard({ title, value, sub }) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4">
      <p className="text-xs text-neutral-400">{title}</p>
      <p className="mt-1 text-xl font-semibold text-white">{value}</p>
      {sub && <p className="mt-1 text-xs text-neutral-400">{sub}</p>}
    </div>
  );
}

function DashboardPanel() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard title="Fund Balance" value="$12,480" sub="Updated today" />
        <StatCard title="This Month" value="$1,250" sub="Contributions" />
        <StatCard title="Active Members" value="18" sub="of 20 total" />
        <StatCard title="Pending Bills" value="2" sub="Awaiting admin" />
      </div>
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4">
        <p className="text-sm text-neutral-300">Recent Activity</p>
        <ul className="mt-3 space-y-3">
          {[
            { t: "Monthly contribution", a: "+$200", by: "Ayo" },
            { t: "Reimbursement • Internet", a: "-$65", by: "Group" },
            { t: "Splitbill • Office lunch", a: "-$120", by: "Group" },
          ].map((i, idx) => (
            <li key={idx} className="flex items-center justify-between text-sm">
              <span className="text-neutral-300">{i.t}</span>
              <span className={`font-medium ${i.a.startsWith("+") ? "text-emerald-400" : "text-red-400"}`}>{i.a}</span>
            </li>
          ))}
        </ul>
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
            <span className={`text-xs px-2 py-1 rounded-full border ${m.status === "Active" ? "border-emerald-500 text-emerald-400" : "border-yellow-500 text-yellow-400"}`}>
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
