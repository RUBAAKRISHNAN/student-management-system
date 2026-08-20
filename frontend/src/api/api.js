const API_URL = "http://localhost:5000/api";

export const apiFetch = async (url, options = {}) => {

  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}${url}`,
    {
      ...options,

      headers: {
        "Content-Type": "application/json",
        ...(token && {
          Authorization: `Bearer ${token}`
        }),
        ...options.headers
      }
    }
  );
 if(response.status==401){
  localStorage.removeItem("token");
  localStorage.removeItem("User");
  console.log("token expired")
 }
  return response;
};