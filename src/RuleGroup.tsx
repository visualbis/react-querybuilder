import { round } from 'lodash';
import React, { Fragment } from 'react';
import { RuleGroupProps } from './types';

export const RuleGroup: React.FC<RuleGroupProps> = ({ id, combinator = 'and',  rules = [],  translations,  schema,   }) => {
  const { classNames, hasColumnChildRule, combinators, controls, createRule, createRuleGroup, getLevel, isRuleGroup, onGroupAdd,  onPropChange, onRuleAdd, showCombinatorsBetweenRules, showAddGroup,showAddRule, customRenderer} = schema;
  const onCombinatorChange = (value: any) => {
    onPropChange('combinator', value, id);
  }; 
  const addRule = (event: React.MouseEvent<Element, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
    const newRule = createRule();
    onRuleAdd(newRule, id);
  };
  const addGroup = (event: React.MouseEvent<Element, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
    const newGroup = createRuleGroup();
    onGroupAdd(newGroup, id);
  };
  // const removeGroup = (event: React.MouseEvent<Element, MouseEvent>) => {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   onGroupRemove(id, parentId || /* istanbul ignore next */ '');
  // };
  const level = getLevel(id);
// const isClearEnabled = isRoot && enableClear && rules && rules.length;
const removeOr = level < 1 && hasColumnChildRule();
const combinatorCls = removeOr ? "disable-or" : "";
  return (
    <div className={`ruleGroup ${classNames.ruleGroup}`} data-rule-group-id={id} data-level={level}>
      {((!showCombinatorsBetweenRules && rules && rules.length > 1) || showAddGroup || showAddRule) &&
      <div className={`ruleGroup-header ${classNames.header}`}>  
        {!showCombinatorsBetweenRules && rules && rules.length > 1 && <controls.combinatorSelector
          options={combinators}
          value={combinator}
          title={translations.combinators.title}
          className={`ruleGroup-combinators betweenRules ${combinatorCls} ${classNames.combinators}`}
          handleOnChange={onCombinatorChange}
          rules={rules} level={level}
        />}
       {/* {isClearEnabled && <controls.clearRuleAction
          label={translations.clearRule.label}
          title={translations.clearRule.title}
          className={`ruleGroup-clearRule ${classNames.clearRule}`}
          handleOnClick={clearRule}
          rules={rules}   level={level}
        />} */}
        {showAddGroup&& <controls.addGroupAction
          label={translations.addGroup.label}
          title={translations.addGroup.title}
          className={`ruleGroup-addGroup ${classNames.addGroup}`}
          handleOnClick={addGroup}
          rules={rules}   level={level}
        />}     
           
         {showAddRule &&   <controls.addRuleAction
          label={translations.addRule.label}
          title={translations.addRule.title}
          className={`ruleGroup-addRule ${classNames.addRule}`}
          handleOnClick={addRule}
          rules={rules}    level={level}
        />}
      
      </div> }    
      {rules.length>0 && rules.map((r, idx) => (<Fragment key={r.id}>       
        {idx === 1 && showCombinatorsBetweenRules&&  <div className={`ruleGroup-header ${classNames.header}`}> <controls.combinatorSelector
              options={combinators}
              value={combinator}
              title={translations.combinators.title}
              className={`ruleGroup-combinators betweenRules ${combinatorCls}  ${classNames.combinators}`}
              handleOnChange={onCombinatorChange}
              rules={rules}    level={level}
            /></div>
    }
          {isRuleGroup(r) ? (<RuleGroup
              id={r.id}
              schema={schema}
              parentId={id}
              combinator={r.combinator}
              translations={translations}
              rules={r.rules}
              not={!!r.not}
            />) : r.id ?(<controls.rule
              id={r.id}
              field={r.field}
              value={r.value}
              operator={r.operator}
              parentOperator={r.parentOperator}
              schema={schema}
              parentId={id}
              translations={translations}
            />):null}
        </Fragment>))}
     
       
    </div>
  );
};

RuleGroup.displayName = 'RuleGroup';
