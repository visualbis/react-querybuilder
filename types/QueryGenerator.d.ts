import React from "react";
import { RuleGroupType, Field, NameLabelPair, ValueEditorType } from "./types";
import "../../css/query-builder.css";
export interface IProps {
    query?: RuleGroupType;
    fields: Field[];
    getOperators?(field: string): Field[];
    getValueEditorType?(field: string, operator: string): ValueEditorType;
    getInputType?(field: string, operator: string): string;
    getPlaceHolder?(field: string, operator: string): string;
    onQueryChange(query: RuleGroupType, prop?: string, ruleId?: string): void;
    getValues?(field: string, operator: string): NameLabelPair[];
    showAddGroup?: boolean;
    removeIconatStart?: boolean;
    showAddRule?: boolean;
    showCombinatorsBetweenRules?: boolean;
    enableNormalView?: boolean;
    onAdvancedClick?(): void;
    getSelectedColumn?(): string;
    customRenderer?(): any;
}
export declare const QueryGenerator: React.FC<IProps>;
