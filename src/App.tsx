import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import VideoDetail from './pages/VideoDetail';
import Community from './pages/Community';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Bounce, ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import store from './store/store'

const queryClient = new QueryClient()

function App() {
  return (
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={
          <Layout>
            <Home />
          </Layout>
        } />
        <Route path="/video/:id" element={
          <Layout>
            <VideoDetail />
          </Layout>
        } />
        <Route path="/community" element={
          <Layout>
            <Community />
          </Layout>
        } />
        <Route path="/profile" element={
          <Layout>
            <Profile />
          </Layout>
        } />
        <Route path="/dashboard" element={
          <Layout>
            <Dashboard />
          </Layout>
        } />
        <Route path="/settings" element={
          <Layout>
            <Settings />
          </Layout>
        } />
        {/* Add more routes wrapped in Layout as needed */}
         <Route path="*" element={
          <Layout>
            <div className="flex items-center justify-center h-64">
              <h2 className="text-2xl font-bold text-gray-500">Page Not Found</h2>
            </div>
          </Layout>
        } />
      </Routes>
    </Router>
    <ToastContainer
                position="bottom-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
    </QueryClientProvider>
    </Provider>
  );
}

export default App;
