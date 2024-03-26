// // components/AuthContext.js
// import { createContext, useState } from 'react';

// const AuthContext = createContext({ token: null, setToken: () => {} });

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(null);

//   useEffect(() => {
//     // Read token from cookie or other storage mechanism
//     const storedToken = getCookie('next-auth.token'); // Example using js-cookie
//     setToken(storedToken);
//   }, []);

//   return (
//     <AuthContext.Provider value={{ token, setToken }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
