#! /usr/bin/env node

var fs = require('fs');
var glob = require('glob');

glob('./static/**/*.vdt', (err, files) => {
    files.forEach((file) => {
        fs.readFile(file, (err, content) => {
            content = content.toString();
            var matches = content.match(/[\u4e00-\u9fa5]+/g);
            if (matches) {
                var str = matches.join('\n');
                fs.writeFile('a', str, {flag: 'a'});
            }
        });
    });
});
