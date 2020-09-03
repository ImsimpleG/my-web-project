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
// 为元素删减样式
let delCls = (element, cls) => {
    let baseCls = getCls(element);
    if (baseCls.indexOf(cls) > -1) { // 更精确的需要用正则表达式 ,因为这里只用于切换 _animate_in 所以没事
        setCls(element, baseCls.split(cls).join(' ').replace(/\s+/g, ' '));
    }
};
let navAboutItems = getAllElem('.header__nav-item');
let navAboutTip = getElem('.header__nav-tip');
let setAboutTip = (index, lib)=>{
    navAboutTip.style.left = 170 +'px';
    lib[index].onmouseover = () => {
        navAboutTip.style.left = (index * 170) + 'px';
        if (index !== 0) {
            delCls(navAboutItems[0], 'header__nav-item_status_active');
        }
    };
    let currentIdx = 0;
    lib[index].onmouseout = () => {
        for (let i = 0; i < lib.length; i++) {
            if (getCls(lib[i]).indexOf('header__nav-item_status_active') > -1) {
                currentIdx = i;
                break;
            }
        }
        navAboutTip.style.left = (currentIdx * 170) + 'px';
        addCls(navAboutItems[currentIdx], 'header__nav-item_status_active');
    }
};
for (let i = 0; i < navAboutItems.length; i++) {
    setAboutTip(i, navAboutItems);
}
