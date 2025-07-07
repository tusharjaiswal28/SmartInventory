import React, { createContext, useState, useEffect } from 'react';
import { db, ref, onValue } from '../firebase';

export const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const itemsRef = ref(db, 'items');
    onValue(itemsRef, snapshot => {
      const data = snapshot.val();
      const loaded = data ? Object.entries(data).map(([id, val]) => ({ ...val, id })) : [];
      setItems(loaded);
    });
  }, []);

  return (
    <InventoryContext.Provider value={{ items }}>
      {children}
    </InventoryContext.Provider>
  );
};