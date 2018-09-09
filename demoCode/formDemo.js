$("#submit").on("click",function(e){
  e.preventDefault();
  var data = $("form").serializeJSON();
  console.log(data);
  console.log(JSON.stringify(data));
  
});