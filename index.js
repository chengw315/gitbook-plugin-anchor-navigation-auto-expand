var cheerio = require('cheerio');
var _ = require('underscore');
var slug = require('github-slugid');
var config = require('./config');

// insert anchor link into section
var insertAnchors = function(page) {

    console.info("insertAnchors start");
    var $ = cheerio.load(page.content);
    console.info("insertAnchors 1");

    var array = [];
    $(':header').each(function(i, elem) {
        var header = $(elem);
        var id = header.attr('id') || slug(header.text());
        console.info(id);
        console.info(elem.tagName);
        switch(elem.tagName){
            case "h1":
                array.push({
                    name: header.text(),
                    url: id,
                    children: []
                });
                break;
            case "h2":
                if (array.length < 1) {
                    array.push({
                        name: header.text(),
                        url: id,
                        children: []
                    });
                } else {
                    array[array.length - 1].children.push({
                        name: header.text(),
                        url: id,
                        children: []
                    });
                }
                break;
            case "h3":
                if (array.length < 1) {
                    array.push({
                        name: header.text(),
                        url: id,
                        children: []
                    });
                } else if (array[array.length-1].children.length < 1){
                    array[array.length - 1].children.push({
                        name: header.text(),
                        url: id,
                        children: []
                    });
                } else {
                    array[array.length-1].children[array[array.length-1].children.length-1].children.push({
                        name: header.text(),
                        url: id,
                        children: []
                    });
                }
                break;
            default:
                break;
        }
    });
    console.info("insertAnchors 2");

    if(array.length == 0){
        console.warn("insertAnchors no h");
        page.content = $.html();
        return;
    }

    let autoExpand = config.config.autoExpand;
    console.info(autoExpand);

    var html = "<div id='anchors-navbar' onmouseenter='navMouseEnter()' onmouseleave='navMouseLeave()'><i class=\"fa fa-navicon\"></i><ul class='dirList'";
    if(autoExpand) {
        html += " style=\"display:block\"";
    } else {
        html += " style=\"display:none\"";
    }
    html += ">";
    for(var i=0;i<array.length;i++){
        html += "<li><a href='#"+array[i].url+"'>"+array[i].name+"</a></li>";
        if(array[i].children.length>0){
            html += "<ul class='dirList'";
            if(autoExpand) {
                html += " style=\"display:block\"";
            } else {
                html += " style=\"display:none\"";
            }
            html += ">";
            for(var j=0;j<array[i].children.length;j++){
                html += "<li><a href='#"+array[i].children[j].url+"'>"+array[i].children[j].name+"</a></li>";
                if(array[i].children[j].children.length>0){
                    html += "<ul class='dirList'";
                    if(autoExpand) {
                        html += " style=\"display:block\"";
                    } else {
                        html += " style=\"display:none\"";
                    }
                    html += ">";
                    for(var k=0;k<array[i].children[j].children.length;k++){
                        html += "<li><a href='#"+array[i].children[j].children[k].url+"'>"+array[i].children[j].children[k].name+"</a></li>";
                    }
                    html += "</ul>"
                }
            }
            html += "</ul>"
        }
    }
    html += "</ul></div><a href='#"+array[0].url+"' id='goTop'><i class='fa fa-arrow-up'></i></a>";

    console.info(html);
    page.content = html + $.html();

    console.info("add anchor over");

};

module.exports = {
    book: {
        assets: ".",
        css: [ "plugin.css" ],
        js: [ "plugin.js" ]

    },
    hooks: {
        "init": function () {
            config.init(this);
        },
        "page": function (page) { // before html generation
            insertAnchors(page)
            return page;
        }
    }
};