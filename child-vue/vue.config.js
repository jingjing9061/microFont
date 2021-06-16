module.exports = {
    configureWebpack:{
        output:{
            library:'singleVue',//打包的类库名字
            libraryTarget:'umd'//打包后的文件名字 会把响应的属性挂到window上 windos.singleVue.bootstrap/mount/ unmount
        },
        devServer:{
            port:10000
        }
    }
}