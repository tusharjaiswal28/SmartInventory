import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

function InventoryList({ items, onDelete, role, showQR, setShowQR }) {
  const [sortBy, setSortBy] = useState('nameAsc');
  const [filterLowStock, setFilterLowStock] = useState(false);
  const [filterExpiring, setFilterExpiring] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const applyFilters = (list) => {
    let filtered = [...list];

    if (filterLowStock) {
      filtered = filtered.filter(item => Number(item.quantity) <= 5);
    }

    if (filterExpiring) {
      const today = new Date();
      filtered = filtered.filter(item => {
        const expiryDate = new Date(item.expiry);
        return expiryDate <= new Date(today.setDate(today.getDate() + 7));
      });
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    switch (sortBy) {
      case 'nameDesc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'qtyAsc':
        filtered.sort((a, b) => Number(a.quantity) - Number(b.quantity));
        break;
      case 'qtyDesc':
        filtered.sort((a, b) => Number(b.quantity) - Number(a.quantity));
        break;
      case 'expirySoon':
        filtered.sort((a, b) => new Date(a.expiry) - new Date(b.expiry));
        break;
      default: // nameAsc
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  };

  const filteredItems = applyFilters(items);
  const categories = ['All', ...new Set(items.map(item => item.category).filter(Boolean))];

  return (
    <div>
      <h3>Inventory Items</h3>

      <div style={{ marginBottom: '10px' }}>
        <label>Sort by: </label>
        <select onChange={e => setSortBy(e.target.value)} value={sortBy}>
          <option value="nameAsc">Name (A-Z)</option>
          <option value="nameDesc">Name (Z-A)</option>
          <option value="qtyAsc">Quantity (Low-High)</option>
          <option value="qtyDesc">Quantity (High-Low)</option>
          <option value="expirySoon">Expiry (Soonest First)</option>
        </select>

        <label style={{ marginLeft: '15px' }}>
          <input type="checkbox" checked={filterLowStock} onChange={e => setFilterLowStock(e.target.checked)} />
          Low Stock Only
        </label>

        <label style={{ marginLeft: '15px' }}>
          <input type="checkbox" checked={filterExpiring} onChange={e => setFilterExpiring(e.target.checked)} />
          Expiring Soon
        </label>

        <label style={{ marginLeft: '15px' }}>
          Category:
          <select onChange={e => setSelectedCategory(e.target.value)} value={selectedCategory}>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </label>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor:'#222', color:'gray'}}>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Category</th>
            <th style={thStyle}>Quantity</th>
            <th style={thStyle}>Expiry</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map(item => (
            <tr key={item.id} style={{ borderBottom: '1px solid #ccc' }}>
              <td style={tdStyle}>{item.name}</td>
              <td style={tdStyle}>{item.category}</td>
              <td style={tdStyle}>{item.quantity}</td>
              <td style={tdStyle}>{item.expiry}</td>
              <td style={tdStyle}>
                {role === 'admin' && (
                  <button onClick={() => onDelete(item.id)} style={buttonStyle}>❌</button>
                )}
                <button onClick={() => setShowQR(showQR === item.id ? null : item.id)} style={buttonStyle}>
                  QR
                </button>
                {showQR === item.id && <QRCodeCanvas value={JSON.stringify(item)} size={64} />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  padding: '8px',
  textAlign: 'left',
  borderBottom: '2px solid #ccc'
};

const tdStyle = {
  padding: '8px',
  textAlign: 'left',
  verticalAlign: 'top'
};

const buttonStyle = {
  marginRight: '6px',
  padding: '4px 8px',
  cursor: 'pointer'
};

export default InventoryList;
