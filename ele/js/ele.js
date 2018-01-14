/**
 * Created by Administrator on 2018/1/4.
 */
var map = new AMap.Map("e-map", {
    resizeEnable: true,
    zoom:11,
    center: [116.397428, 39.90923]
});
//输入提示
var autoOptions = {
    input: "e-stext"
};
var auto = new AMap.Autocomplete(autoOptions);
var placeSearch = new AMap.PlaceSearch({
    map: map
});  //构造地点查询类
AMap.event.addListener(auto, "select", select);//注册监听，当选中某条记录时会触发
function select(e) {
    placeSearch.setCity(e.poi.adcode);
    placeSearch.search(e.poi.name);  //关键字查询查询
}