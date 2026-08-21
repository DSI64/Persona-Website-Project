const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001";

export async function apiFetch(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    let errorMessage = `Request failed: ${response.status}`;

    try {
      const errorData = await response.json();

      if (errorData.error) {
        errorMessage = errorData.error;
      }
    } catch {
      // Ignore invalid error JSON.
    }

    throw new Error(errorMessage);
  }

  return response.json();
}