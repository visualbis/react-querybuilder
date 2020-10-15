import React from "react";
import { RuleGroupType, Field, NameLabelPair } from "./types";
export interface IProps {
    query?: RuleGroupType;
    fields: Field[];
    getOperators?(field: string): Field[];
    getValueEditorType?(field: string, operator: string): 'text' | 'select' | 'checkbox' | 'radio' | 'autocomplete';
    getInputType?(field: string, operator: string): string;
    onQueryChange(query: RuleGroupType): void;
    getValues?(field: string, operator: string): NameLabelPair[];
    showAddGroup?: boolean;
    showAddRule?: boolean;
    showCombinatorsBetweenRules?: boolean;
}
export declare const QueryGenerator: React.FC<IProps>;
