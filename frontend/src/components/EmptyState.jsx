import './EmptyState.css';

export default function EmptyState() {
  return (
    <div className="empty-state">
      <div className="empty-icon">📭</div>
      <h3>No products found</h3>
      <p>Try adjusting your search or add a new product.</p>
    </div>
  );
}
