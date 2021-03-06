/*
 * @Author: aiun
 * @Date: 2021-04-25 00:28:27
 * @LastEditors: aiun
 * @LastEditTime: 2021-04-25 00:29:01
 * @Description: file content
 */
'use strict';

var _am = require('util/am.js');

var _user = {
    // 用户登录
    login: function (userInfo, resolve, reject) {
        _am.request({
            url: _am.getServerUrl('/user/login.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 检查用户名
    checkUsername: function (username, resolve, reject) {
        _am.request({
            url: _am.getServerUrl('/user/check_valid.do'),
            data: {
                type: 'username',
                str: username
            },
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 用户注册
    register: function (userInfo, resolve, reject) {
        _am.request({
            url: _am.getServerUrl('/user/register.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 检查登录状态
    checkLogin: function (resolve, reject) {
        _am.request({
            url: _am.getServerUrl('/user/get_user_info.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 获取用户密码提示问题
    getQuestion: function (username, resolve, reject) {
        _am.request({
            url: _am.getServerUrl('/user/forget_get_question.do'),
            data: {
                username: username
            },
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 检查密码提示问题答案
    checkAnswer: function (userInfo, resolve, reject) {
        _am.request({
            url: _am.getServerUrl('/user/forget_check_answer.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 重置密码
    resetPassword: function (userInfo, resolve, reject) {
        _am.request({
            url: _am.getServerUrl('/user/forget_reset_password.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 获取用户信息
    getUserInfo: function (resolve, reject) {
        _am.request({
            url: _am.getServerUrl('/user/get_information.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 更新个人信息
    updateUserInfo: function (userInfo, resolve, reject) {
        _am.request({
            url: _am.getServerUrl('/user/update_information.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 登录状态下更新密码
    updatePassword: function (userInfo, resolve, reject) {
        _am.request({
            url: _am.getServerUrl('/user/reset_password.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        });
    },
    // 登出
    logout: function (resolve, reject) {
        _am.request({
            url: _am.getServerUrl('/user/logout.do'),
            method: 'POST',
            success: resolve,
            error: reject
        });
    }
}
module.exports = _user;