import { Route, RouteProps, Redirect } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function PrivateRoute({ component, ...props }: RouteProps) {
  const { user } = useAuth();

  return (
    <Route
      {...props}
      component={!user.isSignedIn ? () => <Redirect to="/" /> : component}
    />
  );
}
