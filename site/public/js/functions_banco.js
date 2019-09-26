function verificarAutenticacao() {
  if (sessionStorage.usuario != undefined) {
    if (sessionStorage.ativo == true){
      if (sessionStorage.administrador == true){
        //loga como administrador
      } else{
        //loga como funcionário
      }
    }
    else{
      // alerta de conta inativa
    }
    // window.location.href = 'cadastro.html';
  }
}

function logar() {

  wait();

  var formulario = new URLSearchParams(new FormData(form_login));

  fetch('/usuarios/login', {
    method: "POST",
    body: formulario
  }).then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {
        sessionStorage.usuario = resposta.email;
        sessionStorage.id_usuario = resposta.id; // rever o nome deste campo na tabela
        sessionStorage.admin = resposta.administrador
        sessionStorage.ativo = resposta.ativo 
        verificarAutenticacao();
      });
    } else {
      console.log('Erro de login!');
      alert('Login ou senha inválido.')
      end_wait();
    }
  });

  return false;
}

function cadastrarUsuario() {

  wait();

  var formulario = new URLSearchParams(new FormData(form_cadastro));

  fetch('/usuarios/cadastro_usuario', {
    method: "POST",
    body: formulario
  }).then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {
        if (resposta == true){
          window.location.href = 'index.html';
        } else {
          alert('Desculpe, Algo deu errado');
          end_wait();
        }
      });
    } else {
      console.log('Erro de cadastro!');
      end_wait();
    }
  });

  return false;
}

function wait() {
  sendMessageButton.disabled = true;
}

function end_wait() {
  sendMessageButton.disabled = false;
}
