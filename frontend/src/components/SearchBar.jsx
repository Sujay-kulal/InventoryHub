import { useState, useEffect, useRef } from 'react';
import './SearchBar.css';

export default function SearchBar({ onSearch }) {
  const [term, setTerm] = useState('');
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    timeoutRef.current = setTimeout(() => {
      onSearch(term);
    }, 300);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [term, onSearch]);

  return (
    <div className="search-bar">
      <span className="search-icon">🔍</span>
      <input 
        type="text" 
        placeholder="Search products by name or SKU..." 
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="search-input"
      />
    </div>
  );
}
