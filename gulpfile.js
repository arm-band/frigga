/**
 * gulp task
 *
 * @author    アルム＝バンド
 * @copyright Copyright (c) アルム＝バンド
 */

/* ************************

************************
[
    {
        "id": "releasenote",
        "title": "ver.X.X.X",
        "time": "yyyy/mm/dd",
        "thumbnail": "hoge.jpg",
        "excerpt": "piyo",
        "content": "<p>fugafuga</p>"
    }
}
************************

というjsonから

************************
---
layout: article.ejs
title: verX.X.X
url: releasenote_verX_X_X-yyyymmdd
date: yyyy-mm-dd hh:ii:ss
thumbnail: "hoge.jpg"
excerpt: piyo
---

fugafuga

************************

という形式のmdファイルを生成する

* ********************** */

var gulp = require("gulp");
//file operation
var fs = require("fs");
//html2md
var html2md = require("html-md-2");

//path difinition
var dir = {
  src: {
    json      : './json/'
  },
  dist: {
    md        : './md/'
  }
};

//ファイル名(任意指定)
var filename = "news.json";


//jsonファイル取得
//ejs内で使用するパラメータ
var getFile = (fn) => {
    return JSON.parse(fs.readFileSync(dir.src.json + fn, { encoding: "UTF-8" }).replace(/\r|\n|\t/g, ""));
}

var replaceGlb = (str, before, after) => {
  return str.split(before).join(after);
}

//新着情報専用のejsタスク
gulp.task("json2md", done => {
    var jsonFile = getFile(filename);
    var cnt = jsonFile.length; //ファイル名カウンタ

    for(var i = 0; i < jsonFile.length; i++) { //昇順に処理
        if(cnt >= 0) { //cntは0を下回らないものとする
            var frontMatter = {};
            frontMatter["layout"] = "article.ejs"; //固定テンプレ
            Object.keys(jsonFile[i]).forEach(function (key) {
                if(key !== "id" && key !== "time") { //キーがidとtime以外
                    frontMatter[key] = jsonFile[i][key]; //そのまま処理
                }
                else {
                    if(key === "id") { //idのとき
                        frontMatter["url"] = jsonFile[i]["id"] + "_" + replaceGlb(jsonFile[i]["title"], ".", "_") + "-" + replaceGlb(jsonFile[i]["time"], "/", "");
                    }
                    else if(key === "time") { //timeのとき
                        frontMatter["date"] = replaceGlb(jsonFile[i]["time"], "/", "-") + " 00:00:00";
                    }
                }
            });
            //本文生成
            var content = "---\r\n"; //Front-matter開始
            content += "layout: " + frontMatter["layout"] + "\r\n";
            content += "title: " + frontMatter["title"] + "\r\n";
            content += "url: " + frontMatter["url"] + "\r\n";
            content += "date: " + frontMatter["date"] + "\r\n";
            content += "thumbnail: " + frontMatter["thumbnail"] + "\r\n";
            content += "excerpt: " + frontMatter["excerpt"] + "\r\n";
            content += "---\r\n\r\n"; //Front-matter終了+改行
            content += html2md(jsonFile[i]["content"]) + "\r\n";
            //ファイル書き込み
            fs.writeFileSync(`${dir.dist.md}${cnt}.md`, content);
            cnt--; //デクリメント
        }
        else {
            console.log("カウンタがマイナスになりました。jsonの構造を確認してください。");
        }
    }

    done();
});

//gulpのデフォルトタスクで諸々を動かす
gulp.task("default", gulp.series("json2md"));