import { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Container } from '../../components/Container';
import { Section } from '../../components/Section';
import { useAuth } from '../../hooks/useAuth';

interface IData {
  companyName?: string;
  email?: string;
}

export function Home() {
  const [data, setData] = useState<IData>({
    companyName: 'Empresa teste',
    email: 'teste@email.com'
  });
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
    <Container>
      <Section>
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          onChange={handleChange}
          defaultValue={data.companyName}
        />
        <br />
        <input
          type="text"
          name="email"
          placeholder="email@company.com"
          onChange={handleChange}
          defaultValue={data.email}
        />
        <br />
        <Button onClick={handleSubmit}>Submit</Button>
        <Link to="/dashboard">dashboard</Link>
      </Section>
    </Container>
  );
}
