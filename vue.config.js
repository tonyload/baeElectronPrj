const path = require('path')
// vue.config.js
const os = require('os');
const manifest = require('./package.json')
function resolve(dir) {
  return path.join(__dirname, dir)
}

const param = {
  ENV: process.env.NODE_ENV,
  PLATFORM: os.platform()
};

console.log('param:', param);
console.log(process.env.NODE_ENV)

module.exports = {
  publicPath: './',
  devServer: {
    port: '8188'
  },
  css: {
    // modules: false, // 只将.module.[ext]结尾的文件视为CSS Modules模块。
    extract: true, // 使用默认
    // sourceMap: false, // 不开启CSS source map
    loaderOptions: {
      scss: {
        // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
        prependData: '@import "./src/assets/css/vars.scss";'
      }
    }
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.node$/,
          loader: 'native-ext-loader',
          options: {
            emit: true,
            rewritePath: param.ENV === 'production'
              ? param.PLATFORM === 'win32' ? './resources' : '../Resources'
              : './node_modules/@pano.video/panortc-electron-sdk/native'
          }
        },
        {
          test: /\.swf$/,
          loader: 'url-loader',
          options: {
            limit: 1024,
            name: 'file/[path][name].[hash:7].[ext]'
          }
        }

      ]
    },
    resolve: {
      extensions: ['.js', '.json', '.node']
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('src', resolve('src'))
      .set('common', resolve('src/common'))
      .set('components', resolve('src/components'))
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: 'v.onenet10086.com',
        productName: 'ONENET会议Demo_develop' + manifest.version, // 定义打包后的exe文件名
        directories: {
          // 这个是打包后放在哪个目录下的意思
          output: 'ONENET会议Demo_develop' + manifest.version
        },
        nsis: {
          installerIcon: './public/app.ico',
          installerHeader: './public/app.png',
          installerHeaderIcon: './public/app.ico',
          oneClick: false,
          allowToChangeInstallationDirectory: true,
          runAfterFinish: false,
          uninstallDisplayName: '会议系统哈哈哈哈 V1.0.0'
        },
        publish: [
          {
            provider: 'generic',
            url: 'https://v.onenet10086.com:8188/package/dist_electron/' // 存放软件版本的地址
          }
        ],
        win: {
          target: 'nsis',
          icon: './public/app.ico',
          legalTrademarks: 'http://www.baidu.com/',
          extraResources: [
            {
              from: 'node_modules/@pano.video/panortc-electron-sdk/native/',
              to: './',
              filter: [
                '**/*'
              ]
            }, {
              from: 'resources/',
              to: './'
            }
          ]
        },
        mac: {
          target: 'dmg',
          icon: 'build/icon.png'
        }
      }
    }
  }
}
