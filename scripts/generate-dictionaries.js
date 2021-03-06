/* eslint-disable @typescript-eslint/no-var-requires */
const { join } = require('path');
const { readFileSync, readdirSync, writeFileSync } = require('fs');

const DICTIONARIES_DIR = join(__dirname, '..', 'dictionaries', 'clean');
const DATA_FILE_PATH = join(
  __dirname,
  '..',
  'packages',
  'frontend',
  'src',
  'data.json'
);
const DICTIONARY_LANG_MATCH_REGEXP = /^dictionary\.([a-z]+)\.txt$/;

const fileList = readdirSync(DICTIONARIES_DIR);
const dictionaryLangMap = fileList.reduce((map, filename) => {
  const lang = filename.match(DICTIONARY_LANG_MATCH_REGEXP);
  const dictionary = readFileSync(join(DICTIONARIES_DIR, filename))
    .toString()
    .trim()
    .split('\n');
  if (lang && lang.length > 0) {
    map[lang[1]] = dictionary;
  }
  return map;
}, {});

writeFileSync(DATA_FILE_PATH, JSON.stringify(dictionaryLangMap, null, 0));
