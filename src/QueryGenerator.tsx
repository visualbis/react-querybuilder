

import React from "react";
import {QueryBuilder} from "./QueryBuilder";
import {RuleGroupType,Field,NameLabelPair,ValueEditorType} from "./types";
//import "./query-builder.less";
import "../../css/query-builder.css";

export interface IProps{
    query?: RuleGroupType;   
    fields: Field[];
    getOperators?(field: string): Field[];
    getValueEditorType?(field: string, operator: string): ValueEditorType;
    getInputType?(field: string, operator: string): string;
    getPlaceHolder?(field: string, operator: string): string;
    onQueryChange(query: RuleGroupType, prop?: string, ruleId?: string): void;    
    getValues?(field: string, operator: string):NameLabelPair[];
    showAddGroup?:boolean;
    removeIconatStart?:boolean;
    showAddRule?:boolean;
    showCombinatorsBetweenRules?:boolean;
    enableNormalView?:boolean;
    onAdvancedClick?():void;
    getSelectedColumn?():string;
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
    removeIconatStart,
    showAddRule,
    showCombinatorsBetweenRules,
    enableNormalView,
    onAdvancedClick,
    getSelectedColumn
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
        enableNormalView={enableNormalView}
        onAdvancedClick={onAdvancedClick}
        showAddGroup={showAddGroup}
        removeIconatStart={removeIconatStart}
        showAddRule={showAddRule}
        resetOnOperatorChange={true} 
        getValues={getValues}   
        getSelectedColumn={getSelectedColumn} 
      /></div>)
 }