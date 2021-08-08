// Affichage de données-----------------

let affichagePrixTotal = document.getElementById("#span_price")
let affichageID = document.querySelector(".name span")
let orderInfo = JSON.parse(localStorage.getItem("orderInfos"))
let prixTotal = JSON.parse(localStorage.getItem("prixTotal"))
let orderID = orderInfo.orderID;
let affichageName = document.querySelector(".name span")
let nameGet = localStorage.getItem("lastName")
nameGet = JSON.parse(nameGet)


// Affichage de la date et de l'heure de la commande------

let a = new Date();
let date = a.getDate()+'-'+(a.getMonth()+1)+'-'+a.getFullYear();
let hours = a.getHours() + ':' + a.getMinutes() + ':' + a.getSeconds();
let fullDate = date + ' à ' + hours
let affichagefullDate = document.querySelector(".Date span")

// Affichage des données de la commande-----------
affichagePrixTotal.textContent = prixTotal
affichageID.textContent = orderID
affichageName.textContent = `${nameInfo.contact.firstName} ${nameInfo.contact.lastName}`
affichagefullDate.textContent = fullDate

//Remise à 0 du panier
window.addEventListener("unload", function () {
    localStorage.clear()
})



