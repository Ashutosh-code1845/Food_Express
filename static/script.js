// For testing script execution
console.log("Hello World")

// main function to perform
$('#query').focus(function() {
    $('#query').keypress((e)=>{
        if(e.keyCode===13){
            console.log(e.keyCode)
            $('.btn2').click();
        }
    })
  });