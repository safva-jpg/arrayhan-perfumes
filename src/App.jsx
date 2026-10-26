import { useState } from "react";
import "./App.css";

const whatsappNumber = "9746779580";

const products = [
  {
    id: 1,
    name: "Royal Oud",
    category: "Men",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600",
    fragrance: ["Oud", "Woody", "Musk"],
    description:
      "A rich and elegant fragrance with a warm oud character. Perfect for special occasions.",
  },
  {
    id: 2,
    name: "Sultan Al Oud",
    category: "Men",
    price: 1799,
    image:
      "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=600",
    fragrance: ["Oud", "Amber", "Spicy"],
    description:
      "A bold oriental fragrance with warm and luxurious notes.",
  },
  {
    id: 3,
    name: "Black Musk",
    category: "Men",
    price: 1199,
    image:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600",
    fragrance: ["Musk", "Woody", "Fresh"],
    description:
      "A smooth, deep fragrance suitable for everyday wear.",
  },
  {
    id: 4,
    name: "Arabian Night",
    category: "Men",
    price: 1599,
    image:
      "https://images.unsplash.com/photo-1595425970377-c9703bc48b6d?w=600",
    fragrance: ["Amber", "Spicy", "Woody"],
    description:
      "An expressive fragrance inspired by Arabian evenings.",
  },
  {
    id: 5,
    name: "Rose Oud",
    category: "Women",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600",
    fragrance: ["Rose", "Oud", "Floral"],
    description:
      "A graceful blend of rose and warm woody notes.",
  },
  {
    id: 6,
    name: "Velvet Musk",
    category: "Women",
    price: 1099,
    image:
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600",
    fragrance: ["Musk", "Soft Floral", "Powdery"],
    description:
      "A soft and elegant fragrance for a beautiful everyday experience.",
  },
  {
    id: 7,
    name: "Noor Al Arab",
    category: "Women",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600",
    fragrance: ["Floral", "Amber", "Musk"],
    description:
      "A charming fragrance with floral and warm oriental notes.",
  },
  {
    id: 8,
    name: "Queen of Arabia",
    category: "Women",
    price: 1899,
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600",
    fragrance: ["Rose", "Amber", "Vanilla"],
    description:
      "An elegant fragrance designed for memorable occasions.",
  },
  {
    id: 9,
    name: "White Oud",
    category: "Unisex",
    price: 1399,
    image:
      "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=600",
    fragrance: ["Oud", "Fresh", "Woody"],
    description:
      "A balanced fragrance with a clean and sophisticated character.",
  },
  {
    id: 10,
    name: "Amber Royale",
    category: "Unisex",
    price: 1699,
    image:
      "https://images.unsplash.com/photo-1595425970377-c9703bc48b6d?w=600",
    fragrance: ["Amber", "Warm Spice", "Woody"],
    description:
      "A warm and rich fragrance suitable for all occasions.",
  },
  {
    id: 11,
    name: "Oud Al Layl",
    category: "Unisex",
    price: 1999,
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600",
    fragrance: ["Oud", "Smoky", "Amber"],
    description:
      "A deep, mysterious fragrance with an elegant oriental character.",
  },
  {
    id: 12,
    name: "Golden Musk",
    category: "Unisex",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600",
    fragrance: ["Musk", "Amber", "Soft Woody"],
    description:
      "A versatile fragrance with soft musk and warm notes.",
  },
];

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [checkout, setCheckout] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(50);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    district: "",
    state: "",
    pincode: "",
  });

  const [orderMessage, setOrderMessage] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  function getPrice(product, size) {
    // Sample prices. Update them with your actual prices.
    return size === 50
      ? product.price
      : Math.round((product.price * 1.7) / 10) * 10;
  }

  function openProduct(product) {
    setSelectedProduct(product);
    setSelectedSize(50);
    setOrderMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function addToCart(product, size = 50) {
    const price = getPrice(product, size);
    const cartKey = `${product.id}-${size}`;

    setCart((previousCart) => {
      const existingItem = previousCart.find(
        (item) => item.cartKey === cartKey
      );

      if (existingItem) {
        return previousCart.map((item) =>
          item.cartKey === cartKey
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...previousCart,
        {
          ...product,
          ml: size,
          price,
          quantity: 1,
          cartKey,
        },
      ];
    });

    setOrderMessage("");
  }

  function changeQuantity(cartKey, amount) {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.cartKey === cartKey
            ? {
                ...item,
                quantity: item.quantity + amount,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function buyNow(product, size) {
    const price = getPrice(product, size);

    setCart([
      {
        ...product,
        ml: size,
        price,
        quantity: 1,
        cartKey: `${product.id}-${size}`,
      },
    ]);

    setShowCart(true);
    setCheckout(true);
    setSelectedProduct(null);
    setOrderMessage("");

    setTimeout(() => {
      document
        .getElementById("checkout-form-section")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 200);
  }

  function openCart() {
    setSelectedProduct(null);
    setShowCart(true);
    setCheckout(false);
    setOrderMessage("");

    setTimeout(() => {
      document.getElementById("cart")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }

  function updateCustomer(event) {
    const { name, value } = event.target;

    setCustomer((previousCustomer) => ({
      ...previousCustomer,
      [name]: value,
    }));
  }

  function placeOrder(event) {
    event.preventDefault();
    setOrderMessage("");

    if (!/^\d{10}$/.test(customer.phone)) {
      setOrderMessage(
        "Please enter a valid 10-digit phone number."
      );
      return;
    }

    if (!/^\d{6}$/.test(customer.pincode)) {
      setOrderMessage(
        "Please enter your 6-digit PIN Code."
      );
      return;
    }

    if (cart.length === 0) {
      setOrderMessage("Your cart is empty.");
      return;
    }

    const itemsText = cart
      .map(
        (item) =>
          `${item.name} - ${item.ml} ml x ${item.quantity} = ₹${item.price * item.quantity}`
      )
      .join("\n");

    const message = `
Hello Arrayhan Perfumes! I would like to place an order.

CUSTOMER DETAILS
Name: ${customer.name}
Phone: ${customer.phone}
Address: ${customer.address}
District: ${customer.district}
State: ${customer.state}
PIN Code: ${customer.pincode}

ORDER DETAILS
${itemsText}

Total: ₹${cartTotal}

Please confirm my order and delivery details.
    `.trim();

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");

    setOrderMessage(
      "Your order details are ready in WhatsApp. Please send the message to confirm your order."
    );
  }

  return (
    <div className="app">
      <header className="navbar">
        <button
          className="brand"
          onClick={() => {
            setSelectedProduct(null);
            setShowCart(false);
            setCheckout(false);
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          <span className="brand-icon">✦</span>
          <span>
            ARRAYHAN
            <small>PERFUMES</small>
          </span>
        </button>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#collection">Collection</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        <button className="cart-button" onClick={openCart}>
          🛍️ Cart <span>{cartCount}</span>
        </button>
      </header>

      <main>
        {!selectedProduct && !showCart && (
          <>
            <section className="hero" id="home">
              <div className="hero-content">
                <p className="eyebrow">
                  THE ART OF ARABIAN FRAGRANCE
                </p>

                <h1>
                  A Fragrance
                  <br />
                  <span>That Defines You.</span>
                </h1>

                <p className="hero-description">
                  Discover a world of captivating scents crafted
                  for unforgettable moments.
                </p>

                <a className="gold-button" href="#collection">
                  Explore Collection →
                </a>
              </div>

              <div className="hero-decoration">
                <div className="hero-circle">
                  <span>✦</span>
                  <p>YOUR SIGNATURE SCENT</p>
                </div>
              </div>
            </section>

            <section
              className="collection section"
              id="collection"
            >
              <div className="section-heading">
                <p className="eyebrow">FIND YOUR SIGNATURE</p>
                <h2>Our Collection</h2>
                <p>
                  Explore fragrances for every mood and moment.
                </p>
              </div>

              <div className="filters">
                <input
                  type="search"
                  placeholder="Search perfumes..."
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  aria-label="Search perfumes"
                />

                <div className="category-buttons">
                  {["All", "Men", "Women", "Unisex"].map(
                    (item) => (
                      <button
                        key={item}
                        className={
                          category === item
                            ? "category active"
                            : "category"
                        }
                        onClick={() => setCategory(item)}
                      >
                        {item}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="product-grid">
                {filteredProducts.map((product) => (
                  <article
                    className="product-card"
                    key={product.id}
                  >
                    <button
                      className="product-image-button"
                      onClick={() => openProduct(product)}
                      aria-label={`View ${product.name} details`}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                        loading="lazy"
                      />

                      <span className="product-badge">
                        {product.category}
                      </span>
                    </button>

                    <div className="product-info">
                      <button
                        className="product-title"
                        onClick={() => openProduct(product)}
                      >
                        {product.name}
                      </button>

                      <p className="product-subtitle">
                        Explore fragrance details
                      </p>

                      <div className="product-bottom">
                        <p className="product-price">
                          ₹{product.price}
                          <small> / 50 ml</small>
                        </p>

                        <button
                          className="details-button"
                          onClick={() => openProduct(product)}
                        >
                          View →
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <p className="empty-message">
                  No perfumes found. Try another search.
                </p>
              )}
            </section>

            <section className="about section" id="about">
              <p className="eyebrow">OUR PHILOSOPHY</p>
              <h2>Fragrance Is Your Signature.</h2>
              <p>
                At Arrayhan Perfumes, we celebrate the beauty of
                fragrance. Find a scent that reflects your style,
                your personality, and your special moments.
              </p>
            </section>

            <section className="contact section" id="contact">
              <p className="eyebrow">WE ARE HERE TO HELP</p>
              <h2>Have Questions?</h2>
              <p>
                Contact us on WhatsApp for product and order enquiries.
              </p>

              <a
                className="gold-button"
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
              >
                Chat on WhatsApp
              </a>

              {/* SHOP LOCATION - ADDED */}
<div
  className="shop-location"
  style={{ marginTop: "45px" }}
>
  <p
    className="eyebrow"
    style={{
      fontWeight: "bold",
      fontSize: "18px",
    }}
  >
    VISIT OUR STORE
  </p>

  <h3>Arrayhan Perfumes</h3>

  <p>Marhaba Mall, Ras Al Khor, Dubai, UAE</p>

  <a
    className="gold-button"
    href="https://maps.app.goo.gl/g9hNsVL92cuTuX5Y9?g_st=aw"
    target="_blank"
    rel="noreferrer"
  >
    📍 Find Our Location
  </a>
</div>
{/* END SHOP LOCATION */}
            </section>
          </>
        )}

        {selectedProduct && (
          <section className="details-page section">
            <button
              className="back-button"
              onClick={() => setSelectedProduct(null)}
            >
              ← Back to Collection
            </button>

            <div className="details-layout">
              <div className="details-image-wrap">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="details-image"
                />

                <span className="details-category">
                  {selectedProduct.category}
                </span>
              </div>

              <div className="details-content">
                <p className="eyebrow">ARRAYHAN PERFUMES</p>

                <h1>{selectedProduct.name}</h1>

                <p className="details-description">
                  {selectedProduct.description}
                </p>

                <div className="fragrance-box">
                  <h3>Fragrance Notes</h3>

                  <div className="note-list">
                    {selectedProduct.fragrance.map((note) => (
                      <span key={note}>{note}</span>
                    ))}
                  </div>

                  <p className="sample-note">
                    Sample notes — replace with the actual fragrance
                    details before selling.
                  </p>
                </div>

                <div className="size-selector">
                  <h3>Select Size</h3>

                  <div className="size-options">
                    {[50, 100].map((size) => (
                      <button
                        key={size}
                        className={
                          selectedSize === size
                            ? "size-option selected"
                            : "size-option"
                        }
                        onClick={() => setSelectedSize(size)}
                      >
                        {size} ml
                      </button>
                    ))}
                  </div>
                </div>

                <div className="details-price">
                  ₹{getPrice(selectedProduct, selectedSize)}
                  <span>{selectedSize} ml</span>
                </div>

                <div className="details-actions">
                  <button
                    className="gold-button"
                    onClick={() => {
                      addToCart(selectedProduct, selectedSize);
                      setOrderMessage(
                        "Added to cart successfully!"
                      );
                    }}
                  >
                    Add to Cart
                  </button>

                  <button
                    className="buy-button"
                    onClick={() =>
                      buyNow(selectedProduct, selectedSize)
                    }
                  >
                    Buy Now →
                  </button>
                </div>

                {orderMessage && (
                  <p className="success-message">
                    {orderMessage}
                  </p>
                )}

                <p className="delivery-note">
                  Order through WhatsApp. Delivery charges and
                  availability can be confirmed when ordering.
                </p>
              </div>
            </div>
          </section>
        )}

        {showCart && (
          <section
            className="cart-section section"
            id="cart"
          >
            <button
              className="back-button"
              onClick={() => {
                setShowCart(false);
                setCheckout(false);
                setOrderMessage("");
              }}
            >
              ← Continue Shopping
            </button>

            <div className="section-heading">
              <p className="eyebrow">YOUR SELECTION</p>
              <h2>{checkout ? "Checkout" : "Your Cart"}</h2>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <p>Your cart is empty.</p>

                <button
                  className="gold-button"
                  onClick={() => setShowCart(false)}
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div
                      className="cart-item"
                      key={item.cartKey}
                    >
                      <img src={item.image} alt={item.name} />

                      <div className="cart-item-info">
                        <h3>{item.name}</h3>
                        <p>{item.ml} ml</p>

                        <strong>
                          ₹{item.price * item.quantity}
                        </strong>
                      </div>

                      <div className="quantity-controls">
                        <button
                          onClick={() =>
                            changeQuantity(item.cartKey, -1)
                          }
                          aria-label={`Decrease ${item.name} quantity`}
                        >
                          −
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          onClick={() =>
                            changeQuantity(item.cartKey, 1)
                          }
                          aria-label={`Increase ${item.name} quantity`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-total">
                  <span>Total</span>
                  <strong>₹{cartTotal}</strong>
                </div>

                {!checkout && (
                  <button
                    className="gold-button checkout-button"
                    onClick={() => {
                      setCheckout(true);
                      setOrderMessage("");

                      setTimeout(() => {
                        document
                          .getElementById(
                            "checkout-form-section"
                          )
                          ?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                      }, 200);
                    }}
                  >
                    Proceed to Checkout →
                  </button>
                )}

                {checkout && (
                  <form
                    className="checkout-box"
                    id="checkout-form-section"
                    onSubmit={placeOrder}
                  >
                    <p className="eyebrow">
                      DELIVERY INFORMATION
                    </p>

                    <h2>Customer Details</h2>

                    <label htmlFor="customer-name">
                      Full Name
                    </label>

                    <input
                      id="customer-name"
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={customer.name}
                      onChange={updateCustomer}
                      required
                    />

                    <label htmlFor="customer-phone">
                      Phone Number
                    </label>

                    <input
                      id="customer-phone"
                      type="tel"
                      name="phone"
                      placeholder="Enter 10-digit phone number"
                      value={customer.phone}
                      onChange={updateCustomer}
                      inputMode="numeric"
                      maxLength={10}
                      pattern="[0-9]{10}"
                      title="Enter a valid 10-digit phone number"
                      required
                    />

                    <label htmlFor="customer-address">
                      Full Address
                    </label>

                    <textarea
                      id="customer-address"
                      name="address"
                      placeholder="House name, street, place and post office"
                      value={customer.address}
                      onChange={updateCustomer}
                      rows={3}
                      required
                    />

                    <div className="form-row">
                      <div>
                        <label htmlFor="customer-district">
                          District
                        </label>

                        <input
                          id="customer-district"
                          type="text"
                          name="district"
                          placeholder="Enter district"
                          value={customer.district}
                          onChange={updateCustomer}
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="customer-state">
                          State
                        </label>

                        <input
                          id="customer-state"
                          type="text"
                          name="state"
                          placeholder="Enter state"
                          value={customer.state}
                          onChange={updateCustomer}
                          required
                        />
                      </div>
                    </div>

                    <label htmlFor="customer-pincode">
                      📮 PIN Code (6 digits)
                    </label>

                    <input
                      id="customer-pincode"
                      className="pincode-input"
                      type="text"
                      name="pincode"
                      placeholder="Enter your 6-digit PIN Code"
                      value={customer.pincode}
                      onChange={(event) => {
                        const value = event.target.value
                          .replace(/\D/g, "")
                          .slice(0, 6);

                        setCustomer((previousCustomer) => ({
                          ...previousCustomer,
                          pincode: value,
                        }));
                      }}
                      inputMode="numeric"
                      maxLength={6}
                      pattern="[0-9]{6}"
                      title="Enter a valid 6-digit PIN Code"
                      required
                    />

                    <p className="pincode-help">
                      Please check your PIN Code before placing your order.
                    </p>

                    <div className="checkout-total">
                      Order Total: ₹{cartTotal}
                    </div>

                    <button
                      type="submit"
                      className="whatsapp-button"
                    >
                      Order via WhatsApp →
                    </button>

                    {orderMessage && (
                      <p
                        className={
                          orderMessage.startsWith("Your order")
                            ? "success-message"
                            : "error-message"
                        }
                        role="status"
                      >
                        {orderMessage}
                      </p>
                    )}

                    <p className="payment-note">
                      Payment and delivery arrangements will be
                      confirmed through WhatsApp. Online payment
                      is not integrated yet.
                    </p>
                  </form>
                )}
              </>
            )}
          </section>
        )}
      </main>

      <footer className="footer">
        <div className="footer-brand">
          <span className="brand-icon">✦</span>
          ARRAYHAN PERFUMES
        </div>

        <p>Discover your signature fragrance.</p>

        <small>
          © {new Date().getFullYear()} Arrayhan Perfumes. All rights reserved.
        </small>
      </footer>
    </div>
  );
}

export default App;