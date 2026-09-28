const BASE_URL = "http://localhost:3000/authors/";
export const request = async (endpoint, method = "GET", body) => {
  try {
    const jsonResponse = await fetch(BASE_URL + endpoint, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : null,
    });
    if (!jsonResponse.ok) {
      throw new Error(jsonResponse.status);
    }
    const realData = await jsonResponse.json();
    return realData;
  } catch (error) {
    console.error("Server Error", error);
    throw error;
  }
};


