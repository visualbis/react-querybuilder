
import React,{ Component } from "react";
import {QueryBuilder} from "./QueryBuilder";
import {RuleGroupType,Field,NameLabelPair} from "./types"

export interface IProps{
    query?: RuleGroupType;   
    fields: Field[];
    getOperators?(field: string): Field[];
    getValueEditorType?(field: string, operator: string): 'text' | 'select' | 'checkbox' | 'radio';
    getInputType?(field: string, operator: string): string;
    onQueryChange(query: RuleGroupType): void;    
    getValues?(field: string, operator: string):NameLabelPair[];
    showAddGroup?:boolean;
    showAddRule?:boolean;
    showCombinatorsBetweenRules?:boolean;
  }
 interface IState{
 }
 
 export const QueryGenerator: React.FC<IProps> = ({
    onQueryChange,
    query,
    fields=[],
    getOperators,
    getInputType,
    getValueEditorType,
    getValues,
    showAddGroup,
    showAddRule,
    showCombinatorsBetweenRules
   })=>{ 
       
    const generatorCls = !showAddGroup?`query-generator hide-group`:"query-generator";
    return   (<div className={generatorCls}><QueryBuilder
        query={query}
        fields={fields}
        controlClassnames={{ fields: 'form-control' }}
        onQueryChange={onQueryChange}
        getOperators={getOperators}      
        getInputType={getInputType}    
        getValueEditorType  ={getValueEditorType}
        showCombinatorsBetweenRules={showCombinatorsBetweenRules}
        showAddGroup={showAddGroup}
        showAddRule={showAddRule}
        resetOnOperatorChange={false}   
        getValues={getValues}    
      /></div>)
 }