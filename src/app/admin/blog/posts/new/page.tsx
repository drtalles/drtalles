import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import AdminShell from "@/components/admin/AdminShell"
import PostEditor from "@/components/admin/PostEditor"

export default async function NewPostPage() {
  const session = await auth()
  if (!session) redirect("/admin/login")

  return (
    <AdminShell>
      <PostEditor />
    </AdminShell>
  )
}
