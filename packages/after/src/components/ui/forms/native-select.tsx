import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import type { SelectTriggerProps } from "./types"

// Native Select wrapper component
function Select({ className, ...props }: React.ComponentProps<"select">) {
  return (
    <div
      className="group/native-select relative w-fit has-[select:disabled]:opacity-50"
      data-slot="native-select-wrapper"
    >
      <select
        data-slot="native-select"
        className={cn(
          "border-input placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 dark:hover:bg-input/50 h-9 w-full min-w-0 appearance-none rounded-md border bg-transparent px-3 py-2 pr-9 text-sm shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props}
      />
      <ChevronDownIcon
        className="text-muted-foreground pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 opacity-50 select-none"
        aria-hidden="true"
        data-slot="native-select-icon"
      />
    </div>
  )
}

// For backward compatibility - returns children as-is for native select
function SelectGroup({ children, ...props }: React.ComponentProps<"optgroup">) {
  return <optgroup data-slot="select-group" {...props}>{children}</optgroup>
}

// Not applicable for native select, but kept for compatibility
function SelectValue({ children }: React.PropsWithChildren) {
  return <>{children}</>
}

// Native select trigger wrapper
function SelectTrigger({ 
  className, 
  size = "default",
  children,
  ...props 
}: Omit<React.ComponentProps<"select">, "size"> & SelectTriggerProps) {
  return (
    <div
      className="group/native-select relative w-fit has-[select:disabled]:opacity-50"
      data-slot="native-select-wrapper"
    >
      <select
        data-slot="native-select"
        data-size={size}
        className={cn(
          "border-input placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 dark:hover:bg-input/50 min-w-0 appearance-none rounded-md border bg-transparent px-3 py-2 pr-9 text-sm shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          "data-[size=default]:h-9 data-[size=sm]:h-8",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDownIcon
        className="text-muted-foreground pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 opacity-50 select-none"
        aria-hidden="true"
        data-slot="native-select-icon"
      />
    </div>
  )
}

// Not applicable for native select, but kept for compatibility
function SelectContent({ children }: React.PropsWithChildren) {
  return <>{children}</>
}

// Not applicable for native select, but kept for compatibility
function SelectLabel({ children }: React.PropsWithChildren) {
  return <>{children}</>
}

// Native option component
function SelectItem({ children, value, ...props }: React.ComponentProps<"option">) {
  return <option value={value} data-slot="select-item" {...props}>{children}</option>
}

// Not applicable for native select, but kept for compatibility
function SelectSeparator() {
  return null
}

// Not applicable for native select, but kept for compatibility
function SelectScrollUpButton() {
  return null
}

// Not applicable for native select, but kept for compatibility
function SelectScrollDownButton() {
  return null
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}

