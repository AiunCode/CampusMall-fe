/*
 * @Author: aiun
 * @Date: 2021-04-27 17:28:50
 * @LastEditors: aiun
 * @LastEditTime: 2021-04-27 17:38:53
 * @Description: file content
 */
'use strict';

var _am = require('util/am.js');

var _payment = {
    // 获取支付信息
    getPaymentInfo: function (orderNumber, resolve, reject) {
        _am.request({
            url: _am.getServerUrl('/order/pay.do'),
            data: {
                orderNo: orderNumber
            },  
            success: resolve,
            error: reject
        });
    },
    // 获取订单状态
    getPaymentStatus: function (orderNumber, resolve, reject) {
        _am.request({
            url: _am.getServerUrl('/order/query_order_pay_status.do'),
            data: {
                orderNo: orderNumber
            },
            success: resolve,
            error: reject
        });
    }
}
module.exports = _payment;