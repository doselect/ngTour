var gulp = require('gulp')
var uglify = require('gulp-uglifyjs')

gulp.task('uglify', function() {
  gulp.src('src/ngTour.js')
    .pipe(uglify('ng-tour.min.js'))
    .pipe(gulp.dest('dist'))
})
