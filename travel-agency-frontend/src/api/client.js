const API_BASE = "http://localhost:8000/api/v1";

export const api = async (path, opts = {}, token = null) => {
  const headers = { "Content-Type": "application/json", Accept: "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, { ...opts, headers });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
};

// Auth
export const login = (email, password) =>
  api("/login", { method: "POST", body: JSON.stringify({ email, password }) });

export const logout = (token) =>
  api("/logout", { method: "POST" }, token);

// Travels
export const getTravels = (page = 1, token = null) =>
  api(`/travels?page=${page}`, {}, token);

export const createTravel = (data, token) =>
  api("/admin/travels/create", { method: "POST", body: JSON.stringify(data) }, token);

export const updateTravel = (slug, data, token) =>
  api(`/editor/travels/${slug}/update`, { method: "PATCH", body: JSON.stringify(data) }, token);

export const deleteTravel = (slug, token) =>
  api(`/admin/travels/${slug}`, { method: "DELETE" }, token);

// Tours
export const getTours = (slug, params = {}, page = 1, token = null) => {
  const query = new URLSearchParams({ page });
  Object.entries(params).forEach(([k, v]) => { if (v) query.set(k, v); });
  return api(`/tours/${slug}?${query}`, {}, token);
};

export const createTour = (travelSlug, data, token) =>
  api(`/admin/travels/${travelSlug}/tours/create`, {
    method: "POST",
    body: JSON.stringify(data),
  }, token);

export const updateTour = (travelSlug, tourId, data, token) =>
  api(`/admin/travels/${travelSlug}/tours/${tourId}/update`, { method: "PATCH", body: JSON.stringify(data) }, token);

export const deleteTour = (travelSlug, tourId, token) =>
  api(`/admin/travels/${travelSlug}/tours/${tourId}`, { method: "DELETE" }, token);

// Travelers
export const getTravelers = (tourId, token) =>
  api(`/admin/tours/${tourId}/travelers`, {}, token);

export const createTraveler = (tourId, data, token) =>
  api(`/admin/tours/${tourId}/travelers`, { method: "POST", body: JSON.stringify(data) }, token);

export const deleteTraveler = (tourId, travelerId, token) =>
  api(`/admin/tours/${tourId}/travelers/${travelerId}`, { method: "DELETE" }, token);

// Users
export const createUser = (data, token) =>
  api("/admin/users/create", { method: "POST", body: JSON.stringify(data) }, token);
