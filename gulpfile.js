const { src, dest, series, watch } = require("gulp");
const del = require("del");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const cp = require("child_process");
const browserSync = require("browser-sync").create();

function clean() {
  return del(["./_site", ".sass-cache", "./js/**/*.min.js"]);
}

function scripts() {
  return src(["./js/**/*.js"]).pipe(concat("main.min.js")).pipe(uglify()).pipe(dest("./js"));
}

function jekyll(done) {
  cp.spawn("jekyll", ["build"], { stdio: "inherit" }).on("close", done);
}

function serve(done) {
  browserSync.init({
    server: "./_site",
  });
  done();
}

function reload(done) {
  browserSync.reload();
  done();
}

const watcher = () => {
  watch(
    ["./_sass/*", "./js/*/*.js", "*.html", "./_includes/*html", "./_layouts/*.html", "./_posts/*"],
    series(scripts, jekyll, reload),
  );
};

exports.default = series(clean, scripts, jekyll, serve, watcher);
exports.jekyll = jekyll;
exports.serve = serve;
exports.watch = watcher;
exports.reload = reload;
