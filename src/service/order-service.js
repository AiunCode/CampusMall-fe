/*
 * @Author: aiun
 * @Date: 2021-04-26 13:33:15
 * @LastEditors: aiun
 * @LastEditTime: 2021-04-27 11:08:52
 * @Description: file content
 */
'use strict';

var _am = require('util/am.js');

var _order = {
    // 获取商品列表
    getProductList: function(resolve, reject) {
        _am.request({
            url: _am.getServerUrl('/order/get_order_cart_product.do'),
            success: resolve,
            error: reject
        });
    },
    // 提交订单
    createOrder: function(orderInfo, resolve, reject){
        _am.request({
            url: _am.getServerUrl('/order/create.do'),
            data: orderInfo,
            success: resolve,
            error: reject
        });
    },
    // 获取订单列表
    getOrderList: function (listParam, resolve, reject) {
        _am.request({
            url: _am.getServerUrl('/order/list.do'),
            data: listParam,
            success: resolve,
            error: reject
        });
    },
    // 获取订单详情
    getOrderDetail: function (orderNumber, resolve, reject) {
        _am.request({
            url: _am.getServerUrl('/order/detail.do'),
            data: {
                orderNo: orderNumber
            },
            success: resolve,
            error: reject
        });
    },
    // 取消订单
    cancelOrder: function (orderNumber, resolve, reject) {
        _am.request({
            url: _am.getServerUrl('/order/cancel.do'),
            data: {
                orderNo: orderNumber
            },
            success: resolve,
            error: reject
        });
    }
}
module.exports = _order;