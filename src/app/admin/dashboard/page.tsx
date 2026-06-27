import { redirect } from "next/navigation";

export default function LegacyAdminDashboard() {
  redirect("/operations/admin");
}
