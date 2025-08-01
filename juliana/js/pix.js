// Updated: Removed PIX generation to allow checkout links to work normally
// Version: 2.0 - Checkout links only
document.addEventListener("DOMContentLoaded", function () {
  console.log("PIX.js loaded - Checkout links only mode");
  
  // Remove the event listener that was intercepting button clicks
  // This allows the checkout links to work normally
  
  // Only keep the UTM parameter handling functionality
  function getUtmParameters() {
    const urlParams = new URLSearchParams(window.location.search);

    // Get all UTM parameters and build the full string
    const utmParams = {};

    // Add all UTM parameters to the object
    [
      "utm_source",
      "utm_campaign",
      "utm_medium",
      "utm_content",
      "utm_term",
      "utm_id",
      "fbclid",
      "xcod",
      "sck",
      "src"
    ].forEach((param) => {
      const value = urlParams.get(param);
      if (value) {
        utmParams[param] = value;
      }
    });

    // Build the query string
    if (Object.keys(utmParams).length === 0) {
      return "direct";
    }

    return Object.entries(utmParams)
      .map(
        ([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`
      )
      .join("&");
  }

  // Function to add UTM parameters to checkout links
  function addUtmToCheckoutLinks() {
    const checkoutLinks = document.querySelectorAll('a[href*="pay-pagamentos.link"], a[href*="checkout.geterectus.site"]');
    console.log(`Found ${checkoutLinks.length} checkout links to process`);
    
    const utmParams = getUtmParameters();
    
    if (utmParams === "direct") {
      console.log("No UTM parameters to add");
      return; // No UTM parameters to add
    }
    
    checkoutLinks.forEach((link, index) => {
      const href = link.getAttribute("href");
      if (!href) return;
      
      try {
        const url = new URL(href);
        const linkParams = new URLSearchParams(url.search);
        
        // Add UTM parameters if they don't already exist
        const currentUtmParams = new URLSearchParams(window.location.search);
        [
          "utm_source",
          "utm_campaign", 
          "utm_medium",
          "utm_content",
          "utm_term",
          "utm_id",
          "fbclid",
          "xcod",
          "sck",
          "src"
        ].forEach(param => {
          const value = currentUtmParams.get(param);
          if (value && !linkParams.has(param)) {
            linkParams.set(param, value);
          }
        });
        
        url.search = linkParams.toString();
        link.setAttribute("href", url.toString());
        console.log(`Updated checkout link ${index + 1}: ${url.toString()}`);
      } catch (e) {
        console.error("Error processing checkout link:", href, e);
      }
    });
  }

  // Apply UTM parameters to existing checkout links
  addUtmToCheckoutLinks();

  // Observe DOM changes to handle dynamically added links
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(function(node) {
          if (node.nodeType === 1) { // Element node
            const links = node.querySelectorAll ? node.querySelectorAll('a[href*="pay-pagamentos.link"], a[href*="checkout.geterectus.site"]') : [];
            links.forEach(link => {
              const href = link.getAttribute("href");
              if (!href) return;
              
              try {
                const url = new URL(href);
                const linkParams = new URLSearchParams(url.search);
                
                // Add UTM parameters if they don't already exist
                const currentUtmParams = new URLSearchParams(window.location.search);
                [
                  "utm_source",
                  "utm_campaign", 
                  "utm_medium",
                  "utm_content",
                  "utm_term",
                  "utm_id",
                  "fbclid",
                  "xcod",
                  "sck",
                  "src"
                ].forEach(param => {
                  const value = currentUtmParams.get(param);
                  if (value && !linkParams.has(param)) {
                    linkParams.set(param, value);
                  }
                });
                
                url.search = linkParams.toString();
                link.setAttribute("href", url.toString());
                console.log(`Updated dynamic checkout link: ${url.toString()}`);
              } catch (e) {
                console.error("Error processing checkout link:", href, e);
              }
            });
          }
        });
      }
    });
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});
