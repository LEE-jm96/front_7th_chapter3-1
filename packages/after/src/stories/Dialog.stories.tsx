import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button } from '@/components/ui/actions/button';
import { Dialog } from '@/components/ui/feedback/dialog';

const meta = {
  title: 'Feedback/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
    },
    showFooter: {
      control: 'boolean',
    },
    title: {
      control: 'text',
    },
    children: { control: 'text' },
    footerContent: { control: false },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Radix UI 기반 Dialog 래퍼입니다. size, footer, 외부 닫기 등 기존 Modal API 와 동일하게 사용할 수 있습니다.',
      },
    },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  args: {
    isOpen: false,
    onClose: () => undefined,
    size: 'medium',
    title: '게시글 삭제',
    showFooter: true,
    children: '정말로 이 게시글을 삭제하시겠습니까?',
  },
  render: (args) => {
    const [open, setOpen] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Button onClick={() => setOpen(true)}>Dialog 열기</Button>
        <Dialog
          {...args}
          isOpen={open}
          onClose={() => setOpen(false)}
          footerContent={
            <div style={{ display: 'flex', gap: 8 }}>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                취소
              </Button>
              <Button variant="danger" onClick={() => setOpen(false)}>
                삭제
              </Button>
            </div>
          }
        />
      </div>
    );
  },
};


