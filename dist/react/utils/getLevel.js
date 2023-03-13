"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ = require(".");
var getLevel = function getLevel(id, index, query) {
  var foundAtIndex = -1;
  if (query.id === id) {
    foundAtIndex = index;
  } else if ((0, _.isRuleGroup)(query)) {
    query.rules.forEach(function (rule) {
      if (foundAtIndex === -1) {
        var indexForRule = index;
        if ((0, _.isRuleGroup)(rule)) indexForRule++;
        foundAtIndex = getLevel(id, indexForRule, rule);
      }
    });
  }
  return foundAtIndex;
};
var _default = getLevel;
exports.default = _default;