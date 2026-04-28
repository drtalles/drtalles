"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import {
  LayoutDashboard,
  FileText,
  Tag,
  ChevronRight,
  LogOut,
  Menu,
  X,
  BookOpen,
} from "lucide-react"
import { useState } from "react"
import { clsx } from "clsx"

type NavLeaf = { label: string; href: string; icon: React.ElementType }
type NavGroup = { label: string; icon: React.ElementType; children: NavLeaf[] }
type NavItem = NavLeaf | NavGroup

const NAV: NavItem[] = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Blog",
    icon: BookOpen,
    children: [
      { label: "Postagens", href: "/admin/blog/posts", icon: FileText },
      { label: "Categorias", href: "/admin/blog/categories", icon: Tag },
    ],
  },
]

function NavItemComponent({
  item,
  collapsed,
  onClick,
}: {
  item: NavItem
  collapsed: boolean
  onClick?: () => void
}) {
  const pathname = usePathname()
  const [open, setOpen] = useState(() => {
    if ("children" in item) {
      return item.children.some((c) => pathname.startsWith(c.href))
    }
    return false
  })

  if ("children" in item) {
    const isActive = item.children.some((c) => pathname.startsWith(c.href))
    return (
      <div>
        <button
          onClick={() => setOpen((v) => !v)}
          className={clsx(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group",
            isActive
              ? "bg-primary/10 text-primary"
              : "text-neutral-400 hover:bg-white/5 hover:text-white"
          )}
        >
          <item.icon className="size-4.5 shrink-0" />
          {!collapsed && (
            <>
              <span className="flex-1 text-left">{item.label}</span>
              <ChevronRight
                className={clsx("size-3.5 transition-transform duration-200", open && "rotate-90")}
              />
            </>
          )}
        </button>
        {!collapsed && open && (
          <div className="mt-0.5 ml-4 pl-3 border-l border-white/10 space-y-0.5">
            {item.children.map((child) => {
              const active = pathname.startsWith(child.href)
              return (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={onClick}
                  className={clsx(
                    "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150",
                    active
                      ? "bg-primary text-white font-medium"
                      : "text-neutral-400 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <child.icon className="size-4 shrink-0" />
                  {child.label}
                </Link>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  const active = pathname === item.href
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={clsx(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
        active
          ? "bg-primary text-white"
          : "text-neutral-400 hover:bg-white/5 hover:text-white"
      )}
    >
      <item.icon className="size-4.5 shrink-0" />
      {!collapsed && <span>{item.label}</span>}
    </Link>
  )
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-5 border-b border-white/10">
        {!collapsed && (
          <div>
            <span className="text-white font-semibold text-sm tracking-wide">Dr. Talles</span>
            <p className="text-neutral-500 text-xs mt-0.5">Admin</p>
          </div>
        )}
        <button
          onClick={() => setCollapsed((v) => !v)}
          className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors hidden md:flex"
          aria-label="Toggle sidebar"
        >
          <Menu className="size-4" />
        </button>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV.map((item) => (
          <NavItemComponent
            key={"href" in item ? item.href : item.label}
            item={item}
            collapsed={collapsed}
            onClick={() => setMobileOpen(false)}
          />
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-white/10">
        <div className={clsx("flex items-center gap-3 px-3 py-2 mb-1", collapsed && "justify-center")}>
          <div className="size-7 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold shrink-0">
            {session?.user?.name?.[0]?.toUpperCase() ?? "A"}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-medium truncate">{session?.user?.name}</p>
              <p className="text-neutral-500 text-xs truncate">{session?.user?.email}</p>
            </div>
          )}
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className={clsx(
            "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-150",
            collapsed && "justify-center"
          )}
        >
          <LogOut className="size-4 shrink-0" />
          {!collapsed && <span>Sair</span>}
        </button>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-neutral-50 overflow-hidden">
      {/* Desktop sidebar */}
      <aside
        className={clsx(
          "hidden md:flex flex-col bg-neutral-900 border-r border-white/10 transition-all duration-300 shrink-0",
          collapsed ? "w-16" : "w-56"
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-50 w-64 flex flex-col bg-neutral-900 border-r border-white/10 transition-transform duration-300 md:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
          <span className="text-white font-semibold text-sm">Dr. Talles Admin</span>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1.5 text-neutral-400 hover:text-white"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <nav className="px-3 py-4 space-y-0.5">
            {NAV.map((item) => (
              <NavItemComponent
                key={"href" in item ? item.href : item.label}
                item={item}
                collapsed={false}
                onClick={() => setMobileOpen(false)}
              />
            ))}
          </nav>
        </div>
        <div className="px-3 py-4 border-t border-white/10">
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="size-4" />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile topbar */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            <Menu className="size-5" />
          </button>
          <span className="text-sm font-semibold text-gray-900">Dr. Talles Admin</span>
          <div className="size-7 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
            {session?.user?.name?.[0]?.toUpperCase() ?? "A"}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
