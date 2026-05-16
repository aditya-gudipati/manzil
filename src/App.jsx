import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Trips from './pages/Trips';
import MyBookings from './pages/MyBookings';
import Subscriptions from './pages/Subscriptions';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import WeatherWidget from './components/WeatherWidget';
import TodoPanel from './components/TodoPanel';
import Packing from './pages/Packing';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/signin" />;
  return children;
};

function App() {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <>
      <div className="home-bg-layer"></div>
      <div className="home-bg-overlay"></div>

      {user && <Navbar />}
      {user && <WeatherWidget />}
      {user && <TodoPanel />}
      
      <div className="main-content-wrapper" style={{ paddingTop: user ? '80px' : '0', position: 'relative', zIndex: 1 }}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={user ? <Home key={location.pathname} /> : <Landing />} />
          <Route path="/signin" element={user ? <Navigate to="/" /> : <SignIn />} />
          <Route path="/signup" element={user ? <Navigate to="/" /> : <SignUp />} />
          
          <Route path="/trips" element={<ProtectedRoute><Trips key={location.pathname} /></ProtectedRoute>} />
          <Route path="/bookings" element={<ProtectedRoute><MyBookings key={location.pathname} /></ProtectedRoute>} />
          <Route path="/subscriptions" element={<ProtectedRoute><Subscriptions key={location.pathname} /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile key={location.pathname} /></ProtectedRoute>} />
          <Route path="/packing" element={<ProtectedRoute><Packing /></ProtectedRoute>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
