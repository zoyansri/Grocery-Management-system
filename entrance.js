
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
        alert("Type here");
        return;
    }
    const initial = customerName.charAt(0).toUpperCase();
    const uniqueID= Math.floor(Math.random() * 10000);
    const random = Math.floor(Math.random() * 1000000);
    const customerID = `${initial}${random}`;

    console.log("ID is:", uniqueID);
    console.log("CustomerID is : ",customerID);

    fetch("http://localhost:8080/SmartGroceryManagementSystem/insert", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      body:JSON.stringify({ customerName, uniqueID, customerID})
    })
    .then( response => response.text())
    .then( text => {
      console.log("text : ",text)
    })
    .catch(error => {
      console.log("Error : ",error);
    })

    status.style.display = "block";
    hide.style.display = "none";
    
    show.textContent = `${uniqueID}`;
  };
});