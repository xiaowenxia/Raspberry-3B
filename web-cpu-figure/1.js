$(function () {
    $.get("cmd",function(data,status){
    alert("Data: " + data + "nStatus: " + status);
    });
});