axios.get('https://api-gate2.movieglu.com/filmsNowShowing/?n=4', {
    headers: {
    
      "client":"PERS_103",
       "x-api-key":"0hUVmKVwTG63JE1aEUUht6QGZ41W9noO63yBEMIA",
       "authorization":"Basic UEVSU18xMDNfWFg6aENhaUFTY3pUVDd5",
       "territory":"XX",
        "api-version":"v200",
        "geolocation":"-22.0;14.0 ",
        "device-datetime":"2022-01-04T08:30:17.360Z"
   }
  }).then((response)=>{
      
  const {films}=response.data
  console.log(films)
  
  
  films.forEach((element)=>{
      const obj =element.images.still
      const obj1 =element.images.still[Object.keys(obj)]
      const url=obj1.medium.film_image
  
  createElements(element.film_name,url,element.synopsis_long)
  })
  
  
  })
  
  
  
  function createElements(head,src,descripbtion){
      const parentDiv=document.querySelector("#parentDiv")
  //     <div class="ui internally celled grid">
  
  const outerdiv=document.createElement('div')
  outerdiv.classList.add("ui","internally","celled","grid")
  parentDiv.appendChild(outerdiv)
  {/* <div class="row"> */}
  
  const HeaderDiv=document.createElement('div')
  HeaderDiv.classList.add("header")
  outerdiv.appendChild(HeaderDiv)
  HeaderDiv.textContent=head
  
  //     <div class="row">
  const row=document.createElement('div')
  row.classList.add("row")
  outerdiv.appendChild(row)
  //       <div class="four wide column">
  const fourWideColumn=document.createElement('div')
  fourWideColumn.classList.add("four","wide","column")
  row.appendChild(fourWideColumn)
  //         <img>
  const img=document.createElement('img')
  img.src=src
  fourWideColumn.appendChild(img)
  //       </div>
  //       <div class="twelve wide column">
  const twelveWideColumn=document.createElement('div')
  twelveWideColumn.classList.add("twelve","wide","column")
  row.appendChild(twelveWideColumn)
  //         <p></p>
  const p=document.createElement('p')
  twelveWideColumn.appendChild(p)
  p.textContent=descripbtion
  //       </div>
      
  //     </div>
   
  //   </div>
  }