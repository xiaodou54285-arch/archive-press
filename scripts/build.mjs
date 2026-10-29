import {readFile,mkdir,writeFile} from 'node:fs/promises';import path from 'node:path';import {buildFiles,demoProject} from '../src/core.js';
const [input,out='dist']=process.argv.slice(2);if(!input){console.log('Usage: npm run build -- project.local.json dist\nDemo: npm run build -- --demo dist');process.exit(1)}
const p=input==='--demo'?demoProject():JSON.parse(await readFile(input,'utf8')),files=buildFiles(p),root=path.resolve(out);
for(const [name,content] of Object.entries(files)){const dest=path.join(root,name);await mkdir(path.dirname(dest),{recursive:true});await writeFile(dest,content,'utf8')}console.log('Built 3 portable HTML files in '+root);
