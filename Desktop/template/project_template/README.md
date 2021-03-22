# sd_pos_admin

> sd_post_admin project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

### 打包说明
``` bash
打包执行语句：
staging包: npm run build:staging
idcfstg包: npm run build:idcfstg
idcfdev包: npm run build:idcfdev
liveon包: npm run build:liveon
正式包: npm run build

注：打包时只需在项目目录内根据需求执行以上语句即可，不需要修改api地址等配置文件，该语句已做环境变量自动化配置
```