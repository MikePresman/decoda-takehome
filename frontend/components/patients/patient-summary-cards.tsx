import { formatCurrency } from "@/lib/patients";


type SummaryCard = {
  label: string;
  value: string;
  note: string;
  icon: string;
};


export function PatientSummaryCards({
  total,
  active,
  newPatients,
  averageLifetimeValueCents
}: {
  total: number;
  active: number;
  newPatients: number;
  averageLifetimeValueCents: number;
}) {
  const cards: SummaryCard[] = [
    { label: "Total Patients", value: total.toLocaleString(), note: "Loaded roster", icon: "◎" },
    { label: "Active", value: active.toLocaleString(), note: "Seen in last 120 days", icon: "∿" },
    { label: "New Patients", value: newPatients.toLocaleString(), note: "Created in last 30 days", icon: "+" },
    {
      label: "Avg Lifetime Value",
      value: formatCurrency(averageLifetimeValueCents),
      note: "Across filtered roster",
      icon: "$"
    }
  ];

  return (
    <section className="grid gap-4 xl:grid-cols-4">
      {cards.map((stat) => (
        <article
          key={stat.label}
          className="rounded-[30px] bg-white px-6 py-6 shadow-[0_0_0_1px_rgba(147,118,88,0.08)]"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9f846e]">
                {stat.label}
              </p>
              <p className="mt-8 text-[3rem] font-semibold leading-none text-[#26211d]">
                {stat.value}
              </p>
              <p className="mt-3 text-sm font-medium text-[#a18672]">{stat.note}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f6efe5] text-lg text-[#c08a46]">
              {stat.icon}
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}

