function confirmarElinacion(nameForm){
                    var opcion = confirm("¿Deseas Eliminar este registro?");
                    if (opcion == true) { 
                        document.getElementById(nameForm).submit();
                    }    
    }

    function buscarSelect()
    {   
        try {
            var select=document.getElementById("elementos"); 
            var buscar=document.getElementById("buscarInSelect").value; 
            var mejorIndex = 10000; 
            for(var i=1;i<select.length;i++)
            {
                if(buscar.length > 0){
                    if(select.options[i].text.lastIndexOf(buscar.toUpperCase()) > -1)
                    { 
                        if(select.options[i].text.lastIndexOf(buscar.toUpperCase()) < mejorIndex ){
                            select.selectedIndex=i;
                            mejorIndex = select.options[i].text.lastIndexOf(buscar.toUpperCase());
                        }  
                    } 
                }
            }
            buscar == "";
            if(mejorIndex == 10000 ){
                select.selectedIndex=-1; 
                var $selectMolde = $('#RF_ID_Molde_ID'); 
                $selectMolde.empty();
                $selectMolde.append('<option value=0 >Sin Moldes</option>');
            }else{
                llenarComboMolde();    
            }
        } catch (error) {
             
        } 
    }

    
    function buscarSelectorg()
    {
        
        var select=document.getElementById("ad_org_id"); 
        var buscar=document.getElementById("buscarInSelectOrg").value; 
        var mejorIndex = 10000; 
        for(var i=1;i<select.length;i++)
        {  
            if(buscar.length > 0){
                if(select.options[i].text.lastIndexOf(buscar.toUpperCase()) > -1)
                { 
                    if(select.options[i].text.lastIndexOf(buscar.toUpperCase()) < mejorIndex ){
                        select.selectedIndex=i;
                        mejorIndex = select.options[i].text.lastIndexOf(buscar.toUpperCase());
                    }  
                } 
            } 
         
        }
        if(mejorIndex == 10000 ){
            select.selectedIndex=-1; 
        }        
    }


    function buscarSelectwarehouse()
    {
        
        var select=document.getElementById("m_warehouse_id"); 
        var buscar=document.getElementById("buscarInSelectwarehouse").value; 
        var mejorIndex = 10000; 
        for(var i=1;i<select.length;i++)
        {  
            if(buscar.length > 0){
                if(select.options[i].text.lastIndexOf(buscar.toUpperCase()) > -1)
                { 
                    if(select.options[i].text.lastIndexOf(buscar.toUpperCase()) < mejorIndex ){
                        select.selectedIndex=i;
                        mejorIndex = select.options[i].text.lastIndexOf(buscar.toUpperCase());
                    }  
                } 
            } 
         
        }
        if(mejorIndex == 10000 ){
            select.selectedIndex=-1; 
        }        
    }


    function buscarSelectad_users(input)
    {  
        var select=document.getElementById("ad_users"); 
        var buscar=input.value; 
        var mejorIndex = 10000; 

        for(var i=1;i<select.length;i++)
        {   
            if(buscar.length > 0){ 
                if(select.options[i].text.toUpperCase().lastIndexOf(buscar.toUpperCase()) > -1)
                { 
                    if(select.options[i].text.toUpperCase().lastIndexOf(buscar.toUpperCase()) < mejorIndex ){
                        select.selectedIndex=i;
                        mejorIndex = select.options[i].text.toUpperCase().lastIndexOf(buscar.toUpperCase());
                    }  
                } 
            } 
        
        }
        if(mejorIndex == 10000 ){
            select.selectedIndex=-1; 
        }        
    }
     
    function buscarSelectLaminador()
    { 
       
        var select=document.getElementById("hr_employe_id"); 
        var buscar=document.getElementById("buscarInSelecthr_employe_id").value;  
        var mejorIndex = 10000; 
        for(var i=1;i<select.length;i++)
        {  
            if(buscar.length > 0){
                if(select.options[i].text.lastIndexOf(buscar.toUpperCase()) > -1)
                { 
                    if(select.options[i].text.lastIndexOf(buscar.toUpperCase()) < mejorIndex ){
                        select.selectedIndex=i;
                        mejorIndex = select.options[i].text.lastIndexOf(buscar.toUpperCase());
                    }  
                } 
            }   
        }
        if(mejorIndex == 10000 ){
            select.selectedIndex=-1; 
        }        
    }
 
    function getUserFillForm()
    { 
        var select=document.getElementById("ad_users");  
        console.log( select.value ); 
        var jsonUser = JSON.parse(select.value);
        console.log(jsonUser ); 
        try { 

            document.getElementById("firstname").value = jsonUser.name;
            document.getElementById("lastname").value = jsonUser.name2;
            document.getElementById("user").value = jsonUser.value;
            document.getElementById("mail").value = jsonUser.email; 
            document.getElementById("password").value = "hoods"; 
            document.getElementById("ad_user_id").value = jsonUser.ad_user_id; 

        } catch (error) {
             console.log(error);
        } 
      
    }
    
 