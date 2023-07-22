

const DateTime = luxon.DateTime;
const currentDate = DateTime.now();
const dayString = currentDate.toFormat('cccc, LLL dd');
document.getElementById("real_time").innerHTML = dayString;



let doList = [];
let doneList = [];
let maxID;
function addNewList(event) {
    event.preventDefault();
    icons.classList.remove("icons");
    if(doList.length != 0) {
        maxID = Math.max(...doList.map(item => item.id));
    } else {
        maxID = 0;
    }
    console.log(maxID);
    doList.push({
        id: maxID + 1,
        content: ipt_addList.value,
        isLiked: false
    });
    localStorage.setItem('doList_storage', JSON.stringify(doList));
    u_list.innerHTML="";
    displayDoList();
}
displayDoList();
displayDoneList();
checkLength();
function displayDoList() {
    doList = JSON.parse(localStorage.getItem('doList_storage'));
    doList = sortList(doList);

    for(let x of doList) {

        let li = document.createElement("li");
        li.setAttribute("id", x.id)


        let check_box = document.createElement("input");
        check_box.setAttribute("type", "checkbox")
        check_box.addEventListener("click", complete);
        li.appendChild(check_box);

        li.append(x.content);

        let star = document.createElement("i");
        star.setAttribute("class", "fa fa-light fa-star");
        star.addEventListener("click", favorite);
        if(x.isLiked==true) {
            star.classList.add("liked")
        } else {
            star.classList.remove("liked")
        }

        li.appendChild(star);
        u_list.appendChild(li);
        ipt_addList.value="";
    }
}
function complete() {
    doneList = [...doneList, doList.find(x => x.id == this.parentElement.id)]
    localStorage.setItem('doneList_storage', JSON.stringify(doneList));
    
    doList = doList.filter(x => x.id != this.parentElement.id);
    localStorage.setItem('doList_storage', JSON.stringify(doList));

    document.querySelector(".hr").classList.remove("active");
    done_list.innerHTML="";
    displayDoneList();
}
function displayDoneList() {
    doneList = JSON.parse(localStorage.getItem('doneList_storage'));
    doneList = sortList(doneList);
    console.log(doneList);
    for(let x of doneList) {
        let input2 = document.createElement("input");
        input2.setAttribute("type", "checkbox")
        input2.setAttribute("checked", "checked")
        input2.addEventListener("click",unComplete);

        let star = document.createElement("i");
        star.setAttribute("class", "fa fa-light fa-star");
        star.addEventListener("click", favorite);
        if(x.isLiked==true) {
            star.classList.add("liked")
        } else {
            star.classList.remove("liked")
        }

        let li = document.createElement("li");
        li.setAttribute("id", x.id);
        li.classList.add("complete");
        li.appendChild(input2);
        li.append(x.content);
        li.appendChild(star);
        done_list.appendChild(li);
        u_list.innerHTML="";
        displayDoList();
    }
}
function unComplete(){
    doList=[...doList, doneList.find(x => x.id == this.parentElement.id)];
    localStorage.setItem('doList_storage', JSON.stringify(doList));

    doneList = doneList.filter(x=>x.id!=this.parentElement.id);
    localStorage.setItem('doneList_storage', JSON.stringify(doneList));
    
    doList = sortList(doList);
    
    if(doneList.length == 0) {
        document.querySelector(".hr").classList.add("active");
    }

    u_list.innerHTML="";
    displayDoList();

    done_list.innerHTML="";
    displayDoneList();
}

function sortList(list) {
    return list.sort((a,b) => a.id - b.id);
}
function favorite() {
    for(let x of doList) {
        if(x.id == this.parentElement.id){
            this.classList.toggle("liked");
            x.isLiked = !x.isLiked;
        }
    }
    for(let x of doneList) {
        if(x.id == this.parentElement.id){
            this.classList.toggle("liked");
            x.isLiked = !x.isLiked;
        }
    }
}
function moreIcons() {
    icons.classList.add("icons");
}

reset.addEventListener("click",clear) 
function clear() {
    doList=[];
    localStorage.setItem('doList_storage', JSON.stringify(doList));
    u_list.innerHTML="";
    displayDoList();

    doneList = [];
    localStorage.setItem('doneList_storage', JSON.stringify(doneList));
    done_list.innerHTML="";
    displayDoneList();

    document.querySelector(".hr").classList.add("active");

}
function checkLength() {
    if(doneList.length != 0 && doList.length != 0) {
        document.querySelector(".hr").classList.remove("active");
    }
}