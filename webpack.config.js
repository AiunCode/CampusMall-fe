/*
 * @Author: aiun
 * @Date: 2021-04-24 15:46:22
 * @LastEditors: aiun
 * @LastEditTime: 2021-04-26 00:00:57
 * @Description: file content
 */
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 环境变量配置，dev / online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

// 获取html-webpack-plugin参数的方法 
var getHtmlConfig = function (name, title) {
    return {
        //原始模板
        template: './src/view/' + name + '.html',
        //打包后的文件
        filename: 'view/' + name + '.html',
        title: title,
        inject: true,
        hash: true,
        chunks: ['common', name]
    };
};

var config = {
    //打包入口文件
    //多页面应用程序
    entry: {
        'common'            : ['./src/page/common/index.js'],
        'index'             : ['./src/page/index/index.js'],
        'list'              : ['./src/page/list/index.js'],
        'detail'            : ['./src/page/detail/index.js'],
        // 'cart'              : ['./src/page/cart/index.js'],
        'user-login'        : ['./src/page/user-login/index.js'],
        'user-register'     : ['./src/page/user-register/index.js'],
        'user-pass-reset'   : ['./src/page/user-pass-reset/index.js'],
        'user-center'       : ['./src/page/user-center/index.js'],
        'user-center-update': ['./src/page/user-center-update/index.js'],
        'user-pass-update'  : ['./src/page/user-pass-update/index.js'],
        'result'            : ['./src/page/result/index.js']
    },
    //输出路径
    //多个入口输出
    output: {
        path: './dist',  //存放文件的路径
        publicPath: '/dist', //访问的路径
        filename: 'js/[name].js'
    },
    //把外部变量或模块引入
    externals: {
        'jquery': 'window.jQuery'
    },
    module: {
        //loader配置
        //不同的文件配置不同的loader处理
        loaders: [
            {
                //test：匹配哪些文件，loader：使用哪些loader进行处理  
                //创建style标签，将js中的样式资源插入到行，添加到head中生效
                //将css文件变成commonjs模块加载js中，里面内容是样式字符串
                //loader数组的执行顺序：从右到左
                test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") 
            },
            //处理图片和字体资源（icon）
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
            //处理后缀名为string的文件
            { test: /\.string$/, loader: 'html-loader' }
        ]
    },
    //通过别名来把原导入路径映射成一个新的导入路径
    resolve: {
        alias: {
            node_modules: __dirname + '/node_modules',
            util: __dirname + '/src/util',
            page: __dirname + '/src/page',
            image: __dirname + '/src/image',
            service: __dirname + '/src/service'
        },
    },
    plugins: [
        //抽取公共模块
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        }),
        //把css文件单独打包
        new ExtractTextPlugin("css/[name].css"),
        //该插件将生成一个HTML文件，该文件将使用脚本标记将webpack捆绑包全部包含在正文中。
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('list', '商品列表页')),
        new HtmlWebpackPlugin(getHtmlConfig('detail', '商品详情页')),
        // new HtmlWebpackPlugin(getHtmlConfig('cart', '购物车')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center', '个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '修改个人信息')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', '修改密码')),
        new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果'))
    ]
};

if ('dev' === WEBPACK_ENV) {
    config.entry.common.push('webpack-dev-server/client?http://localhost:9000/');
}

module.exports = config;