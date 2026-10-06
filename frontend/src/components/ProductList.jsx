import ProductCard from './ProductCard';
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
