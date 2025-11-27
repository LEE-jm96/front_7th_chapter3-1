import type { Meta, StoryObj } from '@storybook/react';

import { Alert } from '@/components/ui/feedback/alert';

const alertVariants = ['default', 'info', 'success', 'warning', 'error'] as const;

const meta = {
  title: 'Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'info', 'success', 'warning', 'error'],
    },
    title: {
      control: 'text',
    },
    showIcon: {
      control: 'boolean',
    },
    onClose: { action: 'closed' },
    children: { control: 'text' },
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '상태 메시지를 표시하는 Alert 컴포넌트입니다. variant 값에 따라 색상과 아이콘이 바뀌며, 닫기 버튼도 옵션으로 노출할 수 있습니다.',
      },
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    variant: 'info',
    title: '임시 저장 완료',
    showIcon: true,
    children: '작성하던 글이 자동으로 저장되었습니다.',
  },
};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {alertVariants.map((variant) => (
        <Alert
          key={variant}
          {...args}
          variant={variant}
          title={`${variant} 상태`}
        >
          {variant === 'default'
            ? '일반 알림 메시지입니다.'
            : `${variant} 스타일로 강조된 메시지를 보여줍니다.`}
        </Alert>
      ))}
    </div>
  ),
  args: {
    showIcon: true,
    children: '상태 메시지',
  },
  parameters: {
    controls: { exclude: ['variant', 'children'] },
    docs: {
      description: {
        story: '각 variant 별로 어떤 색상/톤이 적용되는지 한 번에 비교할 수 있는 예시입니다.',
      },
    },
  },
};

