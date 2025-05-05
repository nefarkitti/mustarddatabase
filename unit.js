const unitmain = document.getElementById("unitmain")
const content = document.getElementById(`content`)

const title = document.getElementById("title")
const unitname = document.getElementById("unitname")

const basicstats = document.getElementById("basicstats")
const typestats = document.getElementById("typestats")
const statusstats = document.getElementById("statusstats")

const skillslist = document.getElementById("skillslist")

let unitsData

title.innerHTML = ``
unitname.innerHTML = ``

basicstats.innerHTML = ``
typestats.innerHTML = ``
statusstats.innerHTML = ``

skillslist.innerHTML = ``

//skillslist.innerHTML = ``

axios.get('https://raw.githubusercontent.com/nefarkitti/mustardskillcreator/refs/heads/main/enemies2.json').then(res => { //https://raw.githubusercontent.com/nefarkitti/mustardskillcreator/refs/heads/main/enemies.json
    let jsonData = res.data // should be json by default

    unitsData = jsonData

    let windowIndex = window.location.search
    const urlParams = new URLSearchParams(windowIndex);

    if (urlParams.get("id") >= 0) {

        let index = urlParams.get("id")
        
        loadUnit(index)

    } else {
        console.log("failed to load")
    }

}).catch(console.error)

function loadUnit(i) {

    if (!unitsData[i]) {
        unitmain.style.display = `none`

        title.innerHTML = `Unit Not Found - Mustard Database`
        unitname.innerHTML = `Unit Not Found`
        content.innerHTML = `<h1>Unit ID "${i}" does not exist.</h1>`

        return
    }

    let unit = unitsData[i]

    title.innerHTML = `${unit.name} - Mustard Database`
    unitname.innerHTML = `${unit.region} ${unit.name}`

    basicstats.innerHTML = `
                            <div class="item">

                                <img src="assets/health.png" alt="">
                                <span>100</span>

                            </div>

                            <div class="item">

                                <img src="assets/BOMB04B.png" alt="">
                                <span>${unit.attackpower}</span>

                            </div>

                            <div class="item">

                                <img src="assets/sight.png" alt="">
                                <span>${unit.accmod}</span>

                            </div>

                            <div class="item">

                                <img src="assets/shield.png" alt="">
                                <span>${unit.defense}</span>

                            </div>

                            <div class="item">

                                <img src="assets/dodge.png" alt="">
                                <span>${unit.dodge}</span>

                            </div>
    `
    typestats.innerHTML = `
                            <div class="item">

                                <img src="assets/corporate.png" alt="">
                                <span class="corp">${unit.corpres}</span>

                            </div>
                            <div class="item">

                                <img src="assets/sewage.png" alt="">
                                <span class="swge">${unit.swgeres}</span>

                            </div>
                            <div class="item">

                                <img src="assets/soda.png" alt="">
                                <span class="soda">${unit.sodares}</span>

                            </div>
                            <div class="item">

                                <img src="assets/absurd.png" alt="">
                                <span class="absurd">${unit.absrres}</span>

                            </div>
                            <div class="item">

                                <img src="assets/minimalist.png" alt="">
                                <span class="minm">${unit.minmres}</span>

                            </div>
    `
    statusstats.innerHTML = `
                            <div class="item">

                                <img src="" alt="Bleed">
                                <span>${unit.bleedres}</span>

                            </div>

                            <div class="item">

                                <img src="" alt="Poison">
                                <span>${unit.poisonres}</span>

                            </div>

                            <div class="item">

                                <img src="" alt="Burn">
                                <span>${unit.burnres}</span>

                            </div>
    `

    if (unit.note) {

        skillslist.innerHTML += `
        
        <div class="skill">

                    <span class="type">Jane Note</span>

                                <div class="skillmain">

                                    <div class="skillcontent" style="margin-top:-10px;">
    
                                        <span class="extra">${unit.note}</span>

                                    </div>

                                </div>

                            </div>
        
        `

    }

    if (unit.behaviour) {
        skillslist.innerHTML += `
        
        <div class="skill">

                                <div class="skillmain">

                                    <div class="skillcontent">

                                        <div class="titleHold">
                                            <span class="title alt">BEHAVIOUR</span>
                                        </div>
    
                                        <span class="extra" style="margin-top:-0px;">${unit.behaviour}</span>

                                    </div>

                                </div>

                            </div>
        
        `
    }

    for (let i =0;i< unit.skills.length;i++) {

        let skill = unit.skills[i]

        let targetsHTML = ""
        let damageHTML = ""
        let multihitHTML = ""
        let extradetailsHTML = `
        
                                    <div class="details">
                                            <div class="deet" title="Cooldown">
                                                <img src="assets/CLOCK07A.png">${skill.cooldown}
                                            </div>
                                        </div>

        `
        let statuseffectsHTML = ""

        let bleedhtml = ""
        let poisonhtml = ""
        let burnhtml = ""

        for (let j = 0;j<skill.targets;j++) {
            targetsHTML += `<div class="square"></div>`
        }

        if (skill.class != "SUPPORT") {

            if (skill.bleedApplication.potency >= 1) {
                bleedhtml = `<span>Apply ${skill.bleedApplication.potency} Bleed Potency and  ${skill.bleedApplication.turns} Count</span>`
            }
            if (skill.poisonApplication.potency >= 1) {
                poisonhtml = `<span>Apply ${skill.poisonApplication.potency} Poison Potency and  ${skill.poisonApplication.turns} Count</span>`
            }
            if (skill.burnApplication.potency >= 1) {
                burnhtml = `<span>Apply ${skill.burnApplication.potency} Burn Potency and  ${skill.burnApplication.turns} Count</span>`
            }

            statuseffectsHTML = `
                                        <div class="divider">
                                            <hr>
                                            <span>STATUS EFFECTS</span>
                                        </div>

                                        <div class="effects">
                                            ${bleedhtml}
                                            ${poisonhtml}
                                            ${burnhtml}
                                        </div
            `

            extradetailsHTML = `
                                    <div class="details">
                                        <div class="deet" title="Accuracy">
                                                <img src="assets/sight.png">${skill.accuracy}
                                            </div>
                                            <div class="deet" title="Cooldown">
                                                <img src="assets/CLOCK07A.png">${skill.cooldown}
                                            </div>
                                        </div>

                                        <div class="details" style="margin-top:5px;">
                                            <div class="deet" title="Targets">
                                                ${targetsHTML}
                                            </div>
                                        </div>
            `
            multihitHTML = `<span title="Hits this many times" class="multihit">x${skill.multihit}</span>`
            damageHTML = `
                                    <div class="damage">

                                        <h1 title="Base Damage">${skill.basedamage}</h1>

                                        <div class="divider">
                                            <hr>
                                            <span>TYPES</span>
                                        </div>

                                        <div class="types">

                                            <span class="corp">
                                                <img src="assets/corporate.png">${skill.corp}
                                            </span>
                                            <span class="swge">
                                                <img src="assets/sewage.png">${skill.swge}
                                            </span>
                                            <span class="soda">
                                                <img src="assets/soda.png">${skill.soda}
                                            </span>
                                            <span class="absurd">
                                                <img src="assets/absurd.png">${skill.absr}
                                            </span>
                                            <span class="minm">
                                                <img src="assets/minimalist.png">${skill.minm}
                                            </span>

                                        </div>

                                    </div>
            `

        }

        skillslist.innerHTML += `
        
                            <div class="skill ${skill.spec}skill">
                                <span class="type">${skill.class}</span>

                                <div class="skillmain">

                                    ${damageHTML}

                                    <div class="skillcontent">
    
                                        <div class="titleHold">
                                            ${multihitHTML}
                                            <span class="title ${skill.spec} alt">${skill.name}</span>
                                            <span title="Rev Ups" class="revscost"><img src="assets/bullet.png">x${skill.revs}</span>
                                        </div>

                                        ${extradetailsHTML}
    
                                        <span class="extra">${skill.extra}</span>
    
                                        ${statuseffectsHTML}

                                    </div>

                                </div>

                            </div>
        
        `

    }

}