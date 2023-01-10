// tslint:disable-next-line no-implicit-dependencies
import { assert } from "chai";

import { rulesForTesting, useEnvironment } from "./helpers";

describe("Integration tests", function () {
  describe("Hardhat Runtime Environment extension", function () {
    useEnvironment("hardhat-project");

    it("Should add the analyze field", function () {
      assert.equal(typeof this.hre.analyze, "function");
    });
  });

  describe("HardhatConfig extension", function () {
    useEnvironment("hardhat-project");

    it("Should add the analyzerRules to the config", function () {
      assert.deepEqual(this.hre.config.analyzerRules, rulesForTesting);
    });
  });
});
