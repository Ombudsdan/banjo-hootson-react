import fs from 'node:fs';
import semanticRelease from 'semantic-release';

(async () => {
  try {
    const result = await semanticRelease();
    if (result && result.nextRelease) {
      const { nextRelease } = result;
      console.log(`Published ${nextRelease.type} release: v${nextRelease.version}`);
      if (process.env.GITHUB_OUTPUT) {
        fs.appendFileSync(process.env.GITHUB_OUTPUT, `published=true\n`);
        fs.appendFileSync(process.env.GITHUB_OUTPUT, `version=${nextRelease.version}\n`);
      }
    } else {
      console.log('No release published.');
      if (process.env.GITHUB_OUTPUT) {
        fs.appendFileSync(process.env.GITHUB_OUTPUT, `published=false\n`);
      }
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
