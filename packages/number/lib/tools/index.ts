import { ToolFn } from "../../types";
import { numberToolDefinition, numberValidationTool } from "./number";

export const tools = [numberToolDefinition];

export const toolImplementations: Record<string, ToolFn> = {
  number: numberValidationTool,
};
