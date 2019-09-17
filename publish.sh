#!/bin/sh
  
git add src
git commit -m "bug fixes"
npm version patch
npm publish
