var url = "http://localhost:8083/api/users";

function postUser() {
    var id = $('#id').val();
    var userData = {
        name: $('#name').val(),
        email: $('#email').val(),
        age: $('#age').val(),
        comments: $('#comments').val()
    };

    var ajaxUrl = url;
    var ajaxType = 'POST';

    if (id) {
        ajaxUrl += '/' + id;
        ajaxType = 'PUT';
    }

    $.ajax({
        url: ajaxUrl,
        type: ajaxType,
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            $('#resultado').html('<p>Usuario guardado correctamente</p>');
            $('#userForm')[0].reset();
            getUsers();
        },
        error: function (xhr, status, error) {
            $('#resultado').html('<p>Error al guardar usuario</p>');
            console.error(error);
        },
        data: JSON.stringify(userData)
    });
}

function getUsers() {
    $.getJSON(url, function(json) {
        var arrUsers = json.users;
        var htmlTable = '<table border="1">';
        htmlTable += '<tr><th>ID</th><th>Nombre</th><th>Email</th><th>Edad</th><th>Comentarios</th><th>Acciones</th></tr>';

        arrUsers.forEach(function(item) {
            htmlTable += '<tr>' +
                '<td>' + item.id + '</td>' +
                '<td>' + item.name + '</td>' +
                '<td>' + item.email + '</td>' +
                '<td>' + item.age + '</td>' +
                '<td>' + item.comments + '</td>' +
                '<td>' +
                  '<button onclick="editUser(' + item.id + ')">Editar</button>' +
                  '<button onclick="deleteUser(' + item.id + ')">Eliminar</button>' +
                '</td>' +
                '</tr>';
        });

        htmlTable += '</table>';
        $('#resultado').html(htmlTable);
    });
}

function editUser(id) {
    $.getJSON(url + '/' + id, function(user) {
        $('#id').val(user.id);
        $('#name').val(user.name);
        $('#email').val(user.email);
        $('#age').val(user.age);
        $('#comments').val(user.comments);
    });
}

function deleteUser(id) {
    if (confirm('¿Seguro que quieres eliminar este usuario?')) {
        $.ajax({
            url: url + '/' + id,
            type: 'DELETE',
            success: function (result) {
                $('#resultado').html('<p>Usuario eliminado correctamente</p>');
                getUsers();
            },
            error: function (xhr, status, error) {
                $('#resultado').html('<p>Error al eliminar usuario</p>');
                console.error(error);
            }
        });
    }
}

$('#userForm').submit(function (e) {
    e.preventDefault();
    postUser();
});
