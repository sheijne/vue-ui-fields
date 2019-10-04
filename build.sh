
rm -rf dist 

./node_modules/.bin/babel src/rules -d dist/rules
cp -r src/index.js dist/index.js
cp -r src/form dist/form
cp -r src/messages dist/messages
cp -r src/plugins dist/plugins
