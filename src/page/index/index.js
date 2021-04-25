/*
 * @Author: aiun
 * @Date: 2021-04-24 15:40:22
 * @LastEditors: aiun
 * @LastEditTime: 2021-04-25 22:05:46
 * @Description: file content
 */
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('util/slider/index.js');
var navSide = require('page/common/nav-side/index.js');
var templateBanner = require('./banner.string');
var _am = require('util/am.js');

$(function () {
    // 渲染banner的html
    var bannerHtml = _am.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    // 初始化banner
    var $slider = $('.banner').unslider({
        dots: true
    });
    // 前一张和后一张操作的事件绑定
    $('.banner-con .banner-arrow').click(function () {
        var forward = $(this).hasClass('prev') ? 'prev' : 'next';
        $slider.data('unslider')[forward]();
    });
});
