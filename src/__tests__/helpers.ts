import { readFileSync, existsSync } from "fs";
import { join } from "path";

export const readFile = (filePath: string): string => {
  const absolutePath = join(process.cwd(), filePath);

  if (!existsSync(absolutePath)) {
    throw new Error("The expected file does not exist");
  }

  return readFileSync(absolutePath, "utf8");
};

export const packageJsonScripts = (file: string): string | {} => {
  try {
    const json = JSON.parse(file);
    return json.scripts;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return {};
  }
};