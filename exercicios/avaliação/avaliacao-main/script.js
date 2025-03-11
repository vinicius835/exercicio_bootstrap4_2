// Adicione no script.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("contact-form");
    const tudo_pronto = document.getElementById("tudo_pronto");
    const ocorreu_erro = document.getElementById("Ocorreu_um_erro");
    const sections = document.querySelectorAll('section');
    const email = document.getElementById("email");
    const tel = document.getElementById("tel");
    const motivo = document.getElementById("motivo_contactar");
    const area = document.getElementById("area").innerHTML;


console.log(motivo)
    sections.forEach(section => {
      section.style.opacity = '0';
      setTimeout(() => {
        section.style.opacity = '1';
      }, 300);
    });
  

document.addEventListener("submit", function(event) {
  event.preventDefault();
  if(email.value===""||tel.value ===""){
    ocorreu_erro.classList.remove("d-none");
    tudo_pronto.classList.add("d-none");
    return;
  }
// Verificando as condições
if ((area.value != "" && motivo.value == "-1") || (motivo.value == "1" && area.value === "")) {
  // Caso qualquer condição de bloqueio seja verdadeira
  ocorreu_erro.classList.remove("d-none");
  ocorreu_erro.innerHTML = "<strong>Preencha todos os campos corretamente!</strong>";
  tudo_pronto.classList.add("d-none");
  return;
} else if (area.value != "" && motivo.value == "1") {
  // Se o textarea tem conteúdo e o motivo foi selecionado como 1, passa
  ocorreu_erro.classList.add("d-none");
  tudo_pronto.classList.remove("d-none");
}


  const formData = new FormData(form);
  fetch("https://jsonplaceholder.typicode.com/posts",{
    method:"POST",
    body:formData
  })
  .then(response => {
    if(!response.ok){
      throw new Error("Erro ao enviar a mensagem")
    }
    return response.json();
  })
  .then(data => {
    console.log("Resposta do Servidor:",data);
    tudo_pronto.classList.remove("d-none");
    ocorreu_erro.classList.add("d-none");
    form.reset();
  })
  .catch(error => {
    console.error("Erro:",error);
    tudo_pronto.classList.add("d-none");
    ocorreu_erro.classList.remove("d-none");
  })
  
  // Resetar o formulário
  document.getElementById("contact-form").reset();
});
});
// document.addEventListener("submit",function(event){

//  var menu = document.getElementById("navbarNav");

//   if(window.innerWidth< 992){ 
//     setTimeout(function(){menu.classList.remove("show");},100)
    
//   }
// });
document.addEventListener("scroll",function(){

  var navbar = document.querySelector(".bg-navbar");
  if (window.scrollY >50){navbar.classList.add('scrolled')}else{navbar.classList.remove("scrolled");}
  
});
document.addEventListener("scroll",function(){
  var ponto = document.getElementById("habilidades")
  var pontoPos = ponto.getBoundingClientRect().top + window.scrollY;
  var navbar_after = document.querySelector(".bg-navbar-after");
  if (window.scrollY >pontoPos){navbar_after.classList.add('after');}else{navbar_after.classList.remove('after');}
});
function abrirImagem(imageSrc){
  var modal = document.getElementById("imageModal");
  modal.style.display = "block";
  var modalImage = document.getElementById("modalImage");
  
  modalImage.src = imageSrc;

}
function closeModal(){
  var modal = document.getElementById("imageModal");
  modal.style.display = "none"; 
}
window.onclick = function(event){
  var modal = document.getElementById("imageModal")
  if(event.target == modal){
    modal.style.display = "none";
  }
}