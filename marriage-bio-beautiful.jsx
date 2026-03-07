import React, { useState, useEffect, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import img20241026 from "./src/assets/IMG-20241026-WA0177.jpg";
import img20241109 from "./src/assets/IMG_20241109_141207.jpg";
import img20241113 from "./src/assets/IMG_20241113_133519.jpg";
import img20250210 from "./src/assets/IMG_20250210_104249.jpg";
import img20250219 from "./src/assets/IMG_20250219_122747.jpg";
import img20250225 from "./src/assets/IMG_20250225_164742.jpg";
import img20250228 from "./src/assets/IMG_20250228_120554.jpg";
import img20250304 from "./src/assets/IMG_20250304_162935.jpg";
import img20250314 from "./src/assets/IMG_20250314_170741.jpg";
import img20250331 from "./src/assets/IMG_20250331_134304.jpg";
import screenshot20251112 from "./src/assets/Screenshot_20251112_011822.jpg";

const PHOTOS = [
  img20241026,
  img20241109,
  img20241113,
  img20250210,
  img20250219,
  img20250225,
  img20250228,
  img20250304,
  img20250314,
  img20250331,
  screenshot20251112,
];


const BISMILLAH = "بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ";
const ARABIC_NAME = "تميم أنصاري";

const lifestyle = [
  {icon:"🚭",text:"Non-Smoker"},{icon:"🚫",text:"Non-Drinker"},
  {icon:"☕",text:"No Tea / Coffee"},{icon:"🍫",text:"No Sweets"},
  {icon:"🥛",text:"No Milk"},{icon:"🍔",text:"No Junk Food"},
  {icon:"🎬",text:"Does not watch movies"},{icon:"🎵",text:"Does not listen to songs"},
];
const coreValues = ["Fitness-Focused","Spiritual","Family Responsibility","Eggetarian","Teetotaler","Minimalist","Health-Conscious","Value-Driven","Self-Disciplined","Traditional Mindset","Simple Living","Principle-Driven"];
const foods = [{e:"🍛",n:"White Rice with Rasam & Egg"},{e:"🍚",n:"Egg Biryani"},{e:"🥥",n:"Coconut Rice"},{e:"✨",n:"Ghee Rice"}];
const hobbies = ["🏋️ Fitness & Workout","🚶 Long Walks","📖 Reading","💻 Coding & Tech","🌿 Nature & Outdoors","🍳 Cooking Healthy"];

/* ── Islamic geometric corner SVG ── */
const Corner = ({ flip }) => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none"
    style={{ transform: flip ? "scaleX(-1)" : "none" }}>
    <path d="M2 2 L22 2 L22 8 L8 8 L8 22 L2 22 Z" stroke="#c9a84c" strokeWidth="1.2" fill="none"/>
    <path d="M2 2 L14 14" stroke="#c9a84c" strokeWidth="0.8" opacity="0.5"/>
    <circle cx="22" cy="22" r="3" stroke="#c9a84c" strokeWidth="1" fill="none"/>
    <circle cx="2" cy="2" r="1.5" fill="#c9a84c"/>
  </svg>
);

const StarDivider = () => (
  <div style={{display:"flex",alignItems:"center",gap:"12px",justifyContent:"center",margin:"0 auto"}}>
    <div style={{flex:1,height:"1px",background:"linear-gradient(to right,transparent,#c9a84c)"}}/>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <polygon points="12,2 14.5,9 22,9 16,14 18.5,21 12,17 5.5,21 8,14 2,9 9.5,9" fill="#c9a84c"/>
    </svg>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <polygon points="12,2 14.5,9 22,9 16,14 18.5,21 12,17 5.5,21 8,14 2,9 9.5,9" fill="#e8c96a" opacity="0.6"/>
    </svg>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <polygon points="12,2 14.5,9 22,9 16,14 18.5,21 12,17 5.5,21 8,14 2,9 9.5,9" fill="#c9a84c"/>
    </svg>
    <div style={{flex:1,height:"1px",background:"linear-gradient(to left,transparent,#c9a84c)"}}/>
  </div>
);

/* ── Section Card ── */
const Card = ({ icon, title, children, delay=0 }) => (
  <div style={{
    position:"relative",
    background:"linear-gradient(135deg,rgba(255,252,245,0.06) 0%,rgba(255,252,245,0.02) 100%)",
    border:"1px solid rgba(201,168,76,0.25)",
    borderRadius:"12px",
    padding:"clamp(18px,4vw,26px)",
    marginBottom:"16px",
    backdropFilter:"blur(4px)",
    animationDelay:`${delay}ms`
  }} className="card-reveal">
    {/* top accent line */}
    <div style={{position:"absolute",top:0,left:"20px",right:"20px",height:"1px",background:"linear-gradient(to right,transparent,#c9a84c,transparent)"}}/>
    <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"16px"}}>
      <div style={{
        width:"34px",height:"34px",borderRadius:"8px",
        background:"linear-gradient(135deg,rgba(201,168,76,0.2),rgba(201,168,76,0.05))",
        border:"1px solid rgba(201,168,76,0.3)",
        display:"flex",alignItems:"center",justifyContent:"center",
        fontSize:"16px",flexShrink:0
      }}>{icon}</div>
      <h3 style={{
        fontFamily:"Playfair Display,serif",
        color:"#e8d5a0",
        fontSize:"clamp(13px,3vw,15px)",
        fontWeight:"700",
        letterSpacing:"1.5px",
        textTransform:"uppercase",
        margin:0
      }}>{title}</h3>
    </div>
    {children}
  </div>
);

/* ── Info Row ── */
const Row = ({ label, value }) => (
  <div style={{
    display:"flex",justifyContent:"space-between",alignItems:"flex-start",
    padding:"9px 0",borderBottom:"1px solid rgba(201,168,76,0.1)",gap:"12px"
  }}>
    <span style={{
      fontFamily:"Lato,sans-serif",color:"rgba(255,245,220,0.45)",
      fontSize:"clamp(9px,2vw,11px)",letterSpacing:"1.2px",textTransform:"uppercase",
      whiteSpace:"nowrap",paddingTop:"2px",flexShrink:0
    }}>{label}</span>
    <span style={{
      fontFamily:"Playfair Display,serif",color:"#fdf6e3",
      fontSize:"clamp(12px,2.8vw,14px)",fontWeight:"500",textAlign:"right"
    }}>{value}</span>
  </div>
);

/* ── Tag pill ── */
const Pill = ({ children }) => (
  <span style={{
    display:"inline-block",padding:"5px 13px",margin:"3px",
    background:"linear-gradient(135deg,rgba(201,168,76,0.15),rgba(201,168,76,0.05))",
    border:"1px solid rgba(201,168,76,0.3)",
    borderRadius:"20px",color:"#e8d090",
    fontSize:"clamp(10px,2.2vw,11px)",letterSpacing:"0.5px",
    fontFamily:"Lato,sans-serif"
  }}>{children}</span>
);

/* ── Photo Gallery ── */
function Gallery() {
  const photos = useMemo(() => {
    const modules = import.meta.glob("/src/assets/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}", {
      eager: true,
      import: "default"
    });
    return Object.values(modules).sort((a, b) => a.localeCompare(b));
  }, []);
  const [cur, setCur] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const [lightboxReady, setLightboxReady] = useState(false);
  const [lightboxFailed, setLightboxFailed] = useState(false);
  const timer = useRef(null);

  const startAutoSlide = () => {
    clearInterval(timer.current);
    timer.current = setInterval(() => {
      setCur((prev) => (prev + 1) % photos.length);
    }, 4000);
  };

  const openLightbox = (index) => {
    const next = (index + photos.length) % photos.length;
    clearInterval(timer.current);
    setCur(next);
    setLightboxReady(false);
    setLightboxFailed(false);
    setLightbox(next);
  };

  const closeLightbox = () => {
    setLightbox(null);
    startAutoSlide();
  };

  const stepSlider = (dir) => {
    setCur((prev) => (prev + dir + photos.length) % photos.length);
    startAutoSlide();
  };

  const stepLightbox = (dir) => {
    setLightbox((prev) => {
      const next = (prev + dir + photos.length) % photos.length;
      setCur(next);
      setLightboxReady(false);
      setLightboxFailed(false);
      return next;
    });
  };

  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(timer.current);
  }, []);

  useEffect(() => {
    if (photos.length < 2) return;
    const nextIndex = (cur + 1) % photos.length;
    const prevIndex = (cur - 1 + photos.length) % photos.length;
    [nextIndex, prevIndex].forEach((idx) => {
      const img = new Image();
      img.src = photos[idx];
      img.decoding = "async";
    });
  }, [cur, photos]);

  useEffect(() => {
    if (lightbox === null || photos.length === 0) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") stepLightbox(-1);
      if (e.key === "ArrowRight") stepLightbox(1);
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightbox]);

  if (photos.length === 0) {
    return (
      <Card icon="📸" title="Photo Gallery" delay={100}>
        <div style={{color:"rgba(201,168,76,0.8)",fontFamily:"Lato,sans-serif",fontSize:"14px"}}>
          No images found in <code>src/assets</code>.
        </div>
      </Card>
    );
  }

  return (
    <>
      {lightbox !== null && photos[lightbox] && createPortal((
        <div
          onClick={closeLightbox}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(5,8,15,0.96)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px"
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              zIndex: 10000,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <button
              onClick={closeLightbox}
              style={{
                position: "absolute",
                top: "14px",
                right: "14px",
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                border: "1px solid rgba(201,168,76,0.45)",
                background: "rgba(201,168,76,0.14)",
                color: "#e8c96a",
                fontSize: "20px",
                cursor: "pointer",
                zIndex: 10002
              }}
            >
              X
            </button>
            <div
              style={{
                position: "absolute",
                top: "18px",
                left: "50%",
                transform: "translateX(-50%)",
                color: "rgba(201,168,76,0.7)",
                fontFamily: "Lato,sans-serif",
                fontSize: "12px",
                letterSpacing: "1.5px",
                zIndex: 10002
              }}
            >
              {lightbox + 1} / {photos.length}
            </div>
            <img
              src={photos[lightbox]}
              alt={`Photo ${lightbox + 1}`}
              onLoad={() => setLightboxReady(true)}
              onError={() => {
                setLightboxReady(false);
                setLightboxFailed(true);
              }}
              style={{
                width: "min(95vw,1200px)",
                height: "min(90vh,900px)",
                objectFit: "contain",
                borderRadius: "10px",
                border: "1px solid rgba(201,168,76,0.28)",
                boxShadow: "0 0 70px rgba(0,0,0,0.7)",
                zIndex: 10001,
                display: "block",
                opacity: lightboxReady ? 1 : 0.01
              }}
            />
            {!lightboxReady && !lightboxFailed && (
              <div style={{
                position:"absolute",
                color:"rgba(201,168,76,0.8)",
                fontFamily:"Lato,sans-serif",
                fontSize:"13px",
                letterSpacing:"1px",
                zIndex:10002
              }}>
                Loading image...
              </div>
            )}
            {lightboxFailed && (
              <div style={{
                position:"absolute",
                color:"#f3d27d",
                fontFamily:"Lato,sans-serif",
                fontSize:"13px",
                textAlign:"center",
                lineHeight:"1.6",
                zIndex:10002,
                maxWidth:"80vw"
              }}>
                Unable to load this image in full view.
                <br />
                Try next/previous or refresh once.
              </div>
            )}
            <button
              onClick={() => stepLightbox(-1)}
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                border: "1px solid rgba(201,168,76,0.35)",
                background: "rgba(201,168,76,0.12)",
                color: "#e8c96a",
                fontSize: "24px",
                cursor: "pointer",
                zIndex: 10002
              }}
            >
              {"<"}
            </button>
            <button
              onClick={() => stepLightbox(1)}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                border: "1px solid rgba(201,168,76,0.35)",
                background: "rgba(201,168,76,0.12)",
                color: "#e8c96a",
                fontSize: "24px",
                cursor: "pointer",
                zIndex: 10002
              }}
            >
              {">"}
            </button>
          </div>
        </div>
      ), document.body)}

      <Card icon="📸" title="Photo Gallery" delay={100}>
        <div
          style={{
            position: "relative",
            borderRadius: "10px",
            overflow: "hidden",
            cursor: "zoom-in",
            background: "#0a0c10"
          }}
          onClick={() => openLightbox(cur)}
        >
          <img
            src={photos[cur]}
            alt={`Photo ${cur + 1}`}
            fetchPriority="high"
            loading="eager"
            decoding="async"
            style={{
              width: "100%",
              height: "clamp(260px,55vw,380px)",
              objectFit: "contain",
              objectPosition: "center",
              display: "block"
            }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,transparent 55%,rgba(8,10,16,0.75))" }} />
          <div
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              background: "rgba(8,10,16,0.7)",
              border: "1px solid rgba(201,168,76,0.3)",
              borderRadius: "20px",
              padding: "3px 12px",
              color: "#c9a84c",
              fontSize: "11px",
              fontFamily: "Lato,sans-serif",
              letterSpacing: "1px"
            }}
          >
            {cur + 1} / {photos.length}
          </div>
          {[{ d: -1, side: "left", sym: "<" }, { d: 1, side: "right", sym: ">" }].map(({ d, side, sym }) => (
            <button
              key={side}
              onClick={(e) => {
                e.stopPropagation();
                stepSlider(d);
              }}
              style={{
                position: "absolute",
                [side]: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "rgba(8,10,16,0.6)",
                border: "1px solid rgba(201,168,76,0.35)",
                color: "#e8c96a",
                fontSize: "20px",
                cursor: "pointer",
                zIndex: 2
              }}
            >
              {sym}
            </button>
          ))}
        </div>

        <div
          style={{
            marginTop: "8px",
            textAlign: "center",
            color: "rgba(201,168,76,0.72)",
            fontSize: "11px",
            letterSpacing: "0.4px",
            fontFamily: "Lato,sans-serif"
          }}
        >
          Tap or click the photo to view full screen
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "10px" }}>
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setCur(i);
                startAutoSlide();
              }}
              style={{
                width: i === cur ? "22px" : "7px",
                height: "7px",
                borderRadius: "4px",
                border: "none",
                background: i === cur ? "#c9a84c" : "rgba(201,168,76,0.25)",
                cursor: "pointer",
                padding: 0
              }}
            />
          ))}
        </div>

        <div style={{ display: "flex", gap: "5px", marginTop: "8px", overflowX: "auto", paddingBottom: "4px" }}>
          {photos.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Thumb ${i + 1}`}
              loading="lazy"
              decoding="async"
              onClick={(e) => {
                e.stopPropagation();
                openLightbox(i);
              }}
              style={{
                width: "clamp(44px,9vw,52px)",
                height: "clamp(44px,9vw,52px)",
                objectFit: "cover",
                objectPosition: "top center",
                borderRadius: "6px",
                cursor: "pointer",
                flexShrink: 0,
                border: i === cur ? "2px solid #c9a84c" : "2px solid rgba(201,168,76,0.15)",
                opacity: i === cur ? 1 : 0.6
              }}
            />
          ))}
        </div>
      </Card>
    </>
  );
}
export default function MarriageBio() {
  return (
    <div style={{
      minHeight:"100vh",
      background:"linear-gradient(145deg,#060b12 0%,#0c1420 35%,#091018 65%,#060b12 100%)",
      padding:"clamp(16px,4vw,36px) clamp(10px,3vw,16px) 60px",
      position:"relative",overflow:"hidden"
    }}>
      {/* Ambient glow blobs */}
      <div style={{position:"fixed",top:"-10%",left:"-10%",width:"40vw",height:"40vw",borderRadius:"50%",background:"radial-gradient(circle,rgba(201,168,76,0.06) 0%,transparent 70%)",pointerEvents:"none"}}/>
      <div style={{position:"fixed",bottom:"-10%",right:"-5%",width:"35vw",height:"35vw",borderRadius:"50%",background:"radial-gradient(circle,rgba(20,80,120,0.1) 0%,transparent 70%)",pointerEvents:"none"}}/>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600&family=Lato:wght@300;400;700&family=Amiri:wght@400;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes shimmer{0%,100%{opacity:.65}50%{opacity:1}}
        @keyframes borderPulse{0%,100%{box-shadow:0 0 0 0 rgba(201,168,76,0.0),0 25px 80px rgba(0,0,0,0.7)}50%{box-shadow:0 0 30px 0 rgba(201,168,76,0.08),0 25px 80px rgba(0,0,0,0.7)}}
        .wrap{animation:fadeUp .9s ease forwards,borderPulse 6s ease infinite;}
        .bism{animation:shimmer 3.5s ease infinite;}
        .card-reveal{animation:fadeUp .7s ease both;}
        button{outline:none;-webkit-tap-highlight-color:transparent;}
        ::-webkit-scrollbar{height:3px;}
        ::-webkit-scrollbar-thumb{background:rgba(201,168,76,0.3);border-radius:2px;}
        @media(max-width:480px){.two-col{grid-template-columns:1fr 1fr !important;}}
        @media(max-width:360px){.two-col{grid-template-columns:1fr !important;}}
      `}</style>

      <div className="wrap" style={{
        maxWidth:"660px",margin:"0 auto",
        background:"linear-gradient(160deg,#0d1520 0%,#091018 50%,#0b1219 100%)",
        border:"1px solid rgba(201,168,76,0.28)",
        borderRadius:"16px",overflow:"hidden",
        boxShadow:"0 30px 100px rgba(0,0,0,0.8),0 0 0 1px rgba(201,168,76,0.05)"
      }}>
        {/* Rainbow top border */}
        <div style={{height:"3px",background:"linear-gradient(90deg,transparent 0%,#8b6914 15%,#c9a84c 40%,#f0d876 60%,#c9a84c 80%,#8b6914 90%,transparent 100%)"}}/>

        {/* ── HEADER ── */}
        <div style={{
          padding:"clamp(28px,6vw,48px) clamp(20px,5vw,40px) clamp(24px,5vw,36px)",
          textAlign:"center",
          background:"radial-gradient(ellipse 80% 60% at 50% 0%,rgba(201,168,76,0.08) 0%,transparent 70%)",
          borderBottom:"1px solid rgba(201,168,76,0.12)",
          position:"relative"
        }}>
          {/* Corner decorations */}
          <div style={{position:"absolute",top:"12px",left:"12px"}}><Corner/></div>
          <div style={{position:"absolute",top:"12px",right:"12px"}}><Corner flip/></div>

          {/* Bismillah */}
          <div className="bism" style={{
            fontFamily:"Amiri,serif",
            fontSize:"clamp(18px,4.5vw,28px)",
            color:"#e8c96a",
            direction:"rtl",letterSpacing:"2px",
            marginBottom:"6px",
            textShadow:"0 0 30px rgba(201,168,76,0.4)"
          }}>{BISMILLAH}</div>
          <div style={{
            fontFamily:"Lato,sans-serif",
            color:"rgba(201,168,76,0.45)",
            fontSize:"clamp(8px,1.8vw,9px)",
            letterSpacing:"2.5px",textTransform:"uppercase",
            marginBottom:"24px"
          }}>In the name of Allah, the Most Gracious, the Most Merciful</div>

          <StarDivider/>

          {/* Profile ring */}
          <div style={{
            width:"clamp(90px,20vw,116px)",height:"clamp(90px,20vw,116px)",
            borderRadius:"50%",margin:"24px auto 18px",
            background:"linear-gradient(135deg,#1a2535,#0d1520)",
            border:"2px solid rgba(201,168,76,0.4)",
            boxShadow:"0 0 0 6px rgba(201,168,76,0.06),0 0 40px rgba(201,168,76,0.15),inset 0 0 20px rgba(0,0,0,0.4)",
            display:"flex",alignItems:"center",justifyContent:"center",
            fontSize:"42px",position:"relative"
          }}>
            ☪️
            <div style={{
              position:"absolute",inset:"-8px",borderRadius:"50%",
              border:"1px solid rgba(201,168,76,0.15)"
            }}/>
          </div>

          {/* Arabic name */}
          <div style={{
            fontFamily:"Amiri,serif",
            fontSize:"clamp(15px,3.5vw,20px)",
            color:"rgba(201,168,76,0.55)",
            direction:"rtl",letterSpacing:"2px",marginBottom:"8px"
          }}>{ARABIC_NAME}</div>

          {/* English name */}
          <h1 style={{
            fontFamily:"Playfair Display,serif",
            fontSize:"clamp(26px,7vw,46px)",
            fontWeight:"800",
            background:"linear-gradient(135deg,#f0d876 0%,#c9a84c 40%,#e8c060 70%,#f0d876 100%)",
            WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
            letterSpacing:"clamp(3px,1vw,6px)",
            lineHeight:1.05,marginBottom:"8px",
            filter:"drop-shadow(0 0 20px rgba(201,168,76,0.3))"
          }}>THAMEEM ANSARI</h1>

          {/* Subtitle */}
          <div style={{
            display:"inline-flex",alignItems:"center",gap:"8px",
            background:"rgba(201,168,76,0.08)",
            border:"1px solid rgba(201,168,76,0.2)",
            borderRadius:"30px",padding:"6px 18px",
            marginBottom:"20px"
          }}>
            <span style={{width:"6px",height:"6px",borderRadius:"50%",background:"#c9a84c",display:"inline-block"}}/>
            <span style={{fontFamily:"Lato,sans-serif",color:"#c9a84c",fontSize:"clamp(9px,2vw,11px)",letterSpacing:"2px",textTransform:"uppercase"}}>Senior Software Engineer · Capgemini · Chennai</span>
            <span style={{width:"6px",height:"6px",borderRadius:"50%",background:"#c9a84c",display:"inline-block"}}/>
          </div>

          <StarDivider/>

          {/* Tagline */}
          <p style={{
            fontFamily:"Playfair Display,serif",fontStyle:"italic",
            fontSize:"clamp(13px,2.8vw,16px)",
            color:"rgba(253,246,227,0.6)",
            lineHeight:"1.9",maxWidth:"460px",margin:"20px auto 0",
            letterSpacing:"0.3px"
          }}>
            "Principle-driven, health-conscious, and disciplined —<br/>grounded in tradition, focused on growth."
          </p>
        </div>

        {/* ── BODY ── */}
        <div style={{padding:"clamp(14px,3.5vw,24px) clamp(12px,3.5vw,24px) 20px"}}>

          <Gallery/>

          {/* Personal */}
          <Card icon="🪪" title="Personal Details" delay={0}>
            <Row label="Full Name" value="Thameem Ansari"/>
            <Row label="Date of Birth" value="03 October 1998"/>
            <Row label="Age" value="27 Years"/>
            <Row label="Religion" value="Islam"/>
            <Row label="Mother Tongue" value="Tamil"/>
            <Row label="Known Languages" value="Tamil, English"/>
            <Row label="Native" value="Adirampattinam, Thanjavur – 614701"/>
            <Row label="Current City" value="Chennai & Adirampattinam, TN"/>
            <Row label="Height" value="178 cm / 5′ 10″"/>
            <Row label="Weight" value="82 kg (Feb 2026)"/>
            <Row label="Complexion" value="Wheatish Brown"/>
            <Row label="Diet" value="Eggetarian"/>
            <Row label="Marital Status" value="Never Married"/>
          </Card>

          {/* Religious Details */}
          <Card icon="🕌" title="Religious Details" delay={60}>
            <Row label="Religion" value="Islam"/>
            <Row label="5 Times Salah" value="✅ Yes — Alhamdulillah"/>
            <Row label="Quran Reading" value="✅ Yes"/>
            <Row label="Hajj / Umrah" value="Not Yet — Inshallah"/>
          </Card>

          {/* Education */}
          <Card icon="🎓" title="Education" delay={60}>
            <Row label="PG Degree" value="MCA – Computer Application"/>
            <Row label="UG Degree" value="BCA – Computer Application"/>
            <Row label="University" value="Kadhir Mohideen College, Adirampattinam"/>
            <Row label="MCA Passed" value="2020"/>
            <Row label="BCA Passed" value="2018"/>
            <Row label="IT Experience" value="5 Years"/>
          </Card>

          {/* Professional */}
          <Card icon="💼" title="Professional Profile" delay={120}>
            <Row label="Designation" value="Senior Software Engineer"/>
            <Row label="Company" value="Capgemini, Chennai"/>
            <Row label="Work Mode" value="Hybrid (Office + Remote)"/>
            <Row label="Annual CTC" value="₹ 13 LPA"/>
          </Card>

          {/* Family */}
          <Card icon="🏡" title="Family Details" delay={180}>
            <Row label="Father" value="Late Sheik Mydeen (Passed Away)"/>
            <Row label="Mother" value="Ajmath Banu · Homemaker"/>
            <Row label="Native Place" value="Adirampattinam, Thanjavur Dist."/>
            <Row label="Current Stay" value="Rental Home, Adirampattinam"/>
            {/* Housing note */}
            <div style={{
              margin:"14px 0",padding:"14px 16px",
              background:"linear-gradient(135deg,rgba(201,168,76,0.08),rgba(201,168,76,0.03))",
              border:"1px solid rgba(201,168,76,0.2)",
              borderLeft:"3px solid #c9a84c",
              borderRadius:"8px"
            }}>
              <div style={{fontFamily:"Lato,sans-serif",color:"rgba(253,246,227,0.75)",fontSize:"clamp(11px,2.5vw,13px)",lineHeight:"1.8"}}>
                🏗️ Our old house has been demolished and the land is kept.{" "}
                <span style={{color:"#e8c96a",fontFamily:"Playfair Display,serif",fontStyle:"italic"}}>Inshallah, a new house will be built very soon.</span>
              </div>
            </div>
            {/* Siblings */}
            <div style={{marginTop:"4px",padding:"14px 16px",background:"rgba(201,168,76,0.04)",border:"1px solid rgba(201,168,76,0.12)",borderRadius:"8px"}}>
              <div style={{color:"rgba(201,168,76,0.5)",fontSize:"10px",letterSpacing:"1.5px",textTransform:"uppercase",marginBottom:"12px",fontFamily:"Lato,sans-serif"}}>Siblings</div>
              {[
                {icon:"👩",label:"Elder Sister 1",value:"Married · Living in Adirampattinam"},
                {icon:"👩",label:"Elder Sister 2",value:"Married · Living in Chennai"},
                {icon:"👦",label:"Younger Brother",value:"Unmarried"},
              ].map(s=>(
                <div key={s.label} style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"10px"}}>
                  <div style={{
                    width:"34px",height:"34px",borderRadius:"8px",flexShrink:0,
                    background:"rgba(201,168,76,0.1)",border:"1px solid rgba(201,168,76,0.2)",
                    display:"flex",alignItems:"center",justifyContent:"center",fontSize:"16px"
                  }}>{s.icon}</div>
                  <div>
                    <div style={{color:"rgba(253,246,227,0.38)",fontSize:"10px",letterSpacing:"1px",textTransform:"uppercase",fontFamily:"Lato,sans-serif"}}>{s.label}</div>
                    <div style={{color:"#fdf6e3",fontSize:"clamp(12px,2.8vw,13px)",fontFamily:"Playfair Display,serif"}}>{s.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* About */}
          <Card icon="🌙" title="About Me" delay={240}>
            <p style={{color:"rgba(253,246,227,0.75)",fontSize:"clamp(12px,2.8vw,14px)",lineHeight:"1.95",marginBottom:"12px",fontFamily:"Lato,sans-serif",fontWeight:"300"}}>
              Alhamdulillah, I lead a disciplined, value-driven life rooted in Islamic principles and traditional South Indian Muslim culture. My daily routines prioritize health, consistency, and long-term growth — both worldly and spiritual.
            </p>
            <p style={{color:"rgba(253,246,227,0.5)",fontSize:"clamp(11px,2.5vw,13px)",lineHeight:"1.95",fontFamily:"Lato,sans-serif",fontWeight:"300"}}>
              I believe in simple living, strong family bonds, and fulfilling responsibilities with sincerity. Committed to building a home grounded in taqwa, mutual respect, and purposeful living.
            </p>
            <div style={{
              marginTop:"16px",
              padding:"14px 18px",
              background:"linear-gradient(135deg,rgba(201,168,76,0.1),rgba(201,168,76,0.04))",
              border:"1px solid rgba(201,168,76,0.25)",
              borderLeft:"3px solid #c9a84c",
              borderRadius:"8px"
            }}>
              <p style={{color:"#e8d5a0",fontSize:"clamp(11px,2.6vw,13px)",lineHeight:"2",fontFamily:"Lato,sans-serif",fontWeight:"300",fontStyle:"italic",margin:0}}>
                🤝 Inshallah, I will always support you and stand by your side in every situation. My mother and sisters will also welcome and support you wholeheartedly. My sisters will care for you like a true friend — with no ego, no distance, only warmth and love.
              </p>
            </div>
          </Card>

          {/* Core Values */}
          <Card icon="⭐" title="Core Values & Character" delay={300}>
            <div style={{display:"flex",flexWrap:"wrap",gap:"0"}}>
              {coreValues.map(v=><Pill key={v}>{v}</Pill>)}
            </div>
          </Card>

          {/* Hobbies */}
          <Card icon="🎯" title="Hobbies & Interests" delay={360}>
            <div className="two-col" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"}}>
              {hobbies.map(h=>(
                <div key={h} style={{
                  padding:"10px 14px",
                  background:"linear-gradient(135deg,rgba(201,168,76,0.07),rgba(201,168,76,0.02))",
                  border:"1px solid rgba(201,168,76,0.15)",
                  borderRadius:"8px",
                  color:"#e8d5a0",fontSize:"clamp(11px,2.4vw,13px)",
                  fontFamily:"Lato,sans-serif",fontWeight:"300"
                }}>{h}</div>
              ))}
            </div>
          </Card>

          {/* Lifestyle */}
          <Card icon="🕌" title="Lifestyle & Habits" delay={420}>
            <p style={{color:"rgba(253,246,227,0.3)",fontSize:"10px",letterSpacing:"1.5px",textTransform:"uppercase",marginBottom:"12px",fontFamily:"Lato,sans-serif"}}>Strictly Avoids</p>
            <div className="two-col" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"7px"}}>
              {lifestyle.map(({icon,text})=>(
                <div key={text} style={{
                  display:"flex",alignItems:"center",gap:"8px",
                  padding:"9px 12px",
                  background:"rgba(201,168,76,0.04)",
                  border:"1px solid rgba(201,168,76,0.12)",
                  borderRadius:"8px"
                }}>
                  <span style={{fontSize:"14px"}}>{icon}</span>
                  <span style={{color:"#d4c070",fontSize:"clamp(10px,2.3vw,12px)",fontFamily:"Lato,sans-serif",fontWeight:"300"}}>{text}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Food */}
          <Card icon="🍽️" title="Food Preferences" delay={480}>
            <div style={{display:"flex",flexWrap:"wrap",gap:"8px"}}>
              {foods.map(f=>(
                <div key={f.n} style={{
                  padding:"9px 16px",
                  background:"linear-gradient(135deg,rgba(201,168,76,0.1),rgba(201,168,76,0.03))",
                  border:"1px solid rgba(201,168,76,0.2)",
                  borderRadius:"20px",
                  color:"#e8d090",fontSize:"clamp(11px,2.4vw,12px)",
                  fontFamily:"Lato,sans-serif",fontWeight:"300"
                }}>{f.e} {f.n}</div>
              ))}
            </div>
          </Card>

          {/* Mahr */}
          <Card icon="💛" title="Mahr (Dowry)" delay={520}>
            <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
              <div style={{
                padding:"14px 16px",
                background:"linear-gradient(135deg,rgba(201,168,76,0.1),rgba(201,168,76,0.03))",
                border:"1px solid rgba(201,168,76,0.25)",
                borderRadius:"8px",
                fontFamily:"Lato,sans-serif",color:"rgba(253,246,227,0.8)",
                fontSize:"clamp(12px,2.8vw,14px)",lineHeight:"1.9",fontWeight:"300"
              }}>
                🤲 <span style={{color:"#e8c96a",fontFamily:"Playfair Display,serif",fontStyle:"italic"}}>InshaAllah,</span> whatever she asks for as Mahr, I am willing to give. My personal desire is to give her <span style={{color:"#e8d080",fontWeight:"700"}}>80 sovereigns of gold.</span>
              </div>
              <div style={{
                padding:"14px 16px",
                background:"linear-gradient(135deg,rgba(201,168,76,0.08),rgba(201,168,76,0.02))",
                border:"1px solid rgba(201,168,76,0.2)",
                borderLeft:"3px solid #c9a84c",
                borderRadius:"8px",
                fontFamily:"Lato,sans-serif",color:"rgba(253,246,227,0.75)",
                fontSize:"clamp(12px,2.8vw,14px)",lineHeight:"1.9",fontWeight:"300"
              }}>
                ✨ <span style={{color:"#e8c96a",fontFamily:"Playfair Display,serif",fontStyle:"italic"}}>Alhamdulillah,</span> from the salary I earned from the job that Allah blessed me with, I have already bought <span style={{color:"#e8d080",fontWeight:"700"}}>86 grams of gold</span> for the Mahr.
              </div>
              <div style={{
                padding:"12px 16px",
                background:"rgba(201,168,76,0.04)",
                border:"1px solid rgba(201,168,76,0.12)",
                borderRadius:"8px",
                fontFamily:"Lato,sans-serif",color:"rgba(253,246,227,0.6)",
                fontSize:"clamp(11px,2.5vw,13px)",lineHeight:"1.8",fontWeight:"300",
                fontStyle:"italic"
              }}>
                🔒 This gold does not belong to my mother, sister, or any family member — it is solely reserved for the Mahr.
              </div>
            </div>
          </Card>

          {/* Future Vision */}
          <Card icon="🌱" title="Background & Future Vision" delay={535}>
            <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
              <p style={{color:"rgba(253,246,227,0.75)",fontSize:"clamp(12px,2.8vw,14px)",lineHeight:"1.95",fontFamily:"Lato,sans-serif",fontWeight:"300"}}>
                I come from a simple background and currently do not own land or large wealth. However, <span style={{color:"#e8c96a",fontFamily:"Playfair Display,serif",fontStyle:"italic"}}>Alhamdulillah,</span> Allah has blessed me with a good career and the opportunity to grow while striving to practice Islam sincerely.
              </p>
              <p style={{color:"rgba(253,246,227,0.65)",fontSize:"clamp(12px,2.8vw,14px)",lineHeight:"1.95",fontFamily:"Lato,sans-serif",fontWeight:"300"}}>
                I believe that <span style={{color:"#e8d080",fontWeight:"400"}}>rizq comes from Allah</span>, and with His blessings and consistent effort, I hope to continue improving in both Deen and Dunya.
              </p>
              <div style={{
                padding:"14px 16px",
                background:"linear-gradient(135deg,rgba(201,168,76,0.09),rgba(201,168,76,0.02))",
                border:"1px solid rgba(201,168,76,0.2)",
                borderLeft:"3px solid #c9a84c",
                borderRadius:"8px",
                fontFamily:"Lato,sans-serif",color:"rgba(253,246,227,0.75)",
                fontSize:"clamp(12px,2.8vw,14px)",lineHeight:"1.95",fontWeight:"300"
              }}>
                🏡 <span style={{color:"#e8c96a",fontFamily:"Playfair Display,serif",fontStyle:"italic"}}>InshaAllah,</span> in the future I aim to <span style={{color:"#e8d080"}}>buy land, build our own home, and start a business</span> to provide a stable and comfortable life for my family.
              </div>
              <div style={{
                padding:"14px 16px",
                background:"linear-gradient(135deg,rgba(201,168,76,0.1),rgba(201,168,76,0.03))",
                border:"1px solid rgba(201,168,76,0.25)",
                borderRadius:"8px",
                fontFamily:"Playfair Display,serif",fontStyle:"italic",
                color:"#e8d5a0",fontSize:"clamp(12px,2.8vw,15px)",lineHeight:"1.9"
              }}>
                ❝ My intention is to build a marriage based on Deen, mutual respect, and supporting each other in obeying Allah and following the Sunnah. ❞
              </div>
            </div>
          </Card>

          {/* Partner */}
          <Card icon="🤲" title="Partner Expectations" delay={540}>
            <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
              <p style={{color:"rgba(253,246,227,0.75)",fontSize:"clamp(12px,2.8vw,14px)",lineHeight:"1.95",fontFamily:"Lato,sans-serif",fontWeight:"300"}}>
                Seeking a practicing Muslimah of good character, strong deen, and a family-oriented mindset. She should value simplicity, maintain a clean lifestyle, and be willing to build a home grounded in Islamic principles, mutual respect, and purposeful growth together.
              </p>

              {/* Preferred */}
              <div style={{padding:"14px 16px",background:"linear-gradient(135deg,rgba(201,168,76,0.09),rgba(201,168,76,0.02))",border:"1px solid rgba(201,168,76,0.2)",borderLeft:"3px solid #c9a84c",borderRadius:"8px"}}>
                <div style={{color:"rgba(201,168,76,0.55)",fontSize:"10px",letterSpacing:"1.5px",textTransform:"uppercase",marginBottom:"10px",fontFamily:"Lato,sans-serif"}}>Preferred Qualities</div>
                {[
                  {icon:"📖", text:"Hafiza or currently pursuing Hifz (highly preferred)"},
                  {icon:"🕌", text:"Strives to practice Islam sincerely & follow the Sunnah"},
                  {icon:"☝️", text:"Upholds Tawhid and Islamic principles in daily life"},
                  {icon:"🎓", text:"Good education along with commitment to practising Islam"},
                ].map(({icon,text}) => (
                  <div key={text} style={{display:"flex",alignItems:"flex-start",gap:"10px",marginBottom:"9px"}}>
                    <span style={{fontSize:"14px",marginTop:"1px"}}>{icon}</span>
                    <span style={{color:"rgba(253,246,227,0.75)",fontSize:"clamp(12px,2.8vw,13px)",fontFamily:"Lato,sans-serif",fontWeight:"300",lineHeight:"1.7"}}>{text}</span>
                  </div>
                ))}
              </div>

              {/* Language */}
              <div style={{padding:"14px 16px",background:"rgba(201,168,76,0.04)",border:"1px solid rgba(201,168,76,0.12)",borderRadius:"8px"}}>
                <div style={{color:"rgba(201,168,76,0.55)",fontSize:"10px",letterSpacing:"1.5px",textTransform:"uppercase",marginBottom:"10px",fontFamily:"Lato,sans-serif"}}>Language & Background</div>
                <p style={{color:"rgba(253,246,227,0.7)",fontSize:"clamp(12px,2.8vw,13px)",fontFamily:"Lato,sans-serif",fontWeight:"300",lineHeight:"1.85",marginBottom:"10px"}}>
                  Language is not a major barrier. Urdu speakers are welcome, and basic understanding of Tamil or English would be helpful for communication.
                </p>
                <div style={{display:"flex",flexWrap:"wrap",gap:"7px"}}>
                  {["🗣️ Tamil","🗣️ Urdu","🗣️ Malayalam"].map(l => (
                    <span key={l} style={{padding:"5px 14px",background:"linear-gradient(135deg,rgba(201,168,76,0.12),rgba(201,168,76,0.04))",border:"1px solid rgba(201,168,76,0.25)",borderRadius:"20px",color:"#e8d090",fontSize:"clamp(11px,2.4vw,12px)",fontFamily:"Lato,sans-serif"}}>{l}</span>
                  ))}
                </div>
              </div>

              {/* Age preference */}
              <div style={{padding:"14px 16px",background:"rgba(201,168,76,0.04)",border:"1px solid rgba(201,168,76,0.12)",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"12px"}}>
                <div>
                  <div style={{color:"rgba(201,168,76,0.55)",fontSize:"10px",letterSpacing:"1.5px",textTransform:"uppercase",marginBottom:"5px",fontFamily:"Lato,sans-serif"}}>Preferred Age Range</div>
                  <div style={{color:"#fdf6e3",fontSize:"clamp(14px,3vw,18px)",fontFamily:"Playfair Display,serif",fontWeight:"600",letterSpacing:"1px"}}>18 – 20 Years</div>
                </div>
                <div style={{fontSize:"28px"}}>👰</div>
              </div>

              {/* Personal wish quote */}
              <div style={{padding:"14px 16px",background:"linear-gradient(135deg,rgba(201,168,76,0.1),rgba(201,168,76,0.03))",border:"1px solid rgba(201,168,76,0.25)",borderRadius:"8px",fontFamily:"Playfair Display,serif",fontStyle:"italic",color:"#e8d5a0",fontSize:"clamp(12px,2.8vw,15px)",lineHeight:"1.9"}}>
                ❝ I wish to build a peaceful Islamic family where we practice Islam together and support each other in faith, life, and responsibilities. ❞
              </div>
            </div>
          </Card>

          {/* Contact */}
          <div style={{
            background:"linear-gradient(135deg,rgba(201,168,76,0.1),rgba(201,168,76,0.03))",
            border:"1px solid rgba(201,168,76,0.25)",
            borderRadius:"12px",padding:"clamp(20px,5vw,30px)",
            textAlign:"center",marginTop:"4px",
            position:"relative"
          }}>
            <div style={{position:"absolute",top:0,left:"20px",right:"20px",height:"1px",background:"linear-gradient(to right,transparent,#c9a84c,transparent)"}}/>
            <div style={{
              fontFamily:"Playfair Display,serif",
              color:"#e8d5a0",fontSize:"clamp(13px,3vw,16px)",
              fontWeight:"700",letterSpacing:"2px",textTransform:"uppercase",
              marginBottom:"20px"
            }}>Contact</div>
            <div style={{display:"flex",flexDirection:"column",gap:"12px",alignItems:"center"}}>
              {[
                {href:"tel:+917695974797",text:"📞  +91 76959 74797  (WhatsApp)"},
                {href:"mailto:marriage.profile.contact@gmail.com",text:"📧  marriage.profile.contact@gmail.com"},
                {href:null,text:"📍  Chennai & Adirampattinam, Tamil Nadu"},
              ].map(({href,text})=>href ? (
                <a key={text} href={href} style={{
                  color:"#c9a84c",textDecoration:"none",
                  fontSize:"clamp(12px,3vw,15px)",
                  fontFamily:"Lato,sans-serif",fontWeight:"400",
                  letterSpacing:"0.3px"
                }}>{text}</a>
              ) : (
                <span key={text} style={{color:"#c9a84c",fontSize:"clamp(12px,3vw,14px)",fontFamily:"Lato,sans-serif"}}>{text}</span>
              ))}
            </div>
            <div style={{marginTop:"22px"}}>
              <StarDivider/>
            </div>
            <div style={{
              marginTop:"16px",
              color:"rgba(201,168,76,0.4)",
              fontSize:"clamp(10px,2vw,12px)",
              fontFamily:"Playfair Display,serif",fontStyle:"italic",
              lineHeight:"1.9"
            }}>
              ❝ And of His signs is that He created for you from yourselves mates<br/>that you may find tranquility in them ❞
              <div style={{marginTop:"4px",fontFamily:"Lato,sans-serif",fontSize:"10px",letterSpacing:"2px",color:"rgba(201,168,76,0.3)"}}>— SURAH AR-RUM 30:21</div>
            </div>
          </div>
        </div>

        <div style={{height:"3px",background:"linear-gradient(90deg,transparent 0%,#8b6914 15%,#c9a84c 40%,#f0d876 60%,#c9a84c 80%,#8b6914 90%,transparent 100%)"}}/>
      </div>
    </div>
  );
}

