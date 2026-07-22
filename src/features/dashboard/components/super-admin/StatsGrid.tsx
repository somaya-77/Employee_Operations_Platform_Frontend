import { StatCardItem } from "@/types/dashboard.types";


interface Props {
  cards: StatCardItem[];
}

export default function StatsGrid({ cards }: Props) {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <div
            key={card.label}
            className="rounded-xl border border-border bg-sidebar p-5 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{card.label}</span>
              <div className={`w-9 h-9 rounded-lg ${card.bg} flex items-center justify-center`}>
                <Icon className={`w-4.5 h-4.5 ${card.color}`} />
              </div>
            </div>

            {card.trend ?

              <div>
                <p className="text-2xl font-semibold tracking-tight">{card.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{card.sub}</p>
              </div>
              :

              <div>
                <p className="text-2xl font-semibold">{card.value}</p>
                <p className={`text-xs mt-0.5 ${card.positive ? "text-emerald-500" : "text-muted-foreground"}`}>{card.sub}</p>
              </div>
            }

            {card.trend &&
              <div
                className={`text-xs font-medium px-2 py-1 rounded-md w-fit ${card.positive
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                  }`}
              >
                {card.trend}
              </div>
            }

          </div>
        )
      })}
    </div>
  )
}
