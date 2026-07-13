import type { PatientStatus } from "@/lib/patients";


const statusClasses: Record<PatientStatus, string> = {
  active: "bg-[#e7efe4] text-[#5f8b5c]",
  inactive: "bg-[#f4ebe7] text-[#a57263]",
  new: "bg-[#e7edf6] text-[#58769c]",
  never_paid: "bg-[#f6f0e2] text-[#9b7741]"
};

const statusLabels: Record<PatientStatus, string> = {
  active: "Active",
  inactive: "Inactive",
  new: "New",
  never_paid: "Never Paid"
};


export function PatientStatusBadge({ status }: { status: PatientStatus }) {
  return (
    <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${statusClasses[status]}`}>
      {statusLabels[status]}
    </span>
  );
}

