import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { Navbar } from './components/Navbar';
import { NotFound } from './pages/NotFound';
import { Home } from './pages/Home';
import { Todo } from './pages/Todo';
import { Profile } from './pages/Profile';
import ThemeProvider from './themes/ThemeProvider';
import Layout from './layouts/Layout';

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
