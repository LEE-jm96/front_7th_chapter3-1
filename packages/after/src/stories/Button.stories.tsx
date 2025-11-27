import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/components/ui/actions/button';

const meta = {
  title: 'Actions/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '관리 영역에서 가장 많이 사용되는 CTA 버튼입니다. variant, size, fullWidth 조합으로 상태를 빠르게 검토할 수 있습니다.',
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'success', 'info'],
      description: '버튼의 시각적 톤(의도)을 결정합니다.',
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      description: '텍스트 크기와 패딩을 동시에 제어합니다.',
    },
    fullWidth: {
      control: 'boolean',
      description: '레이아웃 너비 전체를 사용할 때 true 로 설정합니다.',
    },
    disabled: {
      control: 'boolean',
      description: '사용자 입력을 잠시 막아야 할 때 사용합니다.',
    },
    children: {
      control: 'text',
      description: '버튼 레이블 텍스트입니다.',
    },
    asChild: { table: { disable: true } },
    className: { table: { disable: true } },
    type: { table: { disable: true } },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    fullWidth: false,
    disabled: false,
    children: '관리 페이지 이동',
  },
};

export const FullWidthDanger: Story = {
  args: {
    variant: 'danger',
    size: 'lg',
    fullWidth: true,
    children: '사용자 삭제',
  },
};

export const DisabledState: Story = {
  args: {
    variant: 'secondary',
    size: 'sm',
    disabled: true,
    children: '권한 대기중',
  },
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: false,
          },
        ],
      },
    },
    docs: {
      description: {
        story: '일시적으로 액션을 막고자 할 때의 상태를 보여줍니다.',
      },
    },
  },
};

