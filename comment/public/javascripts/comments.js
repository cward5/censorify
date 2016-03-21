$(document).ready(function(){
    $("#serialize").click(function(){
        var myobj = {Name:$("#Name").val(),Comment:$("#Comment").val()};
        jobj = JSON.stringify(myobj);
        $("#json").text(jobj);
        var url = "comment";
        $.ajax({
          url:url,
          type: "POST",
          data: jobj,
          contentType: "application/json; charset=utf-8",
          success: function(data,textStatus) {
            $("#done").html(textStatus);
          }
        })
    });
    $("#getThem").click(function() {
      console.log("Start of getThem");
      $.getJSON('/comment', function(data) {
        console.log("Beginning of JSON stuff");
        console.log(data);
        var everything = "<ul>";
        for(var comment in data) {
          com = data[comment];
          everything += "<li>Name: " + com.Name + " -- Comment: " + com.Comment + "</li>";
        }
        everything += "</ul>";
        $("#comments").html(everything);
      })
	console.log("After JSON stuff.");
    });
    $("#remove").click(function(){
        console.log("trying to remove");
        var myobj = {Name:$("#Name").val(),Comment:$("#Comment").val()};
        jobj = JSON.stringify(myobj);
        $("#json").text(jobj);
        var url = "remove";
        $.ajax({
          url:url,
          type: "POST",
          data: jobj,
          contentType: "application/json; charset=utf-8",
          success: function(data,textStatus) {
            $("#done").html(textStatus);
          }
        })
    });
});