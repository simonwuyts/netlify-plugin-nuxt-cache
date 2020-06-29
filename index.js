const path = require('path');

const getCacheDirs = (constants) => [
  constants.PUBLISH_DIR,
  path.normalize(`${constants.PUBLISH_DIR}/../.nuxt`),
];

module.exports = {
  async onPreBuild({ constants, utils }) {
    // print a helpful message if the publish dir is misconfigured
    if (process.cwd() === constants.PUBLISH_DIR) {
      utils.build.failBuild(
        `Gatsby sites must publish the public directory, but your site’s publish directory is set to “${constants.PUBLISH_DIR}”. Please set your publish directory to your Gatsby site’s public directory.`,
      );
    }

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
