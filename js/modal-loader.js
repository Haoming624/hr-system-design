/**
 * Shared Modal Loader - DRY implementation for loading modals with JavaScript execution
 * This file eliminates code duplication across employee pages
 */

// Load and execute modal with JavaScript
function loadModalWithScript(modalPath, containerId) {
  return fetch(modalPath)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then(html => {
      // Insert modal HTML
      const container = document.getElementById(containerId);
      if (container) {
        container.outerHTML = html;
      }
      
      // Extract and execute JavaScript from the modal
      const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
      if (scriptMatch) {
        const scriptContent = scriptMatch[1];
        
        // Create a new script element and execute it
        const script = document.createElement('script');
        script.textContent = scriptContent;
        document.head.appendChild(script);
      }
      
      return html;
    })
    .catch(error => {
      console.error('Error loading modal:', error);
      throw error;
    });
}

// Load add employee modal specifically
function loadAddEmployeeModal() {
  return loadModalWithScript('../includes/add-employee-modal.html', 'addEmployeeModalContainer');
}

// Load any modal with custom path and container
function loadCustomModal(modalPath, containerId) {
  return loadModalWithScript(modalPath, containerId);
}

// Auto-load add employee modal when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Check if add employee modal container exists
  const addEmployeeContainer = document.getElementById('addEmployeeModalContainer');
  if (addEmployeeContainer) {
    loadAddEmployeeModal();
  }
});

// Export functions for manual use
window.ModalLoader = {
  loadModalWithScript,
  loadAddEmployeeModal,
  loadCustomModal
}; 