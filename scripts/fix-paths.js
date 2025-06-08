#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fix paths in dist/index.html
const indexPath = path.join(__dirname, '../dist/index.html');
if (fs.existsSync(indexPath)) {
  let content = fs.readFileSync(indexPath, 'utf8');
  
  // Fix logo and manifest paths
  content = content
    .replace(/href="logo\.png"/g, 'href="/ORN/logo.png"')
    .replace(/href="manifest\.json"/g, 'href="/ORN/manifest.json"');
  
  fs.writeFileSync(indexPath, content);
  console.log('✅ Fixed paths in index.html');
}

// Fix paths in dist/manifest.json
const manifestPath = path.join(__dirname, '../dist/manifest.json');
if (fs.existsSync(manifestPath)) {
  let manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  
  // Update paths
  manifest.scope = '/ORN/';
  manifest.start_url = '/ORN/';
  manifest.icons = manifest.icons.map(icon => ({
    ...icon,
    src: '/ORN/logo.png'
  }));
  
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log('✅ Fixed paths in manifest.json');
}