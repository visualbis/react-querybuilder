import React from "react";
import { RuleGroupType, Field } from "./types";
export interface IProps {
    query?: RuleGroupType;
    fields: Field[];
    getOperators?(field: string): Field[];
    getValueEditorType?(field: string, operator: string): 'text' | 'select' | 'checkbox' | 'radio';
    getInputType?(field: string, operator: string): string;
    onQueryChange(query: RuleGroupType): void;
}
export declare const QueryGenerator: React.FC<IProps>;
