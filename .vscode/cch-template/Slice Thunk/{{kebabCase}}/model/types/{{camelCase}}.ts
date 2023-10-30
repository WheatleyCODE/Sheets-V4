export interface I{{pascalCase}} {
  a: any;
}

export interface I{{pascalCase}}Schema extends IReduxSchema {
  {{camelCase}}: I{{pascalCase}};
}
