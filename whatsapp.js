// Listen for messages from popup
/*chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'sendBroadcast') {
    handleBroadcast(request.contacts, request.message)
      .then(() => sendResponse({ status: 'Broadcast sent successfully!' }))
      .catch(err => sendResponse({ status: `Failed: ${err.message}` }));
    return true; // indicates asynchronous response
  }
});*/

// content_scripts/getContacts.js

/**
 * Extracts contact names and optional phone numbers
 * from the WhatsApp Web chat list.
 * Run this script in the browser console on web.whatsapp.com,
 * or inject it via a browser extension.
 */

const SELECTORS = {
  chatList: 'div[aria-label="Chat list"]',       // the scrollable container
  chatItem: 'div[role="listitem"]',              // each chat row
  contactName: 'span[dir="auto"]',               // the visible name
  // phone numbers are not shown directly in the list,
  // but we can get them from the "title" attribute of the avatar image.
  avatar: 'div[role="listitem"] img',            // avatar image
};

/**
 * Wait for a specific element to appear in the DOM.
 *//*
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
}*/

/**
 * Extract contacts from the currently loaded chat list.
 * Returns an array of objects { name, phone? }.
 * Phone numbers are often embedded in the avatar image's title attribute
 * or in aria-labels, but availability varies by version.
 */

let message = location.searchParams.get("message");
let store = location.searchParams.get("store");
let link = location.searchParams.get('link');

if( ! message ){
    message = `Buy from ${store} and earn. Download our app from ${link} and get instant N20k`;
    }
async function extractContacts() {
  // ensure the chat list is present
  await waitForElement(SELECTORS.chatList);

  // Wait a bit for all items to render (dynamic loading)
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Optionally scroll to load more contacts (lazy loading)
  const chatListEl = document.querySelector(SELECTORS.chatList);
  if (chatListEl) {
    // Simple scroll to bottom to trigger lazy loading
    chatListEl.scrollTop = chatListEl.scrollHeight;
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Scroll back to top
    chatListEl.scrollTop = 0;
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  const items = document.querySelectorAll(SELECTORS.chatItem);
  const contacts = [];

  items.forEach(item => {
    // Get name from span
    const nameEl = item.querySelector(SELECTORS.contactName);
    const name = nameEl ? nameEl.textContent.trim() : null;
    if (!name) return; // skip empty or group chats without name

    // Try to extract phone number from avatar title or data-testid
    let phone = null;
    const avatar = item.querySelector('img');
    if (avatar && avatar.getAttribute('title')) {
      // title often contains phone number in international format
      phone = avatar.getAttribute('title').replace(/[^+\d]/g, '');
    }
    // Alternative: look for data-testid="cell-phone" inside the item (rare)
    const phoneEl = item.querySelector('[data-testid="cell-phone"]');
    if (!phone && phoneEl) {
      phone = phoneEl.textContent.replace(/\D/g, '');
    }

    contacts.push({ name, phone: phone || undefined });
  });

  // Remove duplicates (WhatsApp may show multiple items for groups, broadcasts)
  const unique = contacts.filter((v, i, a) =>
    a.findIndex(t => t.name === v.name && t.phone === v.phone) === i
  );

  return unique;
}

// --- Usage: call from console or extension ---
extractContacts().then(contacts => {
  console.table(contacts);
  handleBroadcast(contacts, message)
  // Optionally, copy to clipboard as JSON
  // navigator.clipboard.writeText(JSON.stringify(contacts, null, 2));
}).catch(err => console.error('Failed to extract contacts:', err));

async function handleBroadcast(contacts, message) {
  // Step 1: Open the "New broadcast" dialog
  await openNewBroadcastDialog();

  // Step 2: Add each contact one by one
  for (const contact of contacts) {
    await addContactToBroadcast(contact);
  }

  // Step 3: Confirm the broadcast list creation
  await confirmBroadcastList();

  // Step 4: Wait for the new chat to open, then type and send
  await sendMessageInCurrentChat(message);
}

// --------- Helpers ---------

function waitForElement(selector, timeout = 15000) {
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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function openNewBroadcastDialog() {
  // Click the three-dot menu (options) in the chat list header
  // Often: div[title='Menu'] or button[aria-label='Menu']
  const menuBtn = await waitForElement('div[title="Menu"]');
  menuBtn.click();
  await sleep(500);
  
  // Click "New broadcast" menu item
  // The item text is "New broadcast", look for a div with text content
  const menuItems = document.querySelectorAll('div[role="menuitem"]');
  let broadcastItem = null;
  for (const item of menuItems) {
    if (item.textContent.trim() === 'New broadcast') {
      broadcastItem = item;
      break;
    }
  }
  if (!broadcastItem) throw new Error('Could not find "New broadcast" menu item');
  broadcastItem.click();
  await sleep(800); // wait for dialog
}

async function addContactToBroadcast(contactName) {
  // The dialog has a search input. We type the contact name, wait for result, then select it.
  // The search input might be: div[contenteditable="true"][data-testid="chat-list-search"]
  // Or just a contenteditable div with role="textbox" inside the broadcast panel.
  // We'll find the input inside the currently open panel.
  // The broadcast panel often has a header "Broadcast list".
  
  // Look for the search box: inside the panel that contains "Broadcast list" text.
  const panel = await waitForElement('div[data-testid="chat-list"]'); // this is the left panel, but the dialog overlays it.
  // More reliable: find an element with placeholder or contenteditable inside the active dialog.
  // Approach: find all contenteditable divs and pick the one that is visible and has focus context.
  // Simpler: the broadcast panel adds an overlay with a search box; we can use:
  const searchInput = await waitForElement('div[contenteditable="true"][role="textbox"]');
  // Actually there may be many; we need the one inside the broadcast dialog. 
  // The dialog has a specific aria-label or title. Usually it's the only one with a placeholder in that context.
  // For robustness, we can clear the input first:
  searchInput.focus();
  document.execCommand('selectAll');
  document.execCommand('delete');
  
  // Type the contact name
  searchInput.textContent = contactName;
  searchInput.dispatchEvent(new InputEvent('input', { bubbles: true }));
  await sleep(1000); // wait for search results
  
  // Now select the first result that exactly matches or contains the name.
  // The results appear below, each with a checkbox.
  // We need to tick the checkbox.
  // The contact items are usually div[data-testid="chat-list-contact"] or similar.
  const contactItems = document.querySelectorAll('div[data-testid="chat-list-contact"]');
  let found = false;
  for (const item of contactItems) {
    const nameSpan = item.querySelector('span[dir="auto"]') || item;
    if (nameSpan.textContent.trim().toLowerCase().includes(contactName.toLowerCase())) {
      // Click the checkbox inside this item
      const checkbox = item.querySelector('div[role="checkbox"]');
      if (checkbox) {
        checkbox.click();
        found = true;
        break;
      }
    }
  }
  
  if (!found) {
    // Fallback: try clicking the item itself (some versions use a toggle)
    for (const item of contactItems) {
      if (item.textContent.toLowerCase().includes(contactName.toLowerCase())) {
        item.click();
        found = true;
        break;
      }
    }
  }
  
  if (!found) {
    console.warn(`Contact "${contactName}" not found, skipping.`);
    // Clear the search field for next contact
    searchInput.focus();
    document.execCommand('selectAll');
    document.execCommand('delete');
  }
  
  await sleep(500);
}

async function confirmBroadcastList() {
  // Click the "check" button (usually a green circle with a tick) to create the list.
  // It's often a button with aria-label="Create broadcast list" or similar.
  const createBtn = await waitForElement('button[aria-label="Create broadcast list"]');
  createBtn.click();
  await sleep(1000);
}

async function sendMessageInCurrentChat(message) {
  // After creating the broadcast list, the view switches to the new chat.
  // Wait for the message input box (the main chat compose box)
  const inputBox = await waitForElement('div[contenteditable="true"][role="textbox"][spellcheck="true"]');
  // Focus and type
  inputBox.focus();
  document.execCommand('insertText', false, message);
  inputBox.dispatchEvent(new InputEvent('input', { bubbles: true }));
  
  // Wait a bit for the send button to become active
  await sleep(500);
  
  // Click send button
  const sendBtn = await waitForElement('button[aria-label="Send"]');
  sendBtn.click();
}
