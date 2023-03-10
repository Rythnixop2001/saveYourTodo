async function making() {
    document.getElementsByClassName("todoContainer")[0].insertAdjacentHTML('afterbegin', "<div class='inputTodo'><div class='titleHeading'><span>Create a new todo</span><i class='fa-solid fa-xmark' title ='click to cancel'></i></div><div class='title'><label for='titleContainer'>Title</label><input type='text' class = 'inpTitle' id='titleContainer'></div><div class='description'><label for='descContainer'>Description</label><textarea id='descContainer' class = 'desCon' cols='30' rows='10'></textarea></div><button type='button' class='createTodoBtn'>Add a new todo</button></div>");
}

async function deleteEle() {
    document.getElementsByClassName("inputTodo")[0].remove();
    document.getElementById("popupMsg").className = "showpopUp";
    document.getElementsByClassName("showpopUp")[0].innerHTML = "Cancel new todo list!"
    setTimeout(() => {
        document.getElementById("popupMsg").classList.remove("showpopUp");
    }, 3000);
}

class recordTodo {
    static count = 0;
    static counting1() {
        return this.count++;
    }
};

async function insertFunc(count) {
    let dash = "-";
    localStorage.setItem("title" + count, document.getElementsByClassName("inpTitle")[0].value);
    localStorage.setItem("description" + count, document.getElementsByClassName("desCon")[0].value);
    localStorage.setItem("time" + count, new Date().getDay() + "-" + new Date().getHours() + "-" + new Date().getMinutes() + "-" + new Date().getSeconds());
    document.getElementsByClassName("todoTitle")[count].innerHTML = localStorage.getItem("title" + count);
    document.getElementsByClassName("todoDes")[count].innerHTML = localStorage.getItem("description" + count);
    document.getElementsByClassName("wholeTime")[count].innerHTML = localStorage.getItem("time" + count);
}

// !this is onload function that automatically runs when page is reloaded itself or by others! 
// !basic data count from local storage!

async function editLocalStorageAndMakeTodo(index) {
    if (document.getElementById("reTitle").value != "") {
        localStorage.setItem("title" + index, document.getElementById("reTitle").value);
        document.getElementsByClassName("todoTitle")[index].innerHTML = localStorage.getItem("title" + index);
    }
    if (document.getElementById("reDes").value != "") {
        localStorage.setItem("description" + index, document.getElementById("reDes").value);
        console.log("index")
        document.getElementsByClassName("todoDes")[index].innerHTML = localStorage.getItem("description" + index);
    }
}

async function reEditContainer(index, class_name) {
    document.getElementsByClassName(class_name)[0].insertAdjacentHTML('beforeend', "<div class='reEditionTodo'><div class='tCont'><span>Edit Todo</span><i class='fa-solid fa-xmark' title ='click to cancel'></i></div><div class='title'><label for='reTitle'>Title</label><input type='text' class = 'inpTitle' id='reTitle'></div><div class='description'><label for='reDes'>Description</label><textarea id='reDes' class = 'desCon' cols='30' rows='10'></textarea></div><button type='button' class='saveEditBtn'>Save Edit</button></div>")
}

async function reEdit(index, class_name) {
    await reEditContainer(index, class_name);
    document.querySelector(".fa-xmark").addEventListener('click', function () {
        document.getElementsByClassName("reEditionTodo")[0].remove();
    })
    document.getElementsByClassName("saveEditBtn")[0].addEventListener('click', async function () {
        await editLocalStorageAndMakeTodo(index);
        document.getElementsByClassName("reEditionTodo")[0].remove();
    })
}

let a;

async function deleteSingleTodo(index) {
    if (confirm("Will you parmantlly delete \'" + localStorage.getItem("title" + index) + "\' ?")) {
        localStorage.removeItem("title" + index);
        localStorage.removeItem("description" + index);
        localStorage.removeItem("time" + index);
        localStorage.removeItem("elements" + index);
        document.getElementsByClassName("todoBox")[index].remove();
        return true;
    }
}

window.onload = async () => {
    a = 0;
    let btnCount = 0;
    let getElements = [], getTitles = [], getDes = [], getTime = [];

    while (localStorage.getItem("elements" + a) != null) {
        getElements[a] = localStorage.getItem("elements" + a);
        getTitles[a] = localStorage.getItem("title" + a);
        getDes[a] = localStorage.getItem("description" + a);
        getTime[a] = localStorage.getItem("time" + a);
        a++;
    }

    for (let i = 0; i < a; i++) {
        document.getElementsByClassName("todo-section")[0].insertAdjacentHTML('beforeend', getElements[i]);
        document.getElementsByClassName("todoTitle")[i].innerHTML = getTitles[i];
        document.getElementsByClassName("todoDes")[i].innerHTML = getDes[i];
        document.getElementsByClassName("wholeTime")[i].innerHTML = getTime[i];
    }

    let editArr = Array.from(document.querySelectorAll(".fa-pen"));
    if (editArr.length != 0) {
        for (let i in editArr) {
            editArr[i].addEventListener('click', function () {
                reEdit(i, "todo-section");
            })
        }
    }
    4
    let deleteArr = Array.from(document.querySelectorAll(".fa-trash"));
    if (deleteArr.length != 0) {
        for (let i in deleteArr) {
            deleteArr[i].addEventListener('click', async function () {
                let ret = await deleteSingleTodo(i);
                if (ret == true) {
                    a--;
                }
            })
        }
    }
}

let count1 = 0;
let getStorage;

async function saveTodo() {
    count1 = recordTodo.counting1() + a;

    // !make it as in local storage 
    localStorage.setItem("elements" + count1, "<div class='todoBox'><p class='todoTitle'></p><hr><p class='todoDes'></p><div class='TDcontainer'><div class='time'><span class='wholeTime'></div><div class ='editAndDelete'><i class='fa-solid fa-pen' title='Edit Todo'></i><i class='fa-solid fa-trash' title='Delete Todo'></i></div></div></div>")
    getStorage = localStorage.getItem("elements" + count1);

    // !call insert function!
    document.getElementsByClassName("todo-section")[0].insertAdjacentHTML('beforeend', getStorage);

    let countEditRedelared = Array.from(document.querySelectorAll(".fa-pen"));
    document.querySelectorAll(".fa-pen")[countEditRedelared.length - 1].addEventListener('click', async function () {
        await reEdit(countEditRedelared.length - 1, "todo-section");
    })

    let countDeleteRedelared = Array.from(document.querySelectorAll(".fa-trash"));
    document.querySelectorAll(".fa-trash")[countDeleteRedelared.length - 1].addEventListener('click', async function () {
        let ret = await deleteSingleTodo(countDeleteRedelared.length - 1);
        if (ret == true) {
            recordTodo.count--;
        }

    })

    await insertFunc(count1);
}

document.querySelector(".fa-plus").addEventListener('click', async function () {
    await making();

    document.querySelectorAll(".fa-xmark")[0].addEventListener('click', async function () {
        await deleteEle();
    })

    document.getElementsByClassName("createTodoBtn")[0].addEventListener('click', async function () {
        await saveTodo();
        document.getElementsByClassName("inputTodo")[0].remove();
    })
})

async function deleteAllTodo() {
    let todoBoxCnt = 0;
    while (document.getElementsByClassName("todoBox")[todoBoxCnt] != null) {
        todoBoxCnt++;
    }

    for (let i = todoBoxCnt - 1; i >= 0; i--) {
        document.getElementsByClassName("todoBox")[i].remove();
    }

    document.getElementById("popupMsg").className = "showpopUpMsg";
    document.getElementsByClassName("showpopUpMsg")[0].innerHTML = "Delete All todos!";
    setTimeout(() => {
        document.getElementById("popupMsg").classList.remove("showpopUpMsg");
    }, 3000);
}

//! this btn function will push all delete msg on screen for all delete btn! 

document.querySelector(".fa-trash-can").addEventListener('click', async function () {
    if (localStorage.length != 0) {
        if (confirm("Do you want to delete all todos?")) {
            localStorage.clear();
            await deleteAllTodo();
            recordTodo.count = 0;
            a = 0;
        }
    }
})

async function checkItems() {
    let strTitleArr = [];
    c = 0;

    //! collect all title data for search and get these indexes! 
    for (let i = 0; i < a + recordTodo.count; i++) {
        strTitleArr[c] = localStorage.getItem("title" + i);
        c++;
    }

    //! make input to lowercase for optimization
    let lwInput = document.getElementById("search").value.toLowerCase();

    let getIndex = [], indexCnt = 0;

    function makeFilter(str, index) {
        let lw = JSON.stringify(str).toLowerCase();
        for (let i = 0; i < str.length; i++) {
            let length = 0;
            for (let j = 0; j < lwInput.length; j++) {
                if (lw[i] === lwInput[j]) {
                    ++length;
                    i++;
                    if (length == lwInput.length) {
                        getIndex[indexCnt++] = index;
                        return str;
                    }
                } else {
                    break;
                }
            }
        }
    }
    let newArr = strTitleArr.filter(makeFilter);
    if (newArr.length != 0) {
        return getIndex;
    }
}

async function makeSearchItemShow() {
    document.getElementsByClassName("right")[0].innerHTML = "<div id ='showSearchItems'></div>";
    document.getElementById("showSearchItems").innerHTML = "<i class='fa-solid fa-rectangle-xmark'></i>";
}

function deleteShowBar() {
    document.getElementById("showSearchItems").remove();
    location.reload();
}

async function tryAndCatch() {
    if (document.getElementById("search").value == "") { }
    else {
        try {
            let arr = await checkItems();
            if (arr === undefined) {
                //! when get nothing then call from here
                await makeSearchItemShow();
                document.getElementById("showSearchItems").className = "showSearchNone";
                document.getElementsByClassName("showSearchNone")[0].insertAdjacentHTML('beforeend', "<div class='showOops'></div>");
                document.querySelector(".fa-rectangle-xmark").addEventListener('click', deleteShowBar);
            } else {
                //! when something get related then call from here
                await makeSearchItemShow();
                for (let i = 0; i < arr.length; i++) {
                    document.getElementById("showSearchItems").className = "showSearch";
                    document.getElementsByClassName("showSearch")[0].insertAdjacentHTML("beforeend", "<div class='todoBox'><p class='todoTitle'></p><hr><p class='todoDes'></p><div class='TDcontainer'><div class='time'><span class='wholeTime'></div><div class ='editAndDelete'><i class='fa-solid fa-pen' title='Edit Todo'></i></div></div></div>")
                    document.getElementsByClassName("todoTitle")[i].innerHTML = localStorage.getItem("title" + arr[i]);
                    document.getElementsByClassName("todoDes")[i].innerHTML = localStorage.getItem("description" + arr[i]);
                    document.getElementsByClassName("wholeTime")[i].innerHTML = localStorage.getItem("time" + arr[i]);
                }
                let getEditArr = Array.from(document.querySelectorAll(".fa-pen"));
                for (let i in getEditArr) {
                    getEditArr[i].addEventListener('click', async function () {
                        await reEdit(arr[i], "showSearch");
                    })
                }
                document.querySelector(".fa-rectangle-xmark").addEventListener('click', deleteShowBar);
            }
        } catch (err) { }
    }
}

document.getElementById("search").addEventListener('keypress', async function (event) {
    if (event.key === "Enter") {
        await tryAndCatch();
    }
})

document.querySelector(".fa-magnifying-glass").addEventListener('click', async function (event) {
    await tryAndCatch();
})