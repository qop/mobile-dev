var $ = require('zepto');

$('.J_btn').on('click', function() {
    navigator.geolocation.getCurrentPosition(function(position) {
        var lng = pos.coords.longitude,
            lat = pos.coords.latitude;
        $.ajax({
            url: '/waimai/ajax/newm/rgc',
            data: {
                lng: lng,
                lat: lat
            },
            type: "get",
            dataType: "json",
            error: function(res) {
                alert('定位失败，点击重试。');
                icon.removeClass('i-loading').addClass('i-geo');
            },
            success: function(res) {
                self.keyboard(res.data.address ? res.data.address : '未知地址');
                setTimeout(function() {
                    self.addrInput.get(0).focus();
                }, 3000);
            }
        });
    }, function(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                alert("请在设置-隐私和安全中启用位置信息功能。");
                icon.removeClass('i-loading').addClass('i-geo');
                break;
            case error.POSITION_UNAVAILABLE:
                alert("获取用户位置信息失败。");
                icon.removeClass('i-loading').addClass('i-geo');
                break;
            case error.TIMEOUT:
                alert("获取用户位置信息超时。");
                icon.removeClass('i-loading').addClass('i-geo');
                break;
            case error.UNKNOWN_ERROR:
                alert("未知错误。");
                icon.removeClass('i-loading').addClass('i-geo');
                break;
        }
    }, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    });
});

var promiseGeo = new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(function);
});

var promiseAjax = new Promise(function(resolve, reject) {

});


var getGeo = function() {
    var promise = new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, {});
    });
    return promise;
};

var getAddress = function(position) {
    var promise = new Promise(function(resolve, reject) {
        $.ajax({
            url: '',
            type: '',
            dataType: '',
            data: {
                lat: position.latitude,
                lng: position.longitude
            },
            success: resolve,
            error: reject
        });
    });
    return promise;
};

getGeo.then(function(position) {
    getAddress(position).then(ajaxSuccess, ajaxError);
}, geoError);

getGeo.then(function(position) {
    return position;
}).then(function(position) {
    getAddress(position);
});

getGeo.then(function() {}).catch(function(error) {
    console.log(error);
});

var p1 = new Promise();
var p2 = new Promise();
var p3 = new Promise();
Promise.all([p1,p2,p3]).then(function(posts) {
    console.log(posts);
});

dpmerchant.ready(function() {
    dpmerchant.subscribe({
        action: 'appear',
        success: function() {
            dpmerchant.store({
                key: 'shopmenu',
                value: 'false'
            });
        },
        handle: function(e) {
            dpmerchant.setTitle({
                title: document.title,
                subtitle: '在线上架菜品'
            });
            dpmerchant.setRRButton({
                text: "全部菜品",
                handle: function() {
                    Envtool.openScheme({
                        url: 'dpmer://newweb',
                        extra: {
                            url: 'http://' + location.host + '/mhobbit/alldish'
                        }
                    });
                }
            });
            dpmerchant.retrieve({
                key: 'shopmenu',
                success: function(e) {
                    if (e && e.value === 'reload') {
                        dpmerchant.unsubscribe({
                            action: 'appear',
                            success: function(e) {
                                location.reload();
                            }
                        });
                    }
                }
            });
        }
    });
});
