import { isRuleGroup } from '.';
import { RuleGroupType, RuleType } from '../types';
export const findRuleGroup = (id: string, parent: RuleGroupType): RuleGroupType | RuleType | undefined => {
    if (parent.id === id) {
      return parent;
    }
  
    for (const rule of parent.rules) {
      if (rule.id === id) {
        return parent;
      } else if (isRuleGroup(rule)) {
        const subRule = findRuleGroup(id, rule);
        if (subRule) {
          return parent;
        }
      }
    }
  
    return undefined;
  };
  export default findRuleGroup;