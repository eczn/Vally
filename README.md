# Vally
基于Vue+php写的个人用博客。 
demo: http://vally.eczn.website 

# 特性和缺点

* 1、 自创了markVally。现在能在博客中写markdown，这是一般博客都有的功能了。Vally基于markdown，在原有基础上做了修改，增加了一些特性，使其更适合我...... 如果你也喜欢，那最好了，想要了解 markVally 可以掠过本节“特性和缺点”看下一节。
* 2、 动态的单页blog。 实话实说，Vally难以被搜索引擎检索到。

# markVally 
基于markdown。
> * 当你想要点击链接跳转到相应章节的时候，一般用`<a>`的锚点来做，Vally基于Vue，使用Vue-router做路由控制，锚点不可行，现在只有个初步的方案用于跳转。
> ``` html
> <a id="shuang-head" onclick="footOn('shuang')" class='footer-head'>**真他妈爽** </a>  
> <a id="shuang" onclick="footOn('shuang-head', 'yes')" class='footer-head'>是真的爽啊。。。各方面的，文章可以简略一些不会有那么多补丁</a>  
> // footOn(id_name, isBack);  
> // 执行footOn会跳转到 对应id的标签那儿。 
> // 如果你想实现那种 “语文书上常有的文章注脚”，markVally下的footOn很适合实现这个功能。 （详细可以看demo页）
> ```

# backEnd 
用php搭配mySQL完成的Vally后台。 

``` php
// SQL_config.php mySQL配置：
class sql_config {
    public $host = "127.0.0.1"; 
    public $database = "ku"; 
    public $account = "you_mySQL_account_name"; 
    public $pwd = "your_mySQL_pwd";
    public $api_pwd = "Vally-admin-pwd";
    // 修改需要修改的地方就可以了。    
}
``` 

``` SQL
// 数据库设计
/*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin */;
CREATE DATABASE `ku` 
USE `ku`;

DROP TABLE IF EXISTS `blog`;
CREATE TABLE `blog` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` longtext COLLATE utf8_bin NOT NULL,
  `intro` longtext COLLATE utf8_bin NOT NULL,
  `body` longtext COLLATE utf8_bin NOT NULL,
  `date` datetime NOT NULL,
  `update_date` datetime NOT NULL,
  `format` longtext COLLATE utf8_bin NOT NULL,
  `type` varchar(16) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags` (
  `tagName` char(16) COLLATE utf8_bin NOT NULL,
  `id` int(10) unsigned NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
```

# 还有些话 
Vally的完成不是单靠我一个人。 
## 开源库
> * vue.js & vue-router
> https://github.com/vuejs/vue
> * JS-MD5
> https://github.com/blueimp/JavaScript-MD5
> * Vally的markdown解析器是SegmentFault的HyperDown.js
>  https://github.com/SegmentFault/HyperDown.js 
> * DOM方面的：
> https://github.com/madrobby/zepto
> * 一些辅助库
> 消除点触延迟的 https://github.com/ftlabs/fastclick 
> 自适应 https://github.com/amfe/lib-flexible 

## 人和事
> * 博客外观设计由同装会各位菊苣指点修改 http://qun.torzo.club
> * Vec提供的php方面的帮助，尤其是mySQL方面。@VecHK

## 今后的Vally
.... 还是十分希望能被搜索引擎搜索到...... ( 念念不忘


