import React from 'react';

import { Button, Table, Alert, Dialog, FormInput, FormSelect, FormTextarea } from '@/components/ui';
import type { StatDetail } from '@/types/management';
import type { Post } from '@/services/postService';
import type { ManagementViewProps } from './types';

export const ManagementView: React.FC<ManagementViewProps> = ({
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
  openCreateModal,
  closeCreateModal,
  closeEditModal,
  handleCreate,
  handleEdit,
  handleUpdate,
  handleDelete,
  handleStatusAction,
}) => {
  const palette = {
    pageBg: 'hsl(var(--muted))',
    containerBg: 'hsl(var(--card))',
    containerBorder: 'hsl(var(--border))',
    heading: 'hsl(var(--foreground))',
    subheading: 'hsl(var(--muted-foreground))',
    divider: 'hsl(var(--border))',
    tabActiveBg: 'hsl(var(--primary))',
    tabActiveColor: 'hsl(var(--primary-foreground))',
    tabInactiveBg: 'hsl(var(--secondary))',
    tabInactiveColor: 'hsl(var(--secondary-foreground))',
    buttonBorder: 'hsl(var(--border))',
    metricLabel: 'hsl(var(--muted-foreground))',
    metricValue: 'hsl(var(--primary))',
    highlightBg: 'rgba(37, 99, 235, 0.12)',
    highlightBorder: 'rgba(37, 99, 235, 0.4)',
    statCardBg: 'hsl(var(--card))',
    statCardBorder: 'hsl(var(--border))',
    tableBorder: 'hsl(var(--border))',
  };

  return (
    <div style={{ minHeight: '100vh', background: palette.pageBg }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <div style={{ marginBottom: '20px' }}>
          <h1
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '5px',
              color: palette.heading,
            }}
          >
            관리 시스템
          </h1>
          <p style={{ color: palette.subheading, fontSize: '14px' }}>
            사용자와 게시글을 관리하세요
          </p>
        </div>

        <div
          style={{
            background: palette.containerBg,
            border: `1px solid ${palette.containerBorder}`,
            padding: '10px',
          }}
        >
          <div
            style={{
              marginBottom: '15px',
              borderBottom: `2px solid ${palette.divider}`,
              paddingBottom: '5px',
            }}
          >
            <button
              onClick={() => setEntityType('post')}
              style={{
                padding: '8px 16px',
                marginRight: '5px',
                fontSize: '14px',
                fontWeight: entityType === 'post' ? 'bold' : 'normal',
                border: `1px solid ${palette.buttonBorder}`,
                background: entityType === 'post' ? palette.tabActiveBg : palette.tabInactiveBg,
                color: entityType === 'post' ? palette.tabActiveColor : palette.tabInactiveColor,
                cursor: 'pointer',
                borderRadius: '3px',
              }}
            >
              게시글
            </button>
            <button
              onClick={() => setEntityType('user')}
              style={{
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: entityType === 'user' ? 'bold' : 'normal',
                border: `1px solid ${palette.buttonBorder}`,
                background: entityType === 'user' ? palette.tabActiveBg : palette.tabInactiveBg,
                color: entityType === 'user' ? palette.tabActiveColor : palette.tabInactiveColor,
                cursor: 'pointer',
                borderRadius: '3px',
              }}
            >
              사용자
            </button>
          </div>

          <div>
            <div style={{ marginBottom: '15px', textAlign: 'right' }}>
              <Button variant="primary" size="md" onClick={openCreateModal}>
                새로 만들기
              </Button>
            </div>

            {showSuccessAlert && (
              <div style={{ marginBottom: '10px' }}>
                <Alert variant="success" title="성공" onClose={dismissSuccessAlert}>
                  {alertMessage}
                </Alert>
              </div>
            )}

            {showErrorAlert && (
              <div style={{ marginBottom: '10px' }}>
                <Alert variant="error" title="오류" onClose={dismissErrorAlert}>
                  {errorMessage}
                </Alert>
              </div>
            )}

            <div
              style={{
                padding: '12px 15px',
                background: palette.highlightBg,
                border: `1px solid ${palette.highlightBorder}`,
                borderRadius: '3px',
                marginBottom: '15px',
              }}
            >
              <div style={{ fontSize: '12px', color: palette.metricLabel, marginBottom: '4px' }}>
                전체
              </div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: palette.metricValue }}>
                {stats.total}
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '10px',
                marginBottom: '15px',
              }}
            >
              {[stats.stat1, stats.stat2, stats.stat3, stats.stat4].map(
                (stat: StatDetail, index) => (
                  <div
                    key={`${stat.label}-${index}`}
                    style={{
                      padding: '12px 15px',
                      background: palette.statCardBg,
                      border: `1px solid ${palette.statCardBorder}`,
                      borderRadius: '3px',
                    }}
                  >
                    <div
                      style={{ fontSize: '12px', color: palette.metricLabel, marginBottom: '4px' }}
                    >
                      {stat.label}
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: stat.color }}>
                      {stat.value}
                    </div>
                  </div>
                ),
              )}
            </div>

            <div
              style={{
                border: `1px solid ${palette.tableBorder}`,
                background: palette.containerBg,
                overflow: 'auto',
              }}
            >
              <Table
                columns={columns}
                data={data}
                striped
                hover
                entityType={entityType}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onPublish={(id) => handleStatusAction(id, 'publish')}
                onArchive={(id) => handleStatusAction(id, 'archive')}
                onRestore={(id) => handleStatusAction(id, 'restore')}
              />
            </div>
          </div>
        </div>
      </div>

      <Dialog
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        title={`새 ${entityType === 'user' ? '사용자' : '게시글'} 만들기`}
        size="large"
        showFooter
        footerContent={
          <>
            <Button variant="secondary" size="md" onClick={closeCreateModal}>
              취소
            </Button>
            <Button variant="primary" size="md" onClick={handleCreate}>
              생성
            </Button>
          </>
        }
      >
        <div>
          {entityType === 'user' ? (
            <>
              <FormInput
                name="username"
                value={formData.username || ''}
                onChange={(value) => handleFormChange('username', value)}
                label="사용자명"
                placeholder="사용자명을 입력하세요"
                required
                width="full"
                fieldType="username"
              />
              <FormInput
                name="email"
                value={formData.email || ''}
                onChange={(value) => handleFormChange('email', value)}
                label="이메일"
                placeholder="이메일을 입력하세요"
                type="email"
                required
                width="full"
                fieldType="email"
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <FormSelect
                  name="role"
                  value={formData.role || 'user'}
                  onChange={(value) => handleFormChange('role', value)}
                  options={[
                    { value: 'user', label: '사용자' },
                    { value: 'moderator', label: '운영자' },
                    { value: 'admin', label: '관리자' },
                  ]}
                  label="역할"
                  size="md"
                />
                <FormSelect
                  name="status"
                  value={formData.status || 'active'}
                  onChange={(value) => handleFormChange('status', value)}
                  options={[
                    { value: 'active', label: '활성' },
                    { value: 'inactive', label: '비활성' },
                    { value: 'suspended', label: '정지' },
                  ]}
                  label="상태"
                  size="md"
                />
              </div>
            </>
          ) : (
            <>
              <FormInput
                name="title"
                value={formData.title || ''}
                onChange={(value) => handleFormChange('title', value)}
                label="제목"
                placeholder="게시글 제목을 입력하세요"
                required
                width="full"
                fieldType="postTitle"
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <FormInput
                  name="author"
                  value={formData.author || ''}
                  onChange={(value) => handleFormChange('author', value)}
                  label="작성자"
                  placeholder="작성자명"
                  required
                  width="full"
                />
                <FormSelect
                  name="category"
                  value={formData.category || ''}
                  onChange={(value) => handleFormChange('category', value)}
                  options={[
                    { value: 'development', label: 'Development' },
                    { value: 'design', label: 'Design' },
                    { value: 'accessibility', label: 'Accessibility' },
                  ]}
                  label="카테고리"
                  placeholder="카테고리 선택"
                  size="md"
                />
              </div>
              <FormTextarea
                name="content"
                value={formData.content || ''}
                onChange={(value) => handleFormChange('content', value)}
                label="내용"
                placeholder="게시글 내용을 입력하세요"
                rows={6}
              />
            </>
          )}
        </div>
      </Dialog>

      <Dialog
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        title={`${entityType === 'user' ? '사용자' : '게시글'} 수정`}
        size="large"
        showFooter
        footerContent={
          <>
            <Button variant="secondary" size="md" onClick={closeEditModal}>
              취소
            </Button>
            <Button variant="primary" size="md" onClick={handleUpdate}>
              수정 완료
            </Button>
          </>
        }
      >
        <div>
          {selectedItem && (
            <Alert variant="info">
              ID: {selectedItem.id} | 생성일: {selectedItem.createdAt}
              {entityType === 'post' && ` | 조회수: ${(selectedItem as Post).views}`}
            </Alert>
          )}

          {entityType === 'user' ? (
            <>
              <FormInput
                name="username"
                value={formData.username || ''}
                onChange={(value) => handleFormChange('username', value)}
                label="사용자명"
                placeholder="사용자명을 입력하세요"
                required
                width="full"
                fieldType="username"
              />
              <FormInput
                name="email"
                value={formData.email || ''}
                onChange={(value) => handleFormChange('email', value)}
                label="이메일"
                placeholder="이메일을 입력하세요"
                type="email"
                required
                width="full"
                fieldType="email"
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <FormSelect
                  name="role"
                  value={formData.role || 'user'}
                  onChange={(value) => handleFormChange('role', value)}
                  options={[
                    { value: 'user', label: '사용자' },
                    { value: 'moderator', label: '운영자' },
                    { value: 'admin', label: '관리자' },
                  ]}
                  label="역할"
                  size="md"
                />
                <FormSelect
                  name="status"
                  value={formData.status || 'active'}
                  onChange={(value) => handleFormChange('status', value)}
                  options={[
                    { value: 'active', label: '활성' },
                    { value: 'inactive', label: '비활성' },
                    { value: 'suspended', label: '정지' },
                  ]}
                  label="상태"
                  size="md"
                />
              </div>
            </>
          ) : (
            <>
              <FormInput
                name="title"
                value={formData.title || ''}
                onChange={(value) => handleFormChange('title', value)}
                label="제목"
                placeholder="게시글 제목을 입력하세요"
                required
                width="full"
                fieldType="postTitle"
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <FormInput
                  name="author"
                  value={formData.author || ''}
                  onChange={(value) => handleFormChange('author', value)}
                  label="작성자"
                  placeholder="작성자명"
                  required
                  width="full"
                />
                <FormSelect
                  name="category"
                  value={formData.category || ''}
                  onChange={(value) => handleFormChange('category', value)}
                  options={[
                    { value: 'development', label: 'Development' },
                    { value: 'design', label: 'Design' },
                    { value: 'accessibility', label: 'Accessibility' },
                  ]}
                  label="카테고리"
                  placeholder="카테고리 선택"
                  size="md"
                />
              </div>
              <FormTextarea
                name="content"
                value={formData.content || ''}
                onChange={(value) => handleFormChange('content', value)}
                label="내용"
                placeholder="게시글 내용을 입력하세요"
                rows={6}
              />
            </>
          )}
        </div>
      </Dialog>
    </div>
  );
};

