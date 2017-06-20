
function getUrlQuery() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

    for(var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1] || true;
    }
    return vars;
}

function wait300(cb) {
    setTimeout(cb, 300);
}

function studentMenu() {
    $('#main-menu').html(`
        <li><a href="ranking.html"><i class="zmdi zmdi-view-list"></i>Ranking</a></li>
        <li><a href="profile.html"><i class="zmdi zmdi-account"></i>Meu Perfil</a></li>
        <li><a href="questions.html"><i class="zmdi zmdi-assignment-check"></i>Questões</a></li>
        <li><a href="#" onclick="logout()"><i class="zmdi zmdi-sign-in"></i>Sair</a></li>
    `);
}

function teacherMenu() {
    $('#main-menu').html(`
        <li><a href="ranking.html"><i class="zmdi zmdi-view-list"></i>Ranking</a></li>
        <li><a href="profile.html"><i class="zmdi zmdi-account"></i>Meu Perfil</a></li>
        <li><a href="classrooms.html"><i class="zmdi zmdi-collection-bookmark"></i>Turmas</a></li>
        <li><a href="manageQuestions.html"><i class="zmdi zmdi-assignment-check"></i>Questões</a></li>
        <li><a href="#" onclick="logout()"><i class="zmdi zmdi-sign-in"></i>Sair</a></li>
    `);
}

function fetchUserInfo() {
    $.ajax({
        method: 'GET',
        url: 'api/me',
        success: me => {
            if (me.model === 'Teacher') {
                teacherMenu();
            } else {
                studentMenu();
            }
        },
        error: () => window.location.replace('index.html')
    });
}

function goToIndex() {
    window.location.replace('index.html');
}

function logout() {
    $.ajax({
        method: 'DELETE',
        url: 'api/session',
        success: goToIndex,
        error: goToIndex
    });
}

function validEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        .test(email);
}
