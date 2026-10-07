import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {render} from '../.build/ssr/prerender.js';
const template=await readFile('dist/index.html','utf8');
for(const page of ['home','about']){
const folder=page==='home'?'dist':'dist/about'; await mkdir(folder,{recursive:true});
let html=template.replace('<div id="root"></div>',`<div id="root">${render(page)}</div>`);
if(page==='about') html=html.replace('Autumn Ops — A clearer way to run your business','About Autumn Ops — Practical tools. Connected operations.');
await writeFile(`${folder}/index.html`,html);
}
await writeFile('dist/404.html','<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page not found — Autumn Ops</title><body style="background:#f8f6f0;color:#233d32;font:18px system-ui;padding:10vw"><h1>That page isn’t here.</h1><p>Let’s get you back to Autumn Ops.</p><a href="/">Return home →</a></body></html>');
