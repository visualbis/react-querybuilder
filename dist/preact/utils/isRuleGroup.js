"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * Determines if this is a RuleType or RuleGroupType
 */
var isRuleGroup = function isRuleGroup(ruleOrGroup) {
  var rg = ruleOrGroup;
  return !!(rg.combinator && rg.rules);
};
var _default = isRuleGroup;
exports.default = _default;