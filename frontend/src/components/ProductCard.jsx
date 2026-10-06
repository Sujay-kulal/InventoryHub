import { formatPrice, truncateText } from '../utils/formatters';
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
          <span className={`metric-value ${stockClass}`}>
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
