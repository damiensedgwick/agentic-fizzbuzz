import { ToolFn } from "../../types";
import { fizzToolDefinition, fizzValidationTool } from "./fizz";

export const tools = [fizzToolDefinition];

export const toolImplementations: Record<string, ToolFn> = {
  fizz: fizzValidationTool,
};
