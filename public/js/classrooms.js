fetchUserInfo();

fetchClassrooms();

function removeStudentDialog(id) {
    swal({
        title: 'Tem certeza?',
        text: 'Os dados do aluno serão apagados para sempre!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
    }, () => wait300(() => $.ajax({
        method: 'DELETE',
        url: `api/student/${id}`,
        success: () => successDialog(
            'Removido!',
            'O aluno foi removido com sucesso!'),
        error: genericError
    })));
}

function removeInviteDialog(id) {
    swal({
        title: 'Tem certeza?',
        text: 'O aluno não poderá mais usar esse convite, você poderá convidar de novo se quiser.',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
    }, () => wait300(() => $.ajax({
        method: 'DELETE',
        url: `api/invite/${id}`,
        success: () => successDialog(
            'Removido!',
            'O convite foi removido com sucesso!'),
        error: genericError
    })));
}

function successDialog(title, text) {
    return swal({ title, text, type: 'success' }, fetchClassrooms);
}

function errorDialog(title, text) {
    return swal({ title, text, type: 'error' }, fetchClassrooms);
}

function genericError() {
    return errorDialog(
        'Oooops!!!',
        'Não foi possível fazer isso, tente novamente mais tarde!');
}

function editStudentModal(id) {

}

function newClassroomModal() {
    $('#new-classroom-button').click(() => {
        var name = $('#classroom-name').val();

        $.ajax({
            method: 'POST',
            url: `api/classroom`,
            data: JSON.stringify({ name }),
            contentType: 'application/json',
            success: () => {
                $('#new-classroom-modal').modal('hide');
                successDialog('Turma criada!');
            },
            error: () => errorDialog(
                'Oooops!!!',
                'Este nome de turma já existe!')
        })
    })
    $('#new-classroom-modal').modal('show');
}

function inviteStudentModal(classroomId) {
    $('#invite-button').click(() => {
        var email = $('#invite-email').val();

        if (!validEmail(email)) {
            errorDialog(
                'Oooops!!!',
                'O e-mail não é válido!');
            return;
        }

        $.ajax({
            method: 'PUT',
            url: `api/classroom/${classroomId}/invitations`,
            data: JSON.stringify({ email }),
            contentType: 'application/json',
            success: () => {
                $('#invite-modal').modal('hide');
                successDialog(
                    'Convite enviado!',
                    'Aguarde o aluno aceitar e criar a conta.')
            },
            error: () => errorDialog(
                'Oooops!!!',
                'Este e-mail já está em uso!')
        })
    })
    $('#invite-modal').modal('show');
}

function getStudentsRows(classroom) {
    return (classroom.registered || [])
        .map(student => `
            <tr>
            <td>${student.name}</td>
            <td>${student.code}</td>
            <td>${student.email}</td>
            <td>${student.score}</td>
            <td>${student.phone}</td>
            <td>
                <button onclick="removeStudentDialog('${student._id}')" class="btn bgm-red waves-effect waves-button waves-float">
                <i class="zmdi zmdi-close"></i>
                </button>
            </td>
            <td>
                <button onclick="editStudent('${student._id}')" class="btn bgm-orange waves-effect waves-button waves-float">
                <i class="zmdi zmdi-edit"></i>
                </button>
            </td>
            </tr>
        `).join('\n');
}

function getInvitedRows(classroom) {
    return (classroom.invited || [])
        .map(invite => `
            <tr>
                <td>${invite.email}</td>
                <td>${invite.sent}</td>
                <td>
                <button onclick="removeInviteDialog('${invite._id}')" class="btn bgm-red waves-effect waves-button waves-float">
                    <i class="zmdi zmdi-close"></i>
                </button>
                </td>
            </tr>
        `).join('\n');
}

function populateClassrooms(classrooms) {
    $('#classrooms').html(classrooms.map(classroom => `
        <div class="card">
            <div class="card-header">
            <h1>${classroom.name}</h1>
            <h2>Registrados</h2>
            </div>
            <div class="card-body table-responsive">
            <table class="table">
                <thead>
                <tr>
                    <th>Nome</th>
                    <th>Matrícula</th>
                    <th>E-mail</th>
                    <th>Pontuação</th>
                    <th>Fone</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                ${getStudentsRows(classroom)}
                </tbody>
            </table>
            </div>
            <div class="card-header">
            <button onclick="inviteStudentModal('${classroom._id}')" class="btn bgm-cyan waves-effect waves-button waves-float">
                <i class="zmdi zmdi-account-add"></i> Convidar Aluno
            </button>
            </div>
            <div class="card-body table-responsive">
            <table class="table">
                <thead>
                <tr>
                    <th>E-mail</th>
                    <th>Convite enviado em:</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                ${getInvitedRows(classroom)}
                </tbody>
            </table>
            </div>
        </div>
    `).join('\n'));
}

function fetchClassrooms() {
    $.ajax({
        method: 'GET',
        url: 'api/classrooms',
        success: populateClassrooms
    });
}
