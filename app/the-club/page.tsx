import { AuthCheckRedirect } from '@/components/AuthCheck';
import UserCheck from '@/components/UserCheck';

import Dashboard from './(dashboard)/dashboard';

const DashboardPage = () => {
  return (
    <AuthCheckRedirect>
      <UserCheck>
        <Dashboard />
      </UserCheck>
    </AuthCheckRedirect>
  );
};
export default DashboardPage;
