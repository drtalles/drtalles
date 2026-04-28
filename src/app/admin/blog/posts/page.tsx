import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import AdminShell from "@/components/admin/AdminShell"
import PostsClient from "./PostsClient"

export default async function PostsPage() {
  const session = await auth()
  if (!session) redirect("/admin/login")

  return (
    <AdminShell>
      <PostsClient />
    </AdminShell>
  )
}
