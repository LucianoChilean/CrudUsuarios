$('#sidebar .puntero').click(function(e){
    
   e.preventDefault;
   
   var data = $(this).attr("menu");
   
    $("#content-wrapper").load(data);
    
});


DataTable('#CrudUsuarios','http://127.0.0.1:8000/api/users');


 function DataTable(Tabla,url){
    
   table =  $(Tabla).DataTable({
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
     ajax:{
      url:url,
      type:"GET",
      datatype: "json" ,
      dataSrc: ""
    },
     columns: [
        {data: 'id'},
        {data: 'nombre'},
        {data: 'apellido'},
        {data: 'rut'},
        {data: 'fecha_nacimiento'},
        {data: 'email'},
        {defaultContent: 
        "<div class='btn-group' role='group'><button type='button' id='editar' data-toggle='modal' data-target='#modalUser' class='btn btn-primary'>Editar</button><button type='button' id='eliminar' data-toggle='modal' data-target='#modalEliminar' class='btn btn-danger'>Eliminar</button></div>"}
    ]
     
       
   });
   
   }

   $('#CrudUsuarios tbody').on( 'click', '#eliminar', function (e) {
    e.preventDefault();
    var data = table.row($(this).parents('tr') ).data();
    $('#codigo').val(data['id']);
    });

    $('#CrudUsuarios tbody').on( 'click', '#editar', function (e) {
        e.preventDefault();

        $('#RegForm').html('Editar');
        $('#Registrar').hide();
        $('#Editar').show();
        var data = table.row($(this).parents('tr') ).data();
        console.log(data);

        $('#id').val(data['id']);
        $('#nombre').val(data['nombre']);
        $('#apep').val(data['apellido']);
        $('#apem').val(data['apellido']);
        $('#rut').val(data['rut']);
        $('#fechan').val(data['fecha_nacimiento']);
        $('#email').val(data['email']);
        $('#password').val(data['password']);

        });

   $('#User_delete').click(function(e){
    e.preventDefault();

    $.ajax({ url: `http://127.0.0.1:8000/api/users/${$('#codigo').val()}`, method: "DELETE" })
            .then(function (data){

                if(data == '204'){
                    $('#CrudUsuarios').DataTable().destroy();
                    DataTable('#CrudUsuarios','http://127.0.0.1:8000/api/users');  
                    $('#codigo').val('');
                }
              
            })
            .catch(function (err){
                console.log(err);
            });


   });


$('#User_update').click(function(e){
    e.preventDefault();

    $.ajax({ url: `http://127.0.0.1:8000/api/users/${$('#id').val()}`, method: "PUT", data:{rut:rut,nombre:nombre,apellido:apellido,email:email,fecha_nacimiento:fechan,password:password} })
            .then(function (data){

                if(data == '204'){
                    $('#CrudUsuarios').DataTable().destroy();
                    DataTable('#CrudUsuarios','http://127.0.0.1:8000/api/users');  
                    $('#codigo').val('');
                }
              
            })
            .catch(function (err){
                console.log(err);
            });


   });

$('#nuevo').click(function(){
 
  $('#RegForm').html('Registrar'); 
  $('#Editar').hide();
  $('#Registrar').show();
  $('#nombre').val('');
  $('#apep').val('');
  $('#apem').val('');
  $('#rut').val('');
  $('#fechan').val('');
  $('#email').val('');
  $('#password').val('');


});
   

$('#Registrar').click(function(e){

    e.preventDefault();

    var nombre    = $('#nombre').val();
    var apellido  = $('#apep').val()+' '+$('#apem').val();
    var rut       = $('#rut').val();
    var fechan    = $('#fechan').val();
    var email     = $('#email').val();
    var password  = $('#password').val();

    var IMG = new FormData();
    IMG.append('photo', $('#FotoPerfil')[0].files[0]);

    $.ajax({ 
      url: `http://127.0.0.1:8000/api/registerUser`,
     method: "POST", 
     data:{rut:rut,nombre:nombre,apellido:apellido,email:email,fecha_nacimiento:fechan,password:password} })
            .then(function(data){
                console.log(data);
                $('#CrudUsuarios').DataTable().destroy();
                DataTable('#CrudUsuarios','http://127.0.0.1:8000/api/users');
            })
            .catch(function (err){
                console.log(err);
            });

});

$('#Editar').click(function(e){

    e.preventDefault();

    var nombre    = $('#nombre').val();
    var apellido  = $('#apep').val()+' '+$('#apem').val();
    var rut       = $('#rut').val();
    var fechan    = $('#fechan').val();
    var email     = $('#email').val();
    var password  = $('#password').val();

 
    $.ajax({ 
        url:  `http://127.0.0.1:8000/api/users/${$('#id').val()}`,
        method: "PUT", 
        data:{rut:rut,nombre:nombre,apellido:apellido,email:email,fecha_nacimiento:fechan,password:password} })
            .then(function(data){
                console.log(data);
                $('#CrudUsuarios').DataTable().destroy();
                DataTable('#CrudUsuarios','http://127.0.0.1:8000/api/users');
            })
            .catch(function (err){
                console.log(err);
            });

});

  
$("#rut").rut({formatOn: 'keyup',validateOn: 'keyup'}).on('rutInvalido', function(){
        
    if($("#rut").val().length > 11){
       
        alert('Rut Invalido Favor digitar nuevamente');
        $("#rut").val('');

     }
 
    }).on('rutValido', function(){ 
       
        
   });

  $('.Vapellidos').change(function(){

    var validacion = $(this).val();
    
    if(validacion == ''){

        alert('Favor llenar campo');

    }

  }); 


  $('#email').change(function(){

    
    var email = $(this).val();


    var caract = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);

    if (caract.test(email) == false){
       
        alert('Correo invalido, Favor digitar nuevamente');
        $('#email').val('');

        return false;
    }else{
       
        return true;
    }

  }); 


    
