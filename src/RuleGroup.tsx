import React, { Fragment } from 'react';
import { RuleGroupProps } from './types';

export const RuleGroup: React.FC<RuleGroupProps> = ({ id, combinator = 'and',  rules = [],  translations,  schema,parentId   }) => {
  const { classNames, hasColumnChildRule, combinators, controls, createRule, createRuleGroup, getLevel, isRuleGroup, onGroupAdd,  onPropChange, onRuleAdd, showCombinatorsBetweenRules, showAddGroup,showAddRule, customRenderer,onGroupRemove} = schema;
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
const linkColors=['violetLink','orangeLink','greenLink','yellowLink','redLink','blueLink']
const onRemoveGroup=(event)=>{
  event.preventDefault();
  event.stopPropagation();
  onGroupRemove(id, parentId ||"")
}
  return (<div
        className={`ruleGroup ${classNames.ruleGroup} rule-group-connect ${level==0?'ruleGroupFirst':null}` }
        data-rule-group-id={id}
        data-level={level}>
        {level > 0 && (
          <RuleGroupHeader level={level} onRemoveGroup={onRemoveGroup}/>
        )}
        {((!showCombinatorsBetweenRules && rules && rules.length > 1) ||
          showAddGroup ||
          showAddRule) && (
          <div
            className={`ruleGroup-header ${classNames.header} ${
              level === 0 ? 'ruleGroup-firstHeader' : null
            }`}>
            {!showCombinatorsBetweenRules && rules && rules.length > 1 && (
              <controls.combinatorSelector
                options={combinators}
                value={combinator}
                title={translations.combinators.title}
                className={`ruleGroup-combinators betweenRules ${combinatorCls} ${classNames.combinators}`}
                handleOnChange={onCombinatorChange}
                rules={rules}
                level={level}
              />
            )}
            {/* {isClearEnabled && <controls.clearRuleAction
          label={translations.clearRule.label}
          title={translations.clearRule.title}
          className={`ruleGroup-clearRule ${classNames.clearRule}`}
          handleOnClick={clearRule}
          rules={rules}   level={level}
        />} */}
            {showAddGroup && (
              <controls.addGroupAction
                label={translations.addGroup.label}
                title={translations.addGroup.title}
                className={`ruleGroup-addGroup ${classNames.addGroup}`}
                handleOnClick={addGroup}
                rules={rules}
                level={level}
              />
            )}

            {showAddRule && (
              <controls.addRuleAction
                label={translations.addRule.label}
                title={translations.addRule.title}
                className={`ruleGroup-addRule ${classNames.addRule}`}
                handleOnClick={addRule}
                rules={rules}
                level={level}
              />
            )}
          </div>
        )}
        {rules.length > 0 &&
          rules.map((r, idx) => (
            <Fragment key={r.id}>
              {idx === 1 && showCombinatorsBetweenRules && (
                <div className={`ruleGroup-header ${classNames.header}`}>
                  {' '}
                  <controls.combinatorSelector
                    options={combinators}
                    value={combinator}
                    title={translations.combinators.title}
                    className={`ruleGroup-combinators betweenRules ${combinatorCls}  ${classNames.combinators}`}
                    handleOnChange={onCombinatorChange}
                    rules={rules}
                    level={level}
                  />
                </div>
              )}
              {isRuleGroup(r) ? (
                <div className={`rule-connect-link ${rules?.length >1 ? linkColors[(level % 6)]:null }`}><RuleGroup
                id={r.id}
                schema={schema}
                parentId={id}
                combinator={r.combinator}
                translations={translations}
                rules={r.rules}
                not={!!r.not}
              /></div>
              ) : r.id ? (
                <div className={`rule-connect-link ${rules?.length >1? linkColors[(level % 6)]:null }`}><controls.rule
                id={r.id}
                field={r.field}
                value={r.value}
                operator={r.operator}
                parentOperator={r.parentOperator}
                schema={schema}
                parentId={id}
                valueMeta={r.valueMeta}
                translations={translations}
              /></div>
              ) : null}
            </Fragment>
          ))}
      </div>

  );
};

const RuleGroupHeader=({level,onRemoveGroup})=>{
  return<div className='ruleGroup-title'>
  <div className='group-filter-title-content'>
    <span className='group-filter-icon'>
      <span className='group-filter-level-icon'>{level}</span>
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M10 0V4.375H3.125V0H10ZM9.375 0.625H3.75V3.75H9.375V0.625ZM3.125 5.625H10V10H3.125V5.625ZM3.75 9.375H9.375V6.25H3.75V9.375ZM0.532227 3.21777L2.31934 5L0.532227 6.78223L0.0927734 6.34277L1.43066 5L0.0927734 3.65723L0.532227 3.21777Z" fill="#000000"></path></svg></span>
    <span className='group-filter-title'>Group Filter</span>
  </div>
  <div>
    <button className="rule-remove " title="Remove group" onClick={onRemoveGroup}>
      <span className="ms-Icon ms-Icon--Delete"></span>
    </button>
  </div>
</div>
}

RuleGroup.displayName = 'RuleGroup';
