/*
 * @Author: Monve
 * @Date: 2021-11-02 11:40:16
 * @LastEditors: Monve
 * @LastEditTime: 2021-12-10 18:22:10
 * @FilePath: /shopee-openapi-v2/scripts/version-add.js
 */

const execSync = require('child_process').execSync
const fs = require('fs')
const path = require('path')

function get_version() {
  const { version } = require('../package')
  console.log('当前项目版本: ', version)
  const arr = version.split(".");
  console.log(arr)
  const [first, ...other] = arr;
  let new_version = first;
  for (let i = 0; i < other.length - 1; i++) {
    const str = other[i];
    new_version = `${new_version}.${str}`
  }

  const num = Number(other[other.length - 1]) + 1
  new_version = `${new_version}.${num}`
  console.log('新版本号: ', new_version)

  return {
    old_version: version,
    new_version
  }
}

function update_project_version() {
  const file_path = path.join(__dirname, '../package.json')
  console.log('package.json path:', file_path)
  const content = fs.readFileSync(file_path).toString()
  console.log(`"version": "${old_version}",`)
  const new_content = content.replace(`"version": "${old_version}",`, `"version": "${new_version}",`)

  console.log(new_content)

  fs.writeFileSync(file_path, new_content)

  execSync(`git add ${file_path}`)
}

const { old_version, new_version } = get_version();
console.log(old_version, new_version)

update_project_version()

process.exit(0)