const calculateTax = (price) => Math.ceil(price * 30 / 100);

const observer = new MutationObserver(() => {
    const priceField = document.querySelector("#priceTextField");

    if (priceField) {
        priceField.addEventListener("input", () => {
            // Using the formula <desired price> : <taxed price> = x : <desired price>
            // <desired price> * <desired price> = <taxed price> * x
            // x = <desired price>^2 / <taxed price>
        
            const value = parseInt(Number(priceField.value));
            let msgLabel = document.querySelector("#rdt-suggested-price");
        
            if (Number.isInteger(value)) {
                const tax = calculateTax(value);
                const suggestedPrice = Math.floor(Math.pow(value, 2) / (value - tax));

                if (!msgLabel) {
                    // Create the element

                    msgLabel = document.createElement("p");
                    msgLabel.setAttribute("id", "rdt-suggested-price");
                    msgLabel.setAttribute("class", "MuiFormHelperText-root web-blox-css-tss-1d25t12-FormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained MuiFormHelperText-filled web-blox-css-mui-1rj7vct-Typography-caption");
                    msgLabel.setAttribute("aria-live", "polite");
                    
                    priceField.parentElement.parentElement.appendChild(msgLabel);
                }

                msgLabel.textContent = `Set the price to ${suggestedPrice} in order to get exactly ${value} Robux`;
                msgLabel.style.setProperty("color", "white");
            } else {
                if (msgLabel) {
                    msgLabel.remove();
                }
            }
        });
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});