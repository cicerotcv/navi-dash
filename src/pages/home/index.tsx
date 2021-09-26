import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Container } from '../../components/Container';
import { Section } from '../../components/Section';
import { useAuth } from '../../hooks/useAuth';

import styles from './Home.module.css';

interface IData {
  companyName?: string;
  email?: string;
}

export function Home() {
  const [data, setData] = useState<IData>({
    companyName: 'Navi Tech Journey',
    email: 'tech_journey@navi.com'
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
      // TODO: email validation
      createAccount(data.companyName, data.email);
    }
  }

  if (user.isSignedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container>
      <Section className={styles.mainContent}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          placeholder="email@company.com"
          onChange={handleChange}
          defaultValue={data.email}
        />

        <label htmlFor="companyName">Nome da empresa</label>
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          onChange={handleChange}
          defaultValue={data.companyName}
        />

        <br />
        <Button onClick={handleSubmit}>Submit</Button>
      </Section>
    </Container>
  );
}
