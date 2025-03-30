export interface IProperty {
  type: string;
  description: string;
  [key: string]: any;
}

export interface ISchema extends Record<string, unknown> {
  type: string;
  properties: {
    [key: string]: IProperty;
  };
  required?: string[];
}
