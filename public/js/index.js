    async function register(){
    window.location.href = "pages/register.html"
    }
    async function login(){
    window.location.href = "pages/login.html"
    }

          let div = document.getElementById("div");
          let home = document.getElementById("home");
          let loadingTurn = 1

      async function fetchdata() {
        let response = await fetch(`http://${window.location.hostname}:3000/product/find`);
        let products = await response.json();
        display(products.data,1)

      }

      function display(products,reload){
        
        let newarr = []
        for(value of products){
            let newdata = {id:value.id,
                title:value.title,
                description:value.description,
                catogery:value.category,
                price:value.price,
                images:value.images
            }
            newarr.push(newdata)
        }

        let newarr1 = {}

        for(v of newarr){
            if(newarr1[v.catogery] == undefined) newarr1[v.catogery] = [v]
            else newarr1[v.catogery].push(v)

        }

        home.innerHTML = ""

        let filter = document.getElementById("filter")

          for([i,v] of Object.entries(newarr1)){
            let catogerydiv = document.createElement("div")
            catogerydiv.id = "div"
            let catogerytitle = document.createElement("h1")
            catogerytitle.id = "title"
            catogerytitle.innerHTML = `${i}`
            if(loadingTurn == 1)filter.innerHTML +=`<input type="radio" name="category" value="${i}" style="color: white;">${i}</br>`

          for(d of v){
            let img = d.images[0]
            catogerydiv.innerHTML += `
            <div class="card" >
                <img src="${img}" alt="" >
                <h2>${d.title}</h2>
                <p>${d.description}</p>
             ${loadingTurn==1?``:`<h1>${d.price}</h1>`}
                ${loadingTurn==1?`<button id="btn" onclick = "submt('${i}')">view more</button>`:`<button id="btn" onclick = "send(${d.id})"><a href ="./pages/nextpage.html" id = "ankr">buy now</a></button>`}
            </div>`
           if(reload == 1)home.append(catogerydiv)
        }
        if(reload==2){
          let reloadDiv = document.createElement("div")
          reloadDiv.append(catogerytitle);
          reloadDiv.append(catogerydiv)
          home.append(reloadDiv)
      }
      }
      if(loadingTurn == 1)filter.innerHTML+=`<div style = "text-align : center;"><button id="btn" style = "margin-top : 15%;"onclick="submt(null)">Filter</button></div>`
      loadingTurn = 2
        

      }
      fetchdata();

      async function submt(catgry){
        let radio = document.querySelector('input[name=category]:checked')
        // console.log(radio);
        let category = radio?radio.value:catgry
        // if(!category)category = catgry
        // console.log(catgry);
        let data = await fetch(`http://${window.location.hostname}:3000/product/findSome?category=${category}`)
        let products = await data.json()
        display(products.data,2)
        // filter()
      }
      
      function send(id){
        localStorage.setItem('id',id)        
      }

      function filter(){
        let filter = document.getElementById("filter")
        let deleteImg = document.getElementById("deleteImg")
        let filterImg = document.getElementById("filterImg")

        if(filter.style.display == "none"){filter.style.display = "block";deleteImg.style.display = "block";filterImg.style.display = "none"}
        else {filter.style.display = "none";deleteImg.style.display = "none";filterImg.style.display = "block"}
      }

