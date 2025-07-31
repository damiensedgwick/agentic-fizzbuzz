import { ToolFn } from "../../types";
import { buzzToolDefinition, buzzValidationTool } from "./buzz";

export const tools = [buzzToolDefinition];

export const toolImplementations: Record<string, ToolFn> = {
  buzz: buzzValidationTool,
};
