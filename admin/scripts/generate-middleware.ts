import path from 'path';
import requireContext from '../src/server/utils/requireContext';
import fs from 'fs';
const generateMiddleware = () => {
  const middlewareContext = requireContext(path.resolve('src/server/middleware'), true, /\.ts$/);
  let importTexts = ''
  const output = ` export default {
    ${Object.keys(middlewareContext).filter((key) => {
    return fs.existsSync(`src/server/middleware/${key}`)
  }).filter((key) => key !== 'index.ts' && key !== 'output.ts').map((key) => {
    const moduleName = key?.replaceAll('/', '').replace('.ts', '')
    const fileName = key.replace('.ts', '')
    importTexts = importTexts + `import ${moduleName} from './${fileName}'; \n`
    return `'${key}':  ${moduleName}`
  })}
  }`
  fs.writeFileSync('src/server/middleware/output.ts', importTexts + output)
}

generateMiddleware()

// const deleteFolderRecursive = (path: string) => {
//   if (fs.existsSync(path)) {
//     fs.readdirSync(path).forEach(function (file, index) {
//       var curPath = path + '/' + file;
//       if (fs.lstatSync(curPath).isDirectory()) {
//         // recurse
//         deleteFolderRecursive(curPath);
//       } else {
//         // delete file
//         fs.unlinkSync(curPath);
//       }
//     });

//     // dont remove root folder
//     // if (!rootPath && !path.endsWith(rootPath)) {
//     //   fs.rmdirSync(path);
//     // }
//   }
// };

// deleteFolderRecursive('src/pages/admin/models');
// deleteFolderRecursive('src/server/graphql/models');
// deleteFolderRecursive('src/graphql/generated');
