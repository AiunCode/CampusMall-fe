/*
 * @Author: aiun
 * @Date: 2021-04-25 00:12:20
 * @LastEditors: aiun
 * @LastEditTime: 2021-04-25 00:12:37
 * @Description: file content
 */
'use strict'
require('./index.css');
var _am = require('util/am.js');

// 通用页面头部
var header = {
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    //处理搜索栏
    onLoad: function () {
        var keyword = _am.getUrlParam('keyword');
        //keyword存在则回填输入框
        if (keyword) {
            $('#search-input').val(keyword);
        };
    },
    //提交
    bindEvent: function () {
        var _this = this;
        //点击搜索按钮以后的操作
        $('#search-btn').click(function () {
            _this.searchSubmit();
        });
        //输入回车后，做搜索提交
        $('#search-input').keyup(function (e) {
            //如果是回车键
            if (e.keyCode === 13) {
                _this.searchSubmit();
            }
        });
    },
    //搜索的提交
    searchSubmit: function () {
        console.log('提交');
        var keyword = $.trim($('#search-input').val());
        //如果提交的时候有keyword，直接跳转到list页
        if (keyword) {
            window.location.href = './list.html?keyword=' + keyword;
        } else { //如果提交的为空，之间回首页
            _am.goHome();
        };
    }
};

header.init();