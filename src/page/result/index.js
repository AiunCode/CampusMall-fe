/*
 * @Author: aiun
 * @Date: 2021-04-25 10:25:35
 * @LastEditors: aiun
 * @LastEditTime: 2021-04-25 10:33:57
 * @Description: file content
 */
'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _am = require('util/am.js');

$(function () {
    var type = _am.getUrlParam('type') || 'default',
        $element = $('.' + type + '-success');
    // 显示对应的提示元素
    $element.show();
})