import arrayFindIndex from 'array-find-index';
import cloneDeep from 'lodash/cloneDeep';
import { nanoid } from 'nanoid';
import objectAssign from 'object-assign';
import React, { useEffect, useState } from 'react';
import { ActionElement, NotToggle, ValueEditor, ValueSelector, NavTab } from './controls';
import { Rule } from './Rule';
import { RuleGroup } from './RuleGroup';
import {
  Classnames,
  Controls,
  NameLabelPair,
  QueryBuilderProps,
  RuleGroupType,
  RuleType,
  Translations
} from './types';
import { findRule, findRuleGroup, generateValidQuery, getLevel, isRuleGroup } from './utils';

const defaultTranslations: Translations = {
  fields: {
    title: 'Fields'
  },
  operators: {
    title: 'Operators'
  },
  value: {
    title: 'Value'
  },
  removeRule: {
    label: 'x',
    title: 'Remove rule'
  },
  removeGroup: {
    label: 'x',
    title: 'Remove group'
  },
  addRule: {
    label: ' Add rule',
    title: 'Add rule'
  },
  addGroup: {
    label: ' Add group',
    title: 'Add group'
  },
  combinators: {
    title: 'Combinators'
  },
  notToggle: {
    title: 'Invert this group'
  }
};

const defaultOperators: NameLabelPair[] = [
  { name: 'null', label: 'is null' },
  { name: 'notNull', label: 'is not null' },
  { name: 'in', label: 'in' },
  { name: 'notIn', label: 'not in' },
  { name: '=', label: '=' },
  { name: '!=', label: '!=' },
  { name: '<', label: '<' },
  { name: '>', label: '>' },
  { name: '<=', label: '<=' },
  { name: '>=', label: '>=' },
  { name: 'contains', label: 'contains' },
  { name: 'beginsWith', label: 'begins with' },
  { name: 'endsWith', label: 'ends with' },
  { name: 'doesNotContain', label: 'does not contain' },
  { name: 'doesNotBeginWith', label: 'does not begin with' },
  { name: 'doesNotEndWith', label: 'does not end with' }
];

const defaultCombinators: NameLabelPair[] = [
  { name: 'and', label: 'And' },
  { name: 'or', label: 'Or' }
];

const defaultControlClassnames: Classnames = {
  queryBuilder: '',
  ruleGroup: '',
  header: '',
  combinators: '',
  addRule: '',
  addGroup: '',
  removeGroup: '',
  notToggle: '',
  rule: '',
  fields: '',
  operators: '',
  value: '',
  removeRule: ''
};

const defaultControlElements: Controls = {
  addGroupAction: ActionElement,
  removeGroupAction: ActionElement,
  addRuleAction: ActionElement,
  removeRuleAction: ActionElement,
  combinatorSelector: NavTab,
  fieldSelector: ValueSelector,
  operatorSelector: ValueSelector,
  valueEditor: ValueEditor,
  notToggle: NotToggle,
  ruleGroup: RuleGroup,
  rule: Rule
};

export const QueryBuilder: React.FC<QueryBuilderProps> = ({query, fields = [], operators = defaultOperators, combinators = defaultCombinators, translations = defaultTranslations, controlElements,
   getOperators, getValueEditorType, getInputType, getValues, onQueryChange, controlClassnames, showCombinatorsBetweenRules = false, showNotToggle = false, resetOnFieldChange = true, showAddGroup=true,showAddRule=true,resetOnOperatorChange = false }) => {
  const {getValueEditorTypeMain, getInputTypeMain, getOperatorsMain, getRuleDefaultValue, getValuesMain} = useQueryBuilderProps (getValueEditorType, getInputType, getValues, getOperators, operators);
  const getInitialQuery = () => {// Gets the initial query   
    return (query && generateValidQuery(query)) || createRuleGroup();
  };
  const createRule = (): RuleType => {
    const field = fields[0].name;
    return { id: `r-${nanoid()}`, field, value: '', operator: getOperatorsMain(field)[0].name };
  };
  const createRuleGroup = (): RuleGroupType => {
    return {  id: `g-${nanoid()}`, rules: [], combinator: combinators[0].name, not: false };
  };  
  const onRuleAdd = (rule: RuleType, parentId: string) => {// Adds a rule to the query
    const rootCopy = cloneDeep(root);
    const parent = findRule(parentId, rootCopy) as RuleGroupType;   
    if (parent) { // istanbul ignore else 
      parent.rules.push({ ...rule, value: getRuleDefaultValue(rule) });
      setRoot(rootCopy);
      _notifyQueryChange(rootCopy);
    }
  };
  const onGroupAdd = (group: RuleGroupType, parentId: string) => {//Adds a rule group to the query
    const rootCopy = cloneDeep(root);
    const parent = findRule(parentId, rootCopy) as RuleGroupType;   
    if (parent) {  // istanbul ignore else
      const newRule = createRule();
      group.rules.push({...newRule,value:getRuleDefaultValue(newRule)})
      parent.rules.push(group);
      setRoot(rootCopy);
      _notifyQueryChange(rootCopy);
    }
  };
  const onPropChange = (prop: string, value: any, ruleId: string) => {
    const rootCopy = cloneDeep(root);
    const rule = findRule(ruleId, rootCopy) as RuleType;   
    if (rule) { // istanbul ignore else 
      objectAssign(rule, { [prop]: value });    
      if (resetOnFieldChange && prop === 'field') {  // Reset operator and set default value for field change
        objectAssign(rule, {operator: getOperatorsMain(rule.field)[0].name, value: getRuleDefaultValue(rule) });
      }
      if (resetOnOperatorChange && prop === 'operator') {
        Object.assign(rule, { value: getRuleDefaultValue(rule) });
      }
      setRoot(rootCopy);
      _notifyQueryChange(rootCopy);
    }
  };
  const onRuleRemove = (ruleId: string, parentId: string) => {//Removes a rule from the query
    const rootCopy = cloneDeep(root);
    const parent = findRule(parentId, rootCopy) as RuleGroupType;   
    if (parent) { // istanbul ignore else 
      const index = arrayFindIndex(parent.rules, (x) => x.id === ruleId);      
      if(parent.rules.length ===1){
        const parentGroup = findRuleGroup(parentId, rootCopy) as RuleGroupType;   
        onGroupRemove(parentId,parentGroup.id);
      }else{
        parent.rules.splice(index, 1);
        setRoot(rootCopy);
        _notifyQueryChange(rootCopy);
      }
    }
  };
  const onGroupRemove = (groupId: string, parentId: string) => {//Removes a rule group from the query
    const rootCopy = cloneDeep(root);
    const parent = findRule(parentId, rootCopy) as RuleGroupType;   
    if (parent) { // istanbul ignore else 
      const index = arrayFindIndex(parent.rules, (x) => x.id === groupId);
      parent.rules.splice(index, 1);
      setRoot(rootCopy);
      _notifyQueryChange(rootCopy);
    }
  };
  const getLevelFromRoot = (id: string) => {//Gets the level of the rule with the provided ID
    return getLevel(id, 0, root);
  };
  const _notifyQueryChange = (newRoot: RuleGroupType) => {// Executes the `onQueryChange` function, if provided   
    if (onQueryChange) { // istanbul ignore else
      const newQuery = cloneDeep(newRoot);
      onQueryChange(newQuery);
    }
  };
  const [root, setRoot] = useState(getInitialQuery() as RuleGroupType);
  const schema = { fields, combinators,  classNames: { ...defaultControlClassnames, ...controlClassnames }, createRule, createRuleGroup, onRuleAdd, onGroupAdd, onRuleRemove, onGroupRemove,
    onPropChange, getLevel: getLevelFromRoot, isRuleGroup, controls: { ...defaultControlElements, ...controlElements }, getOperators: getOperatorsMain,  getValueEditorType: getValueEditorTypeMain,
    getInputType: getInputTypeMain,  getValues: getValuesMain,  showCombinatorsBetweenRules, showAddGroup,showAddRule,  showNotToggle };    
  useEffect(() => { // Set the query state when a new query prop comes in
    setRoot(generateValidQuery(query || getInitialQuery()) as RuleGroupType);
  }, [query]);
  useEffect(() => { // Notify a query change on mount
    _notifyQueryChange(root);
  }, []);
  return (
    <div className={`queryBuilder ${schema.classNames.queryBuilder}`}>
      <schema.controls.ruleGroup
        translations={{ ...defaultTranslations, ...translations }} rules={root.rules}    combinator={root.combinator}  schema={schema} id={root.id}   not={!!root.not}/>
    </div>
  );
};
const useQueryBuilderProps = (getValueEditorType:any, getInputType:any, getValues:any, getOperators:any, operators:NameLabelPair[])=>{
  const getValueEditorTypeMain = (field: string, operator: string) => {// Gets the ValueEditor type for a given field and operator  
    if (getValueEditorType) {
      const vet = getValueEditorType(field, operator);
      if (vet) return vet;
    }
    return 'text';
  };  
  const getInputTypeMain = (field: string, operator: string) => {// Gets the `<input />` type for a given field and operator  
    if (getInputType) {
      const inputType = getInputType(field, operator);
      if (inputType) return inputType;
    }
    return 'text';
  };  
  const getValuesMain = (field: string, operator: string) => {// Gets the list of valid values for a given field and operator  
    if (getValues) {
      const vals = getValues(field, operator);
      if (vals) return vals;
    }
    return [];
  }; 
  const getOperatorsMain = (field: string) => { // Gets the operators for a given field
    if (getOperators) {
      const ops = getOperators(field);
      if (ops) return ops;
    }
    return operators;
  };
  const getRuleDefaultValue = (rule: RuleType) => {
    let value: any = '';
    const values = getValuesMain(rule.field, rule.operator);
    if (values.length) {
      value = values[0].name;
    } else {
      const editorType = getValueEditorTypeMain(rule.field, rule.operator);
      if (editorType === 'checkbox') {
        value = false;
      }
    }
    return value;
  };
  return {getValueEditorTypeMain, getInputTypeMain, getOperatorsMain, getRuleDefaultValue, getValuesMain };
}

QueryBuilder.displayName = 'QueryBuilder';
