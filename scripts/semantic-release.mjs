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
    // Handle the common case when a tag already exists (e.g., after history rewrites/squashes)
    const stderr = String(error?.stderr || '');
    const escapedCommand = String(error?.escapedCommand || '');
    const alreadyExists = /tag 'v?\d+\.\d+\.\d+' already exists/.test(stderr);

    if (alreadyExists) {
      // Try to extract the version from the stderr first, then from the command
      let version = null;
      const m1 = stderr.match(/tag 'v?(\d+\.\d+\.\d+)' already exists/);
      if (m1 && m1[1]) version = m1[1];
      if (!version) {
        const m2 = escapedCommand.match(/git tag v?(\d+\.\d+\.\d+)/);
        if (m2 && m2[1]) version = m2[1];
      }

      console.warn(
        `[semantic-release] Tag already exists. Proceeding without failing. Using version: ${version ?? 'unknown'}`
      );
      if (process.env.GITHUB_OUTPUT) {
        // Treat as effectively published so downstream jobs (e.g., Docker publish) can continue
        // Use the extracted version if available; otherwise, we still mark published=false
        if (version) {
          fs.appendFileSync(process.env.GITHUB_OUTPUT, `published=true\n`);
          fs.appendFileSync(process.env.GITHUB_OUTPUT, `version=${version}\n`);
        } else {
          fs.appendFileSync(process.env.GITHUB_OUTPUT, `published=false\n`);
        }
      }
      // Exit successfully
      process.exit(0);
    }

    console.error(error);
    process.exit(1);
  }
})();
