import { formatPrice } from '../utils/formatters';
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
        <div key={idx} className={`stat-card ${stat.highlight ? 'highlight-warning' : ''}`}>
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
