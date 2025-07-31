import { ToolFn } from "../../types";
import { fizzbuzzToolDefinition, fizzbuzzValidationTool } from "./fizzbuzz";

export const tools = [fizzbuzzToolDefinition];

export const toolImplementations: Record<string, ToolFn> = {
  fizzbuzz: fizzbuzzValidationTool,
};
