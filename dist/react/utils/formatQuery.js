"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = require("lodash");

var _ = require(".");

var mapOperator = function mapOperator(op) {
  switch (op.toLowerCase()) {
    case 'null':
      return 'is null';

    case 'notnull':
      return 'is not null';

    case 'notin':
      return 'not in';

    case 'contains':
    case 'beginswith':
    case 'endswith':
      return 'like';

    case 'doesnotcontain':
    case 'doesnotbeginwith':
    case 'doesnotendwith':
      return 'not like';

    default:
      return op;
  }
};

var removeIdsFromRuleGroup = function removeIdsFromRuleGroup(ruleGroup) {
  var ruleGroupCopy = (0, _lodash.cloneDeep)(ruleGroup);
  delete ruleGroupCopy.id;

  if ((0, _.isRuleGroup)(ruleGroupCopy)) {
    ruleGroupCopy.rules = ruleGroupCopy.rules.map(function (rule) {
      return removeIdsFromRuleGroup(rule);
    });
  }

  return ruleGroupCopy;
};
/**
 * Formats a query in the requested output format.  The optional
 * `valueProcessor` argument can be used to format the values differently
 * based on a given field, operator, and value.  By default, values are
 * processed assuming the default operators are being used.
 */


var formatQuery = function formatQuery(ruleGroup, format, valueProcessor) {
  var formatLowerCase = format.toLowerCase();

  if (formatLowerCase === 'json') {
    return JSON.stringify(ruleGroup, null, 2);
  } else if (formatLowerCase === 'json_without_ids') {
    return JSON.stringify(removeIdsFromRuleGroup(ruleGroup));
  } else if (formatLowerCase === 'sql' || formatLowerCase === 'parameterized') {
    var parameterized = formatLowerCase === 'parameterized';
    var params = [];

    var valueProc = valueProcessor || function (field, operator, value) {
      var val = "\"".concat(value, "\"");

      if (operator.toLowerCase() === 'null' || operator.toLowerCase() === 'notnull') {
        val = '';
      } else if (operator.toLowerCase() === 'in' || operator.toLowerCase() === 'notin') {
        val = "(".concat(value.split(',').map(function (v) {
          return "\"".concat(v.trim(), "\"");
        }).join(', '), ")");
      } else if (operator.toLowerCase() === 'contains' || operator.toLowerCase() === 'doesnotcontain') {
        val = "\"%".concat(value, "%\"");
      } else if (operator.toLowerCase() === 'beginswith' || operator.toLowerCase() === 'doesnotbeginwith') {
        val = "\"".concat(value, "%\"");
      } else if (operator.toLowerCase() === 'endswith' || operator.toLowerCase() === 'doesnotendwith') {
        val = "\"%".concat(value, "\"");
      } else if (typeof value === 'boolean') {
        val = "".concat(value).toUpperCase();
      }

      return val;
    };

    var processRule = function processRule(rule) {
      var value = valueProc(rule.field, rule.operator, rule.value);
      var operator = mapOperator(rule.operator);

      if (parameterized && value) {
        if (operator.toLowerCase() === 'in' || operator.toLowerCase() === 'not in') {
          var splitValue = rule.value.split(',').map(function (v) {
            return v.trim();
          });
          splitValue.forEach(function (v) {
            return params.push(v);
          });
          return "".concat(rule.field, " ").concat(operator, " (").concat(splitValue.map(function () {
            return '?';
          }).join(', '), ")");
        }

        var found = value.match(/^"?(.*?)"?$/);

        if (found && found.length > 1) {
          params.push(found[1]);
        }
      }

      return "".concat(rule.field, " ").concat(operator, " ").concat(parameterized && value ? '?' : value).trim();
    };

    var processRuleGroup = function processRuleGroup(rg) {
      var processedRules = rg.rules.map(function (rule) {
        if ((0, _.isRuleGroup)(rule)) {
          return processRuleGroup(rule);
        }

        return processRule(rule);
      });
      return "".concat(rg.not ? 'NOT ' : '', "(").concat(processedRules.join(" ".concat(rg.combinator, " ")), ")");
    };

    if (parameterized) {
      return {
        sql: processRuleGroup(ruleGroup),
        params: params
      };
    } else {
      return processRuleGroup(ruleGroup);
    }
  } else {
    return '';
  }
};

var _default = formatQuery;
exports.default = _default;