import React from 'react';

type Props = {
  children: React.ReactNode;
};

const PermissionGuard = ({ children }: Props) => {
  // 권한이 있다면 넣었을 것
  return <>{children}</>;
};
export default PermissionGuard;
