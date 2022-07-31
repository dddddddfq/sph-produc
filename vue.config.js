module.exports = {
    productionSourceMap: false,
    //关闭eslint语法校验
    lintOnSave: false,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://gmall-h5-api.atguigu.cn/',
            },
        },
    },
}