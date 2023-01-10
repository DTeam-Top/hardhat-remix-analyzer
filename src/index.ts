import { extendConfig, extendEnvironment } from "hardhat/config";
import analyze from "./tasks/analyze";
import "./tasks/analyze";
import "./type-extensions";
import { HardhatConfig, HardhatUserConfig } from "hardhat/types";

extendConfig(
  (config: HardhatConfig, userConfig: Readonly<HardhatUserConfig>) => {
    config.analyzerRules = userConfig.analyzerRules || {};
  }
);

extendEnvironment((hre) => {
  hre.analyze = analyze;
});
