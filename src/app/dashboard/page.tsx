import type { Metadata } from "next";

import Dashboard from "@/components/dashboard/dashboard";

export const metadata: Metadata = {
  title: "Your dashboard — IAIB",
  description: "Your streak, today's problem, and your credits.",
};

export default function DashboardPage() {
  return <Dashboard />;
}
