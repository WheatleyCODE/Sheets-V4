import { JsxAttribute, Node, Project, SyntaxKind } from 'ts-morph';

// * Start command:
// * npx ts-node ./scripts/ts-morph/remove-feature.ts "Название фичи" "Действие (off/on)"
// * Example: npx ts-node ./scripts/ts-morph/remove-features.ts isTemplateRating on

// * Example works 1:
// * const rating = toggleFeatures({
// *     name: 'isTemplateRating',
// *     on: () => <TemplateRating />,
// *     off: () => <div />,
// *   });

// ! Run: npm run remove-features isTemplateRating on

// * Result 1:
// * const rating = <TemplateRating />;

// * Example works 2 JSX:
// * return {
// *   <ToggleFeatures name="isTemplateRating" on={<div>on</div>} off={<div>off</div>} />
// * }

// ! Run: npm run remove-features isTemplateRating on

// * Result 2 JSX:
// * return {
// *   <div>on</div>
// * }

// * Settings
const toggleFunctionName = 'toggleFeatures';
const toggleComponentName = 'ToggleFeatures';
const toggleOnAttributeName = 'on';
const toggleOffAttributeName = 'off';
const toggleNameAttributeName = 'name';
const sourceFiles = ['src/**/*.ts', 'src/**/*.tsx'];

const removedFeatureName = process.argv[2];
const featureState = process.argv[3];

if (!removedFeatureName) {
  throw new Error('Укажите название фича-флага');
}

if (!featureState) {
  throw new Error(`Укажите состояние фичи (${toggleOnAttributeName} или ${toggleOffAttributeName})`);
}

if (featureState !== toggleOnAttributeName && featureState !== toggleOffAttributeName) {
  throw new Error(`Некорректное значение состояния фичи (${toggleOnAttributeName} или ${toggleOffAttributeName})`);
}

const project = new Project({});

const addSourceFilesPaths = (paths: string[]) => {
  paths.forEach((path) => {
    project.addSourceFilesAtPaths(path);
  });
};

addSourceFilesPaths(sourceFiles);

const files = project.getSourceFiles();

const isToggleFunction = (node: Node) => {
  let isToggleFeatures = false;

  node.forEachChild((child) => {
    if (child.isKind(SyntaxKind.Identifier) && child.getText() === toggleFunctionName) {
      isToggleFeatures = true;
    }
  });

  return isToggleFeatures;
};

const isToggleComponent = (node: Node) => {
  const identifier = node.getFirstDescendantByKind(SyntaxKind.Identifier);

  return identifier?.getText() === toggleComponentName;
};

const replaceToggleFunction = (node: Node) => {
  const objectOptions = node.getFirstDescendantByKind(SyntaxKind.ObjectLiteralExpression);

  if (!objectOptions) return;

  const offFunctionProperty = objectOptions.getProperty(toggleOffAttributeName);
  const onFunctionProperty = objectOptions.getProperty(toggleOnAttributeName);

  const featureNameProperty = objectOptions.getProperty(toggleNameAttributeName);

  const onFunction = onFunctionProperty?.getFirstDescendantByKind(SyntaxKind.ArrowFunction);
  const offFunction = offFunctionProperty?.getFirstDescendantByKind(SyntaxKind.ArrowFunction);
  const featureName = featureNameProperty?.getFirstDescendantByKind(SyntaxKind.StringLiteral)?.getText().slice(1, -1);

  if (featureName !== removedFeatureName) return;

  if (featureState === toggleOnAttributeName) {
    node.replaceWithText(onFunction?.getBody().getText() ?? '');
  }

  if (featureState === toggleOffAttributeName) {
    node.replaceWithText(offFunction?.getBody().getText() ?? '');
  }
};

const getAttributeNodeByName = (jsxAttributes: JsxAttribute[], name: string) => {
  return jsxAttributes.find((node) => node.getText().startsWith(name));
};

const getReplacedComponent = (attribute?: JsxAttribute) => {
  const value = attribute?.getFirstDescendantByKind(SyntaxKind.JsxExpression)?.getExpression()?.getText();

  if (value?.startsWith('(')) {
    return value.slice(1, -1);
  }

  return value;
};

const replaceComponent = (node: Node) => {
  const attributes = node.getDescendantsOfKind(SyntaxKind.JsxAttribute);

  const onAttribute = getAttributeNodeByName(attributes, toggleOnAttributeName);
  const offAttribute = getAttributeNodeByName(attributes, toggleOffAttributeName);

  const featureNameAttribute = getAttributeNodeByName(attributes, toggleNameAttributeName);
  const featureName = featureNameAttribute?.getFirstDescendantByKind(SyntaxKind.StringLiteral)?.getText()?.slice(1, -1);

  if (featureName !== removedFeatureName) return;

  const offValue = getReplacedComponent(offAttribute);
  const onValue = getReplacedComponent(onAttribute);

  if (featureState === toggleOnAttributeName && onValue) {
    node.replaceWithText(onValue);
  }

  if (featureState === toggleOffAttributeName && offValue) {
    node.replaceWithText(offValue);
  }
};

files.forEach((sourceFile) => {
  sourceFile.forEachDescendant((node) => {
    if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
      return replaceToggleFunction(node);
    }

    if (node.isKind(SyntaxKind.JsxSelfClosingElement) && isToggleComponent(node)) {
      return replaceComponent(node);
    }
  });
});

project.save();
