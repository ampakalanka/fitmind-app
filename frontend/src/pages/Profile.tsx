import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Activity, Apple, Dumbbell, HeartPulse, Scissors, UserCircle2 } from 'lucide-react'
import { useFitness } from '../context/FitnessContext'

const personalInfo = {
  name: 'Jordan Malik',
  email: 'jordan.malik@fitmind.app',
  membership: 'Premium',
  goal: 'Lean muscle & metabolic balance',
  joined: 'Jan 2024',
}

const wellnessLevels = [
  { label: 'Readiness score', value: '82', detail: '+4 vs last week', icon: Activity, accent: 'text-emerald-400' },
  { label: 'Recovery load', value: 'Moderate', detail: 'Sleep debt +12 min', icon: HeartPulse, accent: 'text-cyan-400' },
  { label: 'Stress balance', value: 'Low', detail: 'HRV 74ms · Stable', icon: UserCircle2, accent: 'text-blue-400' },
]

const recentHaircuts = [
  {
    style: 'Low fade · textured top',
    barber: 'Aiden Park · Atelier Noir',
    location: 'Downtown · Suite 4B',
    date: 'Nov 18, 2025',
    notes: ['Skin fade detailing', 'Ice roller finish', 'Matte clay hold'],
  },
  {
    style: 'Tapered crop · razor part',
    barber: 'Luis Mateo · Urban Craft Barbers',
    location: '14th Street · Loft Studio',
    date: 'Oct 02, 2025',
    notes: ['Charcoal detox wash', 'Steam towel prep', 'Feather razor lines'],
  },
]

const mealPlan = [
  {
    meal: 'Breakfast',
    items: ['Protein smoothie', 'Overnight oats', 'Blueberries & chia'],
    macros: '420 kcal · 32g protein · 48g carbs · 14g fat',
  },
  {
    meal: 'Lunch',
    items: ['Salmon nourish bowl', 'Roasted veggies', 'Herb yogurt drizzle'],
    macros: '560 kcal · 40g protein · 46g carbs · 24g fat',
  },
  {
    meal: 'Dinner',
    items: ['Citrus tempeh stir-fry', 'Brown rice', 'Sesame greens'],
    macros: '610 kcal · 38g protein · 62g carbs · 20g fat',
  },
  {
    meal: 'Snacks',
    items: ['Electrolyte hydrate', 'Almond butter bites'],
    macros: '320 kcal · 18g protein · 22g carbs · 16g fat',
  },
]

export function Profile() {
  const { plans, savedPlanIds, routinePlanIds } = useFitness()

  const featuredFitnessPlan = useMemo(() => {
    if (!plans.length) return undefined
    const savedPlan = plans.find((plan) => savedPlanIds.includes(plan.id))
    if (savedPlan) return savedPlan
    const routinePlan = plans.find((plan) => routinePlanIds.includes(plan.id))
    return routinePlan ?? plans[0]
  }, [plans, savedPlanIds, routinePlanIds])

  return (
    <div className="space-y-8 px-4 py-8 text-white">
      <section className="rounded-3xl border border-white/5 bg-slate-900/70 p-6 shadow-glow backdrop-blur">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-white/5 p-3 text-white">
              <UserCircle2 className="h-12 w-12" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Profile</p>
              <h1 className="text-3xl font-semibold">{personalInfo.name}</h1>
              <p className="text-sm text-slate-300">{personalInfo.goal}</p>
            </div>
          </div>
          <div className="grid gap-2 text-sm text-slate-300">
            <p>
              <span className="text-slate-400">Email ·</span> {personalInfo.email}
            </p>
            <p>
              <span className="text-slate-400">Membership ·</span> {personalInfo.membership}
            </p>
            <p>
              <span className="text-slate-400">Joined ·</span> {personalInfo.joined}
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {wellnessLevels.map(({ label, value, detail, icon: Icon, accent }) => (
          <article key={label} className="rounded-2xl border border-white/5 bg-slate-900/60 p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.4em] text-slate-400">{label}</p>
              <Icon className={`h-5 w-5 ${accent}`} />
            </div>
            <p className="mt-4 text-3xl font-semibold">{value}</p>
            <p className="mt-1 text-sm text-slate-400">{detail}</p>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-white/5 bg-slate-900/70 p-6">
        <header className="flex items-center gap-3">
          <Apple className="h-6 w-6 text-amber-400" />
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Meal plan</p>
            <h2 className="text-2xl font-semibold">Today’s adaptive fuel</h2>
          </div>
        </header>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {mealPlan.map((block) => (
            <article key={block.meal} className="rounded-2xl border border-white/5 bg-slate-900/60 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{block.meal}</h3>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Guided</p>
              </div>
              <ul className="mt-3 space-y-1 text-sm text-slate-300">
                {block.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs uppercase tracking-[0.3em] text-slate-500">Macros</p>
              <p className="text-sm text-slate-200">{block.macros}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-white/5 bg-slate-900/70 p-6">
        <header className="flex items-center gap-3">
          <Scissors className="h-6 w-6 text-pink-400" />
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Grooming</p>
            <h2 className="text-2xl font-semibold">Recent haircut & barber</h2>
          </div>
        </header>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {recentHaircuts.map((entry) => (
            <article key={`${entry.barber}-${entry.date}`} className="rounded-2xl border border-white/5 bg-slate-900/60 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{entry.style}</h3>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{entry.date}</p>
              </div>
              <p className="mt-2 text-sm text-slate-300">{entry.barber}</p>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Location</p>
              <p className="text-sm text-slate-200">{entry.location}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.3em] text-slate-500">Session details</p>
              <ul className="mt-2 space-y-1 text-sm text-slate-300">
                {entry.notes.map((note) => (
                  <li key={note} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                    {note}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-white/5 bg-slate-900/70 p-6">
        <header className="flex items-center gap-3">
          <Dumbbell className="h-6 w-6 text-brand-aqua" />
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Fitness</p>
            <h2 className="text-2xl font-semibold">Current training focus</h2>
          </div>
        </header>

        {featuredFitnessPlan ? (
          <div className="mt-6 grid gap-6 md:grid-cols-[1.5fr,1fr]">
            <article className="space-y-4 rounded-2xl border border-white/5 bg-slate-900/60 p-5">
              <div className="flex flex-wrap items-center gap-3">
                <p className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-300">
                  {featuredFitnessPlan.duration}
                </p>
                <span className="rounded-full bg-brand-aqua/20 px-3 py-1 text-xs font-semibold text-brand-aqua">
                  {featuredFitnessPlan.intensity}
                </span>
              </div>
              <h3 className="text-2xl font-semibold">{featuredFitnessPlan.name}</h3>
              <p className="text-sm text-slate-300">{featuredFitnessPlan.description}</p>
              <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Focus areas</p>
              <div className="flex flex-wrap gap-2">
                {featuredFitnessPlan.focusAreas.map((area) => (
                  <span key={area} className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-200">
                    {area}
                  </span>
                ))}
              </div>
            </article>

            <article className="space-y-4 rounded-2xl border border-white/5 bg-slate-900/60 p-5">
              <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Suggested kit</p>
              <ul className="space-y-2 text-sm text-slate-200">
                {featuredFitnessPlan.equipment.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/fitness"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-aqua transition hover:text-white"
              >
                Adjust plan
              </Link>
            </article>
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-dashed border-white/10 p-5 text-sm text-slate-400">
            No fitness plan selected yet. Head to the <Link to="/fitness" className="text-brand-aqua">Fitness hub</Link> and save a plan to sync it here.
          </div>
        )}
      </section>
    </div>
  )
}
