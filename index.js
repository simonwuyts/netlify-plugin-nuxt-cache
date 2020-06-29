const path = require('path');

const getCacheDirs = (constants) => [
  constants.PUBLISH_DIR,
  path.normalize(`${constants.PUBLISH_DIR}/../.nuxt`),
];

module.exports = {
  async onPreBuild({ constants, utils }) {
    const cacheDirs = getCacheDirs(constants);

    if (await utils.cache.restore(cacheDirs)) {
      console.log('Found a Nuxt cache.');
    } else {
      console.log('No Nuxt cache found. Building fresh.');
    }
  },
  async onPostBuild({ constants, utils }) {
    const cacheDirs = getCacheDirs(constants);

    if (await utils.cache.save(cacheDirs)) {
      console.log('Stored the Nuxt cache to speed up future builds.');
    } else {
      console.log('No Nuxt build found.');
    }
  },
};
