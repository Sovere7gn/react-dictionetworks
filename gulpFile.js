var gulp = require('gulp')
var spsave = require('gulp-spsave')
var cached = require('gulp-cached');
var rename = require('gulp-rename');
const prompt = require('gulp-prompt');
const merge = require('gulp-merge');

var coreOptions = {
    siteUrl: 'https://meralco.sharepoint.com/sites/epepdev/testsite/',
    notification: false,
    // path to document library or in this case the master pages gallery
    // folder: 'SiteAssets/build',**configured individually in the update 08/30/2022
    flatten: false,
};

gulp.task('rename', function () {
    // rename via string
    return gulp.src('./build/index.html')
        .pipe(rename('TestPage.aspx'))
        .pipe(gulp.dest('./build')); // ./dist/main/text/ciao/goodbye.md
});

gulp.task('app-js', () => 
    gulp.src('package.json').pipe(
        prompt.prompt(
            [
                {
                    type: "input",
                    name: "username",
                    message: "Username: "
                },
                {
                    type: "password",
                    name: "password",
                    message: "Password: "
                }
            ],
            (res) => {
                const { username, password } = res;
                const creds = {
                    username,
                    password
                };

                merge(
                    //update homepage
                    gulp.src('./build/TestPage.aspx')
                        .pipe(cached('spFiles'))
                        .pipe(spsave({
                            folder: "SitePages",
                            ...coreOptions
                        }, creds)),
                    //upload build
                    // runs the spsave gulp command on only files the have 
                    // changed in the cached files
                    gulp.src('build/**')
                        .pipe(cached('spFiles'))
                        .pipe(spsave({
                            folder: "SiteAssets/build",
                            ...coreOptions
                        }, creds))
                )
            }
        )
    )
)

gulp.task('deploy', gulp.series('rename', 'app-js'));

gulp.task('default', function () {
    // create an initial in-memory cache of files
    gulp.src('build/**')
        .pipe(cached('spFiles'));

    // watch the src folder for any changes of the files
    gulp.watch(['./build/**'], ['spdefault']);
});