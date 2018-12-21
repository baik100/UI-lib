'use strict';

var gulp = require('gulp'),
    gulpsass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    include = require('gulp-html-tag-include'),
    minify = require('gulp-minify'),
    spritesmith = require('gulp.spritesmith');

/*=============================
@Path 정의
==============================*/
var paths = {
    input: 'src/**/*',
    output: 'dist/',
    styles: {
        input: 'src/css/**/*.{scss,sass}',
        output: 'dist/css/'
    },
    images: {
        input: 'src/img/*',
        output: 'dist/img/'
    },
    html: {
        input: 'src/**/*.html',
        output: 'dist/'
    },
    sprites: {
        input: 'src/img/sprite/*.{png,gif}',
        output: 'dist/img/',
        sassinput: 'src/sass/'
    },
    js: {
        input : 'src/js/**/*.{js}',
        output : 'dist/js/'
    }
};

//browser-sync
gulp.task('bs', function(){
    browserSync.init({
        server : {baseDir : paths.html.output},
        startPath:'/html/index.html'
    });
    gulp.watch(paths.html.input, ['html-include']);
    gulp.watch(paths.styles.output + "*.css").on('change', reload);
    gulp.watch(paths.js.input + "*.*",['move_js']);
    gulp.watch(paths.images.input, ['move_img']);
    gulp.watch(paths.sprites.input, ['sprite']);
});

// sass
gulp.task('sass',function(){
    return gulp.src(paths.styles.input)
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(gulpsass.sync().on('error', gulpsass.logError))
        .pipe(gulpsass({outputStyle: 'compact'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.styles.output));
});

// html-include
gulp.task('html-include', function() {
    return gulp.src([
        paths.html.input,
        '!src/html/temp.html'
    ])
        .pipe(include())
        .pipe(gulp.dest(paths.html.output));
});

gulp.task('move_js',function(){
    gulp.src(paths.js.input+'*.js')
        .pipe(gulp.dest(paths.js.output))
        .on('finish',reload);
});

gulp.task('move_img',function(){
    gulp.src([
        paths.images.input+'*',
        '!src/img/sprite/',
        '!src/img/sprite//**'
    ])
        .pipe(gulp.dest(paths.images.output))
        .on('finish',reload);
});

gulp.task('watch', ['html-include','sass','move_js'], function() {
    gulp.watch(paths.html.input, ['html-include']);
    gulp.watch(paths.styles.input, ['sass']);
    gulp.watch(paths.js.input, ['move_js']);
});

gulp.task('default',['watch','bs']);

// Sprites task - create sprite image
gulp.task('sprite', function () {
    var spriteData = gulp.src(paths.sprites.input)
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: '_sprite.scss',
            cssTemplate: 'sprite.css.handlebars',
            padding: 10
        }));
    spriteData.css.pipe(gulp.dest(paths.sprites.sassinput));
    spriteData.img.pipe(gulp.dest(paths.sprites.output));
});