import React from "react";
import styled from "styled-components";
import { globalContext } from "../context/context";
import {
  BarChart,
  ColumnChart,
  DoghnutChart,
  ExampleChart,
  PierChart,
} from "./charts";

function Repos() {
  const { repos } = globalContext();

  // const chartData = [
  //   {
  //     label: "HTML",
  //     value: "13",
  //   },
  //   {
  //     label: "CSS",
  //     value: "160",
  //   },

  //   {
  //     label: "JAVASCRIPT",
  //     value: "80",
  //   },
  // ];

  const languages = repos.reduce((total, item) => {
    const { language, stargazers_count } = item;

    if (!language) return total;
    if (!total[language]) {
      total[language] = { label: language, value: 1, stars: stargazers_count };
    } else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count,
      };
    }
    return total;
  }, {});

  const mostUsed = Object.values(languages)
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);

  const mostPopular = Object.values(languages)
    .sort((a, b) => {
      return b.stars - a.stars;
    })
    .map((item) => {
      return { ...item, value: item.stars };
    })
    .slice(0, 5);

  let { stars, forks } = repos.reduce(
    (total, item) => {
      const { stargazers_count, name, forks } = item;
      total.stars[stargazers_count] = { label: name, value: stargazers_count };
      total.forks[forks] = { label: name, value: forks };
      return total;
    },
    {
      stars: {},
      forks: {},
    }
  );

  const mostPopularRepos = Object.values(stars)
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);

  const mostForked = Object.values(forks)
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);

  return (
    <section className="section">
      <Wrapper className="section-center">
        {/* <ExampleChart /> */}
        <PierChart data={mostUsed} />
        <ColumnChart data={mostPopularRepos} />
        <DoghnutChart data={mostPopular} />
        <BarChart data={mostForked} />
      </Wrapper>
    </section>
  );
}

const Wrapper = styled.div`
  display: grid;
  margin: 0 auto;
  gap: 5rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
