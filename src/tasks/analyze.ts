import { task } from "hardhat/config";
import { TASK_COMPILE } from "hardhat/builtin-tasks/task-names";
import staticAnalysisRunner from "@remix-project/remix-analyzer/src/solidity-analyzer";
import fs from "fs";
import { createTable } from "@dteam/st2/dist/stringTable";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { calculateRules, loadRulesFromFile } from "../common";

const analyze = async (hre: HardhatRuntimeEnvironment) => {
  const runner = new staticAnalysisRunner();

  await hre.run(TASK_COMPILE, { quiet: true });
  console.log("√ compiled contracts.\n");

  const compileResults = await hre.artifacts.getBuildInfoPaths();
  const rules = loadRulesFromFile(
    `${hre.config.paths.root}/.analyzerRules.json`
  );

  compileResults.forEach((result) => {
    const compiled = JSON.parse(fs.readFileSync(result).toString());
    const source = Object.keys(compiled.input.sources)[0];
    const modules = calculateRules(source, rules).map((Module: any) => {
      return { name: new Module().name, mod: new Module() };
    });
    const reports = runner.runWithModuleList(compiled.output, modules);
    console.log(`\nanalyzing ${source}...`);
    console.log("---");
    reports.forEach((report) => {
      if (report.report.length) {
        console.log(`!!! ${report.name.replace(":", "")}`);
        console.log(
          createTable(
            report.report.map((item) => {
              return {
                warning: `${item.warning
                  .split("\n")
                  .map((line) => line.trim())
                  .join("\n")}"\n--\nlocation:"${item.location}${
                  item.more ? `\n--\nmore:${item.more}` : ""
                }`,
              };
            }),
            { rowSeparator: "-" }
          )
        );
        console.log("\n");
      } else {
        console.log(`√ ${report.name.replace(":", "")}`);
      }
    });
  });
};

task("analyze", "Analyze the contracts code").setAction(
  async (taskArguments, hre, runSuper) => {
    await analyze(hre);
  }
);

export default analyze;
