/*
 * @Author: aiun
 * @Date: 2021-04-27 17:04:22
 * @LastEditors: aiun
 * @LastEditTime: 2021-04-27 17:53:29
 * @Description: file content
 */
'use strict';
require('./index.css')
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _am = require('util/am.js');
var _payment = require('service/payment-service.js');
var templateIndex = require('./index.string');

var page = {
    data: {
        orderNumber: _am.getUrlParam('orderNumber')
    },
    init: function () {
        this.onLoad();
    },

    onLoad: function () {
        this.loadPaymentInfo();

    },
    //加载支付信息
    loadPaymentInfo: function () {
        var _this = this,
            paymentHtml = "",
            
            $pageWrap = $('.page-wrap');
        $pageWrap.html('<div class="loading"></div>');
        _payment.getPaymentInfo(this.data.orderNumber, function (res) {
            //渲染html
            paymentHtml = _am.renderHtml(templateIndex, res);
            $pageWrap.html(paymentHtml);
            _this.listenOrderStatus();
        }, function (errMsg) {
            $pageWrap.html('<p class="err-tip>' + errMsg + '</p>"')
        });

    },
    // 监听订单状态
    listenOrderStatus: function () {
        var _this = this;
        // 5s 轮询一次
        this.paymentTimer = window.setInterval(function () {
            _payment.getPaymentStatus(_this.data.orderNumber, function (res) {
                if (res == true) {
                    window.location.href = './result.html?type=payment&orderNumber=' + _this.data.orderNumber;
                }
            }, function (errMsg) {

            });
        }, 5000);
    }
};

$(function () {
    page.init();
});