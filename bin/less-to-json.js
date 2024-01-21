#!/usr/bin/env node

const program = require("commander")
const fs = require("fs")
const path = require("path")
const castLessVarsToJson = require('cast-less-vars-to-json');
const importReg = /@import\s+["']([\.\/\w-]+)["']/g;

function getContent(file) {
  // read file content
  let content = fs.readFileSync(file, "utf8");

  // replace import statement with file content
  let dir = path.dirname(file);
  for(let imp of content.matchAll(importReg)){
    let impfile = path.resolve(dir, imp[1]);
    let imp_content = getContent(impfile);
    content = content.replace(imp[0], imp_content)
  }

  return content;
}

program.parse(process.argv)

const sourcePath = program.args[0]
const fileName = program.args[1]

let lessInput = getContent(sourcePath, 'utf8')
//console.log("Read ", sourcePath)
//console.log(lessInput)

const nameProjectionFunc = (name) => name.substr(1);
let promise = castLessVarsToJson(lessInput, { nameProjectionFunc })
  .then(result => {
    var resulttxt = JSON.stringify(result, null, '\t');
    //console.log("Writing", resulttxt, "to", fileName)

    fs.writeFile(fileName, resulttxt, function(err, fd) {
      if (err) {
        console.log(err)
      }
    })
  })
