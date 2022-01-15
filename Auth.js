import { createContext, useContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import Login from "./pages/account/login";
import Register from "./pages/account/register";
import Loading from "./components/Loading";
import { useRouter } from "next/router";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    return auth.onIdTokenChanged(async (user) => {
      if (!user) {
        setCurrentUser(null);
        setLoading(false);
        console.log("no user");
        return;
      }
      const token = await user.getIdToken();
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!currentUser) {
    return <Login />;
  } else {
    return (
      <AuthContext.Provider value={{ currentUser }}>
        {children}
      </AuthContext.Provider>
    );
  }
};

export const useAuth = () => useContext(AuthContext);
