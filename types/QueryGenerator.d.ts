import React from "react";
import { RuleGroupType, Field, NameLabelPair, ValueEditorType } from "./types";
import "./query-builder.less";
export interface IProps {
    query?: RuleGroupType;
    fields: Field[];
    getOperators?(field: string): Field[];
    getValueEditorType?(field: string, operator: string): ValueEditorType;
    getInputType?(field: string, operator: string): string;
    getPlaceHolder?(field: string, operator: string): string;
    onQueryChange(query: RuleGroupType): void;
    getValues?(field: string, operator: string): NameLabelPair[];
    showAddGroup?: boolean;
    showAddRule?: boolean;
    showCombinatorsBetweenRules?: boolean;
    enableNormalView?: boolean;
    onAdvancedClick?(): void;
}
export declare const QueryGenerator: React.FC<IProps>;
