import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ThemeProvider from './themes/ThemeProvider';
import Layout from './layouts/Layout';
import { lazyWithDelay as lazyDelay } from './utils/lazyWithDelay';

// Lazy-loaded pages
const Home = lazyDelay(() => import('./pages/Home'), 2000); 
const Todo = lazyDelay(() => import('./pages/Todo'), 0);
const Profile = lazyDelay(() => import('./pages/Profile'), 0);
const NotFound = lazyDelay(() => import('./pages/NotFound'), 0);

function App() {
  return (
    <Router>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="todo" element={<Todo />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;

