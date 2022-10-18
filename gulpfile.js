const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const less = require('gulp-less');
const concat = require("gulp-concat");
const ts = require('gulp-typescript');
const del = require('del');

const babelrc = require('./.babelrc.js');

sass.compiler = require('node-sass');

function cleanDist() {
	return del([
		'./dist',
		'./css',
		'./assets',
	])
}

function compileBabel() {
	return gulp.src(['src/**/*.tsx','src/**/*.ts'])
		.pipe(babel())
		.pipe(gulp.dest('dist/react'))
}

function compileBabelPreact() {
	const babelRcPreact = {
		...babelrc,
		plugins: babelrc.plugins.concat([
			[
				"module-resolver",
				{
					"root": [
						"."
					],
					"alias": {
						"react": "preact-compat",
						"react-dom": "preact-compat",
						"create-react-class": "preact-compat/lib/create-react-class",
						"react-dom-factories": "preact-compat/lib/react-dom-factories"
					}
				}
			]
		])
	}
	return gulp.src(['src/**/*.tsx', 'src/**/*.ts'])
		.pipe(babel(babelRcPreact))
		.pipe(gulp.dest('dist/preact'))
}

function buildTypes() {
	var tsProject = ts.createProject('./tsconfig.json', {
		declaration: true,
	});

	var tsResult = tsProject.src()
		.pipe(tsProject());

	return tsResult.dts.pipe(gulp.dest('./dist/types'));
}

function concatTypes() {
	return gulp
		.src([
			'dist/types/**/*.d.ts'
		])
		.pipe(concat("index.d.ts"))
		.pipe(gulp.dest("./dist"));
}

function compileSCSS() {
	return gulp.src('src/styles/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('css'));
}

function compileLess() {
    return gulp.src(`./src/*.less`).pipe(less()).pipe(gulp.dest(`./css`));
}

function copyCSS() {
	return gulp.src(['src/styles/*.css'])
		.pipe(gulp.dest('css/'))
}

function copyIcons() {
	return gulp.src(['src/icons/*.svg', 'src/icons/*.png'])
		.pipe(gulp.dest('assets/'))
}

const compileCSS = gulp.series(compileLess, copyCSS);
const copyAssets = gulp.series(copyIcons);
const compileTS = gulp.series(compileBabel, compileBabelPreact);
// const generateTypes = gulp.series(buildTypes, concatTypes);

exports.build = gulp.series(cleanDist, compileCSS, compileTS, copyAssets);