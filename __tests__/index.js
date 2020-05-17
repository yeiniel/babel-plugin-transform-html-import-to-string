import path from 'path';

import pluginTester from 'babel-plugin-tester'

import transformHtmlImportToString from '..'

pluginTester({
  plugin: transformHtmlImportToString,
  pluginName: 'transform-html-import-to-string',
  fixtures: path.join(__dirname, '__fixtures__'),
  tests: {
    /* your test objects */
  },
})