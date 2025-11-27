import type { ManagementEntityType, ManagementEntity, StatsSummary } from '@/types/management';
import type { Column } from '@/components/ui/layout/types';

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
  formData: Record<string, any>;
  handleFormChange: (field: string, value: any) => void;
  openCreateModal: () => void;
  closeCreateModal: () => void;
  closeEditModal: () => void;
  handleCreate: () => Promise<void>;
  handleEdit: (item: ManagementEntity) => void;
  handleUpdate: () => Promise<void>;
  handleDelete: (id: number) => Promise<void>;
  handleStatusAction: (id: number, action: 'publish' | 'archive' | 'restore') => Promise<void>;
}

