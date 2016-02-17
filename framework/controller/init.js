/**
 * Created by ken on 15/10/6.
 */
import fs from 'fs'
import base from './base'

export default function () {
    //控制层 功能类初始化
    G.controller = {}
    G.controller.base = base

    if(G.system_mod.indexOf('page')>-1)G.controller.http = require(G.path.core + '/controller/http')
    if(G.system_mod.indexOf('api')>-1)G.controller.rest = require(G.path.core + '/controller/rest')

    //跨控制层加载
    G.controller.load = function (path) {
        path = G.path.controller + '/' + path + '.js'
        if (fs.existsSync(path)) {
            return require(path)
        }
    }

}