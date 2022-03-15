const express = require('express');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');

const app = express();

const templatesPath = path.join(__dirname, "templates");

app.use("/templates", express.static(templatesPath));

function pathToTemplatesPath(...paths) {
    paths[paths.length - 1] = paths[paths.length - 1] + ".html"
    return path.join(templatesPath, ...paths)
}

function renderTemplateFile(args, ...templatePaths) {
    return ejs.render(
        fs.readFileSync(pathToTemplatesPath(...templatePaths), "utf-8"),
        args,
        {},
    )
}

app.get("/", function(request, response){
    response.send(renderTemplateFile({}, "index"));
});

app.get("/messages", function(request, response){
    response.send(renderTemplateFile({}, "messages"));
});

app.get("/login", function(request, response){
    response.send(renderTemplateFile({}, "login"));
});

console.log("All Allways ok , see http://127.0.0.1:3000/")

app.listen(3000);


