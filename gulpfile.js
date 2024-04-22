const { src, dest, series, watch } = require("gulp");
const del = require("del");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const cp = require("child_process");
const browserSync = require("browser-sync").create();

async function clean() {
  try {
    console.log("just deleted the directories");
    return await del(["./_site", ".sass-cache", "./js/**/*.min.js"]);
  } catch (error) {
    console.error(`Error in clean: ${error}`);
  }
}

async function scripts() {
  try {
    return src(["./js/**/*.js"]).pipe(concat("main.min.js")).pipe(uglify()).pipe(dest("./js"));
  } catch (error) {
    console.error(`Error in scripts: ${error}`);
  }
}

function jekyll(done) {
  try {
    cp.spawn("jekyll", ["build"], { stdio: "inherit" }).on("close", done);
  } catch (error) {
    console.error(`Error in jekyll: ${error}`);
  }
}

function serve(done) {
  try {
    browserSync.init({
      server: "./_site",
    });
    done();
  } catch (error) {
    console.error(`Error in serve: ${error}`);
  }
}

function reload(done) {
  try {
    browserSync.reload();
    done();
  } catch (error) {
    console.error(`Error in reload: ${error}`);
  }
}

const watcher = () => {
  try {
    watch(
      ["./_sass/*", "./js/*/*.js", "*.html", "./_includes/*html", "./_layouts/*.html", "./_posts/*"],
      series(scripts, jekyll, reload),
    );
    console.error("watching...");
  } catch (error) {
    console.error(`Error in watcher: ${error}`);
  }
};

exports.default = series(clean, scripts, jekyll, serve, watcher);
exports.jekyll = jekyll;
exports.serve = serve;
exports.watch = watcher;
exports.reload = reload;
