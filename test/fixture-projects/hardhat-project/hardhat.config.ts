import { HardhatUserConfig } from "hardhat/types";

import "../../../src/index";

const config: HardhatUserConfig = {
  solidity: "0.7.3",
  defaultNetwork: "hardhat",
  analyzerRules: {
    default: ["txOrigin", "gasCosts", "thisLocal"],
    sources: {
      "contracts/Global.sol": {
        gasCosts: false,
        thisLocal: false,
        blockTimestamp: true,
      },
    },
  },
};

export default config;
