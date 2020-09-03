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

let navItems = getAllElem('.header__nav-item');
let navTip = getElem('.header__nav-tip');
let subjectItems = getAllElem('.screen-4__subject_item');
let itemSubjectBtn = getAllElem('.screen-4__subject_btn');
// let gradeItems = getAllElem('.screen-3__grade__item');
// let itemGradeName = getAllElem('.screen-3__grade__item_classname');
// let itemGradeBtn = getAllElem('.screen-3__grade__item_btn');
// let schoolItems = getAllElem('.screen-7__school__menu_item');
// let schoolIntro = getAllElem('.screen-7__school__inner_box');
let schoolsTip = getElem('.screen-7_school__item_tip_active');
let schoolItems = getClsName("screen-7__school__menu_item");
let schoolIntro = getClsName("screen-7__school__inner_box");
let projectTip = getElem('.screen-3__nav_tip_active');
let projectItems = getClsName("screen-3__nav__item");
let projectList = getClsName("screen-3__item_list");
let registerTip = getElem('.screen-5__nav_tip_active');
let registerItems = getClsName("screen-5__nav__item");
let registerList = getClsName("screen-5__item_form");
let cooperateTip = getElem('.screen-7__nav_tip_active');
let cooperateItems = getClsName("screen-7__nav__item");
let cooperateList = getClsName("screen-7__item_content");
// let bannerList = $('banner').getElementsByTagName("div");
// let bannerDots = $("dots").getElementsByTagName("span");
let bannerDots = getAllElem('.screen-6__bases_dot');
let bannerList = getAllElem('.screen-6__bases_intro_item');
let mouseindex = null;
let isUserName = false,
    isUserTel = false,
    isUserEmail = false;
let items = getAllElem(".screen-6__input_tip");
let userName = $('name');
let userTel = $('phone');
let userEmail = $('email');
let submitBtn = $('submitbtn');
let bannerNext = $('next');
let bannerPrev = $('prev');
let input = document.getElementsByTagName("input");
let idx = 0;

function changImg() {
    bannerList[1].style.display = "block";
    //遍历所有图片,将图片隐藏,将圆点上的类清楚
    for (let i = 0; i < bannerList.length; i++) {
        bannerList[i].style.display = "none";
        delCls(bannerDots[i], 'screen-6__bases_dots_active');
    }
    bannerList[idx].style.display = "block";
    addCls(bannerDots[idx], 'screen-6__bases_dots_active');
}

addHandler(bannerNext, "click", function () {
    idx++;
    if (idx >= bannerList.length) idx = 0;
    changImg();
});

addHandler(bannerPrev, "click", function () {
    idx--;
    if (idx < 0) idx = bannerList.length - 1;
    changImg();
});

for (let i = 0; i < bannerList.length; i++) {
    bannerDots[i].setAttribute("data-id", i);
    addHandler(bannerDots[i], "click", function () {
        idx = this.getAttribute("data-id");
        changImg();
    })
}

let setCooperateStyle = (index, lib) => {
    cooperateItems[index].setAttribute("index", index);
    lib[index].onclick = () => {
        if (index === 0) {
            cooperateTip.style.left = 380 + 'px';
            addCls(cooperateItems[0], 'screen-7__nav_item_active');
            delCls(cooperateItems[1], 'screen-7__nav_item_active');
            delCls(cooperateItems[2], 'screen-7__nav_item_active');
        } else if (index === 1) {
            cooperateTip.style.left = 526 + 'px';
            addCls(cooperateItems[1], 'screen-7__nav_item_active');
            delCls(cooperateItems[0], 'screen-7__nav_item_active');
            delCls(cooperateItems[2], 'screen-7__nav_item_active');
        } else {
            cooperateTip.style.left = 672 + 'px';
            addCls(cooperateItems[2], 'screen-7__nav_item_active');
            delCls(cooperateItems[0], 'screen-7__nav_item_active');
            delCls(cooperateItems[1], 'screen-7__nav_item_active');
        }
        mouseindex = cooperateItems[index].getAttribute("index");
        for (let i = 0; i < cooperateList.length; i++) {
            cooperateList[i].style.display = "none";
        }
        cooperateList[mouseindex].style.display = "block";
    }
};
for (let i = 0; i < cooperateItems.length; i++) {
    setCooperateStyle(i, cooperateItems);
}

let setRegisterStyle = (index, lib) => {
    registerItems[index].setAttribute("index", index);
    lib[index].onclick = () => {
        if (index === 0) {
            registerTip.style.left = 150 + 'px';
            addCls(registerItems[0], 'screen-5__nav_item_active');
            delCls(registerItems[1], 'screen-5__nav_item_active');

        } else {
            registerTip.style.left = 300 + 'px';
            addCls(registerItems[1], 'screen-5__nav_item_active');
            delCls(registerItems[0], 'screen-5__nav_item_active');
        }
        mouseindex = registerItems[index].getAttribute("index");
        for (let i = 0; i < registerList.length; i++) {
            registerList[i].style.display = "none";
        }
        registerList[mouseindex].style.display = "block";
    }
};
for (let i = 0; i < registerItems.length; i++) {
    setRegisterStyle(i, registerItems);
}

// 导航条
let setTip = (index, lib) => {
    lib[index].onmouseover = () => {
        navTip.style.left = (index * 170) + 'px';
        if (index !== 0) {
            delCls(navItems[0], 'header__nav-item_status_active');
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
        navTip.style.left = (currentIdx * 170) + 'px';
        addCls(navItems[currentIdx], 'header__nav-item_status_active');
    }
};
for (let i = 0; i < navItems.length; i++) {
    setTip(i, navItems);
}


// 项目介绍
// let setGradeStyle = (index, lib) => {
//     lib[index].onmouseover = () => {
//         addCls(itemGradeName[index], 'screen-3__grade__item_classname_active');
//         addCls(itemGradeBtn[index], 'screen-3__grade__item_btn_active');
//     };
//     lib[index].onmouseout = () => {
//         delCls(itemGradeName[index], 'screen-3__grade__item_classname_active');
//         delCls(itemGradeBtn[index], 'screen-3__grade__item_btn_active');
//     };
// };
// for (let i = 0; i < gradeItems.length; i++) {
//     setGradeStyle(i, gradeItems);
// }

let setProjectStyle = (index, lib) => {
    projectItems[index].setAttribute("index", index);
    lib[index].onclick = () => {
        if (index === 0) {
            projectTip.style.left = 335 + 'px';
            addCls(projectItems[0], 'screen-3__nav_item_active');
            delCls(projectItems[1], 'screen-3__nav_item_active');

        } else {
            projectTip.style.left = 600 + 'px';
            addCls(projectItems[1], 'screen-3__nav_item_active');
            delCls(projectItems[0], 'screen-3__nav_item_active');
        }
        mouseindex = projectItems[index].getAttribute("index");
        for (let i = 0; i < projectList.length; i++) {
            projectList[i].style.display = "none";
        }
        projectList[mouseindex].style.display = "block";
    }
};
for (let i = 0; i < projectItems.length; i++) {
    setProjectStyle(i, projectItems);
}

// 科目选择
let setSubjectStyle = (index, lib) => {
    lib[index].onmouseover = () => {
        addCls(itemSubjectBtn[index], 'screen-4__subject_btn_active');
    };
    lib[index].onmouseout = () => {
        delCls(itemSubjectBtn[index], 'screen-4__subject_btn_active');
    };
};
for (let i = 0; i < subjectItems.length; i++) {
    setSubjectStyle(i, subjectItems);
}

// 选择学校
let setSchoolTip = (index, lib) => {
    schoolItems[index].setAttribute("data-index", index);
    lib[index].onmouseover = () => {
        mouseindex = schoolItems[index].getAttribute("data-index");
        for (let j = 0; j < schoolIntro.length; j++) {
            schoolIntro[j].style.display = "none";
            schoolItems[j].style.color = "#2c2926";
        }
        schoolIntro[mouseindex].style.display = "block";
        schoolItems[mouseindex].style.color = "#f08305";
        schoolsTip.style.top = (index * 47) + 'px';
    }
};
for (let i = 0; i < schoolItems.length; i++) {
    setSchoolTip(i, schoolItems);
}

// 表单验证
userName.onblur = function () {
    items[0].style.display = "block";
    let reg = /[\u4e00-\u9fa5_a-zA-Z0-9_]{1,10}/;
    if (this.value === "") {
        items[0].innerHTML = "请您务必写入用户名!";
        items[0].style.color = "red";
    } else {
        if (!reg.exec(userName.value)) {
            items[0].innerHTML = "请您输入正确的名字格式";
            items[0].style.color = "red";
        } else {
            items[0].innerHTML = " ";
            isUserName = true;
        }
    }
};
userTel.onblur = function () {
    items[1].style.display = "block";
    let reg = /^\d{11}$/;
    if (this.value === "") {
        items[1].innerHTML = "请您务11位手机号码!";
        items[1].style.color = "red";
    } else {
        if (!reg.exec(userTel.value)) {
            items[1].innerHTML = "请您务11位手机号码";
            items[1].style.color = "red";
        } else {
            items[1].innerHTML = " ";
            isUserTel = true;
        }
    }
};
userEmail.onblur = function () {
    items[2].style.display = "block";
    let reg = /^\w+@\w+.[a-zA-Z]{2,3}(.[a-zA-Z]{2,3})?$/;
    if (this.value === "") {
        items[2].innerHTML = "请您务必写入邮箱!";
        items[2].style.color = "red";
    } else {
        if (!reg.exec(userEmail.value)) {
            items[2].innerHTML = "请输入邮箱正确格式";
            items[2].style.color = "red";
        } else {
            items[2].innerHTML = " ";
            isUserEmail = true;
        }
    }
};
submitBtn.onclick = function () {
    if (isUserName === true && isUserTel === true && isUserEmail === true) {
        alert(" 信息提交成功! ");
        $.ajax({
            type: "POST",
            url: "",
            data: {
                params: {
                    name: userName.value,
                    phone: userTel.value,
                    email: userEmail.value
                }
            },
            success: function (params) {
                alert(params);
            },
            error: function () {
                alert("error");
            }
        });
    } else {
        alert(' 您的信息有误! ');
    }
};

