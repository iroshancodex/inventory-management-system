// src/context/InventoryContext.jsx
import { createContext, useContext } from 'react';
import { useInventory } from '../hooks/useInventory';

const InventoryContext = createContext(null);

export const InventoryProvider = ({ children }) => {
  const inventory = useInventory();

  return (
    <InventoryContext.Provider value={inventory}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventoryContext = () => {
  const context = useContext(InventoryContext);

  if (!context) {
    throw new Error('Error');
  }

  return context;
};