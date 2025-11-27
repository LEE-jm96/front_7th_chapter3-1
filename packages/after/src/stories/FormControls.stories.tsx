import type { Meta, StoryObj } from '@storybook/react';
import { useForm, FormProvider } from 'react-hook-form';

import { FormCheckbox } from '@/components/ui/forms/form-checkbox';
import { FormInput } from '@/components/ui/forms/form-input';
import { FormSelect } from '@/components/ui/forms/form-select';
import { FormTextarea } from '@/components/ui/forms/form-textarea';

const meta = {
  title: 'Forms/Controls',
  component: FormInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    width: {
      control: 'inline-radio',
      options: ['small', 'medium', 'large', 'full'],
    },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helpText: { control: 'text' },
  },
} satisfies Meta<typeof FormInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    name: 'username',
    label: '사용자명',
    width: 'medium',
    placeholder: '예: hanghae_user',
    helpText: '3~20자의 영문/숫자/언더스코어',
  },
  render: (args) => {
    const formMethods = useForm({
      defaultValues: {
        username: '',
        status: 'draft',
        description: '스토리북 샘플 컨텐츠입니다.',
        tos: true,
      },
    });

    return (
      <FormProvider {...formMethods}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 420 }}>
          <FormInput {...args} />

          <FormSelect
            name="status"
            label="게시 상태"
            options={[
              { value: 'draft', label: '임시 저장' },
              { value: 'published', label: '게시됨' },
              { value: 'archived', label: '보관됨' },
            ]}
            helpText="상태에 따라 Table 컴포넌트의 Badge 도 변경됩니다."
          />

          <FormTextarea
            name="description"
            label="설명"
            helpText="textarea 역시 동일한 에러/헬프 텍스트 스타일을 공유합니다."
          />

          <FormCheckbox
            name="tos"
            label="팀 규칙을 모두 이해했습니다."
            hint="체크를 해제하면 에러 스타일을 확인할 수 있습니다."
          />
        </div>
      </FormProvider>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'FormInput 을 기본 component 로 설정하되, Select/Textarea/Checkbox 와 함께 사용했을 때의 스타일을 한 번에 확인합니다.',
      },
    },
  },
};

