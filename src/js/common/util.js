//封装切割字符串
// function getSearch(key) {
//     var searchStr = location.search; //获取本地储存的路径
//     //切割问号
//     searchStr.slice(1);
//     var searchArr = searchStr.split('&');
//     var temArr = [];
//     var obj = {};
//     for (var i = 0; i < searchArr.length; i++) {
//         temArr = searchArr[i].split('=');
//         obj[temArr[0]] = temArr[1];
//     }
//     return key ? obj[key] : obj;

// }

// module.exports.getSearch = getSearch;



function getSearch(key) { // '?cg_id=1&cg_type=op'
    var searchStr = location.search.slice(1); // 'cg_id=1&cg_type=op'
    var searchArr = searchStr.split('&'); // ['cg_id=1', 'cg_type=op']
    var searchObj = {},
        tempArr;

    for (var i = 0, len = searchArr.length; i < len; i++) {
        tempArr = searchArr[i].split('='); // ['cg_id', 1]    ['cg_type', 'op']
        searchObj[tempArr[0]] = tempArr[1]; // { cg_id:1, cg_type: 'op' }
    }

    // 传了key返回指定的值，没传返回解析好的整个对象
    return key ? searchObj[key] : searchObj;
}

module.exports.getSearch = getSearch;