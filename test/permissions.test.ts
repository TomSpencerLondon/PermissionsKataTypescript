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
    ["no", [], { US: [], UK: [], ROW: [] }],
    [
      "no allow or deny",
      [{ name: "production1", allow: [], deny: [] }],
      {
        US: ["production1"],
        UK: ["production1"],
        ROW: ["production1"],
      },
    ],
    [
      "allow US",
      [{ name: "production1", allow: ["US"], deny: [] }],
      {
        US: ["production1"],
        UK: [],
        ROW: [],
      },
    ],
    [
      "deny US",
      [{ name: "production1", allow: [], deny: ["US"] }],
      {
        US: [],
        UK: ["production1"],
        ROW: ["production1"],
      },
    ],
    [
      "allow UK and US",
      [{ name: "production1", allow: ["UK", "US"], deny: [] }],
      {
        US: ["production1"],
        UK: ["production1"],
        ROW: [],
      },
    ],
    [
      "allow UK deny US",
      [{ name: "production1", allow: ["UK"], deny: ["US"] }],
      {
        US: [],
        UK: ["production1"],
        ROW: [],
      },
    ],
    [
      "deny US and UK",
      [{ name: "production1", allow: [], deny: ["US", "UK"] }],
      {
        US: [],
        UK: [],
        ROW: ["production1"],
      },
    ],
    [
      "deny India",
      [{ name: "production1", allow: [], deny: ["IN"] }],
      {
        US: ["production1"],
        UK: ["production1"],
        ROW: ["production1"],
      },
    ],
    [
      "allow India",
      [{ name: "production1", allow: ["IN"], deny: [] }],
      {
        US: ["production1"],
        UK: ["production1"],
        ROW: ["production1"],
      },
    ],
    [
      "allow India deny UK",
      [{ name: "production1", allow: ["IN"], deny: ["UK"] }],
      {
        US: ["production1"],
        UK: [],
        ROW: ["production1"],
      },
    ],
  ])(
    "with %s Production is included in the correct set",
    (_contentType, input, output) => {
      expect(permissions(input)).toEqual(output);
    }
  );
});
