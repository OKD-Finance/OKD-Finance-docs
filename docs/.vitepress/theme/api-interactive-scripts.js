// Global API interactive functions for all API documentation pages

// Global variables
let globalApiKey = '';

// Utility functions
function setGlobalApiKey() {
  globalApiKey = document.getElementById('global-api-key')?.value || '';
  if (globalApiKey) {
    alert('API Key saved successfully!');
  }
}

function showLoading(button) {
  const originalText = button.textContent;
  button.textContent = 'Loading...';
  button.disabled = true;
  return originalText;
}

function hideLoading(button, originalText) {
  button.textContent = originalText;
  button.disabled = false;
}

function showResult(container, result) {
  const resultsDiv = container.querySelector('.results-container') || container;
  resultsDiv.innerHTML = '<pre>' + JSON.stringify(result, null, 2) + '</pre>';
}

async function makeApiRequest(endpoint, options = {}) {
  try {
    const response = await fetch('https://develop.okd.finance/api' + endpoint, {
      ...options,
      headers: {
        'Authorization': 'Bearer ' + globalApiKey,
        'Content-Type': 'application/json',
        ...options.headers
      }
    });
    
    const result = await response.json();
    return result;
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

// Make functions globally available
if (typeof window !== 'undefined') {
  window.setGlobalApiKey = setGlobalApiKey;
  window.showLoading = showLoading;
  window.hideLoading = hideLoading;
  window.showResult = showResult;
  window.makeApiRequest = makeApiRequest;
}
