// 获取元素
let getElem = (selector) => {
    return document.querySelector(selector);
};
let getAllElem = (selector) => {
    return document.querySelectorAll(selector);
};
let getClsName = (selector) => {
    return document.getElementsByClassName(selector);
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
let navSignItems = getAllElem('.header__nav-item');
let navSignTip = getElem('.header__nav-tip');

let setSignTip = (index, lib)=>{
    navSignTip.style.left = 510 +'px';
    lib[index].onmouseover = () => {
        navSignTip.style.left = (index * 170) + 'px';
        if (index !== 0) {
            delCls(navSignItems[0], 'header__nav-item_status_active');
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
        navSignTip.style.left = (currentIdx * 170) + 'px';
        addCls(navSignItems[currentIdx], 'header__nav-item_status_active');
    }
};
for (let i = 0; i < navSignItems.length; i++) {
    setSignTip(i, navSignItems);
}