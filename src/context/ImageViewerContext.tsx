import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export interface ViewerImage {
  src: string;
  alt?: string;
  label?: string;
  caption?: string;
}

interface ImageViewerCtx {
  open: (images: ViewerImage[], index: number) => void;
}

const Ctx = createContext<ImageViewerCtx>({ open: () => {} });

export function useImageViewer() {
  return useContext(Ctx);
}

interface State {
  images: ViewerImage[];
  index: number;
}

export function ImageViewerProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State | null>(null);

  const open = useCallback((images: ViewerImage[], index: number) => {
    setState({ images, index });
  }, []);

  const close = useCallback(() => setState(null), []);

  const prev = useCallback(() => {
    if (!state) return;
    setState(s => s ? { ...s, index: (s.index - 1 + s.images.length) % s.images.length } : null);
  }, [state]);

  const next = useCallback(() => {
    if (!state) return;
    setState(s => s ? { ...s, index: (s.index + 1) % s.images.length } : null);
  }, [state]);

  return (
    <Ctx.Provider value={{ open }}>
      {children}
      {state && (
        <Lightbox
          images={state.images}
          index={state.index}
          onClose={close}
          onPrev={state.images.length > 1 ? prev : undefined}
          onNext={state.images.length > 1 ? next : undefined}
        />
      )}
    </Ctx.Provider>
  );
}

function Lightbox({
  images, index, onClose, onPrev, onNext,
}: {
  images: ViewerImage[];
  index: number;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}) {
  const img = images[index];

  const handleKey = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowLeft" && onPrev) onPrev();
    if (e.key === "ArrowRight" && onNext) onNext();
  }, [onClose, onPrev, onNext]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      onKeyDown={handleKey}
      autoFocus
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(4,4,4,0.97)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        userSelect: "none",
      }}
    >
      {/* Close */}
      <button
        onClick={e => { e.stopPropagation(); onClose(); }}
        aria-label="Close"
        style={{
          position: "absolute", top: 24, right: 28,
          background: "transparent", border: "1px solid var(--gold)",
          color: "var(--gold)", width: 40, height: 40,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", fontSize: "1rem", fontFamily: "inherit",
          letterSpacing: 0, zIndex: 2,
          transition: "background 0.2s, color 0.2s",
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "var(--gold)"; (e.currentTarget as HTMLButtonElement).style.color = "#000"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = "var(--gold)"; }}
      >
        ×
      </button>

      {/* Counter */}
      {images.length > 1 && (
        <div style={{
          position: "absolute", top: 28, left: 0, right: 0,
          textAlign: "center", fontSize: "0.6rem", letterSpacing: "0.3em",
          textTransform: "uppercase", color: "var(--text-muted)",
          pointerEvents: "none",
        }}>
          {index + 1} / {images.length}
        </div>
      )}

      {/* Prev arrow */}
      {onPrev && (
        <button
          onClick={e => { e.stopPropagation(); onPrev(); }}
          aria-label="Previous image"
          style={arrowStyle("left")}
          onMouseEnter={e => applyArrowHover(e, true)}
          onMouseLeave={e => applyArrowHover(e, false)}
        >
          ‹
        </button>
      )}

      {/* Image */}
      <div
        onClick={e => e.stopPropagation()}
        onContextMenu={e => e.preventDefault()}
        style={{
          position: "relative",
          maxWidth: "min(90vw, 900px)",
          maxHeight: "80vh",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        {/* Corner accents */}
        <div style={{ position: "absolute", top: -8, left: -8, width: 24, height: 24, borderTop: "1px solid var(--gold)", borderLeft: "1px solid var(--gold)", opacity: 0.7 }} />
        <div style={{ position: "absolute", top: -8, right: -8, width: 24, height: 24, borderTop: "1px solid var(--gold)", borderRight: "1px solid var(--gold)", opacity: 0.7 }} />
        <div style={{ position: "absolute", bottom: -8, left: -8, width: 24, height: 24, borderBottom: "1px solid var(--gold)", borderLeft: "1px solid var(--gold)", opacity: 0.7 }} />
        <div style={{ position: "absolute", bottom: -8, right: -8, width: 24, height: 24, borderBottom: "1px solid var(--gold)", borderRight: "1px solid var(--gold)", opacity: 0.7 }} />

        <img
          src={img.src}
          alt={img.alt ?? "HavrePlacide"}
          draggable={false}
          style={{
            maxWidth: "100%",
            maxHeight: "80vh",
            objectFit: "contain",
            display: "block",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Caption */}
      {(img.label || img.caption) && (
        <div
          onClick={e => e.stopPropagation()}
          style={{ marginTop: 24, textAlign: "center", pointerEvents: "none" }}
        >
          {img.label && (
            <div style={{ fontSize: "0.58rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 6 }}>
              {img.label}
            </div>
          )}
          {img.caption && (
            <div className="serif" style={{ fontSize: "1rem", fontWeight: 300, fontStyle: "italic", color: "var(--text-muted)" }}>
              {img.caption}
            </div>
          )}
        </div>
      )}

      {/* Next arrow */}
      {onNext && (
        <button
          onClick={e => { e.stopPropagation(); onNext(); }}
          aria-label="Next image"
          style={arrowStyle("right")}
          onMouseEnter={e => applyArrowHover(e, true)}
          onMouseLeave={e => applyArrowHover(e, false)}
        >
          ›
        </button>
      )}

      {/* ESC hint */}
      <div style={{
        position: "absolute", bottom: 20,
        fontSize: "0.55rem", letterSpacing: "0.3em",
        textTransform: "uppercase", color: "#333",
        pointerEvents: "none",
      }}>
        ESC to close
      </div>
    </div>
  );
}

function arrowStyle(side: "left" | "right"): React.CSSProperties {
  return {
    position: "absolute",
    top: "50%", transform: "translateY(-50%)",
    [side]: 20,
    background: "transparent",
    border: "1px solid var(--gold)",
    color: "var(--gold)",
    width: 48, height: 48,
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", fontSize: "1.8rem", fontFamily: "Georgia, serif",
    lineHeight: 1, zIndex: 2,
    transition: "background 0.2s, color 0.2s",
  };
}

function applyArrowHover(e: React.MouseEvent<HTMLButtonElement>, hover: boolean) {
  const btn = e.currentTarget as HTMLButtonElement;
  btn.style.background = hover ? "var(--gold)" : "transparent";
  btn.style.color = hover ? "#000" : "var(--gold)";
}
