/*
 * @Author: aiun
 * @Date: 2021-04-25 22:27:47
 * @LastEditors: aiun
 * @LastEditTime: 2021-04-25 22:28:19
 * @Description: file content
 */
'use strict';

var _am = require('util/am.js');

var _product = {
    // 获取商品列表
    getProductList: function (listParam, resolve, reject) {
        _am.request({
            url: _am.getServerUrl('/product/list.do'),
            data: listParam,
            success: resolve,
            error: reject
        });
    },
    // 获取商品详细信息
    getProductDetail: function (productId, resolve, reject) {
        _am.request({
            url: _am.getServerUrl('/product/detail.do'),
            data: {
                productId: productId
            },
            success: resolve,
            error: reject
        });
    }
}
module.exports = _product;