import { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface IData {
  companyName?: string;
  email?: string;
}

export function Home() {
  const [data, setData] = useState<IData>({});
  const { user, createAccount } = useAuth();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target) {
      const { name, value } = e.target;
      setData((prev) => ({ ...prev, [name]: value }));
    }
  }

  function handleSubmit() {
    if (!!data.companyName && !!data.email) {
      createAccount(data.companyName, data.email);
    }
  }

  if (user.isSignedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <main>
      <h1>HOME</h1>
      <input type="text" name="companyName" onChange={handleChange} />
      <br />
      <input type="text" name="email" onChange={handleChange} />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <Link to="/dashboard">dashboard</Link>
    </main>
  );
}
