// $( "#ad_org_id" ).click(function() {
//     var value = $('select[id=ad_org_id]').val();
//     console.log(value);
//     if(value.length > 0){
//       $.ajax({
//         type: 'post',
//         url: '/manufactura/filterProduct',
//         data: { code: value} 
//       })
//       .done(function(result){ 
//         llenarCombos(result);
//       }); 
//     } 
//   });
   
  // $( "#buscarInSelectOrg" ).change(function() {
  //   var value = $('select[id=ad_org_id]').val();
  //   console.log(value);
    
  //   if(value.length > 0){
  //     $.ajax({
  //       type: 'post',
  //       url: '/manufactura/filterProduct',
  //       data: { code: value} ,
  //       dataType: 'json'
  //     })
  //     .done(function(result){
  //       llenarCombos(result);
  //     }); 
  //   } 
  // });
     
  // $( "#ad_org_id" ).change(function() {
  //   var value = $('select[id=ad_org_id]').val();
  //   console.log(value);
    
  //   if(value.length > 0){
  //     $.ajax({
  //       type: 'post',
  //       url: '/manufactura/filterProduct',
  //       data: { code: value} ,
  //       dataType: 'json'
  //     })
  //     .done(function(result){
  //       llenarCombos(result);
  //     }); 
  //   }
  // });

  function llenarCombosDS(){
    var value = $('select[id=ad_org_id]').val();
    if(value.length > 0){

      $.post('/manufactura/filterProduct', { code: value} ,function(result) {
        llenarCombos(result);
    }); 
    }
  }

  function llenarComboMolde(){ 
    var value = $('select[id=elementos]').val();
    if(value.length > 0){ 
      $.post('/manufactura/obtenerMoldes', { m_product_id: value} ,function(result) {
        try {
          let resultMoldes = JSON.parse(result); 
           
          var $selectMolde = $('#RF_ID_Molde_ID'); 
          $selectMolde.empty();
          $selectMolde.append('<option value=0 >Selecciona Molde</option>'); 
          for(var  i = 0; i <  resultMoldes.length ; i++) {
            try {
              var model = resultMoldes[i];  
              $selectMolde.append('<option value=' + model.rf_id_molde_id + '>' + 
                model.documentno  + ' ' + model.description +'</option>');
            } catch (error) {
              console.log(error);
            }
          }
        } catch (error) {
          console.log(error);
        }
    }); 
    }
  } 

  function llenarCombos(result){  
    if (result == "Error en la sesion") {
      location.href="../../manufactura/grilla";
    } else {
      var $selectProd = $('#elementos'); 
      $selectProd.empty();
      var $selectAlm = $('#m_warehouse_id'); 
      $selectAlm.empty();  
      var $selecthr_employe = $('#hr_employe_id'); 
      $selecthr_employe.empty();

      $selecthr_employe.append('<option value="0" >Sin Colaborador</option>'); 
      $selectProd.append('<option value="" >Selecciona Producto</option>'); 
      $selectAlm.append('<option value="" >Selecciona Almácen</option>');
      try {
            for(var  i = 0; i <  JSON.parse(result).array.almacenes.length ; i++) { 
              try {
              var model = JSON.parse(result).array.almacenes[i];
              $selectAlm.append('<option value=' + model.m_warehouse_id + '>' + model.value  + ' ' + model.name +'</option>');
              } catch (error) {
                console.log(error);
              } 
            } 
            for(var  i = 0; i <  JSON.parse(result).array.productos.length ; i++) { 
            try {
              var model = JSON.parse(result).array.productos[i];
              $selectProd.append('<option value=' + model.m_product_id + '>' + model.value  + " " + model.name  + '</option>'); 
            } catch (error) {
              console.log(error);
            }
            } 
            for(var  i = 0; i <  JSON.parse(result).array.employes.length ; i++) { 
            try {
              var model = JSON.parse(result).array.employes[i];
              $selecthr_employe.append('<option value=' + model.hr_employee_id + '>' + model.identificationmark +"_"+ model.name  + ' ' + model.name2 +'</option>');
            } catch (error) {
              console.log(error);
            } 
          } 
          return true;
      } catch (error) {
        console.log(error); return false;
      }
    } 
  }