import { exec } from "child_process";
import browserSync from "browser-sync";
import fs from "fs";
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import { minify } from "terser";

const mainJsFile = "main.min.js";

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

async function concatenateAndMinifyJsFiles() {
  const jsDir = "./js/utils/";

  try {
    // Delete main.min.js file
    await fs.promises.rm(mainJsFile, { force: true });
    console.log(`File ${mainJsFile} has been deleted`);

    // Concatenate and minify .js files
    const files = await fs.promises.readdir(jsDir, { withFileTypes: true });
    const jsFiles = files.filter((file) => file.isFile() && file.name.endsWith(".js"));
    if (jsFiles.length === 0) {
      console.log(`No .js files found in ${jsDir}`);
      return;
    }

    const concatenatedJs = jsFiles.map((file) => fs.readFileSync(`${jsDir}${file.name}`, "utf8")).join("\n");
    const result = await minify(concatenatedJs);
    const minifiedJs = result.code;

    const outputDir = "./js/";
    const outputFile = `${outputDir}${mainJsFile}`;

    await fs.promises.writeFile(outputFile, minifiedJs);
    console.log(`File ${mainJsFile} has been created`);
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

function runJekyllCommand() {
  exec("jekyll serve --watch", (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);

    // Start BrowserSync
    browserSync.init({
      server: {
        baseDir: "_site/",
      },
    });

    // Watch for changes in the source files and reload the browser
    browserSync.watch("./_site/*.*").on("change", browserSync.reload);
  });

  // Initialize Browsersync
  browserSync.init({
    server: {
      baseDir: "./_site/",
    },
  });

  // Use Browsersync reload function as a listener to Jekyll build events
  browserSync.watch("**/*.*").on("change", browserSync.reload);
}

function autoprefixCssFiles() {
  const cssDir = "./_site/css/";
  fs.readdir(cssDir, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${cssDir}: ${err}`);
      return;
    }

    files.forEach((file) => {
      if (file.endsWith(".css")) {
        const filePath = `${cssDir}${file}`;
        fs.readFile(filePath, (err, css) => {
          if (err) {
            console.error(`Error reading file ${filePath}: ${err}`);
            return;
          }

          postcss([autoprefixer({ overrideBrowserslist: [">1%"] })])
            .process(css, { from: filePath, to: filePath })
            .then((result) => {
              fs.writeFile(filePath, result.css, (err) => {
                if (err) console.error(`Error writing file ${filePath}: ${err}`);
              });
            });
        });
      }
    });
  });
}

deleteSiteDirectory();

concatenateAndMinifyJsFiles();

runJekyllCommand();

autoprefixCssFiles();
