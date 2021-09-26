import { useState } from 'react';
import { Container } from '../../components/Container';
import { Section } from '../../components/Section';
import { useAuth } from '../../hooks/useAuth';

export function Dashboard() {
  const [sector, setSector] = useState<string>();

  return (
    <Container>
      <Section>
        <h1>Dashboard</h1>
        <div>Setor selecionado: {sector ?? 'Nenhum'}</div>
      </Section>
      <Section>
        <h1>Gráficos</h1>
      </Section>
      <Section></Section>
    </Container>
  );
}
