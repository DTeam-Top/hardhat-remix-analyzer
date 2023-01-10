import "hardhat/types/config";
import "hardhat/types/runtime";
import { AnalyzerConfiguration } from "./common";

declare module "hardhat/types/config" {
  interface HardhatUserConfig {
    analyzerRules?: AnalyzerConfiguration;
  }

  interface HardhatConfig {
    analyzerRules: AnalyzerConfiguration;
  }
}

declare module "hardhat/types/runtime" {
  export interface HardhatRuntimeEnvironment {
    analyze: (hre: HardhatRuntimeEnvironment) => Promise<void>;
  }
}
