var i = 1;
function agregarFila(){
    try {
        var table = document.getElementById("tablaprueba");
        var tr = table.insertRow();
        tr.id = i;  
        var vm_product = document.getElementById("elementos"); 
        var vad_org_id = document.getElementById("ad_org_id"); 
        var vm_warehouse_id = document.getElementById("m_warehouse_id");
        var vcantidad = document.getElementById("cantidad").value; 
        var hr_employe_id = document.getElementById("hr_employe_id"); 
        var rf_id_molde_id = document.getElementById("RF_ID_Molde_ID");  

        var colorCol = ''; 
        for (let index = 0; index < i; index++) {
            if (colorCol == '') {   
                colorCol = 'style="background: #EEF5FA;"'; 
            } else{
                colorCol = '';
            } 
        }
        if(validaForm(vm_product.value,vad_org_id.value,vm_warehouse_id.value
            ,vcantidad,hr_employe_id.value,rf_id_molde_id.value)){
            // var td = tr.insertCell();
            var form = 
                '<form id="'+i+'" ><input type="hidden" id="ad_org_id'+i+'" value="'+ vad_org_id.value +'">' +
                '<input type="hidden" id="m_product_id'+i+'" value="'+ vm_product.value +'">' +
                '<input type="hidden" id="m_warehouse_id'+i+'" value="'+ vm_warehouse_id.value +'">' +
                '<input type="hidden" id="cantidad'+i+'" value="'+ vcantidad +'">' +
                '<input type="hidden" id="hr_employe_id'+i+'" value="'+ hr_employe_id.value   +'">' +
                '<input type="hidden" id="rf_id_molde_id'+i+'" value="'+ rf_id_molde_id.value   +'">' +
                '</form>' ;  
                let styleEmploye = colorCol;
                if (colorCol == '' && hr_employe_id[hr_employe_id.selectedIndex].text == "Sin Colaborador") {
                    styleEmploye = 'style="color:red;"'; 
                } 
                if (hr_employe_id[hr_employe_id.selectedIndex].text == "Sin Colaborador") {
                    styleEmploye = styleEmploye.replace(';',';color:red;'); 
                }  
            tr.innerHTML=   
                // '<td '+colorCol+' ><button type="button" style="border:none;background: none;width:100%" onclick="eliminarFila('+ i +')">'+ i +'<img src="../img/basura.png" style="width:100%"></button>'+ form +'</td>' +    
                '<td '+colorCol+' ><button type="button" style="background:none;border:none;"  onclick="eliminarFila('+ i +')"><img src="../img/basura.png" style="width:20px"></button>'+ form +'</td>' +    
                // '<td '+colorCol+' >'+   vad_org_id[vad_org_id.selectedIndex].text +'</td>' +
                '<td '+colorCol+' >'+   vm_warehouse_id[vm_warehouse_id.selectedIndex].text +'</td>' +
                '<td '+colorCol+' >'+ vm_product[vm_product.selectedIndex].text +'</td>' +
                '<td '+colorCol+' >'+ vcantidad +'</td>' +
                '<td '+styleEmploye+ '>' + hr_employe_id[hr_employe_id.selectedIndex].text  +'</td>' +
                '<td '+colorCol+' >' + 
                    ((rf_id_molde_id[rf_id_molde_id.selectedIndex].text)=="Selecciona Molde"
                    ||(rf_id_molde_id[rf_id_molde_id.selectedIndex].text)=="Sin Molde"
                    ? "Sin molde" : rf_id_molde_id[rf_id_molde_id.selectedIndex].text) +
                '</td>';
            i++;
            vm_product.value = "";
            rf_id_molde_id.value = "";
            var $selectMolde = $('#RF_ID_Molde_ID'); 
            $selectMolde.empty();
            $selectMolde.append('<option value=0 >Sin Moldes</option>'); 
        } 
        var csas = document.getElementById("lbcantidad");  
        csas.value = document.getElementById("tablaprueba").rows.length - 1;
    } catch (error) {
        console.log(error);
           
    } 
  }
function validaForm(vm_product,vad_org_id,vm_warehouse_id,vcantidad,hr_employe_id,rf_id_molde_id){
 
    if(!Number.isInteger(vad_org_id) && vad_org_id < 1 ){
        alert("Selecciona una organización");
        return false;
    }
    if(!Number.isInteger(vm_product) && vm_product < 1 ){
        alert("Selecciona un producto");
        return false;
    }
    if(!Number.isInteger(vm_warehouse_id) && vm_warehouse_id < 1 ){
        alert("Selecciona un Almácen");
        return false;
    } 
    // if(!Number.isInteger(hr_employe_id) && hr_employe_id < 1 ){
    //     alert("Selecciona un Empleado");
    //     return false;
    // }
  
    // if(!Number.isInteger(rf_id_molde_id) && rf_id_molde_id < 1 ){
    //     alert("Selecciona un Molde");
    //     return false;
    // } 

    if(!Number.isInteger(vcantidad) && vcantidad < 1 ){
        alert("La cantidad debe ser númerica y mayor a 0");
        return false;
    }
    
    return true;
} 
  
function del_tr(remtr)  
{   
    while((remtr.nodeName.toLowerCase())!='tr')
    remtr = remtr.parentNode; 
    remtr.parentNode.removeChild(remtr); 
}
function eliminarFila(id)  
{   
    del_tr(document.getElementById(id));
    var csas = document.getElementById("lbcantidad");  
    csas.value = document.getElementById("tablaprueba").rows.length - 1;
}
 
  // Get the modal
  var modal = document.getElementById("myModal");
    
 
  
  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];
  
  
  // When the user clicks on <span> (x), close the modal
//   span.onclick = function() {
//     modal.style.display = "none";
//   }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

function cerrarModal() {
      modal.style.display = "none";
  }
 
async function saveForms(type)  
{     
    try {
        var formularios = document.forms; 
        if (formularios.length > 0) {
            document.getElementById("progres").innerHTML = 'registros: ' + formularios.length + '<center><img src="../img/cargando.gif"></center>' ; 
            modal.style.display = "block";
            var urls = "";  
            if(type == 1){
                urls =  '/manufactura/saveGrilla';
            }else{
                urls =  '/manufactura/saveAndSinc';
            }    
            var seguimiento = 0;
            var json = []; 
            
            for (var j=0; j < formularios.length;j++){
                seguimiento = formularios[j].id; 
                json.push({
                    "ad_org_id": $("#ad_org_id" + seguimiento).val(),
                    "m_product_id":  $("#m_product_id" + seguimiento).val(),
                    "m_warehouse_id": $("#m_warehouse_id" + seguimiento).val(),
                    "cantidad": $("#cantidad" + seguimiento).val(),
                    "hr_employe_id": $("#hr_employe_id" + seguimiento).val() ,
                    "rf_id_molde_id": $("#rf_id_molde_id" + seguimiento).val() ,
                });
            }
                
                // $.post(urls,
                //     { json : JSON.stringify(json)},
                //     function(data, status){   
                //         if (data == "Correcto")  {
                //             alert(" Sincronización completa."); 
                //             location.href="../../manufactura/grilla";
                //         } else {
                //             alert("Error: " + data + "\nStatus: " + status);  
                //             location.href="../../manufactura/grilla";
                //         }  
                //     }); 

                try {
                    const response = await 
                    $.post(urls,
                        { json : JSON.stringify(json)},
                        function(data, status){
                            return  data;  
                        }); 
                    // alert(response);
                    if (response == "Correcto") { 
                        modal.style.display = "none";
                        if(type == 1){
                            alert("Guardado Correctamente."); 
                        }else{
                            alert("Sincronizado Correctamente con ADempiere.");
                        }   
                        location.href="../../manufactura/";
                    } else { 
                        modal.style.display = "none"; 
                        alert("Existe un error, Contacta al Administrador de Sitio.");
                    } 
                } catch (error) {
                    alert(error);
                }

        } else {
            alert("Error: " + "No has Agregado Ordenes");  
            location.href="../../manufactura/grilla";
        }  
    } catch (error) {
        alert("Error: " + error);  
        location.href="../../manufactura/grilla";
    }
    

}