  
  function DataTable(Tabla,url,accion,dato){
    
    alert('HOLIWI');

     $(Tabla).DataTable({
        //Para cambiar el lenguaje a español
    language:{
         sProcessing:     "Procesando...",
         sLengthMenu:     "Mostrar _MENU_ registros",
         sZeroRecords:    "No se encontraron resultados",
         sEmptyTable:     "Ningún dato disponible en esta tabla",
         sInfo:           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
         sInfoEmpty:      "Mostrando registros del 0 al 0 de un total de 0 registros",
         sInfoFiltered:   "(filtrado de un total de _MAX_ registros)",
    sInfoPostFix:    "",
    sSearch:         "Buscar:",
    sUrl:            "",
    sInfoThousands:  ",",
    sLoadingRecords: "Cargando...",
    oPaginate: {
        sFirst:    "Primero",
        sLast:     "Último",
        sNext:     "Siguiente",
        sPrevious: "Anterior"
    },
    oAria: {
        sSortAscending:  ": Activar para ordenar la columna de manera ascendente",
        sSortDescending: ": Activar para ordenar la columna de manera descendente"
    }
},  
      bStateSave: true,   
      paging: true,
      destroy: true,
      searching: { regex: true },
      processing : true,
      serverSide : true,
      sort: false,
      order : [[1, 'asc']],
      lengthMenu: [[10,15, 25, 50, 100,150], [5,15, 25, 50, 100,150]],
      ajax:{
       url:url,
       type:"POST" 
     }
      
        
    });
    
    }

