export const toast = {
  success: (msg) => {
    showToast(msg, 'success');
  },
  error: (msg) => {
    showToast(msg, 'error');
  },
};

function showToast(msg, type) {
  const div = document.createElement('div');
  div.textContent = msg;
  div.style.cssText = `
    position: fixed;
    top: 80px;
    right: 24px;
    z-index: 9999;
    background: ${type === 'success' ? '#10b981' : '#ef4444'};
    color: white;
    padding: 12px 20px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    animation: slideIn 0.3s ease;
  `;
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 3000);
}
