#!/usr/bin/env node

import fs from "fs"

class Js2n8n {
  static input = "$input.first().json";
  static node = {
    "parameters": {
      //"mode": "runOnceForEachItem", //omit for ALL
      "jsCode": "" //
    },
    "id": "",
    "name": "message",
    "type": "n8n-nodes-base.code",
    "typeVersion": 2,
    "position": [
      0,
      0
    ]
  }
  output = {
    "meta": {},
    "nodes": [],
    "connections": {},
    "pinData": {}
  }
  constructor() {
    const fd = fs.readFileSync("./sample/sample.js", { encoding: "utf-8", flag: "r" });

    const node = Js2n8n.node;
    node.parameters.jsCode = this.replace(fd);
    this.output.nodes[0] = node;
    return this;
  }

  toString() 
  {
    return this.output;
  }

  replace(code) 
  {
    const lines = code.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      lines[i] = this.rImports(line);

    }
    return lines.join('\n')
  }

  rImports(line) 
  {
    if (line.match(/ *import +/)) {
      const [varName, imprt] = line.replace(/ *import +(\w+) +from +([\"\']{1})(\w+)([\"\']{1})/, "$1|$3").split("|")
      if(!varName || !imprt)
      {
        return line;
      }
      line = line.replace(/ *import +[a-zA-Z0-9]* +from +["'a-zA-Z0-9]*/, `const ${varName} = require("${imprt.replace(/;| /g, '')}")`)
      console.log(line)
    }
    return line;
  }

}

const js2n8n = new Js2n8n();
console.log(JSON.stringify(js2n8n.toString()));






