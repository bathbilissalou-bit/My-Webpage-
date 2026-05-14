export function Shop() {
  const products = [
    {
      id: 1,
      name: "Tunique Bleu Marine",
      description: "Handcrafted in super 100 fabric — deep navy with signature embroidered pocket detail. Structured, sharp, and unmistakably HavrePlacide.",
      price: "$350 – $400",
      image: "/img-man-navy-side.jpeg",
    },
    {
      id: 2,
      name: "Tunique Gris Lin",
      description: "Super 100 fabric in soft grey with hand-stitched ornamental patterns. Lightweight, refined, and built to move with you through every occasion.",
      price: "$350 – $400",
      image: "/img-man-grey-standing.jpeg",
    },
    {
      id: 3,
      name: "Tunique Grège",
      description: "Crafted in super 220 — our finest grade. Twin floral-embroidered chest pockets and a polished cufflink finish. Subtle luxury in every thread.",
      price: "$350 – $400",
      image: "/img-tunique-taupe.png",
    },
  ];

  return (
    <section id="shop">
      <div className="section-inner">
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p className="section-label">The Collection</p>
          <h2 className="section-title" style={{ fontStyle: "italic" }}>Shop</h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginTop: 24 }}>
            <div style={{ width: 48, height: 1, background: "var(--gold)" }} />
            <div style={{ width: 6, height: 6, border: "1px solid var(--gold)", transform: "rotate(45deg)" }} />
            <div style={{ width: 48, height: 1, background: "var(--gold)" }} />
          </div>
        </div>

        <div className="products">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-img-wrap">
                <img src={product.image} alt={product.name} />
                <div className="product-overlay">
                  <button className="btn-shop">Shop Now</button>
                </div>
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <span>{product.price}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 56 }}>
          <a href="#contact" className="btn-primary">Request Custom Piece</a>
        </div>
      </div>

      <style>{`
        #shop { background: var(--bg); padding: 100px 40px; }

        .products {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }

        .product-card { cursor: pointer; }

        .product-img-wrap {
          position: relative;
          aspect-ratio: 3 / 4;
          overflow: hidden;
          border: 1px solid var(--border);
          margin-bottom: 20px;
        }

        .product-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s ease;
        }

        .product-card:hover .product-img-wrap img {
          transform: scale(1.04);
        }

        .product-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.48);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.35s;
        }

        .product-card:hover .product-overlay { opacity: 1; }

        .btn-shop {
          background: transparent;
          border: 1px solid var(--gold);
          color: var(--gold);
          padding: 11px 28px;
          font-size: 0.62rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          cursor: pointer;
          font-family: inherit;
          transition: background 0.25s, color 0.25s;
        }
        .btn-shop:hover {
          background: var(--gold);
          color: var(--bg);
        }

        .product-info h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.15rem;
          font-weight: 300;
          color: var(--text);
          margin-bottom: 10px;
          line-height: 1.2;
        }

        .product-info p {
          color: var(--text-muted);
          font-size: 0.8rem;
          line-height: 1.8;
          margin-bottom: 12px;
        }

        .product-info span {
          color: var(--gold);
          font-size: 0.88rem;
          letter-spacing: 0.05em;
        }

        @media (max-width: 768px) {
          #shop { padding: 80px 24px; }
          .products {
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }
        }

        @media (max-width: 480px) {
          .products { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
