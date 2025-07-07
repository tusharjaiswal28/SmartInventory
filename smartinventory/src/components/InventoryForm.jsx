import React, { useState } from 'react';

function InventoryForm({ onAdd }) {
  const [item, setItem] = useState({ name: '', category: '', quantity: '', expiry: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(item);
    setItem({ name: '', category: '', quantity: '', expiry: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Item Name" value={item.name} onChange={e => setItem({ ...item, name: e.target.value })} />
      <input placeholder="Category" value={item.category} onChange={e => setItem({ ...item, category: e.target.value })} />
      <input placeholder="Quantity" type="number" value={item.quantity} onChange={e => setItem({ ...item, quantity: e.target.value })} />
      <input type="date" value={item.expiry} onChange={e => setItem({ ...item, expiry: e.target.value })} />
      <button type="submit">Add Item</button>
    </form>
  );
}

export default InventoryForm;