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

  const ROW: Map<string, string> = new Map();
  ROW.set("IN", "ROW");

  productions.forEach((production) => {
    if (production.allow.length === 0 && production.deny.length === 0) {
      Production.forEach((value: string[]) => {
        value.push(production.name);
      });
    } else if (production.deny.length > 0) {
      Production.forEach((value: string[], key: string) => {
        if (!production.deny.includes(key) && production.allow.length === 0) {
          value.push(production.name);
        }
      });
    }

    production.allow.forEach((country) => {
      if (ROW.has(country)) {
        Production.forEach((value: string[], key: string) => {
          if (!production.deny.includes(key)) {
            value.push(production.name);
          }
        });
      } else {
        Production.get(country).push(production.name);
      }
    });
  });

  return {
    US: Production.get("US"),
    UK: Production.get("UK"),
    ROW: Production.get("ROW"),
  };
};
