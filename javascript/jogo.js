
// achar a altura e largura, assim fazer o jogo ocupar a tela toda. Vamos também colocar dentro de uma função, desse jeito, caso a pessoa resolva diminuir/aumentar a tela, nao afetar o jogo, tornando responsivo.
var altura = 0
var largura = 0
var vidas = 1
var tempo = 30

var criaMosquitoTempo = 2000

var nivel = window.location.search
nivel = nivel.replace('?', '')
if(nivel === 'Normal'){
    //2000ms
    var criaMosquitoTempo = 2000
}
else if (nivel === 'dificil'){
    //1300ms
    var criaMosquitoTempo = 1300
}
else if(nivel === 'Rambo'){
    //800ms
    var criaMosquitoTempo = 800
}

function ajustaTamanhoPalcoJogo() {
    altura = window.innerHeight
    largura = window.innerWidth
    console.log(largura, altura) 
}
ajustaTamanhoPalcoJogo()

var cronometro = setInterval(function(){
    tempo -= 1
    if(tempo < 0){
        //eliminar da memoria, para nao continuar acontecendo o codigo
        clearInterval(cronometro)
        clearInterval(criaMosquito)
        window.location.href = '../html/ganhou_o_jogo.html'
    }
    else{
        document.getElementById('cronometro').innerHTML = tempo
    }
} ,1000)

// com base na largura e altura identificados a cima, criar um padrao randomicos.

function posicaoRandomica() {

    // criação e remoção dos mosquitos num ciclo de tempo
    // remover o mosquito anterior (caso existe) provocar o error para ajustar
    // aqui vamos ajustar tambem a remocao dos coracoes, de cheio para vazio, apos o click
    if(document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove()
        if(vidas > 3){
            window.location.href = '../html/fim_de_jogo.html'
        }
        else{

            document.getElementById('v' + vidas).src='../imagens/coracao_vazio.png'
            vidas++
        }
        
    }
    // finaliza aqui a remocao com o tempo e a imagem anterior
    
    var x = Math.floor(Math.random() * largura) - 90
    var y = Math.floor(Math.random() * altura) - 90
    // aplicar o controle para não ter numeros negativos
    x = x < 0 ? 0 : x
    y = y < 0 ? 0 : y
    console.log(x, y)
    
    // criar o elemento html
    
    var mosquito = document.createElement('img')
    mosquito.src = '../imagens/mosca.png'
    mosquito.className = tamanhoAleatorio() + ' '+ ladoAleatorio()
    mosquito.style.left = x + 'px'
    mosquito.style.top = y + 'px'
    mosquito.style.position = 'absolute' 
    mosquito.id = 'mosquito'
    // nao removendo os pontos de vida caso click
    mosquito.onclick = function () {
        this.remove()
    }

    document.body.appendChild(mosquito)
    
}

// criar tamanho variavel a imagem, tornando mais dinamico

function tamanhoAleatorio() {
    var classe = Math.floor( Math.random() * 3 )
    switch(classe){
        case 0:
            return 'mosquito1'
        case 1:
            return 'mosquito2'
        case 2:
            return 'mosquito3'
    }
}

// criar uma função para rotacionar a foto, direita e esquerda
function ladoAleatorio() {
    var classe = Math.floor(Math.random() * 2)

    switch(classe){
        case 0:
            return 'lardoA'
        case 1:
            return 'ladoB'
    }
}


