import { useEffect, useMemo, useState } from 'react';
import { Container } from '../../components/Container';
import { Section } from '../../components/Section';
import sectors from '../../data/sectors.json';
import sectors_cost from '../../data/score_cost.json';
import { useLocalStorage } from '../../hooks/useLocalStorage';

import styles from './Dashboard.module.css';
import { BarChart } from '../../components/Charts/Bars';

interface ISector {
  id: string;
  sector: string;
}

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

  const cost = useMemo(() => {
    return sectors_cost.map((item) => ({
      score: item.score,
      cost: item.cost,
      sector: sectors.find((sector) => sector.id === item.sector_id)!.sector!
    }));
  }, []);

  return (
    <Container className={styles.container}>
      <Section>
        <h1>Dashboard</h1>
        <div>Setor selecionado: {sector?.sector ?? 'Nenhum'}</div>
      </Section>

      <Section>
        <p>Selecione o setor:</p>
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
          <h2>Cost per sector</h2>
          <BarChart data={cost} keyX="sector" keyY="cost" />
        </Section>
        <Section>
          <h2>Score per sector</h2>
          <BarChart data={cost} keyX="sector" keyY="score" />
        </Section>
      </div>
    </Container>
  );
}
