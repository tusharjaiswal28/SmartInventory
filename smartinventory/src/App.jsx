import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { auth, signOut } from './firebase';
import Header from "./components/Header";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Reports from './components/Reports';
import { InventoryContext, InventoryProvider } from './components/InventoryContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(user => {
      if (!user) {
        setUser(null);
        setRole(null);
      }
    });
    return unsub;
  }, []);

   const handleLogin = (user, role) => {
    setUser(user);
    setRole(role);
  };


  return (
    <InventoryProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={!user ? <Login onLogin={handleLogin} /> : <Dashboard role={role} />} />
          <Route path="/reports" element={<ReportsPage />} />
        </Routes>
      </Router>
    </InventoryProvider>
  );
}

function ReportsPage() {
  const { items } = useContext(InventoryContext);
  return (
    <div style={{ padding: '20px' }}>
      <h2>Reports</h2>
      <Reports items={items} />
    </div>
  );
}

export default App;