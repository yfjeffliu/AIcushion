let hour = 0;
let minute = 0;
let second = 0;
function setHour(){
    hour = parseInt(document.getElementById("setHour").value)
    console.log(hour)
}
function setSecond(){
    let setSecond = document.getElementById("setSecond")
    second = parseInt(setSecond.value)
    console.log(setSecond)
    if(second>=60){
        second = 59
        //調整該項目
        setSecond.value = 59
    }
    console.log(second)
}
function setMinute(){
    let setMinute = document.getElementById("setMinute") 
    minute = parseInt(setMinute.value)
    if(minute>=60){
        minute = 59
        //調整該項目
        setMinute.value = 59
    }
}

var audio;
let timer = 0;
function startCounting(){
    //確保value沒跑掉
    console.log("startCounting");
    setHour =  document.getElementById("setHour")
    setSecond =  document.getElementById("setSecond")
    setMinute =  document.getElementById("setMinute")
    hour = parseInt(setHour.value)
    second = parseInt(setSecond.value)
    minute = parseInt(setMinute.value)
    if(hour === 0 && second === 0 && minute === 0){
        console.log("不會執行")
    }else{
        timer = window.setInterval("Check_Time()", 1000);
        //將input field屬性做更改 不能更改 且可以改變樣式
        setHour.setAttribute('disabled','disabled')
        setMinute.setAttribute('disabled','disabled')
        setSecond.setAttribute('disabled','disabled')
        //改變button樣式讓其能夠呼叫中斷時間的方法
        const start = document.getElementById("start")
        const reset = document.getElementById("reset")
        start.innerHTML ="暫停"
        start.setAttribute('onclick','stopCounting()')
        start.setAttribute('class',"btn btn-danger")
        reset.setAttribute('onclick','reset()')
        reset.innerHTML = "重設"
        reset.setAttribute('class',"btn btn-dark")
	audio = new Audio('./Sneaky-Cat.mp3');
    }
}
var param = '';
var searchParams = new URLSearchParams(window.location.search);
var param = searchParams.get('name');
var sit = 1;
//const audio = new Audio("./Sneaky-Cat.mp3");
function Check_Time() {
    //check到了沒有
    if(hour === 0 && second === 0 && minute === 0){
	//let audio = new Audio("./Sneaky-Cat.mp3");
        audio.play();
        alert("時間到了")
        audio.pause()
        stopCounting()
        return
    }
    var settings = {
	  "url": "/getdata",
	  "method": "POST",
	  "timeout": 0,
	  "headers": {
	  "Content-Type": "application/x-www-form-urlencoded"
	  },
	  "data": {
	  "user": param
  	}
    };
    
    $.ajax(settings).done(function (response) {
//    console.log(response.result)
    if (response.result == '0'){
    	sit = 0;
    }else{
    	sit = 1;
    }
    });
//	console.log(sit)
    if (sit == 1){
	    second -= 1;
    }
    //second -=1
    if(second === -1 ){ //如果秒數是-1代表減過頭了
        second = 59 //換秒
        minute-=1 //扣除minute
    }
    if(minute === -1 ){ //如果秒數是-1代表減過頭了
        minute = 59 //換分
        hour-=1 //扣除小時
    }
    let htmlHour = document.getElementById("setHour")
    let htmlSecond = document.getElementById("setSecond")
    let htmlMinute = document.getElementById("setMinute")
    htmlHour.value = hour
    htmlMinute.value = minute
    htmlSecond.value = second
}

function stopCounting(){
    clearInterval(timer)
    document.getElementById("setHour").removeAttribute('disabled')
    document.getElementById("setSecond").removeAttribute('disabled')
    document.getElementById("setMinute").removeAttribute('disabled')
    const start = document.getElementById("start")
    const reset = document.getElementById("reset")
    start.innerHTML ="開始"
    start.setAttribute('onclick','startCounting()')
    start.setAttribute('class',"btn btn-success")
    reset.setAttribute('onclick','addMinute()')
    reset.innerHTML = "增加一分鐘"
    reset.setAttribute('class',"btn btn-primary")
}


function addMinute(){
    minute +=1
    if(minute>59){
        minute = 0
        hour +=1
    }
    let htmlHour = document.getElementById("setHour")
    let htmlMinute = document.getElementById("setMinute")
    htmlHour.value = hour
    htmlMinute.value = minute
}
function reset(){
    document.getElementById("setHour").value = 0
    document.getElementById("setSecond").value = 0
    document.getElementById("setMinute").value = 0
    stopCounting()
}
