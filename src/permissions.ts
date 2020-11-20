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
  const Production: Map<string, string[]> = new Map();
  Production.set("US", []);
  Production.set("UK", []);
  Production.set("ROW", []);

  productions.forEach((production) => {
    if (production.allow.length === 0) {
      Production.forEach((value: string[]) => {
        value.push(production.name);
      });
    }
    production.allow.forEach((country) => {
      Production.get(country).push(production.name);
    });
  });

  return {
    US: Production.get("US"),
    UK: Production.get("UK"),
    ROW: Production.get("ROW"),
  };
};
