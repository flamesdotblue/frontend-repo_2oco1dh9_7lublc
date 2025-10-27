import Spline from "@splinetool/react-spline";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-neutral-950">
      <div className="mx-auto max-w-6xl px-4 pt-8 pb-4 sm:pt-12 sm:pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6">
          <div className="order-2 md:order-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white">
              Transparent shared funds for modern organizations
            </h1>
            <p className="mt-3 text-neutral-300 text-sm sm:text-base leading-relaxed">
              Track monthly contributions, validate split bills, and give every
              member a clear view. Built mobile-first in a sleek, glass-morphic
              dark UI.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="#dashboard"
                className="px-4 py-2 rounded-md bg-emerald-500 text-neutral-950 font-medium hover:bg-emerald-400 transition-colors"
              >
                View Dashboard
              </a>
              <a
                href="#splitbill"
                className="px-4 py-2 rounded-md bg-neutral-800 text-white border border-neutral-700 hover:bg-neutral-700 transition-colors"
              >
                Create Splitbill
              </a>
            </div>
          </div>
          <div className="order-1 md:order-2 h-64 sm:h-80 md:h-[28rem] rounded-xl bg-gradient-to-b from-neutral-900 to-neutral-950 relative">
            <Spline
              scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode"
              style={{ width: "100%", height: "100%" }}
            />
            <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
