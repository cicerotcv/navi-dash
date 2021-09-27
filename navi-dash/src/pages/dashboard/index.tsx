import { useEffect, useMemo, useState } from "react";
import { Container } from "../../components/Container";
import { Section } from "../../components/Section";
import sectors from "../../data/sectors.json";
import sectors_cost from "../../data/score_cost.json";
import financial from "../../data/financial.json";
import petrol_scores from "../../data/petrol_scatter.json";
import { useLocalStorage } from "../../hooks/useLocalStorage";

import styles from "./Dashboard.module.css";
import { BarChart } from "../../components/Charts/Bars";
import { ScatterChart } from "../../components/Charts/Scatter";
import { LinesChart } from "../../components/Charts/Lines";

export function Dashboard() {
  const cost = useMemo(() => {
    return sectors_cost.map((item) => ({
      score: item.score,
      cost: item.cost,
      sector: sectors.find((sector) => sector.id === item.sector_id)!.sector!
    }));
  }, []);

  return (
    <Container className={styles.container}>
      <Section className={styles.heading}>
        <h1>Dashboard</h1>
      </Section>
      <div className={styles.horizontalGroup}>
        <Section>
          <h2>Externalidades</h2>
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
          <h2>Externalidades</h2>
          <p className={styles.subtitle}>
            Externalidades por setor (custos diretos e indiretos)
            <br /> Poluição do Ar - R$ milhões
          </p>
          <p>
            A externalidade se refere ao custo não internalizado por uma
            terceira pessoa ou entidade. Quando uma fábrica polui um rio próximo
            as suas instalações, ela não incorporou na sua decisão que os
            pescadores poderão ter a quantidade de peixe reduzida, e, portanto,
            menor renda para consumo dos produtos da mesma fábrica. No caso,
            observa-se os custos (em $milhões) para cada setor econômico
            brasileiro cadastrado pela <b>S&P Global</b>. O que se nota é que é
            muito assimétrico o custo de dano entre os setores. Nessa
            visualização, o setor petrolífero – a maior barra- é o que onera a
            sociedade.
          </p>
        </Section>
      </div>

      <div className={styles.horizontalGroup}>
        <Section>
          <h2>Score ESG S&P por setor</h2>
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
          <h2>Score ESG S&P por setor</h2>
          <p>
            Agora com as empresas adotando ESG, todas já atingiram os patamares
            mais altos em escoragem? Não. Cada setor tem a sua natureza da
            atividade e conjuntura econômica. Alguns setores buscaram adotar no
            máximo possível as práticas, como o setor financeiro, outros
            relativamente mais devagar. Logo, não é possível encontrar um padrão
            entre setores, por isso a melhor forma de avaliar o risco ESG é
            setor por setor.
          </p>
        </Section>
      </div>
      <div className={styles.horizontalGroup}>
        <Section>
          <h2>Custo total por score</h2>
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
          <h2>Custo total por score</h2>
          <p>
            A S&P Global desenvolveu uma metodologia de escoragem, considerando
            diversos parâmetros nos três componentes do ESG: Environmental,
            Social and Governance. Quanto maior o valor do score, mais conforme
            as práticas ESG está determinado setor ou empresa. Dessa forma,
            poder-se-ia pensar que os maiores score acarretariam em menores
            custos totais de externalidade, contudo, a visualização apresenta
            que essa relação não existe. Em parte justificada pois aquelas
            empresas que mais oneram a sociedade, buscam alcançar os melhores
            padrões em ESG.
          </p>
        </Section>
      </div>
      <div className={styles.horizontalGroup}>
        <Section>
          <h2>Scatter dos scores (E. x ESG)</h2>
          <ScatterChart
            data={petrol_scores}
            name="Empresa do setor"
            keyX="score_env"
            keyY="score_esg"
            xLabel="Score (E)"
            yLabel="Score (ESG)"
          />
        </Section>
        <Section>
          <h2>Scatter dos scores (E. x ESG)</h2>
          <p>
            Quem tem bom score também obviamente tem ótimo escore em todas as
            letras da sigla ESG, em especial a primeira, correto? Não se observa
            isso no gráfico. Não há clara relação, uma vez que são três
            categorias na siglas, que estas por sua vez se subdividem, há
            setores que pela natureza de sua atividade não poderão passar de
            certo limite no quesito ambiental, sendo traduzido em menor score
            Enviroment.
          </p>
        </Section>
      </div>
      <div className={styles.horizontalGroup}>
        <Section>
          <h2>Comparativo carteiras</h2>
          <LinesChart
            data={financial}
            nameA="B3"
            nameB="PL Total"
            lineA="b3"
            lineB="pl_total"
            keyX="date"
            xLabel="Data"
            yLabel="Índice de retorno (%)"
          />
        </Section>
        <Section>
          <h2>Comparativo carteiras</h2>
          <p className={styles.subtitle}>
            O índice de retorno no gráfico indica o retorno em forma para o IEE
            B3 e a carteira selecionado. Portanto, um índice de 1.02 traduz um
            retorno de 2% tendo como referência o início de período.
          </p>
          <p>
            O ESG ainda perturba suas noites de sono, elaborando scripts para
            explicar que os menores retornos da empresa são decorrentes do custo
            ESG? Mas isso não é precisa ser assim. É possível reduzir o risco
            ESG, mantendo o retorno ou até superando-o. Nosso time pegou as dez
            melhores empresas considerando o escore geral da S&P e comparou o
            desempenho delas neste ano com o índice do setor elétrico (IEE B3).
            Note que a carteira escolhida superou o índice.
          </p>
        </Section>
      </div>
    </Container>
  );
}
