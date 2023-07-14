

const DateTime = luxon.DateTime;
const currentDate = DateTime.now();
const dayString = currentDate.toFormat('cccc, LLL dd');
document.getElementById("real_time").innerHTML = dayString;

let doList = [
    { id: 1, content: "1. Wake up" },
    { id: 2, content: "2. Gym" },
    { id: 3, content: "3. Have breakfast" },
    { id: 4, content: "4. Drink coffee" },
    { id: 5, content: "5. Takw a nap" },
    { id: 6, content: "6. Finish work" }
];

let no =0;
let doneList = [];

function addNewList(event) {
    event.preventDefault();
    const maxID = Math.max(...doList.map(item => item.id));
    doList.push({
        id: maxID + 1,
        content: ipt_addList.value
    });
    console.log(doList);
    u_list.innerHTML="";
    displayDoList();
}
displayDoList();
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

        li.appendChild(star);
        u_list.appendChild(li);
        ipt_addList.value="";
    }
}
function complete() {
    doneList = [...doneList, {id: this.parentElement.id, content: this.parentElement.textContent}]
    doneList = sortList(doneList);

    doList = doList.filter(x => x.id !== this.parentElement.id);
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

        let li = document.createElement("li");
        li.setAttribute("id", x.id);
        li.classList.add("complete");
        li.appendChild(input2);
        li.append(x.content);
        done_list.appendChild(li);
        u_list.innerHTML="";
        displayDoList();
    }
}
function unComplete(){

    doList=[...doList, {id: this.parentElement.id, content: this.parentElement.textContent}];
    doList = sortList(doList);
    doneList = doneList.filter(x=>x.id!=this.parentElement.id);

    if(doneList.length == 0) {
        document.querySelector(".hr").classList.add("active");
    }

    u_list.innerHTML="";
    displayDoList();

    done_list.innerHTML="";
    displayDoneList();
}

/**
 *
 * @param {Array} list
 * @returns {*}
 */
function sortList(list) {
    return list.sort((a,b) => a.id - b.id);
}
function favorite() {
    for(let x of doList) {
        if(x.id == this.parentElement.id){
            this.classList.toggle("liked");
        }
    }

}
