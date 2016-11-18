var app = angular.module('MyApp', ['ui.router']);

/** 路由  */
app.config(function ($stateProvider, $urlRouterProvider) {
    // $urlRouterProvider.otherwise('/weipan/hello');

    /** 总页面,带有左边导航  */
    $stateProvider.state('weipan', {
        url: '/weipan',
        templateUrl:'weipan.html'
    });

    /** hello页面  */
    $stateProvider .state('weipan.hello',{
            url:'/hello',
            templateUrl:'hello.html'
    });

    /** 出入金  */
    $stateProvider.state('weipan.crjlist',{
        url:'/crjlist',
        templateUrl:'crj/txmx.html'
    }).state('weipan.crjsh',{
        url:'/crjsh',
        templateUrl:'crj/txsh.html'
    }).state('weipan.crjsh.crjdetail',{
        url:'/crjdetail',
        templateUrl:'crj/crjdetail.html'
    })

    /**  仓单明细 */
    $stateProvider.state('weipan.ccdmx',{
        url:'/ccdmx',
        templateUrl:'cdmx/ccdmx.html'
    }).state('weipan.pcdmx',{
        url:'/pcdmx',
        templateUrl:'cdmx/pcdmx.html'
    })

    /**  佣金管理 */
    $stateProvider.state('weipan.yjmx',{
        url:'/yjmx',
        templateUrl:'yjgl/yjmx.html'
    }).state('weipan.yjhz',{
        url:'/jjryj',
        templateUrl:'yjgl/yjhz.html'
    })



    /**  人员管理 */
    //综合会员
    $stateProvider.state('weipan.zhhy',{
        url:'/zhhy',
        templateUrl:'rygl/zhhy.html'
    }).state('weipan.zhhydetail',{
        url:'/zhhydetail',
        templateUrl:'rygl/zhhydetail.html'
    });

    //代理商
    $stateProvider.state('weipan.dls',{
        url:'/dls',
        templateUrl:'rygl/dls.html',
    }).state('weipan.dlsdetail',{
        url:'/dlsdetail',
        templateUrl:'rygl/dlsdetail.html'
    })

    //经纪人列表
    $stateProvider.state('weipan.jjr',{
        url:'/jjr',
        templateUrl:'rygl/jjr.html'
    }).state('weipan.jjr.jjrlist',{
        url:'jjrlist',
        templateUrl:'rygl/jjrlist.html'
    }).state('weipan.jjr.jjrshlist',{
        url:'jjrshlist',
        templateUrl:'rygl/jjrshlist.html'
    }).state('weipan.jjr.jjrdetail',{
        url:'jjrdetail',
        templateUrl:'rygl/jjrdetail.html'
    })

    //客户管理
    $stateProvider.state('weipan.khgl',{
        url:'/khgl',
        templateUrl:'rygl/khgl.html'
    })

    //综合报表
    $stateProvider.state('weipan.zhbb',{
        url:'/zhbb',
        templateUrl:'rygl/zhbb.html'
    })

    //盈亏排行
    $stateProvider.state('weipan.ykph',{
        url:'/ykph',
        templateUrl:'rygl/ykph.html'
    })





    /**  系统设置 */
    //参数设置
    $stateProvider.state('weipan.cssz',{
        url:'/cssz',
        templateUrl:'sys/cssz.html'
    })

    //商品页面
    $stateProvider.state('weipan.goods',{
        url:'/goods',
        templateUrl:'sys/goods.html',
    })
    $stateProvider.state('weipan.goods.typelist',{
        url:'/goodstypelist',
        templateUrl:'sys/goodstypelist.html',
    })
    $stateProvider.state('weipan.goods.list',{
        url:'/goodslist',
        templateUrl:'sys/goodslist.html',
    }).state('weipan.goods.detail',{
        url:'/goodsdetail',
        templateUrl:'sys/goodsdetail.html'
    })

    //权限管理
    $stateProvider.state('weipan.qxgl',{
        url:'/qxgl',
        templateUrl:'sys/qxgl.html'
    }).state('weipan.qxgl.qxgldetail',{
        url:'/qzgldetail',
        templateUrl:'sys/qxgldetail.html'
    })

    //密码重置
    $stateProvider.state('weipan.mmcz',{
        url:'/mmcz',
        templateUrl:'sys/mmcz.html'
    })


})





/**  公共配置 */
app.service('publicService',function () {
   this.domain="http://localhost:8080/weipan";
})


/** 中文翻译服务  */
app.service('chiengservice', function () {
    this.convert = function (x) {
        if ('update' == x)return '修改';
        if ('add' == x)return '添加';
    }
})

//该方法需要修改,有问题
app.service('cloneservice', function () {
    this.cloneObj = function (obj) {
        var str = JSON.stringify(obj);
        return JSON.parse(str); //还原
    };

})

app.service('userservice', function () {
    var varusers;
    this.getMaxId = function (arr) {
        var userId = 0;
        for (i in arr) {
            if (i.userId > userId) {
                userId = i.userId;
            }
        }
        return userId;
    }
    this.getUsers = function () {
        if(varusers==null||varusers==''){
            var uu = [
                {
                    userId: "1",
                    userName: "zhangsan",
                    realName: "张三",
                    email: "sharkshore@163.com",
                    province: "上海",
                    userInfo: "我是张三，我为自己带盐！"
                },
                {
                    userId: "2",
                    userName: "xiaoming",
                    realName: "小明",
                    email: "sharkshore808@gmail.com",
                    province: "北京",
                    userInfo: "我是张三，我为自己带盐！"
                },
                {
                    userId: "3",
                    userName: "xiaohuang",
                    realName: "小黄",
                    email: "tuzexi999@163.com",
                    province: "广州",
                    userInfo: "我是张三，我为自己带盐！"
                },
                {
                    userId: "4",
                    userName: "xiaoniu",
                    realName: "小刘",
                    email: "bearbeach@163.com",
                    province: "深圳",
                    userInfo: "我是张三，我为自己带盐！"
                }];
            return uu;
        }else{
            return varusers;
        }
    }
    this.setUsers = function (users) {
        varusers = users;
        return users;
    }

});

app.service('mockdata', function () {
    var users;
    this.getUsers = function () {

    }
})

/**  公共资源和定义  */

Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};




