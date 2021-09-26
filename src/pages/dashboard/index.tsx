import { useEffect, useMemo, useState } from 'react';
import { Container } from '../../components/Container';
import { Section } from '../../components/Section';
import sectors from '../../data/sectors.json';
import sectors_cost from '../../data/score_cost.json';
import petrol_scores from '../../data/petrol_scatter.json';
import { useLocalStorage } from '../../hooks/useLocalStorage';

import styles from './Dashboard.module.css';
import { BarChart } from '../../components/Charts/Bars';
import { ScatterChart } from '../../components/Charts/Scatter';

interface ISector {
  id: string;
  sector: string;
}

export function Dashboard() {
  const [sector, setSector] = useState<ISector>();
  const { getItem } = useLocalStorage();

  useEffect(() => {
    const storedSector = getItem('sector');
    if (storedSector) {
      setSector(storedSector);
    }
  }, []);

  // function handleSelection(e: React.ChangeEvent<HTMLSelectElement>) {
  //   const selectedSector = sectors.find((item) => item.id === e.target.value);
  //   setSector(selectedSector);
  //   setItem('sector', selectedSector!);
  // }

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
      <div className={styles.horizontalGroup}>
        <Section>
          <h2>Externalidades (custos direto e indiretos)</h2>
          <BarChart
            data={cost}
            keyX="sector"
            keyY="cost"
            xLabel="Setor"
            yLabel="Custo (milhões de dólares)"
            unit=" $M"
          />
        </Section>
        <Section>
          <h2>Descrição</h2>
          <p>
            Custos de externalidades médios por setor - Custos de dano para
            sociedades - (TOTAL/POLUIÇÃO DO AR)
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint
            dolore, consequuntur magni architecto excepturi illo sapiente
            laudantium aliquid modi laboriosam fugit, id qui quis neque! Tempore
            iusto voluptatum exercitationem corrupti!
          </p>
          <ul>
            <li>item 1</li>
            <li>item 2</li>
            <li>item 3</li>
            <li>item 4</li>
          </ul>
        </Section>
      </div>

      <div className={styles.horizontalGroup}>
        <Section>
          <h2>Score per sector</h2>
          <BarChart
            data={cost}
            keyX="sector"
            keyY="score"
            xLabel="Setor"
            yLabel="Score ESG"
            unit=" $M"
          />
        </Section>
        <Section>
          <h2>Descrição</h2>
          <p>Descrição do gráfico score/sector.</p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint
            dolore, consequuntur magni architecto excepturi illo sapiente
            laudantium aliquid modi laboriosam fugit, id qui quis neque! Tempore
            iusto voluptatum exercitationem corrupti!
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint
            dolore, consequuntur magni architecto excepturi illo sapiente
            laudantium aliquid modi laboriosam fugit, id qui quis neque! Tempore
            iusto voluptatum exercitationem corrupti!
          </p>
        </Section>
      </div>
      <div className={styles.horizontalGroup}>
        <Section>
          <h2>Scatter</h2>
          <ScatterChart
            data={cost}
            name="setor"
            keyX="score"
            xLabel="Score ESG"
            yLabel="Custo (milhões de dólares)"
            keyY="cost"
            unitY=" "
            keyZ="sector"
          />
        </Section>
        <Section>
          <h2>Descrição</h2>
          <p>Descrição do gráfico score/sector.</p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint
            dolore, consequuntur magni architecto excepturi illo sapiente
            laudantium aliquid modi laboriosam fugit, id qui quis neque! Tempore
            iusto voluptatum exercitationem corrupti!
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint
            dolore, consequuntur magni architecto excepturi illo sapiente
            laudantium aliquid modi laboriosam fugit, id qui quis neque! Tempore
            iusto voluptatum exercitationem corrupti!
          </p>
        </Section>
      </div>
      <div className={styles.horizontalGroup}>
        <Section>
          <h2>Scatter</h2>
          <ScatterChart
            data={petrol_scores}
            name="Empresa do setor"
            keyX="score_env"
            keyY="score_esg"
            xLabel="Score (E)"
            yLabel="Score (ESG)"
            keyZ="sector"
          />
        </Section>
        <Section>
          <h2>Descrição</h2>
          <p>Descrição do gráfico score/sector.</p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint
            dolore, consequuntur magni architecto excepturi illo sapiente
            laudantium aliquid modi laboriosam fugit, id qui quis neque! Tempore
            iusto voluptatum exercitationem corrupti!
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint
            dolore, consequuntur magni architecto excepturi illo sapiente
            laudantium aliquid modi laboriosam fugit, id qui quis neque! Tempore
            iusto voluptatum exercitationem corrupti!
          </p>
        </Section>
      </div>
    </Container>
  );
}
