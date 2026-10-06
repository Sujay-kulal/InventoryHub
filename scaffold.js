const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'frontend');
const srcDir = path.join(baseDir, 'src');

const dirs = [
  'components',
  'services',
  'hooks',
  'utils'
];

dirs.forEach(d => fs.mkdirSync(path.join(srcDir, d), { recursive: true }));

const files = {
  '.env': `VITE_API_URL=http://localhost:5000/api\n`,
  'vite.config.js': `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  }
})
`,
  '.gitignore': `node_modules
dist
dist-ssr
*.local
.env
.env.local
*.log
.DS_Store
`,
  'src/utils/formatters.js': `export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2
  }).format(price);
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};

export const truncateText = (text, maxLength) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};
`,
  'src/services/api.js': `const BASE_URL = import.meta.env.VITE_API_URL;

async function apiRequest(endpoint, options = {}) {
  const url = \`\${BASE_URL}\${endpoint}\`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  const response = await fetch(url, { ...options, headers });
  
  if (!response.ok) {
    let errorMessage = 'An error occurred';
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (e) {
      errorMessage = response.statusText;
    }
    throw new Error(errorMessage);
  }

  // Handle 204 No Content
  if (response.status === 204) return null;
  return response.json();
}

export const getProducts = (searchTerm = '') => {
  const query = searchTerm ? \`?search=\${encodeURIComponent(searchTerm)}\` : '';
  return apiRequest(\`/products\${query}\`);
};

export const getProductById = (id) => {
  return apiRequest(\`/products/\${id}\`);
};

export const createProduct = (productData) => {
  return apiRequest('/products', {
    method: 'POST',
    body: JSON.stringify(productData)
  });
};

export const updateProduct = (id, productData) => {
  return apiRequest(\`/products/\${id}\`, {
    method: 'PUT',
    body: JSON.stringify(productData)
  });
};

export const deleteProduct = (id) => {
  return apiRequest(\`/products/\${id}\`, {
    method: 'DELETE'
  });
};
`,
  'src/hooks/useProducts.js': `import { useState, useEffect, useCallback } from 'react';
import * as api from '../services/api';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async (searchTerm = '') => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getProducts(searchTerm);
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const addProduct = async (data) => {
    setError(null);
    try {
      await api.createProduct(data);
      await fetchProducts();
    } catch (err) {
      setError(err.message || 'Failed to add product');
      throw err;
    }
  };

  const editProduct = async (id, data) => {
    setError(null);
    try {
      await api.updateProduct(id, data);
      await fetchProducts();
    } catch (err) {
      setError(err.message || 'Failed to update product');
      throw err;
    }
  };

  const removeProduct = async (id) => {
    setError(null);
    try {
      await api.deleteProduct(id);
      await fetchProducts();
    } catch (err) {
      setError(err.message || 'Failed to delete product');
      throw err;
    }
  };

  return {
    products,
    loading,
    error,
    fetchProducts,
    addProduct,
    editProduct,
    removeProduct
  };
};
`,
  'src/index.css': `:root {
  --primary-color: #2563eb;
  --primary-hover: #1d4ed8;
  --secondary-color: #64748b;
  --bg-color: #f8fafc;
  --card-bg: #ffffff;
  --text-primary: #0f172a;
  --text-secondary: #475569;
  --border-color: #e2e8f0;
  --danger-color: #ef4444;
  --danger-hover: #dc2626;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  background-color: var(--bg-color);
  color: var(--text-primary);
  line-height: 1.5;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.875rem;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background-color: var(--primary-hover);
}

.btn-danger {
  background-color: var(--danger-color);
  color: white;
}

.btn-danger:hover {
  background-color: var(--danger-hover);
}

.btn-secondary {
  background-color: var(--secondary-color);
  color: white;
}

.btn-secondary:hover {
  background-color: #475569;
}

.btn-outline {
  background-color: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-primary);
}

.btn-outline:hover {
  background-color: #f1f5f9;
}
`,
  'src/main.jsx': `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
`,
  'src/App.jsx': `import { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import SearchBar from './components/SearchBar';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import ConfirmDialog from './components/ConfirmDialog';
import { useProducts } from './hooks/useProducts';
import './App.css';

function App() {
  const {
    products,
    loading,
    error,
    fetchProducts,
    addProduct,
    editProduct,
    removeProduct
  } = useProducts();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const handleSearch = (term) => {
    fetchProducts(term);
  };

  const handleAddClick = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (productToDelete) {
      await removeProduct(productToDelete.id);
      setIsConfirmOpen(false);
      setProductToDelete(null);
    }
  };

  const handleFormSubmit = async (data) => {
    if (editingProduct) {
      await editProduct(editingProduct.id, data);
    } else {
      await addProduct(data);
    }
    setIsFormOpen(false);
  };

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Dashboard products={products} />
        
        <div className="actions-bar">
          <SearchBar onSearch={handleSearch} />
          <button className="btn btn-primary" onClick={handleAddClick}>
            + Add Product
          </button>
        </div>

        <ProductList 
          products={products}
          loading={loading}
          error={error}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          onRetry={() => fetchProducts()}
        />
      </main>

      {isFormOpen && (
        <ProductForm 
          product={editingProduct}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsFormOpen(false)}
        />
      )}

      <ConfirmDialog 
        isOpen={isConfirmOpen}
        productName={productToDelete?.name}
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </div>
  );
}

export default App;
`,
  'src/App.css': `.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  width: 100%;
}

.actions-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;
  flex-wrap: wrap;
}

@media (max-width: 640px) {
  .actions-bar {
    flex-direction: column;
    align-items: stretch;
  }
}
`,
  'src/components/Header.jsx': `import './Header.css';

export default function Header() {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="logo-section">
          <h1>📦 InventoryHub</h1>
          <p className="subtitle">Manage your stock efficiently</p>
        </div>
      </div>
    </header>
  );
}
`,
  'src/components/Header.css': `.app-header {
  background-color: var(--card-bg);
  border-bottom: 1px solid var(--border-color);
  padding: 1rem 2rem;
  box-shadow: var(--shadow-sm);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-section h1 {
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-bottom: 0.25rem;
}

.subtitle {
  color: var(--text-secondary);
  font-size: 0.875rem;
}
`,
  'src/components/Dashboard.jsx': `import { formatPrice } from '../utils/formatters';
import './Dashboard.css';

export default function Dashboard({ products = [] }) {
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, p) => sum + (Number(p.price) * Number(p.quantity)), 0);
  const lowStockCount = products.filter(p => Number(p.quantity) < 10).length;
  const categoriesCount = new Set(products.map(p => p.category)).size;

  const stats = [
    { title: 'Total Products', value: totalProducts, icon: '📋' },
    { title: 'Total Value', value: formatPrice(totalValue), icon: '💰' },
    { title: 'Low Stock Items', value: lowStockCount, icon: '⚠️', highlight: lowStockCount > 0 },
    { title: 'Categories', value: categoriesCount, icon: '🏷️' }
  ];

  return (
    <div className="dashboard">
      {stats.map((stat, idx) => (
        <div key={idx} className={\`stat-card \${stat.highlight ? 'highlight-warning' : ''}\`}>
          <div className="stat-icon">{stat.icon}</div>
          <div className="stat-info">
            <h3>{stat.title}</h3>
            <p className="stat-value">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
`,
  'src/components/Dashboard.css': `.dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: var(--card-bg);
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 1px solid var(--border-color);
}

.stat-card.highlight-warning {
  border-color: var(--warning-color);
  background-color: #fffbeb;
}

.stat-icon {
  font-size: 2rem;
}

.stat-info h3 {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 0.25rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
}
`,
  'src/components/SearchBar.jsx': `import { useState, useEffect, useRef } from 'react';
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
`,
  'src/components/SearchBar.css': `.search-bar {
  position: relative;
  flex: 1;
  max-width: 400px;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}

.search-input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}
`,
  'src/components/ProductList.jsx': `import ProductCard from './ProductCard';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import EmptyState from './EmptyState';
import './ProductList.css';

export default function ProductList({ products, loading, error, onEdit, onDelete, onRetry }) {
  if (loading) return <LoadingSpinner message="Loading products..." />;
  
  if (error) return <ErrorMessage message={error} onRetry={onRetry} />;
  
  if (!products || products.length === 0) return <EmptyState />;

  return (
    <div className="product-list">
      {products.map(product => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onEdit={() => onEdit(product)}
          onDelete={() => onDelete(product)}
        />
      ))}
    </div>
  );
}
`,
  'src/components/ProductList.css': `.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}
`,
  'src/components/ProductCard.jsx': `import { formatPrice, truncateText } from '../utils/formatters';
import './ProductCard.css';

export default function ProductCard({ product, onEdit, onDelete }) {
  const quantity = Number(product.quantity);
  
  let stockClass = 'stock-good';
  let stockLabel = 'In Stock';
  
  if (quantity < 10) {
    stockClass = 'stock-critical';
    stockLabel = 'Low Stock';
  } else if (quantity < 25) {
    stockClass = 'stock-warning';
    stockLabel = 'Medium Stock';
  }

  return (
    <div className="product-card">
      <div className="card-header">
        <h3 className="product-name" title={product.name}>{truncateText(product.name, 40)}</h3>
        <span className="category-badge">{product.category}</span>
      </div>
      
      <p className="product-sku">SKU: {product.sku}</p>
      <p className="product-desc">{truncateText(product.description, 80) || 'No description'}</p>
      
      <div className="card-metrics">
        <div className="metric">
          <span className="metric-label">Price</span>
          <span className="metric-value">{formatPrice(product.price)}</span>
        </div>
        <div className="metric">
          <span className="metric-label">Quantity</span>
          <span className={\`metric-value \${stockClass}\`}>
            {quantity} <span className="stock-label">({stockLabel})</span>
          </span>
        </div>
      </div>

      <div className="card-actions">
        <button className="btn btn-outline" onClick={onEdit}>✏️ Edit</button>
        <button className="btn btn-outline btn-delete" onClick={onDelete}>🗑️ Delete</button>
      </div>
    </div>
  );
}
`,
  'src/components/ProductCard.css': `.product-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;
}

.product-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.product-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-right: 1rem;
}

.category-badge {
  background: #eff6ff;
  color: var(--primary-color);
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  white-space: nowrap;
}

.product-sku {
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-family: monospace;
  margin-bottom: 0.75rem;
}

.product-desc {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.card-metrics {
  display: flex;
  justify-content: space-between;
  background: var(--bg-color);
  padding: 1rem;
  border-radius: var(--radius-md);
  margin-bottom: 1.5rem;
}

.metric {
  display: flex;
  flex-direction: column;
}

.metric-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
}

.metric-value {
  font-size: 1.125rem;
  font-weight: 600;
}

.stock-good { color: var(--success-color); }
.stock-warning { color: var(--warning-color); }
.stock-critical { color: var(--danger-color); }

.stock-label {
  font-size: 0.75rem;
  font-weight: normal;
}

.card-actions {
  display: flex;
  gap: 0.75rem;
}

.card-actions .btn {
  flex: 1;
}

.btn-delete {
  color: var(--danger-color);
  border-color: #fca5a5;
}
.btn-delete:hover {
  background-color: #fef2f2;
  border-color: var(--danger-color);
}
`,
  'src/components/Modal.jsx': `import { useEffect } from 'react';
import './Modal.css';

export default function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}
`,
  'src/components/Modal.css': `.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: var(--card-bg);
  border-radius: var(--radius-lg);
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-lg);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.modal-header h2 {
  font-size: 1.25rem;
  color: var(--text-primary);
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-secondary);
  line-height: 1;
}

.modal-close:hover {
  color: var(--text-primary);
}

.modal-body {
  padding: 1.5rem;
}
`,
  'src/components/ProductForm.jsx': `import { useState, useEffect } from 'react';
import Modal from './Modal';
import './ProductForm.css';

const CATEGORIES = ['Electronics', 'Clothing', 'Food', 'Books', 'Other'];

export default function ProductForm({ product, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: CATEGORIES[0],
    quantity: 0,
    price: 0,
    sku: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        category: product.category || CATEGORIES[0],
        quantity: product.quantity || 0,
        price: product.price || 0,
        sku: product.sku || ''
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' || name === 'price' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Name is required');
      return;
    }
    if (formData.quantity < 0) {
      setError('Quantity cannot be negative');
      return;
    }
    if (formData.price < 0) {
      setError('Price cannot be negative');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err.message || 'An error occurred during submission');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal 
      isOpen={true} 
      onClose={onCancel} 
      title={product ? 'Edit Product' : 'Add New Product'}
    >
      <form onSubmit={handleSubmit} className="product-form">
        {error && <div className="form-error">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="name">Product Name *</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="sku">SKU</label>
            <input 
              type="text" 
              id="sku" 
              name="sku" 
              value={formData.sku} 
              onChange={handleChange} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select 
              id="category" 
              name="category" 
              value={formData.category} 
              onChange={handleChange}
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Price (₹) *</label>
            <input 
              type="number" 
              id="price" 
              name="price" 
              value={formData.price} 
              onChange={handleChange} 
              min="0" 
              step="0.01" 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity *</label>
            <input 
              type="number" 
              id="quantity" 
              name="quantity" 
              value={formData.quantity} 
              onChange={handleChange} 
              min="0" 
              required 
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea 
            id="description" 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            rows="3"
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-outline" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : 'Save Product'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
`,
  'src/components/ProductForm.css': `.product-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.form-row {
  display: flex;
  gap: 1rem;
}

@media (max-width: 480px) {
  .form-row {
    flex-direction: column;
  }
}

.product-form label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary);
}

.product-form input,
.product-form select,
.product-form textarea {
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 1rem;
  background-color: #fff;
  outline: none;
  transition: border-color 0.2s;
}

.product-form input:focus,
.product-form select:focus,
.product-form textarea:focus {
  border-color: var(--primary-color);
}

.product-form textarea {
  resize: vertical;
}

.form-error {
  background-color: #fef2f2;
  color: var(--danger-color);
  padding: 0.75rem;
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  border: 1px solid #fecaca;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}
`,
  'src/components/ConfirmDialog.jsx': `import Modal from './Modal';
import './ConfirmDialog.css';

export default function ConfirmDialog({ isOpen, onConfirm, onCancel, productName }) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title="Confirm Deletion">
      <div className="confirm-dialog">
        <p>Are you sure you want to delete <strong>{productName}</strong>?</p>
        <p className="warning-text">This action cannot be undone.</p>
        
        <div className="confirm-actions">
          <button className="btn btn-outline" onClick={onCancel}>Cancel</button>
          <button className="btn btn-danger" onClick={onConfirm}>Delete Product</button>
        </div>
      </div>
    </Modal>
  );
}
`,
  'src/components/ConfirmDialog.css': `.confirm-dialog p {
  margin-bottom: 0.5rem;
}

.warning-text {
  color: var(--danger-color);
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
}

.confirm-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}
`,
  'src/components/LoadingSpinner.jsx': `import './LoadingSpinner.css';

export default function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  );
}
`,
  'src/components/LoadingSpinner.css': `.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  color: var(--text-secondary);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--border-color);
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
`,
  'src/components/ErrorMessage.jsx': `import './ErrorMessage.css';

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <h3>Something went wrong</h3>
      <p>{message}</p>
      {onRetry && (
        <button className="btn btn-outline" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}
`,
  'src/components/ErrorMessage.css': `.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: var(--radius-lg);
  color: var(--danger-color);
  text-align: center;
}

.error-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.error-container h3 {
  margin-bottom: 0.5rem;
  color: #991b1b;
}

.error-container p {
  margin-bottom: 1.5rem;
  color: #b91c1c;
}
`,
  'src/components/EmptyState.jsx': `import './EmptyState.css';

export default function EmptyState() {
  return (
    <div className="empty-state">
      <div className="empty-icon">📭</div>
      <h3>No products found</h3>
      <p>Try adjusting your search or add a new product.</p>
    </div>
  );
}
`,
  'src/components/EmptyState.css': `.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background-color: var(--card-bg);
  border: 1px dashed var(--border-color);
  border-radius: var(--radius-lg);
  text-align: center;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-state h3 {
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.empty-state p {
  color: var(--text-secondary);
}
`
};

for (const [filename, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(baseDir, filename), content);
}
console.log('Files generated successfully.');
