
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
    groupEnabled?:boolean;
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
    groupEnabled
   })=>{ 
       
    const generatorCls = groupEnabled?`query-generator hide-group`:"query-generator";
    return   (<div className={generatorCls}><QueryBuilder
        query={query}
        fields={fields}
        controlClassnames={{ fields: 'form-control' }}
        onQueryChange={onQueryChange}
        getOperators={getOperators}      
        getInputType={getInputType}    
        getValueEditorType  ={getValueEditorType}
        showCombinatorsBetweenRules={true}
        resetOnOperatorChange={false}   
        getValues={getValues}    
      /></div>)
 }