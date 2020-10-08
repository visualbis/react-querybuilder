
import React,{ Component } from "react";
import {QueryBuilder} from "./QueryBuilder";
import {Field, ValueEditorType} from "./types"
 interface IProp{
    handleQueryChange:any;
    query:any;
    fields:any[],
    showCombinatorsBetweenRules:boolean,
    showAddGroup?:boolean
 }
 interface IState{
 }
 const operators: any = {
     "number":[
        { name: "notEqual", label: "Not equal" },
        { name: "lessThan", label: "Less than" },
        { name: "lessThanOrEquals", label: "Less than or equals" },
        { name: "greaterThan", label: "Greater Than" },
        { name: "greaterThanOrEquals", label: "Greater Than or equals" },
        { name: "equals", label: "Equals" },
        { name: "inRange", label: "In range" }
     ],
     "text":[
        { name: 'contains', label: 'contains' },
        { name: 'beginsWith', label: 'begins with' },
        { name: 'endsWith', label: 'ends with' },
        { name: 'doesNotContain', label: 'does not contain' },
        { name: 'doesNotBeginWith', label: 'does not begin with' },
        { name: 'doesNotEndWith', label: 'does not end with' }
     ]
 }
 export const QueryGenerator: React.FC<IProp> = ({ handleQueryChange,
    query,
    fields=[],
    showCombinatorsBetweenRules,
    showAddGroup=true})=>{
        const fieldType:any = {};
       
        fields.forEach((item)=>{
           fieldType[item.name] = item.type;

        });
    const getOperators = (field: string):Field[]=>{
        switch(fieldType[field]){
        case "number":
             return operators.number;
        case "text":
            return operators.text;
         default:
             return operators.number;
        }
     }
    const getInputType = (field:string, operator:string):string=>{
         return fieldType[field];
     }
     
 const getValueEditorType = (field:string, operator:string): ValueEditorType => {    
       return 'text';
   };
    const generatorCls = `query-generator ${showAddGroup?"":"hide-group"}`;
    return   (<div className={generatorCls}><QueryBuilder
        query={query}
        fields={fields}
        controlClassnames={{ fields: 'form-control' }}
        onQueryChange={handleQueryChange}
        getOperators={getOperators}      
        getInputType={getInputType}    
        getValueEditorType  ={getValueEditorType}
        showCombinatorsBetweenRules={showCombinatorsBetweenRules}
        resetOnOperatorChange={false}
       
      /></div>)
 }