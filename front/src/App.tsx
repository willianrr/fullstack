import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import UsersPage from './pages/Users';
import CreateUser from './pages/Users/create';
import EditUser from './pages/Users/edit';

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<Login />} />

    <Route element={<ProtectedRoute />}>
      <Route path="/users" element={<UsersPage />} />
      <Route path="/users/create" element={<CreateUser />} />
	  <Route path="/users/edit/:id" element={<EditUser />} /> 
    </Route>

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;
