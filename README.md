# gulp-no-css-media

remove unused css media condition 

> purpose   

Sometimes I use some frameworks contains responsive media . but I don't need to use in my production enviroment.
So before publish , I prefer to remove them from my project . so there is this module.

> useage

```javascript
var gulp = require('gulp'),
    noCssMedia = require('gulp-no-css-media');
gulp.task('bootstrap',function(){
    var leftOpt = ['(min-width: 1200px)','(min-width: 768px)'];
    //编译bootstrap样式并去除响应式代码，由于会影响sourceMap，所以本地调试时建议不去除@Media
    gulp.src('./src/static/bootstrap.css')
        .pipe(noCssMedia(leftOpt))
        .pipe(gulp.dest('./src/static/style/'));
});
```
it will remove all the `@media` condition in your file. so you can config those medias you want to left.
just config then to an Array.
```javascript
var leftOpt = ['(min-width: 1200px)','(min-width: 768px)'];
noCssMedia(leftOpt)
```


have fun