const BASE_URL = "https://api.aroundEsquivelS.chickenkiller.com";

export const register = async (password, email) => {
  try {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email }),
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.message);
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const authorize = async (password, email) => {
  try {
    const response = await fetch(`${BASE_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email }),
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.message);
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const checkToken = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.message);
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};
