function checaIdade(idade) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (idade >= 18){
                resolve();
            } else {
                reject();
            }   
        }, 2000);
    });
}


checaIdade(17)
    .then(function() {
        console.log("Maior que 18");
    }) 
    .catch(function() {
        console.log("Menor que 18");    
    });


var inputElement = document.getElementById("user");
var divElement = document.querySelector("div");
var dataList = document.querySelector("ul");


function getUserRepo() {
    return new Promise((resolve, reject) => {
        var user = inputElement.value;
        
        if (!user){
            alert("Favor preencher o usuário!");
            renderError();
        }
        renderLoading();
        axios.get('https://api.github.com/users/' + user +'/repos')
        .then(function(response){
            //console.log(response);
            var reponames = response.data;
            //console.log(reponames);
            renderTodos(reponames);
        })
        .catch(function(error) {
            alert('Não foi possível efetuar a busca!')
            renderError(error);
        });
        
    });
}

function renderTodos(todo){
    dataList.innerHTML = '';

    var user = inputElement.value;
    var msgRepoUser = "Segue abaixo o(s) repositório(s) do usuário " + user + ":";
    var msgRepo = document.createTextNode(msgRepoUser);
    var divMsgRepo = document.createElement('div');
    var pularLinha = document.createElement('br');

    divMsgRepo.appendChild(msgRepo);
    dataList.appendChild(divMsgRepo);
    dataList.appendChild(pularLinha);

    for(todos of todo){
        
        var reponame = document.createTextNode(todos.name);
        var repoitem = document.createElement('li');

        inputElement.value = '';

        repoitem.appendChild(reponame);


        dataList.appendChild(repoitem);
    }

}

function renderError(error){
    dataList.innerHTML = '';

    var user = inputElement.value;
    var msgUserError = !user ? "Favor preencher o usuário!" : "O usuário " + user + " não existe no GitHub!" ;

    inputElement.value = '';

    var textElement = document.createTextNode(msgUserError);
    var itemElement = document.createElement("li");
    itemElement.style.color = "#F00"
    itemElement.appendChild(textElement);
    dataList.appendChild(itemElement);
}


function renderLoading(){

    dataList.innerHTML = "";
    var textElement = document.createTextNode("Carregando...");
    var loadingElement = document.createElement("li");
    loadingElement.appendChild(textElement);
    dataList.appendChild(loadingElement);
}