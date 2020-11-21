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

// Specification Questions
// Why do we have an empty result if there is no production object?
// Why are all three groups allowed if we don't have any rules?

// All countries other than UK and US are removed from the list.

// Specification: - Acceptance criteria
// If allow is empty, consider the deny list
// If allow is not empty, consider the allow list:
//   - Deny all countries that are not listed in the Allow list
// If allow is empty consider the deny list

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
      "allow UK allow UK",
      [{ name: "production1", allow: ["UK"], deny: ["UK"] }],
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
      "allow and deny India",
      [{ name: "production1", allow: ["IN"], deny: ["IN"] }],
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

  describe("more than one production", () => {
    it.each([
      [
        "no allow or deny",
        [
          { name: "production1", allow: [], deny: [] },
          { name: "production2", allow: [], deny: [] },
        ],
        {
          US: ["production1", "production2"],
          UK: ["production1", "production2"],
          ROW: ["production1", "production2"],
        },
      ],
      [
        "allow US, allow US",
        [
          { name: "production1", allow: ["US"], deny: [] },
          { name: "production2", allow: ["US"], deny: [] },
        ],
        {
          US: ["production1", "production2"],
          UK: [],
          ROW: [],
        },
      ],
      [
        "allow US, allow UK",
        [
          { name: "production1", allow: ["US"], deny: [] },
          { name: "production2", allow: ["UK"], deny: [] },
        ],
        {
          US: ["production1"],
          UK: ["production2"],
          ROW: [],
        },
      ],
      [
        "allow US, allow US",
        [
          { name: "production1", allow: ["US"], deny: [] },
          { name: "production2", allow: [], deny: ["US"] },
        ],
        {
          US: ["production1"],
          UK: ["production2"],
          ROW: ["production2"],
        },
      ],
      [
        "allow US, deny UK",
        [
          { name: "production1", allow: ["US"], deny: [] },
          { name: "production2", allow: [], deny: ["UK"] },
        ],
        {
          US: ["production1", "production2"],
          UK: [],
          ROW: ["production2"],
        },
      ],
      [
        "allow US, deny DK",
        [
          { name: "production1", allow: ["US"], deny: [] },
          { name: "production2", allow: [], deny: ["DK"] },
        ],
        {
          US: ["production1", "production2"],
          UK: ["production2"],
          ROW: ["production2"],
        },
      ],
      [
        "allow US, deny DK",
        [
          { name: "production1", allow: ["ROW"], deny: [] },
          { name: "production2", allow: [], deny: ["DK"] },
        ],
        {
          US: ["production2"],
          UK: ["production2"],
          ROW: ["production1", "production2"],
        },
      ],
    ])(
      "with %s list of Productions is included in the correct set",
      (_contentType, input, output) => {
        expect(permissions(input)).toEqual(output);
      }
    );
  });
});
