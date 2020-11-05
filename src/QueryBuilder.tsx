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
  Translations,
  Field,
  ValueEditorType
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
  { name: 'in', label: 'in' },
  { name: 'null', label: 'is null' },
  { name: 'notNull', label: 'is not null' },  
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

export const QueryBuilder: React.FC<QueryBuilderProps> = ({query, fields = [], operators = defaultOperators, combinators = defaultCombinators, translations = defaultTranslations, controlElements,getPlaceHolder,
   getOperators, getValueEditorType, getInputType, getValues, onQueryChange, controlClassnames, showCombinatorsBetweenRules = false, enableNormalView=false,onAdvancedClick=()=>{}, showNotToggle = false,
   getSelectedColumn, resetOnFieldChange = true, showAddGroup=true,showAddRule=true,resetOnOperatorChange = false }) => {
    const getInitialQuery = () => {// Gets the initial query   
      return (query && generateValidQuery(query)) || createRuleGroup();
    };
    const createRuleGroup = (): RuleGroupType => {
      return {  id: `g-${nanoid()}`, rules: [], combinator: combinators[0].name, not: false };
    }; 
    const createRule = (): RuleType => {
      let field = fields[0].name;
      if(getSelectedColumn){
        const selection = getSelectedColumn();
        if(selection)field = getSelectedColumn();      
      }   
      return { id: `r-${nanoid()}`, field, value: '', operator: getOperatorsMain(field)[0].name };
    }; 
    const {getValueEditorTypeMain, getInputTypeMain, getOperatorsMain, getRuleDefaultValue, getValuesMain, getPlaceHolderMain,getValidQuery, getNormalQuery} 
  = useQueryBuilderProps (getValueEditorType, getInputType, getValues, getOperators, operators,getPlaceHolder);
  
  const{root, setRoot,_notifyQueryChange,getLevelFromRoot,onGroupRemove,onRuleRemove, onPropChange, onGroupAdd, onAddRullonRootLevel, onRuleAdd } 
 = useQueryBuilderActions(query, fields,combinators,createRule,getInitialQuery,onQueryChange, getOperatorsMain,getValidQuery,  getRuleDefaultValue,resetOnFieldChange, resetOnOperatorChange,getValueEditorType, getSelectedColumn);
  
  const schema = { fields, combinators,  classNames: { ...defaultControlClassnames, ...controlClassnames }, createRule, createRuleGroup, onRuleAdd, onGroupAdd, onRuleRemove, onGroupRemove,
    onPropChange, getLevel: getLevelFromRoot, isRuleGroup, controls: { ...defaultControlElements, ...controlElements }, getOperators: getOperatorsMain,  getValueEditorType: getValueEditorTypeMain,
    getInputType: getInputTypeMain, getPlaceHolder:getPlaceHolderMain, getValues: getValuesMain,  showCombinatorsBetweenRules, showAddGroup,showAddRule,  showNotToggle };    
  useEffect(() => { // Set the query state when a new query prop comes in
    setRoot(generateValidQuery(query || getInitialQuery()) as RuleGroupType);
  }, [query]);
  useEffect(() => { // Notify a query change on mount
    _notifyQueryChange(root);
  }, []);
let updatedroot: RuleGroupType = root;
if(enableNormalView){
  updatedroot = getNormalQuery(root);
}
  return (
    <div>
      <div className={`queryBuilder ${schema.classNames.queryBuilder}`}>
        <schema.controls.ruleGroup
          translations={{ ...defaultTranslations, ...translations }} rules={updatedroot.rules} combinator={root.combinator} schema={schema} id={root.id} not={!!root.not} />
      </div>
      { enableNormalView && <div className="queryBuilder-footer">
        <div title="Open advanced filter" role="button" className="queryBuilder-footer-advanced" onClick={onAdvancedClick} >
          <svg width="12" height="12" viewBox="0 0 12 12">
            <path d="M11.6543 8.02148L11.9414 8.71875L11.2148 9.01758C11.2383 9.13477 11.25 9.25391 11.25 9.375C11.25 9.49609 11.2383 9.61523 11.2148 9.73242L11.9414 10.0312L11.6543 10.7285L10.9277 10.4238C10.791 10.623 10.623 10.791 10.4238 10.9277L10.7285 11.6543L10.0312 11.9414L9.73242 11.2148C9.61523 11.2383 9.49609 11.25 9.375 11.25C9.25391 11.25 9.13477 11.2383 9.01758 11.2148L8.71875 11.9414L8.02148 11.6543L8.32617 10.9277C8.12695 10.791 7.95898 10.623 7.82227 10.4238L7.0957 10.7285L6.80859 10.0312L7.53516 9.73242C7.51172 9.61523 7.5 9.49609 7.5 9.375C7.5 9.25391 7.51172 9.13477 7.53516 9.01758L6.80859 8.71875L7.0957 8.02148L7.82227 8.32617C7.95898 8.12695 8.12695 7.95898 8.32617 7.82227L8.02148 7.0957L8.71875 6.80859L9.01758 7.53516C9.13477 7.51172 9.25391 7.5 9.375 7.5C9.49609 7.5 9.61523 7.51172 9.73242 7.53516L10.0312 6.80859L10.7285 7.0957L10.4238 7.82227C10.623 7.95898 10.791 8.12695 10.9277 8.32617L11.6543 8.02148ZM10.5 9.375C10.5 9.21875 10.4707 9.07227 10.4121 8.93555C10.3535 8.79883 10.2734 8.67969 10.1719 8.57812C10.0703 8.47656 9.95117 8.39648 9.81445 8.33789C9.67773 8.2793 9.53125 8.25 9.375 8.25C9.21875 8.25 9.07227 8.2793 8.93555 8.33789C8.79883 8.39648 8.67969 8.47656 8.57812 8.57812C8.47656 8.67969 8.39648 8.79883 8.33789 8.93555C8.2793 9.07227 8.25 9.21875 8.25 9.375C8.25 9.53125 8.2793 9.67773 8.33789 9.81445C8.39648 9.95117 8.47656 10.0703 8.57812 10.1719C8.67969 10.2734 8.79883 10.3535 8.93555 10.4121C9.07227 10.4707 9.21875 10.5 9.375 10.5C9.53125 10.5 9.67773 10.4707 9.81445 10.4121C9.95117 10.3535 10.0703 10.2734 10.1719 10.1719C10.2734 10.0703 10.3535 9.95117 10.4121 9.81445C10.4707 9.67773 10.5 9.53125 10.5 9.375ZM0 0.75H12V2.0332L7.5 6.5332C7.46094 6.57227 7.4082 6.61914 7.3418 6.67383C7.2793 6.72461 7.21094 6.77734 7.13672 6.83203C7.06641 6.88672 6.99609 6.93945 6.92578 6.99023C6.85547 7.04102 6.79688 7.08594 6.75 7.125V6.2168L11.25 1.7168V1.5H0.75V1.7168L5.25 6.2168V10.5H6.20508C6.25195 10.6328 6.30469 10.7617 6.36328 10.8867C6.42188 11.0117 6.49023 11.1328 6.56836 11.25H4.5V6.5332L0 2.0332V0.75Z" fill="#C8C8C8" />
          </svg>
          <span className="queryBuilder-footer-title">Advanced</span>
        </div>
        <div title="Add new filter" role="button" className="queryBuilder-footer-addfilter"  onClick={onAddRullonRootLevel}>
          <svg width="10" height="10" viewBox="0 0 10 10" >
            <path d="M10 4.6875V5.3125H5.3125V10H4.6875V5.3125H0V4.6875H4.6875V0H5.3125V4.6875H10Z" fill="#C8C8C8" />
          </svg>
          <span className="queryBuilder-footer-title">Add Filter</span>
        </div>
      </div>}
    </div>
  );
};
const useQueryBuilderActions = (query:RuleGroupType|undefined, fields:Field[],combinators:NameLabelPair[], createRule:Function, getInitialQuery:Function, onQueryChange:Function, getOperatorsMain:Function,getValidQuery:Function, getRuleDefaultValue:Function,resetOnFieldChange:boolean, resetOnOperatorChange:boolean,getValueEditorType:((field: string, operator: string) => ValueEditorType) | undefined, getSelectedColumn:(()=>string)|undefined)=>{
  const [root, setRoot] = useState(getInitialQuery() as RuleGroupType); 
  const onRuleAdd = (rule: RuleType, parentId: string) => {// Adds a rule to the query
    const rootCopy = cloneDeep(root);
    const parent = findRule(parentId, rootCopy) as RuleGroupType;   
    if (parent) { // istanbul ignore else 
      const groupIndex:number =parent.rules.findIndex((rule)=>{ return (rule as RuleGroupType).combinator});
      if(groupIndex>-1){
        parent.rules.splice(groupIndex,0,{ ...rule, value: getRuleDefaultValue(rule) });
      }else{
        parent.rules.push({ ...rule, value: getRuleDefaultValue(rule) });
      }
      setRoot(rootCopy);
      _notifyQueryChange(rootCopy);
    }
  };
  const onAddRullonRootLevel =()=>{
    const rootCopy = cloneDeep(root);   
    const groupIndex:number =rootCopy.rules.findIndex((rule)=>{ return (rule as RuleGroupType).combinator});
    if(groupIndex>-1){
      rootCopy.rules.splice(groupIndex,0,createRule());
    }else{
      rootCopy.rules.push(createRule());
    }  
    setRoot(rootCopy);
    _notifyQueryChange(rootCopy);  
  }
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
      // if (resetOnOperatorChange && prop === 'operator') {
      //   Object.assign(rule, {value: getRuleDefaultValue(rule) });
      // }
      setRoot(rootCopy);
      _notifyQueryChange(rootCopy);
    }
  };
  const onRuleRemove = (ruleId: string, parentId: string) => {//Removes a rule from the query
    const rootCopy = cloneDeep(root);
    if(rootCopy&&rootCopy.rules.length === 1){
      const firstRule:RuleType = (rootCopy.rules[0] as RuleType);
      if(firstRule.field && !firstRule.value&&(!getValueEditorType || getValueEditorType(firstRule.field, firstRule.operator) !== "none" )){
        return;
      }
    }
    const parent = findRule(parentId, rootCopy) as RuleGroupType;   
    if (parent) { // istanbul ignore else 
      const index = arrayFindIndex(parent.rules, (x) => x.id === ruleId);
         parent.rules.splice(index, 1);
         let updatedQuery:RuleGroupType =  { id: rootCopy.id, rules: [], combinator: rootCopy.combinator };
         getValidQuery(rootCopy,updatedQuery,true);
         setRoot(updatedQuery);
         _notifyQueryChange(updatedQuery);
    }
  };
  const onGroupRemove = (groupId: string, parentId: string) => {//Removes a rule group from the query
    const rootCopy = cloneDeep(root);
    const parent = findRule(parentId, rootCopy) as RuleGroupType;   
    if (parent) { // istanbul ignore else 
      const index = arrayFindIndex(parent.rules, (x) => x.id === groupId);
      parent.rules.splice(index, 1);
      let updatedQuery:RuleGroupType =  { id: rootCopy.id, rules: [], combinator: rootCopy.combinator };
       getValidQuery(rootCopy,updatedQuery,true);
      setRoot(updatedQuery);
      _notifyQueryChange(updatedQuery);
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
  return {root, setRoot,getInitialQuery,createRule,_notifyQueryChange,getLevelFromRoot,onGroupRemove,onRuleRemove, onPropChange, onGroupAdd, onAddRullonRootLevel, onRuleAdd }
}
const useQueryBuilderProps = (getValueEditorType:any, getInputType:any, getValues:any, getOperators:any, operators:NameLabelPair[], getPlaceHolder:any)=>{
  const getNormalQuery = (query: RuleGroupType)=>{
    let updatedQuery:RuleGroupType =  { id: query.id, rules: [], combinator: query.combinator };
    query.rules.forEach((rule)=>{
      if(!(rule as RuleGroupType).combinator)
           updatedQuery.rules.push(rule);
    })
    return updatedQuery
  }
  const getValueEditorTypeMain = (field: string, operator: string) => {// Gets the ValueEditor type for a given field and operator  
    if (getValueEditorType) {
      const vet = getValueEditorType(field, operator);
      if (vet) return vet;
    }
    return 'text';
  };  
  const getPlaceHolderMain  = (field: string, operator: string) => {// Gets the `<input />` type for a given field and operator  
  if (getPlaceHolder) {
    const placeHolder = getPlaceHolder(field, operator);
    if (placeHolder) return placeHolder;
  }
  return '';
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
      value = "";
    } else {
      const editorType = getValueEditorTypeMain(rule.field, rule.operator);
      if (editorType === 'checkbox') {
        value = false;
      }
    }
    return value;
  };
  const getValidQuery = (query: RuleGroupType | RuleType, parent: RuleGroupType, isRoot: boolean) => {
    let root: RuleGroupType | RuleType;
    if ((query as RuleGroupType).combinator) {
       const _query: RuleGroupType = query as RuleGroupType;
       if (isRoot) {
          root = parent;
       } else {
          root = { id: _query.id, rules: [], combinator: _query.combinator };
       }
       let len = _query.rules.length;
       for (var i = 0; i < len; i++) {
          const rule = _query.rules[i];
          getValidQuery(rule, root, false);        
       }
       if (!isRoot && root.rules.length > 0) {
        parent.rules.push(root);
     }
    } else {
       let _rule: RuleType = query as RuleType;
          root = { field: _rule.field, operator: _rule.operator, value: _rule.value };
          parent.rules.push(root);       
    }
 }
  return {getValueEditorTypeMain, getInputTypeMain, getOperatorsMain, getRuleDefaultValue, getValuesMain, getPlaceHolderMain, getValidQuery, getNormalQuery };
}

QueryBuilder.displayName = 'QueryBuilder';
