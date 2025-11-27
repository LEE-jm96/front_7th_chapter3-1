import type { Meta, StoryObj } from '@storybook/react';

import { Table } from '@/components/ui/layout/table';

const userColumns = [
  { key: 'name', header: '이름', width: '20%' },
  { key: 'email', header: '이메일', width: '30%' },
  { key: 'role', header: '역할', width: '15%' },
  { key: 'status', header: '상태', width: '15%' },
  { key: 'lastLogin', header: '마지막 로그인', width: '10%' },
  { key: 'actions', header: '액션', width: '10%' },
] as const;

const userData = [
  {
    id: 1,
    name: '김철수',
    email: 'chulsoo@example.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2025-01-22',
  },
  {
    id: 2,
    name: '이영희',
    email: 'younghee@example.com',
    role: 'moderator',
    status: 'inactive',
    lastLogin: '2025-01-18',
  },
  {
    id: 3,
    name: '홍길동',
    email: 'gildong@example.com',
    role: 'user',
    status: 'suspended',
    lastLogin: '2024-12-30',
  },
] as const;

const postColumns = [
  { key: 'title', header: '제목', width: '30%' },
  { key: 'category', header: '카테고리', width: '20%' },
  { key: 'status', header: '상태', width: '15%' },
  { key: 'views', header: '조회수', width: '10%' },
  { key: 'updatedAt', header: '수정일', width: '15%' },
  { key: 'actions', header: '액션', width: '10%' },
] as const;

const postData = [
  {
    id: 101,
    title: 'Storybook으로 UI 문서화하기',
    category: 'development',
    status: 'published',
    views: 8231,
    updatedAt: '2025-01-20',
  },
  {
    id: 102,
    title: '접근성 점검 체크리스트',
    category: 'accessibility',
    status: 'pending',
    views: 1120,
    updatedAt: '2025-01-19',
  },
  {
    id: 103,
    title: '신규 디자인 토큰 소개',
    category: 'design',
    status: 'draft',
    views: 452,
    updatedAt: '2025-01-17',
  },
] as const;

const meta = {
  title: 'Layout/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {
    striped: { control: 'boolean' },
    bordered: { control: 'boolean' },
    hover: { control: 'boolean' },
    searchable: { control: 'boolean' },
    sortable: { control: 'boolean' },
    entityType: { control: 'inline-radio', options: ['user', 'post'] },
    pageSize: { control: 'number' },
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Table 컴포넌트는 entityType 에 따라 Badge/Action 버튼을 자동으로 렌더링하며, 검색과 정렬, 페이징 기능을 기본 제공합니다.',
      },
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UsersTable: Story = {
  args: {
    columns: [...userColumns],
    data: [...userData],
    striped: true,
    hover: true,
    bordered: false,
    searchable: true,
    sortable: true,
    pageSize: 5,
    entityType: 'user',
  },
};

export const PostsTable: Story = {
  args: {
    columns: [...postColumns],
    data: [...postData],
    striped: false,
    hover: true,
    bordered: true,
    searchable: false,
    sortable: false,
    pageSize: 5,
    entityType: 'post',
  },
};

