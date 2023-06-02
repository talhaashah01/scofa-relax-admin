const TOKEN_NAME = "token";

// export const getAuthHeader = () => {
//   return {
//     Authorization: `Bearer ${localStorage.getItem(TOKEN_NAME)}`,
//   };
// };

export const getAccessToken = () => localStorage.getItem(TOKEN_NAME);

export const removeAccessToken = () => localStorage.removeItem(TOKEN_NAME);

export const setAccessToken = (token) => {
  localStorage.setItem(TOKEN_NAME, token);
};
