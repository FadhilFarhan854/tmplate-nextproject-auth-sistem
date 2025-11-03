import * as React from "react"

import { cn } from "@/lib/utils"

const Dropdown = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute right-0 mt-2 w-48 rounded-lg border border-border bg-card shadow-lg z-50",
      className
    )}
    {...props}
  />
))
Dropdown.displayName = "Dropdown"

const DropdownItem = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "flex w-full items-center gap-2 px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors first:rounded-t-lg last:rounded-b-lg",
      className
    )}
    {...props}
  />
))
DropdownItem.displayName = "DropdownItem"

export { Dropdown, DropdownItem }
