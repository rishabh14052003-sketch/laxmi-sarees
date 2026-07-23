import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './components/PublicLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Collection from './pages/Collection';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public — anyone can view */}
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="collection" element={<Collection />} />
        <Route path="contact" element={<Contact />} />
      </Route>

      {/* Admin login — public, no navbar/footer */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin dashboard — protected, requires Firebase auth */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Unknown paths → home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
