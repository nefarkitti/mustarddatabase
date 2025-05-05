
const units = document.getElementById("units")

let unitsData

let regions = ["BASE", "SWORD DESCENT", "SODA Co", "RATS", "BEARD PIRATES", "MISC", "VELVET"]

units.innerHTML = ``

axios.get('https://raw.githubusercontent.com/nefarkitti/mustardskillcreator/refs/heads/main/enemies2.json').then(res => { //https://raw.githubusercontent.com/nefarkitti/mustardskillcreator/refs/heads/main/enemies.json
    let jsonData = res.data // should be json by default

    unitsData = jsonData

    for (let i = 0; i < regions.length;i++) {

        console.log("hi")

        let region = regions[i]

        units.innerHTML += `
<div class="divider">
    <hr>
    <span>${region}</span>
</div>

                        <div class="unitSection" id="unit-section-${region}">
                            


                        </div>
        `

        let section = document.getElementById(`unit-section-${region}`)

        for (let j = 0; j < unitsData.length;j++) {

            let unit = unitsData[j]

            if (unit.region) {

                if (unit.region == region) {

                    let uniticon = "janemust.png"

                    if (unit.icon) {
                        uniticon = unit.icon
                    }

                    section.innerHTML += `
                    
                            <a href="unit.html?id=${j}" class="unit">

                                <img src="assets/units/${uniticon}.png" alt="${unit.image}.png" border="0" class="icon">

                                <div class="shadow">

                                </div>

                                <span class="name absr">${unit.name}</span>

                            </a>
                    
                    `

                }

            }

        }

    }

}).catch(console.error)

function loadUnitInformation() {



}