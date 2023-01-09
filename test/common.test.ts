// tslint:disable-next-line no-implicit-dependencies
import { assert } from "chai";
import { calculateRules, loadRulesFromFile } from "../src/common";
import { ANALYZER_RULES } from "../src/const";

const rulesForTesting = {
  default: ["txOrigin", "gasCosts", "thisLocal"],
  sources: {
    "contracts/Global.sol": {
      gasCosts: false,
      thisLocal: false,
      blockTimestamp: true,
    },
  },
};

describe("loadRulesFromFile", function () {
  it("should return empty object for empty string or undefined.", function () {
    assert.deepEqual(loadRulesFromFile(), {});
  });

  it("should return empty object for a nonexistent file.", function () {
    assert.deepEqual(loadRulesFromFile("/a/non/existent/file"), {});
  });

  it("should return an object for a file.", function () {
    assert.deepEqual(loadRulesFromFile("test/rules.json"), rulesForTesting);
  });
});

describe("calculateRules", function () {
  it("should return all rules for an empty rule configuration.", function () {
    assert.deepEqual(
      calculateRules("contracts/Global.sol", {}),
      Object.values(ANALYZER_RULES)
    );
  });

  it("should return default rules for a source not in the configuration.", function () {
    assert.deepEqual(
      calculateRules("contracts/Notexistent.sol", rulesForTesting),
      [
        ANALYZER_RULES.txOrigin,
        ANALYZER_RULES.gasCosts,
        ANALYZER_RULES.thisLocal,
      ]
    );
  });

  it("should return right rules for a source in the configuration.", function () {
    assert.deepEqual(calculateRules("contracts/Global.sol", rulesForTesting), [
      ANALYZER_RULES.txOrigin,
      ANALYZER_RULES.blockTimestamp,
    ]);
  });
});
