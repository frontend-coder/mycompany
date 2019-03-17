var gulp                  = require('gulp');
var sass                  = require('gulp-sass');
// npm i gulp-sass --save-dev
var browserSync           = require('browser-sync').create();
// npm i browser-sync --save-dev
var plumber               = require('gulp-plumber');
// npm install gulp-plumber --save-dev
var cssnano               = require('gulp-cssnano');
// npm install cssnano --save-dev
var notify                = require("gulp-notify");
// npm install gulp-notify --save-dev
var growl                 = require('gulp-notify-growl');
// npm install gulp-notify-growl --save-dev
var autoprefixer          = require('gulp-autoprefixer');
// npm install --save-dev gulp-autoprefixer
var rename                = require('gulp-rename');
// npm install gulp-rename --save-dev
var gulpif                = require('gulp-if');
// npm install gulp-if --save-dev  пока не задействован
var sourcemaps = require('gulp-sourcemaps');
 // npm install gulp-sourcemaps --save-dev
var del                   = require('del');
// npm i del --save-dev
var concat                = require('gulp-concat');
// npm install --save-dev gulp-concat для обьединения js файлов
var uglify                = require('gulp-uglifyjs');
// npm i --save-dev gulp-uglifyjs
var gulpUtil = require('gulp-util');
var ftp   = require('gulp-ftp');
var vinyFTP = require( 'vinyl-ftp' );
// npm install --save-dev gulp-ftp
// npm install --save-dev gulp-util
//npm i vinyl-ftp --save-dev
// npm install --save-dev gulp-ftp vinyl-ftp
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
// npm install --save-dev gulp-iconfont gulp-iconfont-css
// эти два плагина отвечают за создания иконочных шрифтов из SVG


var critical = require('critical').stream;
//$ npm install --save critical
//  var criticalCss = require('gulp-critical-css');
// этот пакет тестировать          $ npm install --save-dev gulp-critical-css


var imagemin              = require('gulp-imagemin');
var pngquant              = require('imagemin-pngquant');
// npm i gulp-imagemin imagemin-pngquant --save-dev
var imageminJpegRecompress = require('imagemin-jpeg-recompress');
//$ npm install --save-dev imagemin-jpeg-recompress

var cache                 = require('gulp-cache');
// npm i gulp-cache --save-dev
var spritesmith = require('gulp.spritesmith');
// npm i gulp.spritesmith --save-dev



var svgSprite = require('gulp-svg-sprite');
  var svgmin = require('gulp-svgmin');
//  npm i gulp-svg-sprite --save-dev
// npm i gulp-svgmin --save-dev

var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
// npm install --save-dev gulp-iconfont gulp-iconfont-css
// эти два плагина отвечают за создания иконочных шрифтов из SVG


// три строки переменные для генерации фавикона
var realFavicon = require ('gulp-real-favicon');
var fs = require('fs');
var FAVICON_DATA_FILE = 'faviconData.json';
// npm install gulp-real-favicon --save-dev
// переменая которая контролирует создание (true) или отключение (false) карты кода в файле
var isDevelopmant = true;
// переменная для создания шрифтов Iconfont
var runTimestamp      = Math.round(Date.now()/1000);

// все задачи
gulp.task('sass', function () {
return gulp.src('app/scss/**/*.+(scss|sass|css)')
 .pipe(plumber({
     errorHandler: notify.onError({
            message: function(error) {
                return error.message;
            }})
 }))

.pipe(gulpif (isDevelopmant, sourcemaps.init({loadMaps:true})))
.pipe(sass())
.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade:true}))
 // .pipe(cssnano())
.pipe(rename({suffix: '.min'}))
.pipe(gulpif (isDevelopmant, sourcemaps.write(".")))
.pipe(gulp.dest('app/css'))
.pipe(browserSync.stream());
});

gulp.task('css-libs', ['sass'], function () {
    return gulp.src('app/css/libs.css')
    .pipe(cssnano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', function () {
 return gulp.src([
'app/libs/jquery/jquery.min.js',
'app/libs/nicescroll/jquery.nicescroll.min.js',
'app/libs/magnific-popup/owl.carousel.min.js',
'app/libs/jquery.PageScroll2id/jquery.PageScroll2id.min.js',
'app/libs/owlcarousel/jquery.magnific-popup.min.js',
'app/libs/jquery/common.js'
   ])
 .pipe(concat('libs.min.js'))
 // .pipe(uglify())
 .pipe(gulp.dest('app/js'))
 .pipe(browserSync.stream());
});



gulp.task('img', function(){
return gulp.src('app/images/**/*')

.pipe(cache(imagemin({
 intarlaced:true,
 progresive:true,
 svgoPlugins: [{removeViewbox:false}],
 use:[pngquant()],
   optimizationLevel: 3
})))
.pipe(gulp.dest('dist/images'));
});


gulp.task('images', function () {
  return gulp.src('app/images/**/*.{png,jpg}')
      .pipe(imagemin([
          imagemin.jpegtran({progressive: true}),
          imageminJpegRecompress({
            loops: 5,
            min: 65,
            max: 70,
            quality: 'medium'
          }),
          imagemin.optipng({optimizationLevel: 3}),
          pngquant({quality: '65-70', speed: 5})
      ]))
      .pipe(gulp.dest('dist/images'));
});









// таск для того чтобы очишвть кеш картинок(запускать в ручную)
gulp.task('clear', function () {
    return cache.clearAll();
});


gulp.task('browser-sync', ['scripts', 'css-libs'],  function(){
 browserSync.init({
     server:{
         baseDir:'./app'
     },
 open:true,
     notify:false
 });
});


gulp.task('watch', function(){
gulp.watch('app/scss/**/*.scss', ['sass']);
gulp.watch('app/libs/**/*.js', ['scripts']);
gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
gulp.watch('app/js/**/*.js', browserSync.reload);   // Наблюдение за JS файлами в папке js
gulp.watch('app/css/**/*.css', browserSync.reload);   // Наблюдение за css файлами в папке css
});
gulp.task('default', ['browser-sync', 'watch']);


gulp.task('clean', function() {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('critical', function () {
    return gulp.src('app/*.html')
        .pipe(critical({base: 'dist/',
            inline: true,
             css: ['app/css/libs.min.css',
             'app/css/main.min.css']}))
        .on('error', function(err) { gulpUtil.log(gutil.colors.red(err.message)); })
        .pipe(gulp.dest('dist/'));
});

// сборка проекта
gulp.task('build', ['clean', 'images', 'css-libs', 'scripts', 'critical'], function(){

var buildCss = gulp.src(['app/css/libs.min.css','app/css/main.min.css'])
.pipe(concat('libs.min.css'))
 // .pipe(cssnano())
.pipe(gulp.dest('dist/css'));

var buildfonts = gulp.src('app/fonts/**/*')
.pipe(gulp.dest('dist/fonts'));

var buildJs = gulp.src('app/js/**/*')
.pipe(gulp.dest('dist/js'));

// var buildHtml = gulp.src('app/*.html')
// .pipe(gulp.dest('dist/'));

var buildhtml5shiv = gulp.src('app/libs/html5shiv/**/*')
.pipe(gulp.dest('dist/libs/html5shiv'));

});



// в каталог svgsprites закинуть все картинки svg котоыре будут спрайтом с расщиоторые sprites
gulp.task('svgsprite', function () {

// Basic configuration example
  config = {
    shape: {
      dimension: { // Set maximum dimensions
        maxWidth: 50,
        maxHeight: 50
      }
    },
     spacing: { // Add padding
        padding: 10
      },
    mode: {
      css: {
        render: {
          css: true
        }
      }
    }
  };

gulp.src('app/svgsprites/*.svg', { cwd: '' })
      .pipe(svgmin({
            plugins: [{
                removeDoctype: false
            }, {
                removeComments: false
            }, {
                cleanupNumericValues: {
                    floatPrecision: 2
                }
            }, {
                convertColors: {
                    names2hex: false,
                    rgb2hex: false
                }
            }]
        }))
       .pipe(plumber())
  .pipe(svgSprite(config))
  .on('error', function(error) {
    /* Do some awesome error handling ... */
  })
  .pipe(gulp.dest('app/images/icons'));
});


// ниже размещена команда для ручного создания спрайтов
gulp.task('sprite', function () {
  var spriteData = gulp.src('app/pngsprites/*.png')
  .pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: '_sprite.css',
    padding: 120,
    algorithm:'top-down',
    cssTemplate: 'app/sprites.handlebars'
  }));
    spriteData.img.pipe(gulp.dest('app/images/')); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest('app/sprites/')); // путь, куда сохраняем стили
});



// Generate the icons.
gulp.task('genfav', function(done) {
    realFavicon.generateFavicon({
        masterPicture: 'app/favicon/basic.png',
        dest: 'app/images/favicon/',
        iconsPath: 'images/favicon',
        design: {
            ios: {
                pictureAspect: 'backgroundAndMargin', //Add a solid, plain background to fill the transparent regions.
                backgroundColor: '#ffffff',
                margin: '14%',
                assets: {
                    ios6AndPriorIcons: false,
                    ios7AndLaterIcons: false,
                    precomposedIcons: false,
                    declareOnlyDefaultIcon: true
                }
            },
            desktopBrowser: {},
            windows: {
                pictureAspect: 'whiteSilhouette', //Use a white silhouette version of the favicon
                backgroundColor: '#da532c',
                onConflict: 'override',
                assets: {
                    windows80Ie10Tile: false,
                    windows10Ie11EdgeTiles: {
                        small: false,
                        medium: true,
                        big: false,
                        rectangle: false
                    }
                }
            },
            androidChrome: {
                pictureAspect: 'noChange',
                themeColor: '#da532c',
                manifest: {
                    display: 'standalone',
                    orientation: 'notSet',
                    onConflict: 'override',
                    declared: true
                },
                assets: {
                    legacyIcon: false,
                    lowResolutionIcons: false
                }
            },
            safariPinnedTab: {
                pictureAspect: 'silhouette',
                themeColor: '#da532c'
            }
        },
        settings: {
            scalingAlgorithm: 'Mitchell',
            errorOnImageTooSmall: false
        },
        markupFile: FAVICON_DATA_FILE
    }, function() {
        done();
    });
});

// Inject the favicon markups in your HTML pages.
gulp.task('injectfav', function() {
    return gulp.src(['app/*.html'])
        .pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
        .pipe(gulp.dest('app'));
});

// Check for updates on RealFaviconGenerator
gulp.task('checkfavupdate', function(done) {
    var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
    realFavicon.checkForUpdates(currentVersion, function(err) {
        if (err) {
            throw err;
        }
    });
});




// важные файлы размещены в каталоге templates/
// нужно использовать SVG большого размера хорошего качества



gulp.task('iconfont', function(){
  return gulp.src(['app/svgforicon/*.svg'])
     .pipe(iconfontCss({
      fontName: fontName,
      path: 'app/templates/_icons.css',
      targetPath: '../../scss/_icons.css',
      fontPath: '../fonts/icons/'
    }))
    .pipe(iconfont({
      fontName: 'myfont', // required
      prependUnicode: true, // recommended option
      formats: ['ttf', 'eot', 'woff'], // default, 'woff2' and 'svg' are available
      timestamp: runTimestamp, // recommended to get consistent builds when watching files
    }))
      .on('glyphs', function(glyphs, options) {
        // CSS templating, e.g.
        console.log(glyphs, options);
      })
    .pipe(gulp.dest('app/fonts/icons/'));
});




// npm install --save-dev gulp-ftp vinyl-ftp
//FTP: ftp://vh146.timeweb.ru
//Логин: cc63120
//Пароль: j7X4Y36Od5Zm


gulp.task( 'ftp', function () {
    var conn = vinyFTP.create( {
     host:     'vh146.timeweb.ru',
        user:     'cc63120',
        password: 'j7X4Y36Od5Zm',
        parallel: 10,
        log:      gulpUtil.log
    } );

    var globs = [
        // 'src/**',
        // 'css/**',
        // 'js/**',
        // 'fonts/**',
        // 'index.html'
        'dist/**'
    ];

    // using base = '.' will transfer everything to /public_html correctly
    // turn off buffering in gulp.src for best performance

    return gulp.src( globs, { base: './dist/', buffer: false } )
        .pipe( conn.newerOrDifferentSize( '/public_html' ) )// only upload newer files
       .pipe( conn.dest( '/public_html' ) );

} );

// Как подключиться по SSH

