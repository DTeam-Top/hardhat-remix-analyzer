import { ANALYZER_RULES } from "./const";

export type AnalyzerConfiguration = {
  default?: string[];
  sources?: {
    [source: string]: { [rule: string]: boolean };
  };
};

export function calculateRules(source: string, rules: AnalyzerConfiguration) {
  const defaultRules = calculateDefaultRules(rules);
  if (!rules.sources || !rules.sources[source]) {
    return Object.values(defaultRules);
  }

  let ruleNames = Object.keys(defaultRules).join(" ");

  Object.entries(rules.sources[source]).forEach((item) => {
    if (item[1] && !ruleNames.includes(item[0])) {
      ruleNames = `${ruleNames} ${item[0]}`;
    } else if (!item[1] && ruleNames.includes(item[0])) {
      ruleNames = ruleNames.replace(item[0], "");
    }
  });

  const finalRules = ruleNames
    .split(" ")
    .filter((ruleNames) => !!ruleNames.length);

  return finalRules.map((rule) => ANALYZER_RULES[rule]);
}

function calculateDefaultRules(rules: AnalyzerConfiguration) {
  const defaultConfig = rules.default;
  if (!defaultConfig || !defaultConfig.length) {
    return ANALYZER_RULES;
  }

  const result: any = {};
  defaultConfig.forEach((rule) => (result[rule] = ANALYZER_RULES[rule]));

  return result;
}
