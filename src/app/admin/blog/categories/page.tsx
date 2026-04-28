import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import AdminShell from "@/components/admin/AdminShell"
import CategoriesClient from "./CategoriesClient"

export default async function CategoriesPage() {
  const session = await auth()
  if (!session) redirect("/admin/login")

  return (
    <AdminShell>
      <CategoriesClient />
    </AdminShell>
  )
}
