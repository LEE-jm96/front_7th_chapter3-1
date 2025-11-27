import type { Meta, StoryObj } from '@storybook/react';

import { Badge } from '@/components/ui/feedback/badge';

const badgeTypes = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'] as const;
const badgeSizes = ['small', 'medium', 'large'] as const;
const badgeStatuses = ['published', 'draft', 'pending', 'archived', 'rejected'] as const;
const badgeRoles = ['admin', 'moderator', 'user', 'guest'] as const;

const meta = {
  title: 'Feedback/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'inline-radio',
      options: badgeTypes,
    },
    size: {
      control: 'inline-radio',
      options: badgeSizes,
    },
    pill: {
      control: 'boolean',
    },
    status: {
      control: 'select',
      options: ['published', 'draft', 'archived', 'pending', 'rejected'],
    },
    userRole: {
      control: 'select',
      options: ['admin', 'moderator', 'user', 'guest'],
    },
    priority: {
      control: 'select',
      options: ['high', 'medium', 'low'],
    },
    paymentStatus: {
      control: 'select',
      options: ['paid', 'pending', 'failed', 'refunded'],
    },
    children: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    type: 'primary',
    size: 'medium',
    pill: false,
    children: '기본 배지',
  },
};

export const SemanticPresets: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {badgeTypes.map((type) => (
          <Badge key={type} type={type} size="medium">
            {type}
          </Badge>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {badgeStatuses.map((status) => (
          <Badge key={status} status={status} pill>
            {status}
          </Badge>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {badgeRoles.map((role) => (
          <Badge key={role} userRole={role}>
            {role}
          </Badge>
        ))}
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: '디자인 시스템에 정의된 타입/상태/역할 프리셋을 한눈에 확인할 수 있습니다.',
      },
    },
  },
};

