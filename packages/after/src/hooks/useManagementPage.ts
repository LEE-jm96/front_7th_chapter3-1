import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { userService } from '@/services/userService';
import { postService } from '@/services/postService';
import type { User } from '@/services/userService';
import type { Post } from '@/services/postService';
import type {
  StatsSummary,
  ManagementEntityType,
  ManagementEntity,
} from '@/components/ui/management/types';
import type { Column } from '@/components/ui/layout/types';
import { userSchema, postSchema, type UserFormData, type PostFormData } from '@/lib/schemas';

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

  // entityType에 따른 resolver와 defaultValues 메모이제이션
  const resolver = useMemo<Resolver<UserFormData | PostFormData>>(
    () => zodResolver(entityType === 'user' ? userSchema : postSchema),
    [entityType]
  );

  const defaultValues = useMemo(
    () =>
      entityType === 'user'
        ? {
            username: '',
            email: '',
            role: 'user' as const,
            status: 'active' as const,
          }
        : {
            title: '',
            author: '',
            category: 'development' as const,
            content: '',
          },
    [entityType]
  );

  // React Hook Form 설정
  const formMethods = useForm<UserFormData | PostFormData>({
    resolver,
    mode: 'onChange', // 실시간 검증
    defaultValues,
  });

  // entityType 변경 시 폼 리셋
  useEffect(() => {
    formMethods.reset(defaultValues);
  }, [entityType, defaultValues, formMethods]);

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
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedItem(null);
  }, [entityType, loadData]);

  const handleCreate = useCallback(async () => {
    const isValid = await formMethods.trigger();
    if (!isValid) return;

    const formData = formMethods.getValues();

    try {
      if (entityType === 'user') {
        const userData = formData as UserFormData;
        await userService.create({
          username: userData.username,
          email: userData.email,
          role: userData.role,
          status: userData.status,
        });
      } else {
        const postData = formData as PostFormData;
        await postService.create({
          title: postData.title,
          content: postData.content || '',
          author: postData.author,
          category: postData.category,
          status: 'draft',
        });
      }

      await loadData();
      setIsCreateModalOpen(false);
      formMethods.reset();
      setAlertMessage(`${entityType === 'user' ? '사용자' : '게시글'}가 생성되었습니다`);
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error?.message || '생성에 실패했습니다');
      setShowErrorAlert(true);
    }
  }, [entityType, formMethods, loadData]);

  const handleEdit = useCallback(
    (item: ManagementEntity) => {
      setSelectedItem(item);

      if (entityType === 'user') {
        const user = item as User;
        formMethods.reset({
          username: user.username,
          email: user.email,
          role: user.role,
          status: user.status,
        });
      } else {
        const post = item as Post;
        formMethods.reset({
          title: post.title,
          content: post.content,
          author: post.author,
          category: post.category,
        });
      }

      setIsEditModalOpen(true);
    },
    [entityType, formMethods],
  );

  const handleUpdate = useCallback(async () => {
    if (!selectedItem) return;

    const isValid = await formMethods.trigger();
    if (!isValid) return;

    const formData = formMethods.getValues();

    try {
      if (entityType === 'user') {
        const userData = formData as UserFormData;
        await userService.update(selectedItem.id, userData);
      } else {
        const postData = formData as PostFormData;
        await postService.update(selectedItem.id, postData);
      }

      await loadData();
      setIsEditModalOpen(false);
      formMethods.reset();
      setSelectedItem(null);
      setAlertMessage(`${entityType === 'user' ? '사용자' : '게시글'}가 수정되었습니다`);
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error?.message || '수정에 실패했습니다');
      setShowErrorAlert(true);
    }
  }, [entityType, formMethods, loadData, selectedItem]);

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
        color: 'hsl(var(--foreground))',
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

  const closeCreateModal = useCallback(() => {
    setIsCreateModalOpen(false);
    formMethods.reset();
  }, [formMethods]);

  const closeEditModal = useCallback(() => {
    setIsEditModalOpen(false);
    formMethods.reset();
    setSelectedItem(null);
  }, [formMethods]);

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
    formMethods,
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

