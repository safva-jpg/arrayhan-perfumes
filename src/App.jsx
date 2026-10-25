import { useState } from "react";
import "./App.css";

const whatsappNumber = "9746779580";

const products = [
  {
    id: 1,
    name: "Royal Oud",
    category: "Men",
    price: 1499,
    description: "A rich and powerful Arabic oud fragrance.",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 2,
    name: "Sultan Al Oud",
    category: "Men",
    price: 1799,
    description: "A bold fragrance inspired by Arabian luxury.",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 3,
    name: "Black Musk",
    category: "Men",
    price: 1199,
    description: "Deep musk with a warm, elegant finish.",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 4,
    name: "Arabian Night",
    category: "Men",
    price: 1599,
    description: "A mysterious scent for special occasions.",
    image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 5,
    name: "Rose Oud",
    category: "Women",
    price: 1299,
    description: "Beautiful rose notes blended with luxurious oud.",
    image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 6,
    name: "Velvet Musk",
    category: "Women",
    price: 1099,
    description: "Soft, elegant musk for everyday wear.",
    image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 7,
    name: "Noor Al Arab",
    category: "Women",
    price: 1499,
    description: "A graceful fragrance with an oriental touch.",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 8,
    name: "Queen of Arabia",
    category: "Women",
    price: 1899,
    description: "An elegant fragrance with a luxurious character.",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 9,
    name: "White Oud",
    category: "Unisex",
    price: 1399,
    description: "A balanced oud fragrance for everyone.",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 10,
    name: "Amber Royale",
    category: "Unisex",
    price: 1699,
    description: "Warm amber notes with a refined finish.",
    image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 11,
    name: "Oud Al Layl",
    category: "Unisex",
    price: 1999,
    description: "A rich evening fragrance with deep oud notes.",
    image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 12,
    name: "Golden Musk",
    category: "Unisex",
    price: 1299,
    description: "A warm and sophisticated signature scent.",
    image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=700&q=80",
  },
];

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [orderMessage, setOrderMessage] = useState("");

  const categories = ["All", "Men", "Women", "Unisex"];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

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

    setOrderMessage("");
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

  function placeOrder(event) {
    event.preventDefault();

    if (cart.length === 0) {
      setOrderMessage("Your cart is empty. Please add a perfume first.");
      return;
    }

    const itemsMessage = cart
      .map(
        (item) =>
          `${item.name} x ${item.quantity} = ₹${(
            item.price * item.quantity
          ).toLocaleString("en-IN")}`
      )
      .join("\n");

    const message = `Hello Arrayhan Perfumes! I would like to place an order.

Customer: ${customer.name}
Phone: ${customer.phone}
Address: ${customer.address}

Order:
${itemsMessage}

Total: ₹${totalPrice.toLocaleString("en-IN")}

Please confirm my order and delivery charges.`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");

    setOrderMessage(
      "Your order details are ready in WhatsApp. Please send the message there to submit your order."
    );
  }

  return (
    <div className="app">
      <div className="announcement">
        Discover your signature fragrance ✨
      </div>

      <header className="navbar">
        <a href="#home" className="brand">
          ARRAYHAN
          <span>PERFUMES</span>
        </a>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#collection">Collection</a>
          <a href="#about">Our Story</a>
          <a href="#contact">Contact</a>
        </nav>

        <button
  className="nav-order"
  onClick={() => {
    setShowCart(true);
    setCheckout(false);

    setTimeout(() => {
      document.getElementById("cart")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }}
>
  🛍️ Cart ({cartCount})
</button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <p className="eyebrow">THE ART OF ARABIAN FRAGRANCE</p>

            <h1>
              A scent that
              <br />
              <em>stays with you.</em>
            </h1>

            <p className="hero-description">
              Discover Arabic oud and luxury fragrances for men,
              women and everyone who loves an unforgettable scent.
            </p>

            <a href="#collection" className="primary-button">
              Explore Our Collection <span>↗</span>
            </a>

            <div className="hero-note">
              <span>✦</span> Find your signature scent
            </div>
          </div>

          <div className="hero-image">
            <img src={products[0].image} alt="Arabic perfume collection" />
            <div className="image-caption">
              <span>01 / SIGNATURE COLLECTION</span>
              <span>Discover luxury</span>
            </div>
          </div>
        </section>

        <section className="collection section" id="collection">
          <div className="section-heading">
            <div>
              <p className="eyebrow">CURATED FOR YOU</p>
              <h2>
                Our Collection<span>.</span>
              </h2>
            </div>

            <p className="section-description">
              Arabic fragrances for every personality.
            </p>
          </div>

          <div className="product-controls">
            <div className="category-list">
              {categories.map((item) => (
                <button
                  key={item}
                  className={
                    category === item ? "category active" : "category"
                  }
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <input
              type="search"
              placeholder="Search perfumes..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search perfumes"
            />
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-image">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                  />
                  <span className="product-tag">{product.category}</span>
                </div>

                <div className="product-info">
                  <div className="product-title">
                    <h3>{product.name}</h3>
                    <span className="price">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <p>{product.description}</p>

                  <button
                    className="order-button"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart <span>＋</span>
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <p className="no-products">
              No perfumes found. Try another search.
            </p>
          )}
        </section>

        {showCart && (
          <section className="cart-section section" id="cart">
            <div className="section-heading">
              <div>
                <p className="eyebrow">YOUR SELECTION</p>
                <h2>
                  Shopping Cart<span>.</span>
                </h2>
              </div>

              <button
                className="category"
                onClick={() => {
                  setShowCart(false);
                  setCheckout(false);
                }}
              >
                Continue Shopping
              </button>
            </div>

            {cart.length === 0 ? (
              <p>Your cart is empty. Add your favourite perfume!</p>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <img src={item.image} alt={item.name} />

                      <div className="cart-item-details">
                        <h3>{item.name}</h3>
                        <p>₹{item.price.toLocaleString("en-IN")}</p>

                        <div className="quantity-controls">
                          <button
                            onClick={() => changeQuantity(item.id, -1)}
                            aria-label={`Decrease ${item.name} quantity`}
                          >
                            −
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            onClick={() => changeQuantity(item.id, 1)}
                            aria-label={`Increase ${item.name} quantity`}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <strong>
                        ₹
                        {(item.price * item.quantity).toLocaleString("en-IN")}
                      </strong>

                      <button
                        className="remove-button"
                        onClick={() =>
                          setCart((current) =>
                            current.filter((product) => product.id !== item.id)
                          )
                        }
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                <div className="cart-total">
                  <h3>
                    Total: ₹{totalPrice.toLocaleString("en-IN")}
                  </h3>

                  <p>Delivery charges, if any, will be confirmed separately.</p>

                  <button
                    className="primary-button"
                    onClick={() => {
                      setCheckout(true);
                      setOrderMessage("");
                    }}
                  >
                    Proceed to Checkout →
                  </button>
                </div>
              </>
            )}

            {checkout && cart.length > 0 && (
              <div className="checkout-box">
                <p className="eyebrow">ALMOST THERE</p>
                <h2>Checkout</h2>
                <p>Enter your details to prepare your order.</p>

                <form className="checkout-form" onSubmit={placeOrder}>
                  <label>
                    Full Name
                    <input
                      type="text"
                      required
                      value={customer.name}
                      onChange={(event) =>
                        setCustomer({ ...customer, name: event.target.value })
                      }
                      placeholder="Enter your full name"
                    />
                  </label>

                  <label>
                    Phone Number
                    <input
                      type="tel"
                      required
                      pattern="[0-9+\-\s]{10,15}"
                      value={customer.phone}
                      onChange={(event) =>
                        setCustomer({ ...customer, phone: event.target.value })
                      }
                      placeholder="Enter your phone number"
                    />
                  </label>

                  <label>
                    Delivery Address
                    <textarea
                      required
                      rows="4"
                      value={customer.address}
                      onChange={(event) =>
                        setCustomer({
                          ...customer,
                          address: event.target.value,
                        })
                      }
                      placeholder="House name, place, district and PIN code"
                    />
                  </label>

                  <div className="checkout-summary">
                    <span>Order Total</span>
                    <strong>
                      ₹{totalPrice.toLocaleString("en-IN")}
                    </strong>
                  </div>

                  <p className="payment-note">
                    Online payment is not enabled yet. You can send your
                    order through WhatsApp and confirm payment and delivery
                    details with the store.
                  </p>

                  <button className="primary-button" type="submit">
                    Place Order on WhatsApp ↗
                  </button>

                  {orderMessage && (
                    <p className="order-message" role="status">
                      {orderMessage}
                    </p>
                  )}
                </form>
              </div>
            )}
          </section>
        )}

        <section className="about-section" id="about">
          <div className="about-mark">A.</div>

          <div>
            <p className="eyebrow">THE ARRAYHAN EXPERIENCE</p>
            <h2>
              More than a fragrance.
              <br />
              <em>It's your identity.</em>
            </h2>
            <p>
              At Arrayhan Perfumes, every fragrance tells a story.
              Discover Arabic-inspired scents for your own signature style.
            </p>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <p className="eyebrow">LET'S CONNECT</p>
          <h2>Find your perfect scent.</h2>
          <p>
            Have a question about our fragrances? Get in touch with us.
          </p>

          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            className="primary-button"
          >
            Chat with Us on WhatsApp ↗
          </a>
        </section>
      </main>

      <footer className="footer">
        <a href="#home" className="brand footer-brand">
          ARRAYHAN
          <span>PERFUMES</span>
        </a>

        <p>Find your signature scent.</p>

        <span>© {new Date().getFullYear()} Arrayhan Perfumes</span>
      </footer>
    </div>
  );
}

export default App;