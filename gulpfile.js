var gulp = require('gulp'),
    del = require('del'),
    clean = require('gulp-clean'),
    eslint = require('gulp-eslint'),
    ngHtml2js = require('gulp-ng-html2js'),
    inject = require('gulp-inject'),
    concat = require('gulp-concat'),
    angularFilesort = require('gulp-angular-filesort'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    ngAnnotate = require('gulp-ng-annotate'),

    runSequence = require('run-sequence'),
    fs = require('fs'),
    exec = require('child_process').exec,
    merge = require('merge-stream');

gulp.task('templates', function() {
  return gulp.src('public/pages/*.html', { base: 'public' })
    .pipe(ngHtml2js({
      moduleName: 'app.templates',
      declareModule: false,
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('public/dist/'));
});

gulp.task('lint', function() {
  return gulp.src([
      'public/*.js',
      'public/**/*.js',
      '!public/deps/*.js',
    ])
    .pipe(eslint({ useEslintrc: true }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('clean', function() {
  return gulp.src('public/dist', { read: false })
    .pipe(clean({ force: true }));
});

gulp.task('inject', ['templates'], function() {
  return gulp.src('public/index.html')
    .pipe(inject(
        gulp.src(
          'public/deps/*.js',
          { read: true })
        .pipe(angularFilesort()),
        { name: 'deps', relative: true }))
    .pipe(inject(
        gulp.src([
          'public/*.js',
          'public/**/*.js',
          '!public/deps/*.js',
        ], { read: true })
        .pipe(angularFilesort()),
        { name: 'app', relative: true }))
    .pipe(gulp.dest('public/'));
});

gulp.task('dist:compile', ['templates'], function() {
  return gulp.src([
      'public/dist/templates.js',
      'public/*.js',
      'public/**/*.js',
      '!public/**/*_test.js',
      '!public/deps/*.js',
    ], { read: true })
    .pipe(angularFilesort())
    .pipe(concat('app.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('public/dist/'));
});

gulp.task('dist:deps', function() {
  return gulp.src('public/deps/*.js')
    .pipe(angularFilesort())
    .pipe(concat('deps.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/dist/'));
});

gulp.task('dist:css', function() {
  return gulp.src('public/*.js')
    .pipe(concat('style.css'))
    .pipe(gulp.dest('public/dist/'));
});

gulp.task('dist:inject', ['dist:compile', 'dist:deps', 'dist:css'], function() {
  return gulp.src('public/index.html')
    .pipe(inject(
        gulp.src('public/dist/deps.js', { read: false }),
        { name: 'deps', ignorePath: 'public/dist' }))
    .pipe(inject(
        gulp.src('public/dist/app.js', { read: false }),
        { name: 'app', ignorePath: 'public/dist' }))
    .pipe(gulp.dest('public/dist/'));
});

gulp.task('dist', function(cb) {
  runSequence(
    ['clean', 'lint'],
    ['dist:inject'],
    cb);
});

gulp.task('default', function(cb) {
  runSequence(
    ['clean'],
    ['inject'],
    cb);
});
