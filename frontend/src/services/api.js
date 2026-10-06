const BASE_URL = import.meta.env.VITE_API_URL;

async function apiRequest(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  const response = await fetch(url, { ...options, headers });
  
  if (!response.ok) {
    let errorMessage = 'An error occurred';
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (e) {
      errorMessage = response.statusText;
    }
    throw new Error(errorMessage);
  }

  // Handle 204 No Content
  if (response.status === 204) return null;
  return response.json();
}

export const getProducts = (searchTerm = '') => {
  const query = searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : '';
  return apiRequest(`/products${query}`);
};

export const getProductById = (id) => {
  return apiRequest(`/products/${id}`);
};

export const createProduct = (productData) => {
  return apiRequest('/products', {
    method: 'POST',
    body: JSON.stringify(productData)
  });
};

export const updateProduct = (id, productData) => {
  return apiRequest(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(productData)
  });
};

export const deleteProduct = (id) => {
  return apiRequest(`/products/${id}`, {
    method: 'DELETE'
  });
};
