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
  if (productions.length > 0) {
    const production: Production = { name: "production1", allow: [], deny: [] };
    return {
      US: [production.name],
      UK: [production.name],
      ROW: [production.name],
    };
  }
  return {
    US: [],
    UK: [],
    ROW: [],
  };
};
