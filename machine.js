document.addEventListener("DOMContentLoaded", () => {
  const head = document.querySelector("#head");
  const form = document.querySelector(".form");
  const summary = document.querySelector(".summary");

  const productName = head.querySelector("#name").textContent;
  const machineID = head.querySelector("#machineID").value;
  const productID = head.querySelector("#productID").value;

  const getID = form.querySelector("#uniqueID");
  const dec = form.querySelector("#decrement");
  const quantity = form.querySelector("#qty");
  const inc = form.querySelector("#increment");
  const withdraw = form.querySelector("#give");
  const numbers = form.querySelectorAll(".digit");
  const reset = form.querySelector("#reset");

  const displayQty = summary.querySelector("#displayQty");
  const displayName = summary.querySelector("#displayName");
  const displayID = summary.querySelector("#displayID");

  const maxDigits = 6;

  // Prevent manual typing
  getID.readOnly = true;

  disableControls();
  showDigits();

  numbers.forEach((number) => {
    number.addEventListener("click", () => {
      const digit = number.textContent.trim();
      if (getID.value.length < maxDigits) {
        getID.value += digit;

        if (getID.value.length === 4) {
          const idValue = getID.value.trim();

          fetch("http://localhost:8080/SmartGroceryManagementSystem/check", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ uniqueID: parseInt(idValue) })
          })
            .then((response) => response.text())
            .then((text) => {
              console.log("Server response:", text);
              if (text.trim() === "exists") {
                enableControls();
                hideDigits();
              } else {
                alert("ID not found");
                getID.value = "";
                disableControls();
                showDigits();
              }
            })
            .catch((error) => {
              console.error("Fetch error:", error);
              getID.value = "";
              disableControls();
              showDigits();
            });
        }
      }
    });
  });

  inc.onclick = () => {
    let qty = parseInt(quantity.value) || 0;
    quantity.value = qty + 1;
  };

  dec.onclick = () => {
    let qty = parseInt(quantity.value) || 0;
    quantity.value = Math.max(qty - 1, 0);
  };

  reset.onclick = () => {
    getID.value = "";
    quantity.value = 0;
    disableControls();
    showDigits();
  };

  withdraw.onclick = () => {
    displayName.textContent = productName;
    displayQty.textContent = quantity.value;
    displayID.textContent = getID.value;

    fetch("http://localhost:8080/SmartGroceryManagementSystem/giving", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productID,
        machineID,
        quantity: parseInt(quantity.value),
        uniqueID: parseInt(getID.value)
      })
    })
      .then((response) => response.text())
      .then((text) => {
        console.log("Update response:", text);
        console.log(productID);
        console.log(machineID);
        head.style.display = "none";
        form.style.display = "none";
        summary.style.display = "block";
      })
      .catch((error) => {
        console.error("Update error:", error);
      });
  };

  function disableControls() {
    dec.disabled = true;
    quantity.disabled = true;
    inc.disabled = true;
    withdraw.disabled = true;
  }

  function enableControls() {
    dec.disabled = false;
    quantity.disabled = false;
    inc.disabled = false;
    withdraw.disabled = false;
  }

  function hideDigits() {
    numbers.forEach((number) => {
      number.style.display = "none";
    });
  }

  function showDigits() {
    numbers.forEach((number) => {
      number.style.display = "block";
    });
  }
});
