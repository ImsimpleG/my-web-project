// 获取元素
let getElem = (selector) => {
    return document.querySelector(selector);
};
let getAllElem = (selector) => {
    return document.querySelectorAll(selector);
};

// 获取元素的样式
let getCls = (element) => {
    return element.getAttribute('class');
};
// 设置元素的样式
let setCls = (element, cls) => {
    return element.setAttribute('class', cls);
};
// 为元素添加样式
let addCls = (element, cls) => {
    let baseCls = getCls(element);
    if (baseCls.indexOf(cls) === -1) {
        setCls(element, baseCls + ' ' + cls); // 注意空格
    }
};
let $ = (id) => {
    return typeof (id) === "string" ? document.getElementById(id) : id;
};

function addHandler(element, type, handler) {
    if (element.addEventListener) {
        element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + type, handler);
    } else {
        element["on" + type] = handler;
    }
}
// 为元素删减样式
let delCls = (element, cls) => {
    let baseCls = getCls(element);
    if (baseCls.indexOf(cls) > -1) { // 更精确的需要用正则表达式 ,因为这里只用于切换 _animate_in 所以没事
        setCls(element, baseCls.split(cls).join(' ').replace(/\s+/g, ' '));
    }
};
let navCooItems = getAllElem('.header__nav-item');
let navCooTip = getElem('.header__nav-tip');
let setCooperateTip = (index, lib)=>{
    navCooTip.style.left = 850 +'px';
    lib[index].onmouseover = () => {
        navCooTip.style.left = (index * 170) + 'px';
        if (index !== 0) {
            delCls(navCooItems[0], 'header__nav-item_status_active');
        }
    };
    let currentIdx = 0;
    lib[index].onmouseout = () => {
        console.log(currentIdx);
        for (let i = 0; i < lib.length; i++) {
            if (getCls(lib[i]).indexOf('header__nav-item_status_active') > -1) {
                currentIdx = i;
                break;
            }
        }
        navCooTip.style.left = (currentIdx * 170) + 'px';
        addCls(navCooItems[currentIdx], 'header__nav-item_status_active');
    }
};
for (let i = 0; i < navCooItems.length; i++) {
    setCooperateTip(i, navCooItems);
}

let bannerList = getAllElem('.screen-cooperate__banner_item');
let bannerNt = $('next');
let bannerPv = $('prev');
let _index = 0;

function bannerChange() {
    for (let i = 0; i < bannerList.length; i++) {
        bannerList[i].style.display = "none";
    }
    bannerList[_index].style.display = "block";
    bannerList[_index+1].style.display = "block";
    bannerList[_index+2].style.display = "block";
}

addHandler(bannerNt, "click", function () {
    _index++;
    if (_index+2 >= bannerList.length) _index = 0;
    bannerChange();

});

addHandler(bannerPv, "click", function () {
    _index--;
    if (_index < 0) _index = bannerList.length - 3;
    bannerChange();
});