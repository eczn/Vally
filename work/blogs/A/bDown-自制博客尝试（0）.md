{
    "title": "bDown - 自制博客尝试（0）",
    "date": "2016-07-22 23:47:18 ",
    "tags": "md js blog",
    "category": "blog"
}
------

<center style="margin-top: -2em;">
我什么都喜欢自制哇！
</center>

<!--more--> 

---

# 初衷
　　虽然hexo是挺好用的，但是每次都要 `./update.sh` ，然后滚条很慢，而且也不能实时预览。 
　　当然能独立的搞出一个博客当然是极强势的，不过比起造轮子，我更喜欢站在巨人的肩膀上编程。（使用各种库）
　　本博客暂命名为 bB ( bB is bB blog )
　　bB是摆脱github运行的，后台应该是php的（暂定），可以在后台markdown写博文，然后在前台就会显示了，一切都在网页进行，而且有预览功能，此外，可以直接利用服务器资源做图床（很难的样子）。

---

# bB是怎么样的？

## 前端部分

> 第三方的：
> jquery.min.js
> Parser.js
> highlight.min.js

> 自造的
> bDown.js 
> bDown.css
> markdown.css

## 前端需要的后台支持

> .md file push and pop
> pic store

---

# HyperDown - md2html
　　用到了 github上面的HyperDown 里面的格式化工具 Parser.js。



``` js
// Parser.js 食用方法： 
var parser = new HyperDown, 
	html = parser.makeHtml("# hello,world"); // 这时候变量html里面存有html标签集

document.write( html );
```

　　但是这样子得到的Markdown是没有样式的，需要样式的话得自行编写markdown.css。

---

# highlight.js - 代码高亮工具

## 食用方法

``` js
var i = 0;
for (i=0;i<$('code').length;i++  ){
	hljs.highlightBlock( $('code')[i] ); // 把每个code的DOM结点传递给 highlightBlock函数处理
}
```


## 改造

原生的highlight是不支持行号显示的。因此我做了一个ul放在代码块左边。

``` js
// 本函数参考过网上别的实现方法
function lineCount(){
    $('pre code').each(function(){		// 用匿名函数遍历pre和code
        var lines = $(this).text().split('\n').length;  // 行数
        var $numbering = $('<ul/>').addClass('pre-numbering');

        // 链式
        $(this)
            .addClass('has-numbering')
            .parent()
            .append($numbering);

        // 每个li结束前加个数字
        for(i=0;i<lines;i++){
            $numbering.append($('<li/>').text(i));
        }
    });
}
```

然后重写了 markdown.css

``` css
pre {
    position: relative;
    overflow: hidden;
}

code {
    line-height: 20px; /* 行高20px */
    font-size: 16px;
    display: block;
    overflow-y: auto;
}

code.has-numbering {
    margin-left: 21px;
}

.pre-numbering {
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    padding: 8px 2px 12px 0;
    margin-top: 0;

    font-size: 16px;
    text-align: right;

    border-radius: 9px 0 0 0;
    -webkit-border-radius: 9px 0 0 0;
    -moz-border-radius: 9px 0 0 0;
    background-color: rgb(35,36,31);
}

li {
    height: 20px;  /* 数字行高20px */

    color: rgb(143,144,122);
    background-color: rgb(35,36,31);
}
```

最终效果是这样的： 


---  

# 参考资料
<a href="https://github.com/SegmentFault/HyperDown.js">github: Hyperdown.js</a>
<a href="https://github.com/isagalaev/highlight.js">github: highlight.js</a>
<a href="https://highlightjs.org/">highlight.js食用方法</a>
<a href="http://vec.moe/pache/">Vec: pache</a>

