export function PatientEmptyState() {
  return (
    <div className="rounded-[32px] bg-white px-8 py-12 text-center shadow-[0_0_0_1px_rgba(147,118,88,0.08)]">
      <h2 className="text-2xl font-semibold text-[#2d2723]">No patients match these filters.</h2>
      <p className="mt-3 text-[15px] text-[#8f7662]">
        Try clearing filters or search by name, phone, or email.
      </p>
    </div>
  );
}

