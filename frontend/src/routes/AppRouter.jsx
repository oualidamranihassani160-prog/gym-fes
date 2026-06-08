import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import DashboardLayout from '../components/Layout/DashboardLayout';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Members from '../pages/Members';
import ArchivedMembers from '../pages/ArchivedMembers';
import Products from '../pages/Products';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route element={<PrivateRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/members" element={<Members />} />
          <Route path="/members/archived" element={<ArchivedMembers />} />
          <Route path="/products" element={<Products />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;