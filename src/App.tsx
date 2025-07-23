import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import ThemeProvider from './themes/ThemeProvider';
import Layout from './layouts/Layout';
import { LinearProgress } from '@mui/material';
import { lazyWithDelay as lazyDelay} from './utils/lazyWithDelay'; // Assuming you have a utility function for lazy loading with delay

// Lazy-loaded pages
const Home = lazyDelay(() => import('./pages/Home'), 2000); // 2-second delay
const Todo = lazyDelay(() => import('./pages/Todo'), 2000);
const Profile = lazyDelay(() => import('./pages/Profile'), 2000);
const NotFound = lazyDelay(() => import('./pages/NotFound'), 2000);

function App() {
  return (
    <Router>
      <ThemeProvider>
        <Suspense fallback={<LinearProgress />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="todo" element={<Todo />} />
              <Route path="profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </ThemeProvider>
    </Router>
  );
}

export default App;
function lazyWithDelay(arg0: () => Promise<typeof import("./pages/Home")>, arg1: number) {
  throw new Error('Function not implemented.');
}

