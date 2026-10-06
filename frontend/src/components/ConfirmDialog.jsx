import Modal from './Modal';
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
