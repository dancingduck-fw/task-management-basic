

const DateTime = luxon.DateTime;
const currentDate = DateTime.now();
const dayString = currentDate.toFormat('cccc, LLL dd');
document.getElementById("real_time").innerHTML = dayString;

let doList = [
    { id: 1, content: "Wake up", isLiked: true },
    { id: 2, content: "Gym", isLiked: false },
    { id: 3, content: "Have breakfast",isLiked: true },
    { id: 4, content: "Drink coffee",isLiked: false },
    { id: 5, content: "take a nap",isLiked: true },
    { id: 6, content: "Finish work",isLiked: false }
];

let no =0;
let doneList = [];

function addNewList(event) {
    event.preventDefault();
    const maxID = Math.max(...doList.map(item => item.id));
    doList.push({
        id: maxID + 1,
        content: ipt_addList.value,
        isLiked: false
    });
    u_list.innerHTML="";
    displayDoList();
}
displayDoList();
displayDoneList();
function displayDoList() {
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
    doneList = sortList(doneList);

    doList = doList.filter(x => x.id != this.parentElement.id);

    document.querySelector(".hr").classList.remove("active");
    done_list.innerHTML="";
    displayDoneList();
}
function displayDoneList() {
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
    doneList = doneList.filter(x=>x.id!=this.parentElement.id);
    
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
