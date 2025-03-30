import { readFileSync } from 'fs';
import { join } from 'path';
import { ISchema } from 'src/types/schemas';

export function getSchema(name: string): ISchema {
  const basePath = process.cwd();
  const schemaPath = join(basePath, 'src/schemas', `${name}.schema.json`);
  const schema = readFileSync(schemaPath, 'utf8');
  return JSON.parse(schema) as ISchema;
}
