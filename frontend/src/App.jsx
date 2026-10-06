import { useState, useCallback } from 'react';
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

  const handleSearch = useCallback((term) => {
    fetchProducts(term);
  }, [fetchProducts]);

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
