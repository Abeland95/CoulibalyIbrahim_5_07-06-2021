// Affichage prix total de la commande
let GetprixTotal = localStorage.getItem("prixTotal")
let affichagePrixTotal = document.getElementById("prixTotal")


affichagePrixTotal.textContent = GetprixTotal



let orderInfo = localStorage.getItem("orderInfos");

info = JSON.parse(orderInfo);


// Appel des données du nom du client
let affichageNom = document.getElementById("Client-Name")
affichageNom.textContent = info.contact.lastName + " " + info.contact.firstName;


// Appel de l'id de commande
let orderID = document.getElementById("orderID")
orderID.textContent = info.orderId;












