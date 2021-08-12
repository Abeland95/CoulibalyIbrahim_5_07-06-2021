

function affichagePanier() {

    // Récupération des données du store local
    let cart = JSON.parse(localStorage.getItem('cart'))
    let prixTotal = JSON.parse(localStorage.getItem("prixTotal"))
    let cartPrice = document.getElementById('affichageTotal')
    let tableauCart = document.getElementById("allCartProducts")

    // Prix total du panier

    if (cart != null) {
        
        let div = document.createElement("div")
        allCartProducts.appendChild(div);
        cartPrice.textContent = 'Le montant total du panier est de : ' + prixTotal + ' €';
        cartPrice.id ='prixTotal'

    } else {
        cartPrice.textContent = 'Le montant total de votre panier est de : 0 €'
    }

    if (cart == null) {
        let div = document.createElement("div")
        allCartProducts.appendChild(div)
        console.log("Le panier est vide")

    } else {
        // Création tableau avec infos de(s) produit(s)
        tableauCart.innerHTML = ''
        Object.values(cart).map((teddies) => {

            let tr = document.createElement("tr")
            let name = document.createElement("td")
            let colors = document.createElement("td")
            let quantity = document.createElement("td")
            let price = document.createElement("td")
            let prixTotal = document.createElement("td")
            

            allCartProducts.appendChild(tr)
            tr.appendChild(name)
            tr.appendChild(colors)
            tr.appendChild(quantity)
            tr.appendChild(price)
            tr.appendChild(prixTotal)
            

            name.textContent = teddies.name
            colors.textContent = teddies.colors
            quantity.textContent = teddies.quantity
            price.textContent = teddies.price / 100 + " €"
            prixTotal.textContent = teddies.price / 100 * teddies.quantity + " €"

            let emptyButton = document.getElementById('emptyButton')

            emptyButton.addEventListener("click", function() {
                localStorage.clear("prixPanier")
                window.location.reload()
            })

            

            console.log("Contenu du panier : ")
            console.log(cart)
        })
    }
}
affichagePanier()

// Partie avec informations du client---------------

let submitProfil = document.querySelector("#submitProfil")
let validationButton = document.querySelector("#orderButton")
let firstName = document.querySelector("#firstName")
let lastName = document.querySelector("#lastName")
let phoneNumber = document.querySelector("#phoneNumber")
let address = document.querySelector("#address")
let eMail = document.querySelector("#inputEmail")
let city = document.querySelector("#inputCity")

// Objet client
function Client(firstName, lastName, phoneNumber, address, city, eMail) {
    (this.firstName = firstName),
    (this.lastName = lastName),
    (this.phoneNumber = phoneNumber),
    (this.address = address),
    (this.city = city),
    (this.eMail = eMail);
    

}

// Tableau d'articles contenant les articles commandés
let cart = JSON.parse(localStorage.getItem("cart"))
let Idlist = []

function cart_array(cart){
    for (let i = 0; i < cart.length; i++) {
        Idlist.push(cart[i].id)
    }

    localStorage.setItem("item", JSON.stringify(Idlist))
    Idlist = localStorage.getItem("item")
    Idlist = JSON.parse(Idlist)
}


// Validation des formulaires

function formulaire() {
    let regexFirstName = /^[A-Z]{1}[A-Za-zÀ-ÿ\ -]+$/ 
    let regexLastName = /^[A-Z]{1}[A-Za-zÀ-ÿ\ -]+$/
    let regexEmail = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/
    let regexPhone = /^([\+]?33[-]?|[0])?[1-9][0-9]{8}$/
    let regexAddress = /^[0-9]{1,4}[ ,-][ A-Za-zÀ-ÿ0-9\-]+$/
    let regexCity = /^[A-Z]{1}[A-Za-zÀ-ÿ\ -]+$/

    if (lastName.value.length === 0 || !regexLastName.test(lastName.value)){
        alert("Veuillez renseigner un Nom valide")
        lastName.style.borderColor = "red"
    } else if (firstName.value.length === 0 || !regexFirstName.test(firstName.value)){
        alert("Veuillez renseigner un prénom valide")
        firstName.style.borderColor = "red"
    } else if (phoneNumber.value.length === 0 || !regexPhone.test(phoneNumber.value)){
        alert("Veuillez renseigner un N° de téléphone valide")
        phoneNumber.style.borderColor = "red"
    } else if (address.value.length === 0 || !regexAddress.test(address.value)){
        alert("Veuillez renseigner une adresse valide")
        address.style.borderColor = "red"
    } else if (city.value.length === 0 || !regexCity.test(city.value)){
        alert("Veuillez renseigner une ville valide")
        city.style.borderColor = "red"
    } else if (eMail.value.length === 0 || !regexEmail.test(eMail.value)){
        alert("Veuillez renseigner un prénom valie")
        eMail.style.borderColor = "red"
    } else if(cart == null) {
        alert("Votre panier est vide")
    } else {
        alert("Vous pouvez valider votre commande");
        validationButton.classList.remove("disabled")
        
        
        
    }

}

// Evènement au clic--------------------
submitProfil.addEventListener("click", function(event) {
    event.preventDefault();
    formulaire();
})

validationButton.addEventListener("click", function(event) {
    event.preventDefault();
    Infosend();
})

// Fonction envoi de la commande au serveur----------------

function Infosend() {
    // New client
    let newClient = new Client (
        lastName.value,
        firstName.value,
        phoneNumber.value,
        address.value,
        city.value,
        eMail.value    
        );
    fetch("http://localhost:3000/api/teddies/order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
        contact: {
            lastName: newClient.lastName,
            firstName: newClient.firstName,
            address: newClient.address,
            city: newClient.city,
            email: newClient.eMail

        },
        products: Idlist,
        }),
        
    })
    .then((response) => {
        if(response.ok) {
            console.log(response);
            return response.json();
        }
    })
    .then((data) => {
        localStorage.setItem("orderInfos", JSON.stringify(data))
        window.location = './confirmation.html';

    })

    .catch((error) => console.log("erreur de type : ", error))
}