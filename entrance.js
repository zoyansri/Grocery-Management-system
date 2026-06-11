document.addEventListener("DOMContentLoaded", () => {
  const status = document.querySelector("#status");
  const hide = document.querySelector("#hide");

  const btn = hide.querySelector("#id");
  const show = status.querySelector("#here");
  const nameInput = hide.querySelector("#nameInput");

  status.style.display = "none";
  hide.style.display = "block";

  btn.onclick = () => {
    const customerName = nameInput.value.trim();
    if (!customerName) {
      alert("Please enter your name");
      return;
    }

    const initial = customerName.charAt(0).toUpperCase();
    const uniqueID = Math.floor(Math.random() * 10000);
    const random = Math.floor(Math.random() * 1000000);
    const customerID = `${initial}${random}`;

    console.log("ID is:", uniqueID);
    console.log("CustomerID is:", customerID);

    // Save ID in localStorage for vending + billing
    localStorage.setItem("customerID", uniqueID);

    // Send to backend
    fetch("http://localhost:8080/SmartGroceryManagementSystem/insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerName, uniqueID, customerID })
    })
    .then(response => response.text())
    .then(text => {
      console.log("Response:", text);
    })
    .catch(error => {
      console.log("Error:", error);
    });

    // Show ID
    status.style.display = "block";
    hide.style.display = "none";
    show.textContent = `${uniqueID}`;

    // After 5 seconds, show vending machines
    setTimeout(() => {
      status.style.display = "none";
      document.getElementById("vendingSection").style.display = "block";
    }, 5000);

    // After vending, show billing link (optional timing)
    setTimeout(() => {
      document.getElementById("billingSection").style.display = "block";
    }, 10000);
  };
});
