import { useEffect, useState } from 'react';
import { Container } from '../../components/Container';
import { Section } from '../../components/Section';
import sectors from '../../data/sectors.json';
import { useLocalStorage } from '../../hooks/useLocalStorage';

import styles from './Dashboard.module.css';

interface ISector {
  id: string;
  sector: string;
}
// /setor
// x: esg score
// y: income
export function Dashboard() {
  const [sector, setSector] = useState<ISector>();
  const { getItem, setItem } = useLocalStorage();

  useEffect(() => {
    const storedSector = getItem('sector');
    if (storedSector) {
      setSector(storedSector);
    }
  }, []);

  function handleSelection(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedSector = sectors.find((item) => item.id === e.target.value);
    setSector(selectedSector);
    setItem('sector', selectedSector!);
  }

  return (
    <Container>
      <Section>
        <h1>Dashboard</h1>
        <div>Setor selecionado: {sector?.sector ?? 'Nenhum'}</div>
      </Section>

      <Section>
        Selecione o setor:
        <select
          defaultValue={sector?.sector ?? 'placeholder'}
          onChange={handleSelection}>
          <option value="placeholder" disabled>
            Selecione um setor
          </option>
          {sectors.map((item) => (
            <option value={item.id} key={item.id}>
              {item.sector}
            </option>
          ))}
        </select>
      </Section>

      <div className={styles.horizontalGroup}>
        <Section>
          <h1>Gráficos</h1>
        </Section>

        <Section>
          <h1>Gráficos</h1>
        </Section>
      </div>
    </Container>
  );
}
