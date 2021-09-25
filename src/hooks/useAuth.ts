import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export function useAuth() {
  const { user, clearUserData, createAccount, loading } =
    useContext(AuthContext);

  return { user, clearUserData, createAccount, loading };
}
