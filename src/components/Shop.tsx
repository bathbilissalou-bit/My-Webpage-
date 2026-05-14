import { useLang } from "@/i18n/LangContext";
import { t } from "@/i18n/translations";
import { useImageViewer } from "@/context/ImageViewerContext";
import { useConfigurator } from "@/context/ConfiguratorContext";
import { PRODUCT_CATALOG } from "@/data/productCatalog";

export function Shop() {
  const { lang } = useLang();
  const { open: openViewer } = useImageViewer();
  const { open: openConfigurator } = useConfigurator();

  return (
    <section id="shop">
      <div className="section-inner">
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p className="section-label">{t.shop.label[lang]}</p>
          <h2 className="section-title" style={{ fontStyle: "italic" }}>{t.shop.title[lang]}</h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginTop: 24 }}>
            <div style={{ width: 48, height: 1, background: "var(--gold)" }} />
            <div style={{ width: 6, height: 6, border: "1px solid var(--gold)", transform: "rotate(45deg)" }} />
            <div style={{ width: 48, height: 1, background: "var(--gold)" }} />
          </div>
        </div>

        <div className="products">
          {t.shop.products.map((product, i) => {
            const catalogItem = PRODUCT_CATALOG[i];
            return (
              <div className="product-card" key={i}>
                {/* Image — click to view full screen */}
                <div
                  className="product-img-wrap"
                  onClick={() => openViewer(PRODUCT_CATALOG.map(p => ({ src: p.image, label: "Collection SS 2025" })), i)}
                  onContextMenu={e => e.preventDefault()}
                >
                  <img
                    src={catalogItem.image}
                    alt={product.name[lang]}
                    draggable={false}
                    style={{ pointerEvents: "none" }}
                  />
                  <div className="product-overlay">
                    <span className="overlay-zoom">⊕</span>
                  </div>
                </div>

                <div className="product-info">
                  <h3>{product.name[lang]}</h3>
                  <p>{product.desc[lang]}</p>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16, flexWrap: "wrap", gap: 10 }}>
                    <span style={{ color: "var(--gold)", fontSize: "0.88rem", letterSpacing: "0.05em" }}>
                      {product.price}
                    </span>
                    <button
                      className="btn-configure"
                      onClick={() => openConfigurator(catalogItem)}
                    >
                      {t.shop.configureBtn[lang]}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: "center", marginTop: 56 }}>
          <a href="#contact" className="btn-primary">{t.shop.cta[lang]}</a>
        </div>
      </div>

      <style>{`
        #shop { background: var(--bg); padding: 100px 40px; }
        .products { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
        .product-card { user-select: none; }
        .product-img-wrap {
          position: relative; aspect-ratio: 3 / 4;
          overflow: hidden; border: 1px solid var(--border); margin-bottom: 20px;
          cursor: zoom-in;
        }
        .product-img-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.6s ease; }
        .product-card:hover .product-img-wrap img { transform: scale(1.04); }
        .product-overlay {
          position: absolute; inset: 0; background: rgba(0,0,0,0.32);
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transition: opacity 0.35s;
        }
        .product-card:hover .product-overlay { opacity: 1; }
        .overlay-zoom { font-size: 2rem; color: var(--gold); pointer-events: none; }
        .product-info h3 {
          font-family: 'Cormorant Garamond', serif; font-size: 1.15rem;
          font-weight: 300; color: var(--text); margin-bottom: 10px; line-height: 1.2;
        }
        .product-info p { color: var(--text-muted); font-size: 0.8rem; line-height: 1.8; margin-bottom: 0; }
        .btn-configure {
          background: transparent;
          border: 1px solid var(--gold);
          color: var(--gold);
          padding: 10px 20px;
          font-size: 0.58rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          cursor: pointer;
          font-family: inherit;
          transition: background 0.25s, color 0.25s;
          white-space: nowrap;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
        .btn-configure:hover { background: var(--gold); color: var(--bg); }
        @media (max-width: 768px) {
          #shop { padding: 80px 24px; }
          .products { grid-template-columns: 1fr 1fr; gap: 20px; }
        }
        @media (max-width: 480px) { .products { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}
