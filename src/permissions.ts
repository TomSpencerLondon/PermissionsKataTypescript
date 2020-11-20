type Production = {
  name: string;
  allow: string[];
  deny: string[];
};

type Rights = {
  US: string[];
  UK: string[];
  ROW: string[];
};

export const permissions = (productions: Production[]): Rights => {
  const usProductions: string[] = [];
  const ukProductions: string[] = [];
  const rowProductions: string[] = [];

  productions.forEach((production) => {
    if (production.allow.includes("US")) {
      usProductions.push(production.name);
    } else {
      usProductions.push(production.name);
      ukProductions.push(production.name);
      rowProductions.push(production.name);
    }
  });

  return {
    US: usProductions,
    UK: ukProductions,
    ROW: rowProductions,
  };
};
