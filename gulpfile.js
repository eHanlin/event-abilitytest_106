const gulp = require('gulp')
const fs = require('fs')
const del = require('del')
const Q = require('q')
const util = require('gulp-template-util')

let libTask = dest => {
  return () => {
    let packageJson = JSON.parse(
      fs.readFileSync('package.json', 'utf8').toString()
    )
    if (!packageJson.dependencies) {
      packageJson.dependencies = {}
    }
    let webLibModules = []
    for (var module in packageJson.dependencies) {
      webLibModules.push('node_modules/' + module + '/**/*')
    }
    return gulp
      .src(webLibModules, {
        base: 'node_modules/'
      })
      .pipe(gulp.dest(dest))
  }
}

let copyStaticTask = dest => {
  return () => {
    return gulp
      .src(
        ['src/**/*.html', 'src/img/**/*', 'src/css/**/*.css', 'src/lib/**/*'], {
          base: 'src'
        }
      )
      .pipe(gulp.dest(dest))
  }
}

let cleanTask = () => {
  return del(['dist', ''])
}

gulp.task('lib', libTask('src/lib'))
gulp.task('build', ['style', 'lib'])

gulp.task('package', () => {
  let deferred = Q.defer()
  Q.fcall(() => {
    return util.logPromise(cleanTask)
  }).then(() => {
    return Q.all([
      util.logStream(libTask('dist/lib')),
      util.logStream(copyStaticTask('dist'))
    ])
  })

  return deferred.promise
})
