Isso é uma aplicação web que será utilizada nos trabalhos de _Informática na Educação_
e _Desenvolvimento de Aplicações Web_ da UDESC.

## Checklist
- [ ] Definir um nome
- [x] Modelar os dados
    - [x] Estudante
    - [x] Professor
    - [x] Questões
    - [x] Respostas
    - [x] Turmas
- [x] Terminar de definir a API
- [ ] Implementar a API
    - [x] Restrições por tipo de usuário
    - [x] `GET /status`
    - [x] `DELETE /session`
    - [x] `GET /me`
    - [ ] Rotas pra professor
        - [x] `POST /teacher/session`
        - [ ] `POST /question`
        - [x] `POST /classroom`
        - [x] `GET /classrooms`
        - [x] `POST /classrooms/:classroomId/invitations`
    - [ ] Rotas pra aluno
        - [x] `POST /student/token`
        - [x] `POST /student/session`
        - [ ] `GET /classroom`
        - [x] `GET /ranking`
        - [ ] `POST /question/:questionId`
        - [ ] `GET /questions`
- [ ] Testes
- [ ] Terminar de definir essa checklist
