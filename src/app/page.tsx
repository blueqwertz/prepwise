"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Brain,
  Euro,
  Salad,
  ArrowRight,
  ChevronDown,
  Sparkles,
  Users,
  CalendarDays,
  ShoppingCart,
} from "lucide-react"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-900 text-white">
        {/* Geometric decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-white/[0.06] blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-emerald-400/[0.08] blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full border border-white/[0.06]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full border border-white/[0.04]" />
          {/* Dot grid */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 py-32 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/10 backdrop-blur border border-white/10 text-sm font-medium mb-10"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-300" />
            </span>
            Red Bull Basement 2026 &mdash; Austria National Winner
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-7xl font-bold tracking-tight leading-[1.1] max-w-4xl"
          >
            Healthy eating
            <br />
            <span className="text-emerald-200">at fair prices</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 text-lg text-emerald-100/80 max-w-lg leading-relaxed"
          >
            Prepwise is your AI meal planner that creates nutritious,
            budget-friendly weekly menus based on real grocery prices.
            No surprises at checkout.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row gap-3"
          >
            <Link
              href="/planner"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-emerald-700 font-semibold text-lg transition-all hover:bg-emerald-50 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-black/10"
            >
              Start Planning Free
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border-2 border-white/20 text-white font-semibold text-lg transition-all hover:bg-white/10"
            >
              <ChevronDown className="h-5 w-5" />
              Learn More
            </a>
          </motion.div>
        </div>

        {/* Bottom wave divider */}
        <div className="relative h-16 -mb-px">
          <svg
            viewBox="0 0 1440 64"
            className="absolute bottom-0 w-full h-16 fill-white"
            preserveAspectRatio="none"
          >
            <path d="M0,32 C240,64 480,0 720,32 C960,64 1200,0 1440,32 L1440,64 L0,64 Z" />
          </svg>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-b border-zinc-100">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mx-auto max-w-6xl px-6 py-12 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center"
        >
          {[
            { value: "1,060+", label: "Competing ideas", icon: Sparkles },
            { value: "9", label: "Finalist teams", icon: Users },
            { value: "40+", label: "Countries at final", icon: CalendarDays },
            { value: "100%", label: "Budget-managed", icon: ShoppingCart },
          ].map((stat) => (
            <motion.div key={stat.label} variants={item}>
              <div className="flex justify-center mb-2 text-emerald-600">
                <stat.icon className="h-5 w-5" />
              </div>
              <div className="text-3xl font-bold text-zinc-900 tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm text-zinc-500 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Built for real life
          </h2>
          <p className="mt-4 text-zinc-500 max-w-lg mx-auto text-lg">
            Simple tools that make a real difference to your wallet and health.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-16 grid gap-6 sm:grid-cols-3"
        >
          {[
            {
              icon: Brain,
              title: "AI-Powered Planning",
              desc: "Smart algorithms create varied, balanced meal plans that match your taste — never eat the same thing twice unless you want to.",
              gradient: "from-purple-500 to-purple-700",
            },
            {
              icon: Euro,
              title: "Real Grocery Prices",
              desc: "Every ingredient is costed with realistic supermarket prices. Know exactly what you'll spend before you step into the store.",
              gradient: "from-emerald-500 to-emerald-700",
            },
            {
              icon: Salad,
              title: "Nutrition First",
              desc: "Full nutritional breakdown for every meal. Track calories, protein, carbs, and fat without spreadsheets or apps.",
              gradient: "from-amber-500 to-amber-700",
            },
          ].map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              whileHover={{ y: -4 }}
              className="group flex flex-col p-8 rounded-3xl bg-white border border-zinc-200/60 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} text-white shadow-sm mb-6`}
              >
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg text-zinc-900">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm text-zinc-500 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* How it works */}
      <section className="bg-white py-28 border-t border-zinc-100">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Three steps to dinner
            </h2>
            <p className="mt-4 text-zinc-500 max-w-lg mx-auto text-lg">
              From budget to plate in under a minute.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "Set your budget",
                desc: "Tell us your weekly grocery budget and how many mouths to feed. We'll handle the math.",
              },
              {
                step: "02",
                title: "Pick your style",
                desc: "Dietary preferences, favorite cuisines, allergies — dial in exactly what you want.",
              },
              {
                step: "03",
                title: "Get your plan",
                desc: "Your complete meal plan with recipes, ingredient lists, and exact costs. Ready in seconds.",
              },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative flex flex-col items-center text-center p-8"
              >
                <div className="text-5xl font-black text-emerald-100 mb-5 tabular-nums">
                  {s.step}
                </div>
                <h3 className="font-semibold text-lg">{s.title}</h3>
                <p className="mt-2 text-sm text-zinc-500 leading-relaxed max-w-xs">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-28 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-800 p-16 text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
          </div>
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Ready to eat smarter?
            </h2>
            <p className="mt-4 text-emerald-100 max-w-md mx-auto text-lg">
              Plan your first week of healthy, budget-friendly meals now.
              It&rsquo;s free and takes 30 seconds.
            </p>
            <Link
              href="/planner"
              className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-emerald-700 font-semibold text-lg transition-all hover:bg-emerald-50 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            >
              Launch Planner
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
