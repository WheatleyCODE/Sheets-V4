import { Project } from 'ts-morph';

const project = new Project({});

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();

const mainFolders = ['app', 'pages', 'widgets', 'features', 'entities', 'shared'];

const isAbsolute = (value: string): boolean => {
  if (mainFolders.some((folder) => value.startsWith(folder))) {
    return true;
  }

  return false;
};

files.forEach((sourceFile) => {
  const importDeclarations = sourceFile.getImportDeclarations();

  importDeclarations.forEach((importDeclaration) => {
    const value = importDeclaration.getModuleSpecifierValue();

    if (isAbsolute(value)) {
      importDeclaration.setModuleSpecifier(`@/${value}`);
    }
  });
});

project.save();
