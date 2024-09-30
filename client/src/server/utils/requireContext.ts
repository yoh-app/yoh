const fs = require('fs')
const path = require('path')

const getExactDir = (dir) => {
  if (path.isAbsolute(dir)) {
    return dir
  }

  const parentModule = module.parent
  if (parentModule) {
    return path.join(parentModule.path, dir)
  }
  return path.join(__dirname, dir)
}

/**
 * @param {String} directory 要查找的目录
 * @param {String} useSubdirectories: 是否查找子目录
 * @param {RegExp} regExp: 要匹配文件的正则
 */
export default function requireContext(directory, useSubdirectories, regExp, rootDir) {
  const fileModule = {}
  const _dir = getExactDir(directory)
  const files = fs.readdirSync(_dir)

  files.forEach((item) => {
    const fullPath = path.join(_dir, item)
    const stat = fs.statSync(fullPath)

    // 需要获取子目录
    if (useSubdirectories && stat.isDirectory()) {
      console.log(path.join(_dir, item))
      Object.assign(
        fileModule,
        requireContext(path.join(_dir, item), useSubdirectories, regExp, rootDir || _dir)
      )
    } else if (stat.isFile() && regExp.test(fullPath)) {
      fileModule[path.normalize(path.relative(rootDir || _dir, fullPath))] = require(fullPath)
    }
  })
  return fileModule
}
// module.exports = requireContext
