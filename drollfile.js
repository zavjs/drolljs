const droll = require('./droll');
const path = require('path');
const toPath = (filename) => path.join(__dirname, filename);

const minify = (content) => content.replace(/\s/g,'');

droll.task('watch:js', () => {
  droll.watch(toPath('./src/styles.css'), (change) => {
    droll
      .src(toPath('./src/styles.css'))
      .pipe(minify)
      .dist(toPath('./dist/styles.min.css'));        
  });
});

droll.execute('watch:js');