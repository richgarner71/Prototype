//Import USWDS
const uswds = require("@uswds/compile");

// Include gulp helpers.
const { series, parallel } = require("gulp");

// Include Our tasks.
//
// Each task is broken apart to it's own node module.
// Check out the ./tasks directory for more.
const { noCleanup, noTest } = require("./tasks/flags");
const { buildSprite, buildSpriteStandalone } = require("./tasks/svg-sprite");
const { compileJS, typeCheck } = require("./tasks/javascript");
const { unitTests, sassTests } = require("./tasks/test");
const { lintSass, typecheck } = require("./tasks/lint");
const { build } = require("./tasks/build");
const { release } = require("./tasks/release");
const { watch } = require("./tasks/watch");
const { compileSass } = require("./tasks/sass");
const { cleanDist } = require("./tasks/clean");


//Paths
uswds.paths.src.uswds = './node_modules/@uswds';
uswds.paths.src.sass = './node_modules/@uswds/uswds/packages';
uswds.paths.src.theme = './node_modules/@uswds/uswds/dist/theme';
uswds.paths.src.fonts = './node_modules/@uswds/uswds/dist/fonts';
uswds.paths.src.img = './node_modules/@uswds/uswds/dist/img';
uswds.paths.src.js = './node_modules/@uswds/uswds/dist/js';
uswds.paths.src.projectSass = "./sass";
uswds.paths.dist.js = './assets/uswds/js';
uswds.paths.dist.img = './assets/uswds/images';
uswds.paths.dist.fonts = './assets/uswds/fonts';
uswds.paths.dist.css = './assets/uswds/css';
uswds.paths.dist.theme = './sass';

//Version
uswds.settings.version = 3;

/**
 * *Flags*
 */
exports.noTest = noTest;
exports.noCleanup = noCleanup;

/**
 * *Clean tasks*
 */
exports.cleanDist = cleanDist;

/**
 * *Lint tasks*
 */
exports.lintSass = lintSass;
exports.typecheck = typecheck;
exports.lint = parallel(lintSass, typecheck);

/**
 * *Test tasks*
 * sassTests: Sass unit tests.
 * unitTests: Component unit tests.
 * test: Run all tests.
 */


exports.sassTests = sassTests;
exports.unitTests = unitTests;
exports.test = series(
  typeCheck,
  lintSass,
  sassTests,
  unitTests,
);

/**
 * *Build tasks*
 * buildSprite: Generate new spritesheet based on SVGs in `src/img/usa-icons/`.
 * buildSass: Lint, copy normalize, and compile sass.
 * buildJS: Lint, copy normalize, and compile sass.
 * release: Builds USWDS and returns a zip with sha256 hash and filesize.
 */
exports.buildSpriteStandalone = buildSpriteStandalone;
exports.buildSprite = buildSprite;
exports.compileSass = compileSass;
exports.buildSass = series(lintSass, compileSass);
exports.buildJS = series(typeCheck, compileJS);
exports.buildUSWDS = build;
exports.release = release;
exports.compile = uswds.compile;
exports.init = uswds.init;

/**
 * *Watch task*
 * Builds USWDS and component library, and watches
 * for changes in scss, js, twig, yml, and unit tests.
 */
exports.watch = watch;

// Default Task
exports.default = this.buildUSWDS;
