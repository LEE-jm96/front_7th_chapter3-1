export type AlertVariant = 'info' | 'success' | 'warning' | 'error' | 'default'

export interface AlertProps {
  children: React.ReactNode;
  variant?: AlertVariant;
  title?: string;
  onClose?: () => void;
  showIcon?: boolean;
}

export type DialogSize = 'small' | 'medium' | 'large'

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: DialogSize;
  showFooter?: boolean;
  footerContent?: React.ReactNode;
}

export type BadgeType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'
export type BadgeSize = 'small' | 'medium' | 'large'
export type BadgeStatus = 'published' | 'draft' | 'archived' | 'pending' | 'rejected'
export type BadgeUserRole = 'admin' | 'moderator' | 'user' | 'guest'
export type BadgePriority = 'high' | 'medium' | 'low'
export type BadgePaymentStatus = 'paid' | 'pending' | 'failed' | 'refunded'

export interface BadgeProps {
  children?: React.ReactNode;
  type?: BadgeType;
  size?: BadgeSize;
  pill?: boolean;
  status?: BadgeStatus;
  userRole?: BadgeUserRole;
  priority?: BadgePriority;
  paymentStatus?: BadgePaymentStatus;
  showIcon?: boolean;
}

