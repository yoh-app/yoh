import fs from 'fs';

const deleteFolderRecursive = (path: string) => {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function (file, index) {
      var curPath = path + '/' + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });

    // dont remove root folder
    // if (!rootPath && !path.endsWith(rootPath)) {
    //   fs.rmdirSync(path);
    // }
  }
};

deleteFolderRecursive('src/pages/admin/models');
deleteFolderRecursive('src/server/graphql/models');
deleteFolderRecursive('src/graphql/generated');
