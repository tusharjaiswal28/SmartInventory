import React, { useState, useEffect } from 'react';
import { db, ref, push, onValue, remove } from '../firebase';
import InventoryForm from '../components/InventoryForm';
import InventoryList from '../components/InventoryList';
import SearchBar from '../components/SearchBar';
import { useLocation, useNavigate } from 'react-router-dom';

function Dashboard({ role }) {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [showQR, setShowQR] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isReports = location.pathname === '/reports';

  useEffect(() => {
    const itemsRef = ref(db, 'items');
    onValue(itemsRef, snapshot => {
      const data = snapshot.val();
      const loaded = data ? Object.entries(data).map(([id, val]) => ({ ...val, id })) : [];
      setItems(loaded);
    });
  }, []);

  const addItem = (item) => {
    if (!item.name || !item.quantity) return;
    push(ref(db, 'items'), item);
  };

  const deleteItem = (id) => {
    remove(ref(db, 'items/' + id));
  };

  const filteredItems = items.filter(i => i.name.toLowerCase().includes(search.toLowerCase()));
  const lowStock = filteredItems.filter(i => Number(i.quantity) <= 5);
  const expiringItems = filteredItems.filter(item => {
    const today = new Date();
    const expiryDate = new Date(item.expiry);
    return expiryDate <= new Date(today.setDate(today.getDate() + 7));
  });

  return (
    <div style={{ background: darkMode ? '#222' : '#fff', color: darkMode ? '#fff' : '#000', minHeight: '100vh' }}>
      <div style={{ padding: '20px' }}>
        <div>


          <button
            onClick={() => navigate(isReports ? '/' : '/reports')}
            style={{ marginBottom: '10px' }}
          >
            {isReports ? '⬅️ Back to Dashboard' : '📊 View Reports'}
          </button>

          <label>
            <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} /> Dark Mode
          </label>
        </div>

        <SearchBar setSearch={setSearch} />
        
        {role === 'admin' && <InventoryForm onAdd={addItem} />}
        {lowStock.length > 0 && <p style={{ color: 'red' }}>⚠️ Low Stock Items: {lowStock.length}</p>}
        {expiringItems.length > 0 && <p style={{ color: 'orange' }}>⌛ Items Expiring Soon: {expiringItems.length}</p>}
        <InventoryList items={filteredItems} role={role} onDelete={deleteItem} showQR={showQR} setShowQR={setShowQR} />
      </div>
    </div>
  );
}

export default Dashboard;