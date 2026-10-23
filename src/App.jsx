import { useState } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "Oud Al Layl",
    category: "Oud",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600",
    description: "Rich and luxurious oud fragrance",
  },
  {
    id: 2,
    name: "Royal Musk",
    category: "Men",
    price: 599,
    image:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600",
    description: "A fresh and elegant fragrance",
  },
  {
    id: 3,
    name: "Rose Elegance",
    category: "Women",
    price: 699,
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600",
    description: "A beautiful floral fragrance",
  },
  {
    id: 4,
    name: "Golden Attar",
    category: "Attar",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=600",
    description: "A timeless and memorable scent",
  },
];

function App() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  function addToCart(product) {
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === product.id);

      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  }

  function changeQuantity(id, amount) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function orderOnWhatsApp() {
    if (cart.length === 0) {
      alert("Please add a perfume to your cart first!");
      return;
    }

    const phoneNumber = "91XXXXXXXXXX";

    const message = cart
      .map(
        (item) =>
          `${item.name} x ${item.quantity} = ₹${
            item.price * item.quantity
          }`
      )
      .join("\n");

    const orderMessage = `Hello Arrayhan Perfumes! I would like to order:\n\n${message}\n\nTotal: ₹${totalPrice}\n\nPlease confirm my order.`;

    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(orderMessage)}`,
      "_blank"
    );
  }

  return (
    <div className="website">
      <div className="announcement">
        LUXURY IN EVERY DROP ✦ DISCOVER YOUR SIGNATURE SCENT
      </div>

      <header className="navbar">
        <a href="#home" className="logo">
          ARRAYHAN <span>PERFUMES</span>
        </a>

        <nav>
          <a href="#home">Home</a>
          <a href="#shop">Shop</a>
          <a href="#about">Our Story</a>
        </nav>

        <a href="#cart" className="cart-link">
          🛍️ Bag ({totalItems})
        </a>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <p className="eyebrow">THE ART OF LUXURY</p>

            <h1>
              A SCENT THAT
              <br />
              <span>DEFINES YOU.</span>
            </h1>

            <p className="hero-description">
              Discover unforgettable fragrances crafted for those who
              appreciate elegance, confidence and timeless luxury.
            </p>

            <a href="#shop" className="gold-button">
              EXPLORE COLLECTION →
            </a>
          </div>

          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1594035910387-fea47794261f?w=900"
              alt="Luxury perfume bottle"
            />
            <div className="image-label">YOUR SIGNATURE. YOUR STORY.</div>
          </div>
        </section>

        <section className="features">
          <div>✦ ELEGANT FRAGRANCES</div>
          <div>✦ CAREFULLY SELECTED</div>
          <div>✦ MADE FOR EVERY MOMENT</div>
        </section>

        <section className="shop-section" id="shop">
          <div className="section-heading">
            <p className="eyebrow">FIND YOUR FRAGRANCE</p>
            <h2>The Signature Collection</h2>
            <p>Explore scents that leave a lasting impression.</p>
          </div>

          <input
            className="search-box"
            type="text"
            placeholder="Search perfumes..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <div className="categories">
            {["All", "Men", "Women", "Oud", "Attar"].map((item) => (
              <button
                key={item}
                className={category === item ? "active" : ""}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  <span className="product-tag">{product.category}</span>
                </div>

                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>

                  <div className="product-bottom">
                    <strong>₹{product.price}</strong>
                    <button onClick={() => addToCart(product)}>
                      + Add
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <p className="empty-message">No perfumes found.</p>
          )}
        </section>

        <section className="about-section" id="about">
          <p className="eyebrow">OUR PHILOSOPHY</p>
          <h2>Luxury is a feeling.</h2>
          <p>
            At Arrayhan Perfumes, every fragrance is an opportunity to
            express your individuality. Find a scent that feels like you.
          </p>
        </section>

        <section className="cart-section" id="cart">
          <p className="eyebrow">YOUR SELECTION</p>
          <h2>Your Shopping Bag ({totalItems})</h2>

          {cart.length === 0 ? (
            <p className="empty-message">
              Your bag is waiting for your favourite fragrance.
            </p>
          ) : (
            <>
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div>
                    <h3>{item.name}</h3>
                    <p>₹{item.price} each</p>
                  </div>

                  <div className="quantity-controls">
                    <button onClick={() => changeQuantity(item.id, -1)}>
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => changeQuantity(item.id, 1)}>
                      +
                    </button>
                  </div>

                  <strong>₹{item.price * item.quantity}</strong>
                </div>
              ))}

              <div className="cart-total">
                <span>Total</span>
                <strong>₹{totalPrice}</strong>
              </div>

              <button className="gold-button order-button" onClick={orderOnWhatsApp}>
                ORDER ON WHATSAPP →
              </button>

              <p className="small-note">
                WhatsApp ordering will work after the business phone number
                is added to the code.
              </p>
            </>
          )}
        </section>
      </main>

      <footer>
        <a href="#home" className="logo">
          ARRAYHAN <span>PERFUMES</span>
        </a>
        <p>Wear the fragrance. Own the moment.</p>
        <p>© 2026 Arrayhan Perfumes</p>
      </footer>
    </div>
  );
}

export default App;