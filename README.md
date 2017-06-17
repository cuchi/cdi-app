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
- [ ] Terminar de definir a API
- [ ] Implementar a API
    - [ ] Restrições por tipo de usuário
    - [x] `GET /status`
    - [x] `DELETE /session`
    - [ ] `GET /me`
    - [ ] Rotas pra professor
        - [x] `POST /teacher/session`
        - [ ] `POST /question`
        - [ ] `POST /classroom`
        - [x] `GET /classrooms`
        - [ ] `POST /classroom/:classroomId/invitation`
    - [ ] Rotas pra aluno
        - [ ] `POST /student/token`
        - [x] `POST /student/session`
        - [ ] `GET /classroom`
        - [x] `GET /ranking`
        - [ ] `POST /question/:questionId`
        - [ ] `GET /questions`
- [ ] Testes
- [ ] Terminar de definir essa checklist
