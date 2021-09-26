import { useAuth } from '../../hooks/useAuth';
import { Button } from '../Button';
import styles from './Header.module.css';

export function Header() {
  const { clearUserData, user } = useAuth();
  return (
    <header className={styles.wrapper}>
      <div>logo</div>
      {user.companyName && <h3>{user.companyName}</h3>}
      <div>
        {user.isSignedIn && <Button onClick={clearUserData}>logout</Button>}
      </div>
    </header>
  );
}
