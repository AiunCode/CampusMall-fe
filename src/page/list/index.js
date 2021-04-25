/*
 * @Author: aiun
 * @Date: 2021-04-25 22:26:40
 * @LastEditors: aiun
 * @LastEditTime: 2021-04-26 00:07:30
 * @Description: file content
 */
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _am = require('util/am.js');
var _product = require('service/product-service.js');
var Pagination = require('util/pagination/index.js');
var templateIndex = require('./index.string');

var page = {
    data: {
        listParam: {
            keyword: _am.getUrlParam('keyword') || '',
            categoryId: _am.getUrlParam('categoryId') || '',
            orderBy: _am.getUrlParam('orderBy') || 'default',
            pageNum: _am.getUrlParam('pageNum') || 1,
            pageSize: _am.getUrlParam('pageSize') || 10
        }
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        this.loadList();
    },
    bindEvent: function () {
        var _this = this;
        // 排序的点击事件
        $('.sort-item').click(function () {
            var $this = $(this);
            // 只要点击升序、降序，页面就置为 1
            _this.data.listParam.pageNum = 1;
            // 点击默认排序
            if ($this.data('type') === 'default') {
                // 已经是active样式
                if ($this.hasClass('active')) {
                    return;
                }
                // 其他
                else {
                    $this.addClass('active').siblings('.sort-item')
                        .removeClass('active asc desc');
                    _this.data.listParam.orderBy = 'default';
                }
            }
            // 点击价格排序
            else if ($this.data('type') === 'price') {
                // active class 的处理
                $this.addClass('active').siblings('.sort-item')
                    .removeClass('active asc desc');
                // 升序、降序的处理
                if (!$this.hasClass('asc')) {
                    $this.addClass('asc').removeClass('desc');
                    _this.data.listParam.orderBy = 'price_asc';
                } else {
                    $this.addClass('desc').removeClass('asc');
                    _this.data.listParam.orderBy = 'price_desc';
                }
            }
            // 重新加载列表
            _this.loadList();
        });
    },
    // 加载list数据
    loadList: function () {
        var _this = this, 
            listHtml = '',
            listParam = this.data.listParam,
            $pListCon = $('.p-list-con');
        $pListCon.html('<div class="loading"></div>');
        // 删除参数中不必要的字段
        listParam.categoryId
            ? (delete listParam.keyword) : (delete listParam.categoryId);
        // 请求接口，res接口里的数据
        _product.getProductList(listParam, function (res) {
            listHtml = _am.renderHtml(templateIndex, {
                list: res.list
            });
            $pListCon.html(listHtml);
            _this.loadPagination({
                hasPreviousPage: res.hasPreviousPage,
                prePage: res.prePage,
                hasNextPage: res.hasNextPage,
                nextPage: res.nextPage,
                pageNum: res.pageNum,
                pages: res.pages
            });
        }, function (errMsg) {
            _am.errorTips(errMsg);
        });
    },
    // 加载分页信息
    loadPagination: function (pageInfo) {
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container: $('.pagination'),
            onSelectPage: function (pageNum) {
                _this.data.listParam.pageNum = pageNum;
                _this.loadList();
            }
        }));
    }
};
$(function () {
    page.init();
})