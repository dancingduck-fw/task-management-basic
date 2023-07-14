var today = new Date();
var current_day = today.getDay();
var day_name = '';
switch (current_day) {
case 0:
    day_name = "Sunday";
    break;
case 1:
    day_name = "Monday";
    break;
case 2:
    day_name = "Tuesday";
    break;
case 3:
    day_name = "Wednesday";
    break;
case 4:
    day_name = "Thursday";
    break;
case 5:
    day_name = "Friday";
    break;
case 6:
    day_name = "Sartuday";
}

var mon_name = '';
current_mon = today.getMonth()+1;
switch (current_mon) {
    case 1:
        mon_name = "Jan";
        break;
    case 2:
        mon_name = "Feb";
        break;
    case 3:
        mon_name = "Mar";
        break;
    case 4:
        mon_name = "Apr";
        break;
    case 5:
        mon_name = "May";
        break;
    case 6:
        mon_name = "Jun";
    case 7:
        mon_name = "Jul";
        break;
    case 8:
        mon_name = "Aug";
        break;
    case 9:
        mon_name = "Sept";
        break;
    case 10:
        mon_name = "Oct";
        break;
    case 11:
        mon_name = "Nov";
        break;
    case 12:
        mon_name = "Dec";
}
var date = day_name+', '+ mon_name +' '+today.getDate();
document.getElementById("real_time").innerHTML = date;



let doList=[
{id: 1, content: "1Wake up"},{id: 2, content: "2Gym"},{id: 3, content: "3Have breakfast"},{id: 4, content: "4Drink coffee"},{id: 5, content: "5Takw a nap"},{id: 6, content: "6Finish work"}
];
let no =0;
let doneList = [];

function addNewList(event) {
    event.preventDefault();
    let arr =[];
    for(let x of doList) {
        arr.push(x.id);
    }
    let maxID = Math.max(...arr);
    doList = [...doList,{id: maxID+1, content: ipt_addList.value} ]
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
    
    doList = doList.filter(x=>x.id!=this.parentElement.id)
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

function sortList(list) {
    for(let i = 0; i<list.length-1 ;i++) {
        for(let j =i+1; j<list.length;j++){
            if(list[i].id < list[j].id) {
                let c = list[i]
                list[i] =list[j];
                list[j] = c;
            }
        }
    }
    return list
}
function favorite() {
    for(let x of doList) {
        if(x.id == this.parentElement.id){
            this.classList.toggle("liked");
        }
    }
    
}
