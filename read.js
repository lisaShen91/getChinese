const fs = require("fs");
const path = require("path");
const filePath = path.resolve();
const exceptDir = ['.git','.cache','node_modules'];

//读取当前目录下的文件夹及文件
function getFileList(path){
    let filesList = [];
    readFile(path,filesList);
    return filesList;
}

//遍历读取文件
function readFile(path,filesList){
    let files = fs.readdirSync(path);
    files.forEach(function(file){
        let states = fs.statSync(path+'/'+file);   
        if(states.isDirectory()){
            let index = exceptDir.indexOf(file);
            if(index == -1){
                readFile(path+'/'+file,filesList);
            }
        } else { 
           let obj = new Object();
           obj.size = states.size;
           obj.name = file;
           obj.path = path+'/'+file;
           filesList.push(obj);
        }
    });
}
let allFiles = getFileList(filePath);
let reg = /[\u4e00-\u9fa5]+/g;
let allWords = [];
allFiles.map(function(item){
    let data = fs.readFileSync(item.path, 'utf8');
    let result = data.match(reg);
    if(result){
        allWords = allWords.concat(result);
    }
});

Array.prototype.remDub = Array.prototype.remDub || function () {
    return [...new Set(this)];
};

let finalResult = allWords.remDub();
console.log('中文词数：'+finalResult.length);
fs.writeFile(path.join(__dirname, 'words.js'), JSON.stringify(finalResult), function (err) {
    if (err) throw err;
    console.log("success");
});