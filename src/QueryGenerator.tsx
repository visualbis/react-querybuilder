
import React,{ Component } from "react";
import {QueryBuilder} from "./QueryBuilder";
import {RuleGroupType,Field,NameLabelPair,ValueEditorType} from "./types";
import "./query-builder.less";

export interface IProps{
    query?: RuleGroupType;   
    fields: Field[];
    getOperators?(field: string): Field[];
    getValueEditorType?(field: string, operator: string): ValueEditorType;
    getInputType?(field: string, operator: string): string;
    getPlaceHolder?(field: string, operator: string): string;
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
    getPlaceHolder,
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
        getPlaceHolder={getPlaceHolder}   
        getValueEditorType  ={getValueEditorType}
        showCombinatorsBetweenRules={showCombinatorsBetweenRules}
        showAddGroup={showAddGroup}
        showAddRule={showAddRule}
        resetOnOperatorChange={false}   
        getValues={getValues}    
      /></div>)
 }