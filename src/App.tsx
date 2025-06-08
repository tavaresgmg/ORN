import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import Welcome from './pages/Welcome';
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import AnalyzeWithNav from './pages/AnalyzeWithNav';
import Closet from './pages/Closet';
import Search from './pages/Search';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import ProductDetail from './pages/ProductDetail';
import KibbeGuide from './pages/KibbeGuide';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/home" element={<Home />} />
          <Route path="/analyze" element={<AnalyzeWithNav />} />
          <Route path="/closet" element={<Closet />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/item/:id" element={<ProductDetail />} />
          <Route path="/kibbe-guide" element={<KibbeGuide />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
