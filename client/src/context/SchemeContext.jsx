import React, { createContext, useContext, useState } from 'react';
import { SEED_SCHEMES } from '../data/mockSchemes.js';

const SchemeContext = createContext();

export function SchemeProvider({ children }) {
  const [schemes] = useState(SEED_SCHEMES);
  const [savedSchemeIds, setSavedSchemeIds] = useState(['pragati-scholarship']);

  const toggleSaveScheme = (id) => {
    setSavedSchemeIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <SchemeContext.Provider value={{ schemes, savedSchemeIds, toggleSaveScheme }}>
      {children}
    </SchemeContext.Provider>
  );
}

export const useSchemes = () => useContext(SchemeContext);
