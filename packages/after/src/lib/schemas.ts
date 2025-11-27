import { z } from 'zod';

// User form schema
export const userSchema = z.object({
  username: z
    .string()
    .min(3, '사용자명은 3자 이상이어야 합니다')
    .max(20, '사용자명은 20자 이하여야 합니다')
    .regex(/^[a-zA-Z0-9_]+$/, '영문, 숫자, 언더스코어만 사용 가능합니다')
    .refine(
      (val) => !['admin', 'root', 'system', 'administrator'].includes(val.toLowerCase()),
      '예약된 사용자명입니다'
    ),
  email: z
    .string()
    .email('올바른 이메일 형식이 아닙니다')
    .refine(
      (val) => val.endsWith('@company.com') || val.endsWith('@example.com'),
      '회사 이메일(@company.com 또는 @example.com)만 사용 가능합니다'
    ),
  role: z.enum(['user', 'moderator', 'admin'], {
    required_error: '역할을 선택해주세요',
  }),
  status: z.enum(['active', 'inactive', 'suspended'], {
    required_error: '상태를 선택해주세요',
  }),
});

export type UserFormData = z.infer<typeof userSchema>;

// Post form schema
export const postSchema = z.object({
  title: z
    .string()
    .min(5, '제목은 5자 이상이어야 합니다')
    .max(100, '제목은 100자 이하여야 합니다')
    .refine(
      (val) => !['광고', '스팸', '홍보'].some((word) => val.includes(word)),
      '제목에 금지된 단어가 포함되어 있습니다'
    ),
  author: z.string().min(1, '작성자를 입력해주세요'),
  category: z.enum(['development', 'design', 'accessibility'], {
    required_error: '카테고리를 선택해주세요',
  }),
  content: z.string().min(1, '내용을 입력해주세요'),
});

export type PostFormData = z.infer<typeof postSchema>;

