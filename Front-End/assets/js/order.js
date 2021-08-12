// Appel des données de la commandes (général)----
let orderInfo = localStorage.getItem("orderInfos");
info = JSON.parse(orderInfo);

// Affichage prix total de la commande------------
let GetprixTotal = localStorage.getItem("prixTotal")
let affichagePrixTotal = document.getElementById("prixTotal")
affichagePrixTotal.textContent = GetprixTotal

// Appel des données du nom du client-----------
let affichageNom = document.getElementById("Client-Name")
affichageNom.textContent = info.contact.lastName + " " + info.contact.firstName;


// Appel de l'id de commande---------------------
let orderID = document.getElementById("orderID")
orderID.textContent = info.orderId;


//* Reset du panier----------------------------------------------------------------
window.addEventListener("unload", function () {
    localStorage.clear()
})










