import React from 'react';

import '../styles/components.css';
import { useManagementPage } from '@/hooks/useManagementPage';
import { ManagementView } from '@/components/ui/management/ManagementView';

export const ManagementPage: React.FC = () => {
  const management = useManagementPage();
  return <ManagementView {...management} />;
};

