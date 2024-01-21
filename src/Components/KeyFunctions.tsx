// reusable function to get data from local storage
export const setKey = (key: string, value: string) => {
    localStorage.setItem(key, value);
  };
  
  // reusable function to remove data from local storage
  export const removeKey = (key: string) => {
    localStorage.removeItem(key);
  };
  
  // reusable function to get data from local storage
  export const getKey = (key: string) => {
    return localStorage.getItem(key);
  };