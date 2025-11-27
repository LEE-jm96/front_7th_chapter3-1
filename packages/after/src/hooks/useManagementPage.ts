import { useCallback, useEffect, useMemo, useState } from 'react';

import { userService } from '@/services/userService';
import { postService } from '@/services/postService';
import type { User } from '@/services/userService';
import type { Post } from '@/services/postService';
import type { StatsSummary, ManagementEntityType, ManagementEntity } from '@/types/management';
import type { Column } from '@/components/ui/layout/types';

interface UseManagementPageResult {
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

export const useManagementPage = (): UseManagementPageResult => {
  const [entityType, setEntityType] = useState<ManagementEntityType>('post');
  const [data, setData] = useState<ManagementEntity[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ManagementEntity | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState<Record<string, any>>({});

  const loadData = useCallback(async () => {
    try {
      const result =
        entityType === 'user' ? await userService.getAll() : await postService.getAll();
      setData(result);
    } catch (error: any) {
      setErrorMessage(error?.message || '데이터를 불러오는데 실패했습니다');
      setShowErrorAlert(true);
    }
  }, [entityType]);

  useEffect(() => {
    loadData();
    setFormData({});
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedItem(null);
  }, [entityType, loadData]);

  const handleCreate = useCallback(async () => {
    try {
      if (entityType === 'user') {
        await userService.create({
          username: formData.username,
          email: formData.email,
          role: formData.role || 'user',
          status: formData.status || 'active',
        });
      } else {
        await postService.create({
          title: formData.title,
          content: formData.content || '',
          author: formData.author,
          category: formData.category,
          status: formData.status || 'draft',
        });
      }

      await loadData();
      setIsCreateModalOpen(false);
      setFormData({});
      setAlertMessage(`${entityType === 'user' ? '사용자' : '게시글'}가 생성되었습니다`);
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error?.message || '생성에 실패했습니다');
      setShowErrorAlert(true);
    }
  }, [entityType, formData, loadData]);

  const handleEdit = useCallback(
    (item: ManagementEntity) => {
      setSelectedItem(item);

      if (entityType === 'user') {
        const user = item as User;
        setFormData({
          username: user.username,
          email: user.email,
          role: user.role,
          status: user.status,
        });
      } else {
        const post = item as Post;
        setFormData({
          title: post.title,
          content: post.content,
          author: post.author,
          category: post.category,
          status: post.status,
        });
      }

      setIsEditModalOpen(true);
    },
    [entityType],
  );

  const handleUpdate = useCallback(async () => {
    if (!selectedItem) return;

    try {
      if (entityType === 'user') {
        await userService.update(selectedItem.id, formData);
      } else {
        await postService.update(selectedItem.id, formData);
      }

      await loadData();
      setIsEditModalOpen(false);
      setFormData({});
      setSelectedItem(null);
      setAlertMessage(`${entityType === 'user' ? '사용자' : '게시글'}가 수정되었습니다`);
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error?.message || '수정에 실패했습니다');
      setShowErrorAlert(true);
    }
  }, [entityType, formData, loadData, selectedItem]);

  const handleDelete = useCallback(
    async (id: number) => {
      if (!confirm('정말 삭제하시겠습니까?')) return;

      try {
        if (entityType === 'user') {
          await userService.delete(id);
        } else {
          await postService.delete(id);
        }

        await loadData();
        setAlertMessage('삭제되었습니다');
        setShowSuccessAlert(true);
      } catch (error: any) {
        setErrorMessage(error?.message || '삭제에 실패했습니다');
        setShowErrorAlert(true);
      }
    },
    [entityType, loadData],
  );

  const handleStatusAction = useCallback(
    async (id: number, action: 'publish' | 'archive' | 'restore') => {
      if (entityType !== 'post') return;

      try {
        if (action === 'publish') {
          await postService.publish(id);
        } else if (action === 'archive') {
          await postService.archive(id);
        } else {
          await postService.restore(id);
        }

        await loadData();
        const message = action === 'publish' ? '게시' : action === 'archive' ? '보관' : '복원';
        setAlertMessage(`${message}되었습니다`);
        setShowSuccessAlert(true);
      } catch (error: any) {
        setErrorMessage(error?.message || '작업에 실패했습니다');
        setShowErrorAlert(true);
      }
    },
    [entityType, loadData],
  );

  const stats: StatsSummary = useMemo(() => {
    if (entityType === 'user') {
      const users = data as User[];
      return {
        total: users.length,
        stat1: {
          label: '활성',
          value: users.filter((u) => u.status === 'active').length,
          color: '#2e7d32',
        },
        stat2: {
          label: '비활성',
          value: users.filter((u) => u.status === 'inactive').length,
          color: '#ed6c02',
        },
        stat3: {
          label: '정지',
          value: users.filter((u) => u.status === 'suspended').length,
          color: '#d32f2f',
        },
        stat4: {
          label: '관리자',
          value: users.filter((u) => u.role === 'admin').length,
          color: '#1976d2',
        },
      };
    }

    const posts = data as Post[];
    return {
      total: posts.length,
      stat1: {
        label: '게시됨',
        value: posts.filter((p) => p.status === 'published').length,
        color: '#2e7d32',
      },
      stat2: {
        label: '임시저장',
        value: posts.filter((p) => p.status === 'draft').length,
        color: '#ed6c02',
      },
      stat3: {
        label: '보관됨',
        value: posts.filter((p) => p.status === 'archived').length,
        color: 'rgba(0, 0, 0, 0.6)',
      },
      stat4: {
        label: '총 조회수',
        value: posts.reduce((sum, p) => sum + p.views, 0),
        color: '#1976d2',
      },
    };
  }, [data, entityType]);

  const columns: Column[] = useMemo(
    () =>
      entityType === 'user'
        ? [
            { key: 'id', header: 'ID', width: '60px' },
            { key: 'username', header: '사용자명', width: '150px' },
            { key: 'email', header: '이메일' },
            { key: 'role', header: '역할', width: '120px' },
            { key: 'status', header: '상태', width: '120px' },
            { key: 'createdAt', header: '생성일', width: '120px' },
            { key: 'lastLogin', header: '마지막 로그인', width: '140px' },
            { key: 'actions', header: '관리', width: '200px' },
          ]
        : [
            { key: 'id', header: 'ID', width: '60px' },
            { key: 'title', header: '제목' },
            { key: 'author', header: '작성자', width: '120px' },
            { key: 'category', header: '카테고리', width: '140px' },
            { key: 'status', header: '상태', width: '120px' },
            { key: 'views', header: '조회수', width: '100px' },
            { key: 'createdAt', header: '작성일', width: '120px' },
            { key: 'actions', header: '관리', width: '250px' },
          ],
    [entityType],
  );

  const handleFormChange = useCallback((field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const closeCreateModal = useCallback(() => {
    setIsCreateModalOpen(false);
    setFormData({});
  }, []);

  const closeEditModal = useCallback(() => {
    setIsEditModalOpen(false);
    setFormData({});
    setSelectedItem(null);
  }, []);

  const dismissSuccessAlert = useCallback(() => {
    setShowSuccessAlert(false);
    setAlertMessage('');
  }, []);

  const dismissErrorAlert = useCallback(() => {
    setShowErrorAlert(false);
    setErrorMessage('');
  }, []);

  return {
    entityType,
    setEntityType,
    data,
    columns,
    stats,
    showSuccessAlert,
    alertMessage,
    showErrorAlert,
    errorMessage,
    dismissSuccessAlert,
    dismissErrorAlert,
    isCreateModalOpen,
    isEditModalOpen,
    selectedItem,
    formData,
    handleFormChange,
    openCreateModal: () => setIsCreateModalOpen(true),
    closeCreateModal,
    closeEditModal,
    handleCreate,
    handleEdit,
    handleUpdate,
    handleDelete,
    handleStatusAction,
  };
};

