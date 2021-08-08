// Affichage prix total de la commande
let GetprixTotal = localStorage.getItem("prixTotal")
let affichagePrixTotal = document.getElementById("prixTotal")
let orderInfo = localStorage.getItem("orderInfos")
affichagePrixTotal.textContent = GetprixTotal

let affichageNom = document.getElementById("lastName")
let nameGet = localStorage.getItem("")

// Création d'une id de commande
let orderID = document.getElementById("orderID")
let stringID = Math.random().toString(36).substr(2, 19);
orderID.textContent = stringID



affichageNom.textContent = nameGet




