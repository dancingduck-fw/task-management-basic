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