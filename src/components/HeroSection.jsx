import Spline from "@splinetool/react-spline";

export default function HeroSection() {
  return (
    <section className="relative w-full bg-neutral-950">
      {/* Cover Spline */}
      <div className="relative h-[360px] sm:h-[460px] md:h-[560px] w-full overflow-hidden">
        <Spline
          scene="https://prod.spline.design/vi0ijCQQJTRFc8LA/scene.splinecode"
          style={{ width: "100%", height: "100%" }}
        />
        {/* Gradient overlays should never block interaction */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-neutral-950/70 via-neutral-950/20 to-neutral-950/80" />
      </div>

      {/* Foreground content */}
      <div className="mx-auto max-w-6xl px-4 -mt-40 sm:-mt-52 md:-mt-64 pb-8 sm:pb-10 md:pb-12 relative">
        <div className="rounded-2xl border border-neutral-800/60 bg-neutral-900/50 backdrop-blur p-5 sm:p-7 shadow-[0_0_50px_-12px_rgba(34,197,94,0.25)]">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white">
                Clear, crypto‑style transparency for shared funds
              </h1>
              <p className="mt-2 text-neutral-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                Track contributions, split expenses, and give every member real‑time visibility. Designed with a modern
                fintech aesthetic and 3D motion.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="#dashboard"
                className="px-4 py-2 rounded-md bg-emerald-500 text-neutral-950 font-medium hover:bg-emerald-400 transition-colors"
              >
                Explore Dashboard
              </a>
              <a
                href="#splitbill"
                className="px-4 py-2 rounded-md bg-neutral-800 text-white border border-neutral-700 hover:bg-neutral-700 transition-colors"
              >
                New Splitbill
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
