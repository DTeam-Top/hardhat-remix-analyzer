// tslint:disable-next-line no-implicit-dependencies
import { assert } from "chai";
import { calculateRules } from "../src/common";
import { ANALYZER_RULES } from "../src/const";
import { rulesForTesting } from "./helpers";

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
