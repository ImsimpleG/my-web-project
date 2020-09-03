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
// 为元素删减样式
let delCls = (element, cls) => {
    let baseCls = getCls(element);
    if (baseCls.indexOf(cls) > -1) { // 更精确的需要用正则表达式 ,因为这里只用于切换 _animate_in 所以没事
        setCls(element, baseCls.split(cls).join(' ').replace(/\s+/g, ' '));
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
let navIntroItems = getAllElem('.header__nav-item');
let navIntroTip = getElem('.header__nav-tip');
let navQualifiedTip = getElem('.screen-intro__qualified_nav-tip');
let navQualifiedItems = getClsName("screen-intro__qualified_nav_item");
let navQualifiedList  = getClsName("screen-intro__qualified_level");
let professionTip = getElem('.screen-profession__choose__item_tip_active');
let professionItems = getClsName("screen-profession__choose__menu_item");
let professionChoose = getClsName("screen-profession__choose__inner_box");
let bannerNext = $('next');
let bannerPrev = $('prev');
let bannerList = getAllElem('.screen-intro__sorts');
let _index = 0;

let setProfessionTip = (index, lib) => {
    professionItems[index].setAttribute("data-idx", index);
    lib[index].onmouseover = () => {
        mouseindex = professionItems[index].getAttribute("data-idx");
        for (let a = 0; a < professionChoose.length; a++) {
            professionChoose[a].style.display = "none";
            professionItems[a].style.color = "#2c2926";
        }
        professionChoose[mouseindex].style.display = "block";
        professionItems[mouseindex].style.color = "#f08305";
        professionTip.style.top = (index * 50.5) + 'px';
    }
};
for (let i = 0; i < professionItems.length; i++) {
    setProfessionTip(i, professionItems);
}

let setIntroTip = (index, lib)=>{
    navIntroTip.style.left = 340 +'px';
    lib[index].onmouseover = () => {
        navIntroTip.style.left = (index * 170) + 'px';
        if (index !== 0) {
            delCls(navIntroItems[0], 'header__nav-item_status_active');
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
        navIntroTip.style.left = (currentIdx * 170) + 'px';
        addCls(navIntroItems[currentIdx], 'header__nav-item_status_active');
    }
};
for (let i = 0; i < navIntroItems.length; i++) {
    setIntroTip(i, navIntroItems);
}

window.onload = () =>{
    bannerList[0].style.display = "block";
};
function changImg() {
    bannerList[0].style.display = "block";
    for (let i = 0; i < bannerList.length; i++) {
        bannerList[i].style.display = "none";
    }
    bannerList[_index].style.display = "block";
}

addHandler(bannerNext, "click", function () {
    _index++;
    if (_index >= bannerList.length) _index = 0;
    changImg();
});

addHandler(bannerPrev, "click", function () {
    _index--;
    if (_index < 0) _index = bannerList.length - 1;
    changImg();
});

let setQualifiedStyle = (index, lib) => {
    navQualifiedItems[index].setAttribute("index", index);
    navQualifiedList[1].style.display = "none";
    navQualifiedList[2].style.display = "none";
    lib[index].onclick = () => {
        if (index === 0) {
            navQualifiedTip.style.left = 105 + 'px';
            addCls(navQualifiedItems[0], 'screen-intro__qualified_nav_item_active');
            delCls(navQualifiedItems[1], 'screen-intro__qualified_nav_item_active');
            delCls(navQualifiedItems[2], 'screen-intro__qualified_nav_item_active');
        } else if (index === 1) {
            navQualifiedTip.style.left = 325 + 'px';
            addCls(navQualifiedItems[1], 'screen-intro__qualified_nav_item_active');
            delCls(navQualifiedItems[0], 'screen-intro__qualified_nav_item_active');
            delCls(navQualifiedItems[2], 'screen-intro__qualified_nav_item_active');
        } else {
            navQualifiedTip.style.left = 550 + 'px';
            addCls(navQualifiedItems[2], 'screen-intro__qualified_nav_item_active');
            delCls(navQualifiedItems[0], 'screen-intro__qualified_nav_item_active');
            delCls(navQualifiedItems[1], 'screen-intro__qualified_nav_item_active');
        }
        mouseindex = navQualifiedItems[index].getAttribute("index");
        for (let i = 0; i < navQualifiedList.length; i++) {
            navQualifiedList[i].style.display = "none";
        }
        navQualifiedList[mouseindex].style.display = "block";
    }
};
for (let i = 0; i < navQualifiedItems.length; i++) {
    setQualifiedStyle(i, navQualifiedItems);
}


