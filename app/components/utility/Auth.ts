// components/auth.ts
import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

export const useAuth = () => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
    }
  }, [session]);



  return  user;
};