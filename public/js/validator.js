function validatePasswords() { 
    var form = document.getElementById('formChangePassword') ;
    password1 = form.passwordNew.value; 
    var password2 = "";
    var errorParameter = document.getElementById('errorParameter');
    var div = "<div class='alert alert-danger' role='alert'><p> ---- </p></div>";
    userType = form.usertype.value;  

    if(userType === 'Admin'){
        if (password1 == '') {
            errorParameter.innerHTML = div.replace("----","Por favor ingresa una contraseña correcta"); 
        }else{
            form.submit(); 
        } 
    }
    else
    {
         password2 = form.passwordNewRep.value;  
        if (password1 == '') 
            errorParameter.innerHTML = div.replace("----","Por favor ingresa una contraseña correcta"); 
        else if (password2 == '') 
            errorParameter.innerHTML = div.replace("----","por favor confirma la contraseña"); 
        else if (password1 != password2) 
            errorParameter.innerHTML = div.replace("----","Las contraseñas no coinciden.."); 
        else   
            form.submit();  
    } 
} 
function deleteAlertDanger() {  
    document.getElementById('errorParameter').innerHTML = "";
} 