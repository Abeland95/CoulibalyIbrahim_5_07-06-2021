// Initialisation des variables url-----------------
let url = "http://localhost:3000/api/teddies"



// Fetch des Teddies--------------------------------------

//* Récupèration des données de l'API avec fetch-----------------------------------
fetch(url)
    .then(teddies => teddies.json())
    .then(teddies => { // Promise //
        return new Promise(function (resolve, reject) {
            let request = new XMLHttpRequest();
            request.onreadystatechange = function () {
                if (request.readyState === XMLHttpRequest.DONE) {
                    if (request.status === 200) {
                        resolve(JSON.parse(request.responseText))
                        //* récupèration de chaque élément du tableau Array----------------------------------
                        teddies.forEach(({
                            _id,
                            name,
                            price,
                            description,
                            imageUrl,
                        }) => {
                            //* Création variable container------------------------------------------------------
                            let container = document.getElementById("teddyProducts")

                            //* Template : page teddy----------------------------------------------------------
                            let div = document.createElement("div")
                            let img = document.createElement("img")
                            let h3 = document.createElement("h3")
                            let h4 = document.createElement("h4")
                            let p = document.createElement("p")
                            let a = document.createElement("a")

                            //* Création des "noeuds" du nom de l'appareil------------------------------------
                            let cardName = document.createTextNode(name)
                            let cardPrice = document.createTextNode(price / 100 + " €")
                            let cardDescription = document.createTextNode(description)

                            //* Affichage des données---------------------------------------------------------
                            a.href = './pages/produit.html?id=' + _id
                            a.textContent = "En savoir plus"
                            img.src = imageUrl

                            //* FlowChart-Hiérarchisation---------------------------------------------------
                            
                            container.appendChild(div)
                            div.appendChild(img)
                            div.appendChild(h3)
                            div.appendChild(h4)
                            div.appendChild(p)
                            div.appendChild(a)
                            h3.appendChild(cardName)
                            h4.appendChild(cardPrice)
                            p.appendChild(cardDescription)

                            //* Attibutions des class Bootstrap--------------------------------------------------
                            container.className = "col-12 d-flex flex-row flex-wrap justify-content-center lg-flex-row sm-flex-column "
                            div.className = "m-3 card col-xl-3 col-lg-12 col-md-12 col-sm-12"
                            img.className = "card-img-top p-3 img-fluid w-100"
                            a.className = "m-3 btn btn-secondary w-80 border mx-auto"
                            h3.className = "mx-3"
                            h4.className = "mx-3"
                            p.className = "mx-3"

                            
                            
                        })

                    } else {
                        reject(console.log('erreur :' + error));
                        reject(console.log(error));
                    }
                }
            }

            request.open("GET", 'http://localhost:3000/api/teddies');
            request.send();
        })

    })



