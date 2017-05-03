var gulp    = require('gulp');
var zip     = require('gulp-zip');
var fs      = require('fs');
var clean   = require('gulp-clean');
var through = require('through2')

const MAX_ARCHIVES_TO_KEEP = 3;
const DEST_PATH = "dist/";

const FILES = [
    'src/**/*',
    'jody/**/*'
];

function increaseName(archives, callback) {

    var tArchives = archives.reverse();

    tArchives.forEach(function(listItem, index) {

        var tIndex = (tArchives.length - 1) - index;

        var tOldPath = DEST_PATH + listItem;
        var tNewPath = DEST_PATH + (tIndex + 1) + "_archive.zip";

        fs.renameSync(tOldPath, tNewPath);
    });

    callback();
}

// delete all unnecessary Archives
function deleteOlderArchives(chunk, enc, cb) {

    var archives = fs.readdirSync(DEST_PATH);

    if (archives.length >= MAX_ARCHIVES_TO_KEEP) {
        for (var i = MAX_ARCHIVES_TO_KEEP; i <= archives.length; i++) {

            var tIndex = i - 1;

            var tPath = DEST_PATH + archives[tIndex];

            gulp.src(tPath, {read:false})
                .pipe(clean({force: true}));
        }
    }

    cb(null, chunk)
}

gulp.task('backup', function() {

    fs.readdir(DEST_PATH, function(err, archives) {
        if (err === null) {
            increaseName(archives, function() {
                gulp.src(FILES)
                .pipe(zip('0_archive.zip'))
                .pipe(through.obj(deleteOlderArchives))
                .pipe(gulp.dest(DEST_PATH))
            })
        }
        else {
            console.log("ERROR: Readdir Error:" + err);
        }
    });
});

// Default Task
gulp.task('default', ['backup']);

gulp.task('dummy', function() {

    for (var i = 0; i < 3; i++) {
        gulp.src(FILES)
        .pipe(zip(i + '_archive.zip'))
        .pipe(gulp.dest(DEST_PATH))
    }
});
