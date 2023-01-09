import { extendEnvironment } from "hardhat/config";
import analyze from "./tasks/analyze";
import "./tasks/analyze";
import "./type-extensions";

extendEnvironment((hre) => {
  hre.analyze = analyze;
});
