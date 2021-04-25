/*
 * @Author: aiun
 * @Date: 2021-04-24 23:15:33
 * @LastEditors: aiun
 * @LastEditTime: 2021-04-24 23:32:13
 * @Description: file content
 */
'use strict'
var Hogan = require('hogan'); //用来渲染html的js工具
var conf = {
    serverHost: ''
}
//定义一个工具类方法
var _am = {
    //网络请求
    request: function (param) {
        var _this = this;
        $.ajax({
            type: param.method || 'get',
            url: param.url || '',
            dataType: param.type || 'json',
            data: param.data || '',
            success: function (res) {
                //请求成功
                if (0 == res.status) {
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                } else if (10 == res.status) { //没有登录状态，需要强制登录
                    _this.doLogin();
                } else if (1 == res.status) { //请求数据错误
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error: function (err) {
                typeof param.error === 'function' && param.error(err.statusText);
            }
        });
    },
    //获取服务器地址
    getServerUrl: function (path) {
        return conf.serverHost + path;
    },
    //获取url参数
    getUrlParam: function (name) {
        //通过正则表达式获取key-value参数
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        //window.location.search.substr(1)获取url里面？之后的内容
        var result = window.location.search.substr(1).match(reg);
        //传参的时候编码了，所以这里需要解码
        return result ? decodeURIComponent(result[2]) : null;
    },
    //渲染html的方法,将传入的模板和数据进行拼接
    renderHtml: function (htmlTemplate, data) {
        //编译
        var template = Hogan.compile(htmlTemplate),
            result = template.render(data);
        return result;
    },
    //成功提示
    successTips: function (msg) {
        alert(msg || '操作成功!')
    },
    //错误提示
    errorTips: function (msg) {
        alert(msg || '有点儿小问题~~~')
    },
    //表单验证（邮箱、手机号、为空等）
    validate: function (value, type) {
        var value = $.trim(value);  //去掉空格
        if ('require' === type) {     //是必须值（非空验证）
            return !!value;         //强转为boolean类型，有值返回true
        }
        //手机号验证
        if ('phone' === type) {
            return /^1\d{10}$/.test(value); //使用正则表达式判断手机号是否规范
        }
        //邮箱格式的验证
        if ('email' === type) {
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
    //统一登录处理
    doLogin: function () {
        //登录完成后跳回到原来的页面
        window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    //跳回主页
    goHome: function () {
        window.location.href = './index.html';
    }
};

module.exports = _am;