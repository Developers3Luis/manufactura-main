$("#buscarInSelect").keyup(function(){
    buscarSelect();
});
$("#buscarInSelectOrg").keyup(function(){
    buscarSelectorg();
});



// login
$('.error-page').hide(0);

$('.login-button , .no-access').click(function(){
  // $('.login').slideUp(500); 
});

$('.try-again').click(function(){
  $('.error-page').hide(0);
  $('.login').slideDown(1000);
});
//End login



$( document ).ready(function() { 

    var name = "error";
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);

    var nameOrigen = "origen";
    nameOrigen = nameOrigen.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regexOrigen = new RegExp("[\\?&]" + nameOrigen + "=([^&#]*)"),
    resultsOrigen = regexOrigen.exec(location.search);  
    try {
      var origen = decodeURIComponent(resultsOrigen[1].replace(/\+/g, " ")); 
      var mensageError = "";
      var codeError = decodeURIComponent(results[1].replace(/\+/g, " "));
      switch (codeError) {
          case "11000" :
              mensageError = "El email que intentas guardar ya fue registrado."
            break; 
          default:
              mensageError = "Error desconocido " + codeError; 
            break; 
        } 
      results === null ? "" :  document.getElementById('errorParameter').innerHTML='<div class="alert alert-danger" role="alert"><p>Error originado en ' + origen  +": "+  mensageError + '</p></div> '  ;
    } catch (error) {
      
    } 
})

