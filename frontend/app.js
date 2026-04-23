async function loadProducts() {
    try {
        const res = await fetch("http://localhost:5000/api/products");
        const products = await res.json();

        const container = document.getElementById("product-list");

        container.innerHTML = "";

        products.forEach(p => {
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <img src="${p.image}">
                <div class="card-content">
                    <p class="title">${p.name}</p>
                    <div class="price">
                        <span class="amount">₹${p.price}</span>
                    </div>
                    <button onclick="addToCart(${p.id})">
                        Add to Cart
                    </button>
                </div>
            `;

            container.appendChild(card);
        });

    } catch (err) {
        console.error("Error:", err);
    }
}

function addToCart(id) {
    alert("Product added to cart: " + id);
}

loadProducts();