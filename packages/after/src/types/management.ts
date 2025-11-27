import type { User } from '@/services/userService';
import type { Post } from '@/services/postService';

export type ManagementEntity = User | Post;
export type ManagementEntityType = 'user' | 'post';

export interface StatDetail {
  label: string;
  value: number;
  color: string;
}

export interface StatsSummary {
  total: number;
  stat1: StatDetail;
  stat2: StatDetail;
  stat3: StatDetail;
  stat4: StatDetail;
}

