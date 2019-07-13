auto.waitFor();
setScreenMetrics(720,1080);
launchApp("百度");
waitForActivity("com.baidu.searchbox.MainActivity");
sleep(8000);
//如果弹出 升级窗口，关闭
if (id("search_alert_dialog").exists()) {
    id("update_close").findOne().click();
}
//点击未登录
click("未登录");
sleep(2000);
//点击关注
click("关注");
//等待app打开--关注列表--页面
waitForActivity("com.baidu.searchbox.follow.followaddrlist.FollowListActivity");
sleep(2000);
//点击 郭靖愕然
var author = text("郭靖愕然").findOne();
tap(author.bounds().centerX(), author.bounds().centerY());
for (var loop = 0; loop < 1000; loop++) {
    var count = 0;
    //等待app打开--文章列表--页面
    waitForActivity("com.baidu.searchbox.xsearch.UserSubscribeCenterActivity");
    sleep(1000);
    //阅读所有文章，直到出现“已经到底啦”字样
    while (!text("已经到底啦").exists()) {
        swipe(400, 1000, 400, 500, 750);
        sleep(2000);
        swipe(400, 1000, 400, 500, 750);
        sleep(2000);
        for (var i = 0; i < 5; i++) {
            tap(400, i * 204 + 291);
            //等待app打开--文章详情--页面
            waitForActivity("com.baidu.searchbox.home.feed.FeedDetailActivity");
            sleep(2000);
            //一直滑动，直到出现“举报/反馈”，正文结束
            while (!text("举报/反馈").findOne().visibleToUser()) {
                swipe(400, 1000, 400, 500, 750);
                sleep(1000);
            }
            //继续向下滑动两次，展示广告
            swipe(400, 1000, 400, 600, 750);
            sleep(2000);
            swipe(400, 1000, 400, 600, 750);
            sleep(2000);
            //向上滑动，出现“top”按钮
            swipe(400, 1200, 400, 1700, 750);
            sleep(1000);
            //点击“top”按钮，返回文章顶部
            className("ImageView").depth(7).click();
            sleep(2000);
            //点击返回，返回文章列表
            desc("返回").findOne().click();
            sleep(2000);
            count ++;
            toastLog("Loop:" + loop + "文章：" + count);
        }
    }
    sleep(1000);
    //点击“top”按钮，返回文章列表的顶部
    tap(645, 1121);
    sleep(2000);
}
