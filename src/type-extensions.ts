import "hardhat/types/config";
import "hardhat/types/runtime";

declare module "hardhat/types/runtime" {
  export interface HardhatRuntimeEnvironment {
    analyze: (hre: HardhatRuntimeEnvironment) => Promise<void>;
  }
}
