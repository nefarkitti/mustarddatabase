axios.get('floors.json').then(res => {

    let jsonData = res.data // should be json by default

    console.log(jsonData)

    jsonData.forEach(floor => {
        
        document.getElementById("floors").innerHTML += `
        
<div class="divider">
                            <hr>
                            <span>${floor.name}</span>
                        </div>

                        <div class="content">${floor.desc}</div>
        
        `

    });

})