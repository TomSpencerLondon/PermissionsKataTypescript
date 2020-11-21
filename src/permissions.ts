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
  const result = {
    US: [],
    UK: [],
    ROW: [],
  };

  productions = productions.map((production) => ({
    name: production.name,
    allow: production.allow.filter((element) =>
      Object.keys(result).includes(element)
    ),
    deny: production.deny.filter((element) =>
      Object.keys(result).includes(element)
    ),
  }));

  productions.forEach((production) => {
    if (production.allow.length === 0) {
      Object.keys(result).forEach((country) => {
        if (!production.deny.includes(country)) {
          result[country].push(production.name);
        }
      });
    } else {
      production.allow.forEach((country) => {
        result[country].push(production.name);
      });
    }
  });

  return result;
};
