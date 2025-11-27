import type { UseFormReturn } from 'react-hook-form';
import type { Column } from '@/components/ui/layout/types';
import type { User } from '@/services/userService';
import type { Post } from '@/services/postService';
import type { UserFormData, PostFormData } from '@/lib/schemas';

export type ManagementEntity = User | Post;
export type ManagementEntityType = 'user' | 'post';

export interface StatDetail {
  label: string;
  value: number;
  color: string;
}

export interface StatsSummary {
  total: number;
  stat1: StatDetail;
  stat2: StatDetail;
  stat3: StatDetail;
  stat4: StatDetail;
}

export interface ManagementViewProps {
  entityType: ManagementEntityType;
  setEntityType: (entityType: ManagementEntityType) => void;
  data: ManagementEntity[];
  columns: Column[];
  stats: StatsSummary;
  showSuccessAlert: boolean;
  alertMessage: string;
  showErrorAlert: boolean;
  errorMessage: string;
  dismissSuccessAlert: () => void;
  dismissErrorAlert: () => void;
  isCreateModalOpen: boolean;
  isEditModalOpen: boolean;
  selectedItem: ManagementEntity | null;
  formMethods: UseFormReturn<UserFormData | PostFormData>;
  openCreateModal: () => void;
  closeCreateModal: () => void;
  closeEditModal: () => void;
  handleCreate: () => Promise<void>;
  handleEdit: (item: ManagementEntity) => void;
  handleUpdate: () => Promise<void>;
  handleDelete: (id: number) => Promise<void>;
  handleStatusAction: (id: number, action: 'publish' | 'archive' | 'restore') => Promise<void>;
}

