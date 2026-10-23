/**
 * Local development runner for the blog (`npm start`).
 *
 * Replaces a Gemfile/Rakefile-style workflow. Requires Node plus a globally
 * installed `jekyll`. Does nothing when NODE_ENV=production.
 *
 * Steps (all kicked off together at the bottom of this file):
 *   1. Clean build output (_site, .sass-cache, main.min.js)
 *   2. Concatenate + minify js/utils/*.js into js/main.min.js (plus its .map source map). Both
 *      files are committed, so commit them together. Rebuilds automatically when js/utils/ changes.
 *   3. Start `jekyll serve --watch` and a Browsersync server on _site/
 *
 * CSS vendor prefixing is intentionally absent: the few prefixes still needed
 * are written by hand in _sass/.
 */

import { exec } from "child_process";
import browserSync from "browser-sync";
import fs from "fs";
import { minify } from "terser";

const mainJsFile = "main.min.js";
const jsDir = "./js/utils/";

// Removes generated output so each run starts from a clean build.
function deleteSiteDirectory() {
  const siteDir = "./_site";
  const sassCacheDir = "./.sass-cache";

  // Delete _site directory
  fs.rm(siteDir, { recursive: true, force: true }, (err) => {
    if (err) {
      console.error(`Error deleting directory ${siteDir}: ${err}`);
    } else {
      console.log(`Directory ${siteDir} has been deleted`);
    }
  });

  // Delete .sass-cache directory
  fs.rm(sassCacheDir, { recursive: true, force: true }, (err) => {
    if (err) {
      console.error(`Error deleting directory ${sassCacheDir}: ${err}`);
    } else {
      console.log(`Directory ${sassCacheDir} has been deleted`);
    }
  });

  // Delete main.min.js file
  fs.rm(mainJsFile, { force: true }, (err) => {
    if (err) {
      console.error(`Error deleting file ${mainJsFile}: ${err}`);
    } else {
      console.log(`File ${mainJsFile} has been deleted`);
    }
  });
}

// Bundles every .js file in js/utils/ (sorted by name) into js/main.min.js with Terser.
// Throws on failure so callers decide whether to exit (initial build) or carry on (watch rebuild).
// The existing bundle is only overwritten once the new one is ready, so a failed rebuild keeps
// the last good output.
async function concatenateAndMinifyJsFiles() {
  const files = await fs.promises.readdir(jsDir, { withFileTypes: true });
  const jsFiles = files
    .filter((file) => file.isFile() && file.name.endsWith(".js"))
    .sort((a, b) => a.name.localeCompare(b.name));
  if (jsFiles.length === 0) {
    console.log(`No .js files found in ${jsDir}`);
    return;
  }

  // Each file is wrapped in a block so top-level const/let can't collide across files and a missing
  // trailing semicolon in one file can't merge into the next. The opening brace sits on the file's
  // first line so line numbers in the source map match the original files. Vendor scripts that need
  // globals (e.g. Prism) live in js/lib/ and are loaded separately, not bundled.
  const sources = {};
  for (const file of jsFiles) {
    // Normalize line endings so the embedded sources don't depend on git's autocrlf setting
    const code = (await fs.promises.readFile(`${jsDir}${file.name}`, "utf8")).replace(/\r\n/g, "\n");
    sources[`utils/${file.name}`] = `{${code}\n}`;
  }
  // Source paths are relative to the map's location (js/). The original code is embedded in the map
  // so DevTools can show it without the files having to be served.
  const result = await minify(sources, {
    sourceMap: { filename: mainJsFile, url: `${mainJsFile}.map`, includeSources: true },
  });

  await fs.promises.writeFile(`./js/${mainJsFile}`, result.code);
  await fs.promises.writeFile(`./js/${mainJsFile}.map`, result.map);
  console.log(`Files ${mainJsFile} and ${mainJsFile}.map have been created`);
}

// Rebuilds the bundle whenever a file in js/utils/ changes (debounced). Jekyll picks up the new
// js/main.min.js and Browsersync reloads, so no restart is needed. Errors are logged, not fatal.
function watchJsFiles() {
  let timer;
  fs.watch(jsDir, (_event, filename) => {
    if (filename && !filename.endsWith(".js")) return;
    clearTimeout(timer);
    timer = setTimeout(() => {
      concatenateAndMinifyJsFiles().catch((err) => console.error(`JS rebuild failed: ${err}`));
    }, 100);
  });
}

// Starts the Jekyll watcher, then Browsersync (after 1s) to live-reload on file changes.
function runJekyllCommand() {
  exec("jekyll serve --watch", (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });

  setTimeout(() => {
    // Initialize Browsersync
    browserSync.init({
      server: {
        baseDir: "_site/",
      },
    });

    // Use Browsersync reload function as a listener to Jekyll build events
    browserSync.watch("**/*.*").on("change", browserSync.reload);
  }, 1000);
}

async function main() {
  deleteSiteDirectory();

  try {
    await concatenateAndMinifyJsFiles();
  } catch (err) {
    console.error(`JS build failed: ${err}`);
    process.exit(1);
  }

  watchJsFiles();
  runJekyllCommand();

  console.log("Running in development mode. Development tasks have been executed");
}

if (process.env.NODE_ENV !== "production") {
  main();
}
