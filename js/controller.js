function User(id, name, realName, email, province, userInfo) {
    this.userId = id;
    this.userName = name;
    this.realName = realName;
    this.email = email;
    this.province = province;
    this.userInfo = userInfo;
}


app.controller('routeListController', function ($scope, $routeParams, $rootScope,$location,chiengservice,cloneservice,userservice,mockdata) {
    $scope.pageHelper={pageSize: 6, pageNum: 1};
    $scope.users=userservice.getUsers();
    $scope.delete = function (param) {
        //先进行数据库操作,删除,查询....
        $scope.users.splice(param, 1);
    }

    $scope.detail = function (param) {
        $scope.userDetail=param;
    }
    $scope.select = function () {
        //先进行数据库操作
        $scope.users = [];
    }
    $scope.operation = chiengservice.convert($routeParams.operation);
    if($routeParams.operation=='update')$scope.isupdate=true;

    $scope.add = function () {
        //先进行数据库操作,添加,查询....
        var nuser = cloneservice.cloneObj($scope.userDetail);
        nuser.userId=userservice.getMaxId($scope.users)+1;
        //如果有分页,超过每页显示最大数满了,不执行该操作
        if ($scope.users.length < $scope.pageHelper.pageSize){
            $scope.users.push(nuser);
            $location.path('/userlist');
        }
    }
    $scope.update = function () {
        //先进行数据库操作,修改,查询....
        for (u in $scope.users) {
            if (u.userId == $scope.userDetail.userId) {
                var nuser = $scope.userDetail;
                u = nuser;
                $scope.userDetail = {};
            }
        }
    }


});


app.controller('goodsListController',function ($scope,$routeParams,$http,$location,$route,publicService) {
    //查询
    $http({
        url:publicService.domain+'/goods/list',
        method:'GET'
    }).then(function (response) {
        $scope.goodsList=response.data.data;
    })
    //删除
    $scope.deleteParam=function(param) {
        $scope.deleteModel=param;
    };
    $scope.delete=function (param) {
        $http({
            url:publicService.domain+'/goods/delete',
            method:'GET',
            params:param
        }).then(function (response) {
            $route.reload();
        })
    }
   //添加
    $scope.insert=function(param){
        $http({
            url:publicService.domain+'/goods/insert',
            method:'GET',
            params:param
        }).then(function (response) {
            $route.reload();
        })
    }
})


