import { ToolFn } from "../../types";
import { taskToolDefinition, fizzbuzzTaskTool } from "./task";
import { rangeToolDefinition, rangeTool } from "./range";
import { nextToolDefinition, nextTool } from "./next";

export const tools = [
  taskToolDefinition,
  rangeToolDefinition,
  nextToolDefinition,
];

export const toolImplementations: Record<string, ToolFn> = {
  task: fizzbuzzTaskTool,
  range: rangeTool,
  next: nextTool,
};
