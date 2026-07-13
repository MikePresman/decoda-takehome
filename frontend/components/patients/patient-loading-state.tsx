export function PatientLoadingState() {
  return (
    <div className="grid gap-6">
      <section className="grid gap-4 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-40 animate-pulse rounded-[30px] bg-white shadow-[0_0_0_1px_rgba(147,118,88,0.08)]"
          />
        ))}
      </section>
      <section className="overflow-hidden rounded-[32px] bg-white shadow-[0_0_0_1px_rgba(147,118,88,0.08)]">
        <div className="space-y-4 px-6 py-5">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="h-12 animate-pulse rounded-2xl bg-[#f6efe5]" />
          ))}
        </div>
      </section>
    </div>
  );
}

