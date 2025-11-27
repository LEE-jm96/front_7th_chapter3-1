import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import type { AlertProps } from "./types"

// shadcn 기본 컴포넌트들
const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground border-border",
        info: "bg-info/10 text-info border-info/20",
        success: "bg-success/10 text-success border-success/20",
        warning: "bg-warning/10 text-warning border-warning/20",
        error: "bg-error/10 text-error border-error/20",
        destructive: "bg-destructive/10 text-destructive border-destructive/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function AlertBase({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

// 기존 props 구조를 유지하는 Alert 컴포넌트
export const Alert: React.FC<AlertProps> = ({
  children,
  variant = 'default',
  title,
  onClose,
  showIcon = true,
}) => {
  const getIcon = () => {
    switch (variant) {
      case 'info':
        return 'ℹ️';
      case 'success':
        return '✓';
      case 'warning':
        return '⚠️';
      case 'error':
        return '✕';
      default:
        return '•';
    }
  };

  return (
    <AlertBase variant={variant} className="flex gap-2 items-start">
      {showIcon && (
        <span className="flex-shrink-0 text-base leading-none">
          {getIcon()}
        </span>
      )}
      <div className="flex-1 min-w-0">
        {title ? (
          <>
            <div className="font-medium mb-1">{title}</div>
            <div className="text-sm">{children}</div>
          </>
        ) : (
          <div className="text-sm">{children}</div>
        )}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 ml-auto rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-lg leading-none"
          aria-label="Close"
        >
          ×
        </button>
      )}
    </AlertBase>
  );
};

// shadcn 기본 컴포넌트들도 export
export { AlertBase, AlertTitle, AlertDescription }

