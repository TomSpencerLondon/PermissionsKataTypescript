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
  return {
    US: [],
    UK: [],
    ROW: [],
  };
};
