function getOnline(url) {
    var chat = $.connection.ChatsHub;
    $.connection.hub.url = url;

    //自定义用户ID
    $.connection.hub.qs = { "userId": "110" };

    //启用浏览器端输出日志
    $.connection.hub.logging = true;

    //接受服务端消息，此处做演示，正在使用的时候服务端是不需要接受自己的消息
    chat.client.BroadcastSystemMessage = function (title, msg) {
        $('#discussion').append('<li><span>' + title + '    ' + msg + '</span></li>');
    }
    chat.client.BroadcastMessageByUserId = function (msg) {
        $('#discussion').append('<li><span>' + msg + '</span></li>');
    }


    // Start the connection.
    $.connection.hub.starting(function () {
        console.log('SignalR启动中...')
    });
    $.connection.hub.received(function (e) {
        console.log(e)
    });
    $.connection.hub.connectionSlow(function () {
        console.log('connectionSlow.')
    });
    $.connection.hub.reconnecting(function () {
        console.log('SignalR正在重新连接中...')
    });
    $.connection.hub.reconnected(function () {
        console.log('SignalR重新连接成功...')
    });
    $.connection.hub.stateChanged(function (o, n) {
        //console.log(o)
        console.log('SignalR状态改变，newState：' + o.newState + "，oldState：" + o.oldState + "，" + n)
    });
    $.connection.hub.disconnected(function () {
        console.log('SignalR断开连接...');
        setTimeout(function () {
            $.connection.hub.start();
        }, 1000); // 1秒后重新连接
    });
    //错误
    $.connection.hub.error(function (err) {
        console.log("SignalR出现错误. \n" + "Error: " + err.message);
    });

    // 开始连接服务器
    $.connection.hub.start().done(function () {
        //注册发送系统消息方法

    });
}