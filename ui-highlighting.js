// Highlights the current employee tab based on the URL
function highlightEmployeeTab() {
  const path = window.location.pathname;
  document.querySelectorAll('#employeeTabs .nav-link').forEach(link => {
    if (link.getAttribute('href') && path.endsWith(link.getAttribute('href').split('/').pop())) {
      link.classList.add('active');
    }
  });
}

// Highlights the current sidebar link based on the URL
function highlightSidebarLink() {
  const sidebarLinks = document.querySelectorAll('#dynamicSidebar .nav-link');
  const sidebarPath = window.location.pathname;
  sidebarLinks.forEach(link => {
    if (link.getAttribute('href') && sidebarPath.endsWith(link.getAttribute('href').split('/').pop())) {
      link.classList.add('active');
    }
  });
}

// Run both on DOMContentLoaded for static includes
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    highlightEmployeeTab();
    highlightSidebarLink();
  });
} else {
  highlightEmployeeTab();
  highlightSidebarLink();
} 