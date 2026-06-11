document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("uniqueID");
  const userName = document.getElementById("userName");
  const itemList = document.getElementById("item-list");
  const totalAmountCell = document.getElementById("a");
  const discountCell = document.getElementById("discountAmount");
  const netAmountCell = document.getElementById("netAmount");

  const printBtn = document.getElementById("print");
  const resetBtn = document.getElementById("reset");
  const payViaBtn = document.getElementById("payVia");

  const payOptions = document.querySelector(".payOptions");
  const cashBtn = document.getElementById("cash");
  const cardBtn = document.getElementById("card");
  const scanBtn = document.getElementById("scan");

  const page = document.querySelector(".page");

  // 🔑 Auto-fill ID from localStorage (generated at entrance)
  const storedID = localStorage.getItem("customerID");
  if (storedID) {
    searchInput.value = storedID;
    fetchBill(storedID); // auto-fetch bill immediately
  }

  // Manual input fallback
  searchInput.addEventListener("input", () => {
    const uniqueID = searchInput.value.trim();
    if (uniqueID.length === 4 && !isNaN(uniqueID)) {
      fetchBill(uniqueID);
    }
  });

  // Function to fetch and render bill
  function fetchBill(uniqueID) {
    fetch("http://localhost:8080/SmartGroceryManagementSystem/billing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uniqueID })
    })
      .then(response => response.text())
      .then(text => {
        let data;
        try {
          data = JSON.parse(text);
        } catch (err) {
          console.error("Failed to parse response as JSON:", err);
          userName.value = "Error";
          itemList.innerHTML = "<tr><td colspan='4'>Invalid response format</td></tr>";
          totalAmountCell.textContent = "₹0.00";
          discountCell.textContent = "₹0.00";
          netAmountCell.textContent = "₹0.00";
          return;
        }

        userName.value = data.userName || "Unknown";
        itemList.innerHTML = "";

        let total = 0;

        if (!data.item || data.item.length === 0) {
          itemList.innerHTML = "<tr><td colspan='4'>No items found</td></tr>";
          totalAmountCell.textContent = "₹0.00";
          discountCell.textContent = "₹0.00";
          netAmountCell.textContent = "₹0.00";
          return;
        }

        data.item.forEach(item => {
          const quantity = parseInt(item.quantity);
          const price = parseFloat(item.price);
          const itemTotal = price * quantity;

          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${item.name}</td>
            <td>${quantity}</td>
            <td>${price.toFixed(2)}</td>
            <td>${itemTotal.toFixed(2)}</td>
          `;
          itemList.appendChild(row);
          total += itemTotal;
        });

        const discount = total >= 5000 ? total * 0.03 : 0;
        const net = total - discount;

        totalAmountCell.textContent = `₹${total.toFixed(2)}`;
        discountCell.textContent = `₹${discount.toFixed(2)}`;
        netAmountCell.textContent = `₹${net.toFixed(2)}`;
      })
      .catch(error => {
        console.error("Error fetching billing data:", error);
        userName.value = "Error";
        itemList.innerHTML = "<tr><td colspan='4'>Error fetching data</td></tr>";
        totalAmountCell.textContent = "₹0.00";
        discountCell.textContent = "₹0.00";
        netAmountCell.textContent = "₹0.00";
      });
  }

  // Print button
  printBtn.addEventListener("click", () => {
    window.print();
  });

  // Reset button
  resetBtn.addEventListener("click", () => {
    location.reload();
  });

  // Show only payment buttons
  payViaBtn.addEventListener("click", () => {
    page.style.display = "none";
    payOptions.hidden = false;
  });

  // Load cash.html
  cashBtn.addEventListener("click", () => {
    loadForm("cash.html");
  });

  // Load card.html
  cardBtn.addEventListener("click", () => {
    loadForm("card.html");
  });

  // Load scan.html and generate QR
  scanBtn.addEventListener("click", () => {
    loadForm("scan.html", () => {
      const netAmount = document.getElementById("netAmount")?.textContent.replace("₹", "").trim();
      const qrContainer = document.getElementById("qrContainer");

      if (qrContainer && netAmount) {
        new QRious({
          element: qrContainer,
          value: `upi://pay?pa=your-upi-id@bank&pn=SGMS Billing&am=${netAmount}&cu=INR`,
          size: 200
        });
      }
    });
  });

  // Utility: Load external form and hide everything else
  function loadForm(url, callback) {
    document.body.innerHTML = ""; // Clear entire page
    fetch(url)
      .then(res => res.text())
      .then(html => {
        const container = document.createElement("div");
        container.innerHTML = html;
        document.body.appendChild(container);
        if (typeof callback === "function") callback();
        setTimeout(() => {
          location.reload(); // Reloads the original billing page
        }, 5000);
      })
      .catch(err => {
        console.error(`Failed to load ${url}:`, err);
      });
  }
});
