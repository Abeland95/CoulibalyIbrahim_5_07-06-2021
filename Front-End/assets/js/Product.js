// Récupération des id produit dans l'url-----
let urlSearchParams = new URLSearchParams(document.location.search)
let id = urlSearchParams.get("id")
let url = 'http://localhost:3000/api/teddies'






// Affichage produit dans la page---------------------
let request = new XMLHttpRequest()
request.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        teddies = JSON.parse(this.responseText)
        affichageProduit()
    }

}

// Requête AJAX
request.open("GET", url + '/' + id)

// envoi de la requête
request.send()

// Affichage du produit

function affichageProduit() {

    // Appel de données stockées--------------
    let titre = document.getElementById("titre")
    let prix = document.getElementById("prix")
    let description = document.getElementById("description")
    let image = document.getElementById("image")

    // Affichage données----------------------
    titre.textContent = teddies.name 
    prix.textContent = teddies.price / 100 + " €"
    description.textContent = teddies.description
    image.src = teddies.imageUrl 


    // Création Choix de Couleurs------------------

    let colors = document.getElementById("color_select")
    let options = teddies.colors
    options.forEach(function (element, color) {
        colors[color] = new Option(element, element);
        console.log(element);
    })

    // Sélection des couleurs-----------------------

    let selectionColors = document.getElementById("color_select").addEventListener("change", function(e) {
        selectionColors = e.target.value
    })

    // Selection de la quantité------------------------
    let quantiteProduit = document.getElementById("quantite-select").addEventListener('change', function (e) {
        quantiteProduit = e.target.value
    })

    // Bouton ajouter au panier--------------------
    let addtoCart = document.getElementById("addToCart")
    addtoCart.addEventListener("click", function() {
        if (selectionColors != undefined && quantiteProduit != undefined) {
            teddies.colors = selectionColors;
            teddies.quantity = quantiteProduit;

        } else if (selectionColors == undefined && quantiteProduit != undefined) {
            teddies.colors = teddies.colors[0];
            teddies.quantity = quantiteProduit;

        }else if (selectionColors != undefined && quantiteProduit == undefined) {
            teddies.colors = selectionColors;
            teddies.quantity = 1;

        } else {
            teddies.colors = teddies.colors[0];
            teddies.quantity = 1;
        }
        alert("L'article a bien été ajouté au panier")
        prixTotal()
        ajoutLocalStorage()
    })  
}

// Ajout du prix dans le store local----------------------
function prixTotal() {
    let price = parseInt(teddies.price)
    let cartPrice = JSON.parse(localStorage.getItem('prixTotal'))

    if (cartPrice == 0) {
        localStorage.setItem("prixTotal", cartPrice + (price / 100 * teddies.quantity))
    } else {
        localStorage.setItem("prixTotal", cartPrice + (price / 100 * teddies.quantity))
    }
}

// Ajout du produit dans le store local------------------
function ajoutLocalStorage() {
    let cart = localStorage.getItem('cart')
    cart = JSON.parse(cart)

    let name = teddies.name + teddies.colors;
    if (cart != null) {
        let element = cart[name]
        if (element === undefined) {
            cart = {
                ...cart,
                [name]: teddies
            }
        } else {
            let quantity = parseInt(element.quantity)
            quantity += parseInt(teddies.quantity)
            element.quantity = quantity
        }
    } else {
        cart = {
            [name]: teddies
        }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
}
