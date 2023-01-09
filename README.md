# hardhat-remix-analyzer

A plugin using [remix analyzer](https://www.npmjs.com/package/@remix-project/remix-analyzer) for solidity syntax analysis.

## What

This plugin can help solidity developers to find potential issues in their contracts code. It is using [remix analyzer](https://www.npmjs.com/package/@remix-project/remix-analyzer) as the tool doing this job. So, ideally, it should show developers the same report as what they got when using Remix IDE.

Since it is remix analyzer doing the analyzation job, you can use all the rules it supports. You can find all [here](https://github.com/ethereum/remix-project/blob/master/libs/remix-analyzer/src/solidity-analyzer/modules/index.ts).

## Installation

```bash
npm install hardhat-remix-analyzer @dteam/st2 @remix-project/remix-analyzer
```

Import the plugin in your `hardhat.config.js`:

```js
require("hardhat-remix-analyzer");
```

Or if you are using TypeScript, in your `hardhat.config.ts`:

```ts
import "hardhat-remix-analyzer";
```

## Required plugins

None.

## Tasks

This plugin adds the `analyze` task to Hardhat:

```text
  analyze               Analyze the contracts code
```

## Environment extensions

This plugin extends the Hardhat Runtime Environment by adding an `analyze` function:

```ts
hre.analyze(hre);
```

## Configuration

This plugin needs no configuration to run, in this case, it will apply all rules for all the contracts files.

To customize it, you can create a configuration file named `.analyzerRules.json` under the root directory of your hardhat project. The type of the configuration:

```ts
export type AnalyzerConfiguration = {
  default?: string[];
  sources?: {
    [source: string]: { [rule: string]: boolean };
  };
};
```

Where:

- When it is an empty object like `{}`, then all rules will be applied.
- `default` defines the rules for all contracts files. it is an array of strings. And the name must be one of the following names:

```ts
export const ANALYZER_RULES: { [rule: string]: any } = {
  txOrigin,
  gasCosts,
  thisLocal,
  checksEffectsInteraction,
  constantFunctions,
  similarVariableNames,
  inlineAssembly,
  blockTimestamp,
  lowLevelCalls,
  blockBlockhash,
  noReturn,
  selfdestruct,
  guardConditions,
  deleteDynamicArrays,
  assignAndCompare,
  erc20Decimals,
  stringBytesLength,
  intDivisionTruncate,
  etherTransferInLoop,
  deleteFromDynamicArray,
  forLoopIteratesOverDynamicArray,
};
```

- `sources` can control two things and the key must be a path pointing to a contract file.
  - which rules in `default` will not be applied to a specific contract file.
  - which new rules will be added for a specific file.

An example of configuration:

```json
{
  "default": ["txOrigin", "gasCosts", "thisLocal"],
  "sources": {
    "contracts/Global.sol": {
      "gasCosts": false,
      "thisLocal": false,
      "blockTimestamp": true
    }
  }
}
```

## Usage

There are no additional steps you need to take for this plugin to work.

```shell
npx hardhat analyze
```
