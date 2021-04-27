/*
 * @Author: aiun
 * @Date: 2021-04-26 14:54:42
 * @LastEditors: aiun
 * @LastEditTime: 2021-04-27 15:17:06
 * @Description: file content
 */
'use strict';
var _am = require('util/am.js');

var _address = {
    // 获取地址列表
    getAddressList: function (resolve, reject) {
        _am.request({
            url: _am.getServerUrl('/shipping/list.do'),
            data: {
                pageSize: 50
            },  
            success: resolve,
            error: reject
        });
    },
    // 新建收件人地址
    save: function (addressInfo, resolve, reject) {
        _am.request({
            url: _am.getServerUrl('/shipping/add.do'),
            data: addressInfo,
            success: resolve,
            error: reject
        });
    },
    // 更新地址
    update: function (addressInfo, resolve, reject) {
        _am.request({
            url: _am.getServerUrl('/shipping/update.do'),
            data: addressInfo,
            success: resolve,
            error: reject
        });
    },
    // 删除收件人地址
    deleteAddress: function (shippingId, resolve, reject) {
        _am.request({
            url: _am.getServerUrl('/shipping/del.do'),
            data: {
                shippingId: shippingId
            },
            success: resolve,
            error: reject
        });
    },
    // 选中查看具体的地址,获取单条地址
    getAddress: function (shippingId, resolve, reject) {
        _am.request({
            url: _am.getServerUrl('/shipping/select.do'),
            data: {
                shippingId: shippingId
            },
            success: resolve,
            error: reject
        });
    }
}
module.exports = _address;