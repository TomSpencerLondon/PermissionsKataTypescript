// Statement of the problem

// Allow or Deny + country list
// Productions have performance rights. A production can be denied for a certain country and allowed for a certain country.
// The groupings are US, UK and ROW.
//
// Given an array of PRODUCTIONs of the form
//
// {
//   name: "something",
//   allow: ["US", "France", "Germany"],
//   deny: ["India"]
// }
//
// Return an object of the form
//
// {
//   US: ["something"],
//   UK: []
//   ROW: []
// }

// For the moment the company does not have many customers outside of US
// and UK so it just creates a ROW bucket for productions that
// are not explicitly allowed in the US and the UK.
//

// Zero, One, Many, Boundary conditions, Interfaces (create interfaces want to use), Exercise exceptions, Simple tests and Simple solutions

import { permissions } from "../src/permissions";

describe("Permissions", () => {
  it.each([
    [[], { US: [], UK: [], ROW: [] }],
    [
      [{ name: "production1", allow: [], deny: [] }],
      {
        US: ["production1"],
        UK: ["production1"],
        ROW: ["production1"],
      },
    ],
  ])("returns correct object for input", (input, output) => {
    expect(permissions(input)).toEqual(output);
  });
});
