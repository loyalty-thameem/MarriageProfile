import React, { useState, useEffect, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import enLocale from "./src/locales/en.json";
const BISMILLAH = "\u0628\u0650\u0633\u0652\u0645\u0650 \u0627\u0644\u0644\u064e\u0651\u0647\u0650 \u0627\u0644\u0631\u064e\u0651\u062d\u0652\u0645\u064e\u0646\u0650 \u0627\u0644\u0631\u064e\u0651\u062d\u0650\u064a\u0645\u0650";
const ARABIC_NAME = "تميم أنصاري";

const getNestedValue = (obj, path) => path.split(".").reduce((acc, key) => acc?.[key], obj);
/* -- Islamic geometric corner SVG -- */
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
    <div style={{flex:1,height:"1px",background:"linear-gradient(to inline-end,transparent,#c9a84c)"}}/>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <polygon points="12,2 14.5,9 22,9 16,14 18.5,21 12,17 5.5,21 8,14 2,9 9.5,9" fill="#c9a84c"/>
    </svg>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <polygon points="12,2 14.5,9 22,9 16,14 18.5,21 12,17 5.5,21 8,14 2,9 9.5,9" fill="#e8c96a" opacity="0.6"/>
    </svg>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <polygon points="12,2 14.5,9 22,9 16,14 18.5,21 12,17 5.5,21 8,14 2,9 9.5,9" fill="#c9a84c"/>
    </svg>
    <div style={{flex:1,height:"1px",background:"linear-gradient(to inline-start,transparent,#c9a84c)"}}/>
  </div>
);

/* -- Section Card -- */
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
    <div style={{position:"absolute",top:0,insetInline:"20px",height:"1px",background:"linear-gradient(to right,transparent,#c9a84c,transparent)"}}/>
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

const ROW_VALUE_ICONS = {
  "rows.salah": "✅",
  "rows.quranReading": "☑️",
  "rows.hajjUmrah": "🕋"
};

/* -- Info Row -- */
const Row = ({ rowKey, label, value, rtl = false }) => (
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
      fontSize:"clamp(12px,2.8vw,14px)",fontWeight:"500",textAlign: rtl ? "left" : "right"
    }}>
      {ROW_VALUE_ICONS[rowKey] ? (
        <span style={{display:"inline-flex",alignItems:"center",gap:"8px",flexDirection: rtl ? "row-reverse" : "row"}}>
          <span aria-hidden="true" style={{fontSize:"0.9em",lineHeight:1}}>{ROW_VALUE_ICONS[rowKey]}</span>
          <span>{value}</span>
        </span>
      ) : value}
    </span>
  </div>
);

/* -- Tag pill -- */
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

const renderHighlightedText = (text, highlights) => {
  if (!text) return text;

  const sorted = [...highlights].sort((a, b) => b.phrase.length - a.phrase.length);
  const parts = [];
  let cursor = 0;

  while (cursor < text.length) {
    const match = sorted.find(({ phrase }) => phrase && text.startsWith(phrase, cursor));
    if (!match) {
      parts.push(text[cursor]);
      cursor += 1;
      continue;
    }

    parts.push(
      <span key={`${match.phrase}-${cursor}`} style={match.style}>
        {match.phrase}
      </span>
    );
    cursor += match.phrase.length;
  }

  return parts;
};

const HIGHLIGHT_PHRASES = {
  en: {
    mahr1: ["InshaAllah,", "80 sovereigns of gold"],
    mahr2: ["Alhamdulillah,", "86 grams of gold"],
    future1: ["Alhamdulillah,"],
    future2: ["rizq comes from Allah"],
    future3: ["InshaAllah,", "buy land, build our own home, and start a business"]
  },
  ta: {
    mahr1: ["இன்ஷா அல்லாஹ்,", "80 sovereigns தங்கம்"],
    mahr2: ["அல்ஹம்துலில்லாஹ்,", "86 கிராம் தங்கம்"],
    future1: ["அல்ஹம்துலில்லாஹ்,"],
    future2: ["ரிஸ்க் அல்லாஹ்விடமிருந்து வருகிறது"],
    future3: ["இன்ஷா அல்லாஹ்,", "நிலம் வாங்கி, எங்கள் சொந்த வீட்டை கட்டி, ஒரு தொழிலை தொடங்கி"]
  },
  ur: {
    mahr1: ["ان شاء اللہ،", "80 sovereigns سونا"],
    mahr2: ["الحمدللہ،", "86 گرام سونا"],
    future1: ["الحمدللہ"],
    future2: ["رزق اللہ کی طرف سے ہے"],
    future3: ["ان شاء اللہ", "زمین خریدنا، اپنا گھر بنانا اور کاروبار شروع کرنا"]
  },
  ar: {
    mahr1: ["إن شاء الله،", "80 sovereigns من الذهب"],
    mahr2: ["الحمد لله،", "86 غراماً من الذهب"],
    future1: ["الحمد لله،"],
    future2: ["الرزق من عند الله"],
    future3: ["إن شاء الله،", "شراء أرض وبناء منزلنا الخاص وبدء مشروع"]
  },
  ml: {
    mahr1: ["ഇൻഷാ അല്ലാഹ്,", "80 sovereigns സ്വർണം"],
    mahr2: ["അൽഹംദുലില്ലാഹ്,", "86 ഗ്രാം സ്വർണം"],
    future1: ["അൽഹംദുലില്ലാഹ്,"],
    future2: ["റിസ്ഖ് അല്ലാഹുവിൽ നിന്നാണ് വരുന്നതെന്ന്"],
    future3: ["ഇൻഷാ അല്ലാഹ്,", "ഭൂമി വാങ്ങി, നമ്മുടെ സ്വന്തം വീട് പണിതു, ഒരു ബിസിനസ് ആരംഭിച്ച്"]
  }
};

const getTextHighlights = (language, key, accentStyle, strongStyle) => {
  const phrases = HIGHLIGHT_PHRASES[language]?.[key] || HIGHLIGHT_PHRASES.en[key] || [];
  return phrases.map((phrase, index) => ({
    phrase,
    style: index === 0 ? accentStyle : strongStyle
  }));
};

const InlineIconText = ({ icon, children, dimmed = false }) => (
  <span style={{ display: "inline", color: dimmed ? "rgba(253,246,227,0.6)" : "inherit" }}>
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        marginInlineEnd: "8px",
        fontSize: "0.95em",
        verticalAlign: "baseline"
      }}
    >
      {icon}
    </span>
    {children}
  </span>
);

/* -- Photo Gallery -- */
function Gallery({ rtl }) {
  const { t } = useTranslation();
  const sectionIconsValue = t("profile.sectionIcons", { returnObjects: true });
  const sectionIcons =
    sectionIconsValue && typeof sectionIconsValue === "object" && !Array.isArray(sectionIconsValue)
      ? sectionIconsValue
      : enLocale.profile.sectionIcons;
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
  const overlayButtonStyle = {
    position: "absolute",
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    border: "1px solid rgba(201,168,76,0.35)",
    background: "rgba(201,168,76,0.12)",
    color: "#e8c96a",
    cursor: "pointer",
    zIndex: 10002
  };
  const sliderButtonStyle = {
    position: "absolute",
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
  };

  const startAutoSlide = () => {
    clearInterval(timer.current);
    if (photos.length < 2) return;
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
      if (e.key === "ArrowLeft") stepLightbox(rtl ? 1 : -1);
      if (e.key === "ArrowRight") stepLightbox(rtl ? -1 : 1);
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightbox, rtl]);

  if (photos.length === 0) {
    return (
      <Card icon={sectionIcons.gallery} title={t("gallery.title")} delay={100}>
        <div style={{color:"rgba(201,168,76,0.8)",fontFamily:"Lato,sans-serif",fontSize:"14px"}}>
          {t("gallery.empty")}
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
              type="button"
              onClick={closeLightbox}
              aria-label={t("gallery.close")}
              style={{
                top: "14px",
                insetInlineEnd: "14px",
                fontSize: "20px",
                border: "1px solid rgba(201,168,76,0.45)",
                background: "rgba(201,168,76,0.14)",
                ...overlayButtonStyle
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
              alt={t("gallery.photoAlt", { index: lightbox + 1 })}
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
                {t("gallery.loading")}
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
                {t("gallery.loadError1")}
                <br />
                {t("gallery.loadError2")}
              </div>
            )}
            <button
              type="button"
              onClick={() => stepLightbox(-1)}
              aria-label={t("gallery.previous")}
              style={{
                insetInlineStart: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: "24px",
                ...overlayButtonStyle
              }}
            >
              {"<"}
            </button>
            <button
              type="button"
              onClick={() => stepLightbox(1)}
              aria-label={t("gallery.next")}
              style={{
                insetInlineEnd: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: "24px",
                ...overlayButtonStyle
              }}
            >
              {">"}
            </button>
          </div>
        </div>
      ), document.body)}

      <Card icon={sectionIcons.gallery} title={t("gallery.title")} delay={100}>
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
            alt={t("gallery.photoAlt", { index: cur + 1 })}
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
                insetInlineEnd: "12px",
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
          {[{ d: -1, side: rtl ? "right" : "left", sym: rtl ? ">" : "<" }, { d: 1, side: rtl ? "left" : "right", sym: rtl ? "<" : ">" }].map(({ d, side, sym }) => (
            <button
              key={side}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                stepSlider(d);
              }}
              aria-label={d === -1 ? t("gallery.previous") : t("gallery.next")}
              style={{
                [side]: "10px",
                ...sliderButtonStyle
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
          {t("gallery.hint")}
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "10px" }}>
          {photos.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setCur(i);
                startAutoSlide();
              }}
              aria-label={t("gallery.jumpTo", { index: i + 1 })}
              aria-pressed={i === cur}
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
              alt={t("gallery.thumbAlt", { index: i + 1 })}
              loading="lazy"
              decoding="async"
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                openLightbox(i);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  e.stopPropagation();
                  openLightbox(i);
                }
              }}
              aria-label={t("gallery.openThumb", { index: i + 1 })}
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
  const { t, i18n } = useTranslation();
  const rtl = i18n.language === "ar" || i18n.language === "ur";
  const accentTextStyle = {
    color:"#e8c96a",
    fontFamily:"Playfair Display,serif",
    fontStyle:"italic"
  };
  const strongAccentStyle = {
    color:"#e8d080",
    fontWeight:"700"
  };
  const getList = (key) => {
    const list = t(key, { returnObjects: true });
    if (Array.isArray(list)) return list;
    const fallback = getNestedValue(enLocale, key);
    return Array.isArray(fallback) ? fallback : [];
  };
  const getObject = (key) => {
    const value = t(key, { returnObjects: true });
    if (value && typeof value === "object" && !Array.isArray(value)) return value;
    const fallback = getNestedValue(enLocale, key);
    return fallback && typeof fallback === "object" && !Array.isArray(fallback) ? fallback : {};
  };
  const lifestyleItems = getList("lists.lifestyle");
  const coreValuesList = getList("lists.coreValues");
  const hobbiesList = getList("lists.hobbies");
  const foodsList = getList("lists.foods");
  const preferredQualities = getList("lists.preferredQualities");
  const partnerLanguages = getList("lists.languages");
  const profileName = t("profile.name") || enLocale.profile.name;
  const sectionIcons = getObject("profile.sectionIcons");
  const profileSections = getObject("profile.sections");
  const siblings = getList("profile.siblings");
  const contactItems = getList("profile.contactItems");

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = rtl ? "rtl" : "ltr";
    localStorage.setItem("app_language", i18n.language);
  }, [i18n.language]);

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div style={{
      minHeight:"100vh",
      background:"linear-gradient(145deg,#060b12 0%,#0c1420 35%,#091018 65%,#060b12 100%)",
      padding:"clamp(16px,4vw,36px) clamp(10px,3vw,16px) 60px",
      position:"relative",overflow:"hidden"
    }}>
            <div style={{position:"fixed",top:"14px",insetInlineEnd:"14px",zIndex:50}}>
        <label style={{display:"none"}} htmlFor="language-selector">{t("language.label")}</label>
        <select
          id="language-selector"
          value={i18n.language}
          onChange={changeLanguage}
          style={{
            background:"rgba(9,16,24,0.9)",
            color:"#e8d5a0",
            border:"1px solid rgba(201,168,76,0.35)",
            borderRadius:"8px",
            padding:"7px 10px",
            fontSize:"12px"
          }}
        >
          <option value="en">{t("language.en")}</option>
          <option value="ar">{t("language.ar")}</option>
          <option value="ur">{t("language.ur")}</option>
          <option value="ta">{t("language.ta")}</option>
          <option value="ml">{t("language.ml")}</option>
        </select>
      </div>
      {/* Ambient glow blobs */}
      <div style={{position:"fixed",top:"-10%",insetInlineStart:"-10%",width:"40vw",height:"40vw",borderRadius:"50%",background:"radial-gradient(circle,rgba(201,168,76,0.06) 0%,transparent 70%)",pointerEvents:"none"}}/>
      <div style={{position:"fixed",bottom:"-10%",insetInlineEnd:"-5%",width:"35vw",height:"35vw",borderRadius:"50%",background:"radial-gradient(circle,rgba(20,80,120,0.1) 0%,transparent 70%)",pointerEvents:"none"}}/>

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
        button:focus-visible,
        select:focus-visible,
        [role="button"]:focus-visible{
          outline:2px solid #f0d876;
          outline-offset:3px;
        }
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

        {/* -- HEADER -- */}
        <div style={{
          padding:"clamp(28px,6vw,48px) clamp(20px,5vw,40px) clamp(24px,5vw,36px)",
          textAlign:"center",
          background:"radial-gradient(ellipse 80% 60% at 50% 0%,rgba(201,168,76,0.08) 0%,transparent 70%)",
          borderBottom:"1px solid rgba(201,168,76,0.12)",
          position:"relative"
        }}>
          {/* Corner decorations */}
          <div style={{position:"absolute",top:"12px",insetInlineStart:"12px"}}><Corner/></div>
          <div style={{position:"absolute",top:"12px",insetInlineEnd:"12px"}}><Corner flip/></div>

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
          }}>{t("header.bismillahSubtitle")}</div>

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
            {sectionIcons.age}
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
          }}>{profileName}</h1>

          {/* Subtitle */}
          <div style={{
            display:"inline-flex",alignItems:"center",gap:"8px",
            background:"rgba(201,168,76,0.08)",
            border:"1px solid rgba(201,168,76,0.2)",
            borderRadius:"30px",padding:"6px 18px",
            marginBottom:"20px"
          }}>
            <span style={{width:"6px",height:"6px",borderRadius:"50%",background:"#c9a84c",display:"inline-block"}}/>
            <span style={{fontFamily:"Lato,sans-serif",color:"#c9a84c",fontSize:"clamp(9px,2vw,11px)",letterSpacing:"2px",textTransform:"uppercase"}}>{t("header.role")}</span>
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
            {t("header.tagline")}
          </p>
        </div>

        {/* -- BODY -- */}
        <div style={{padding:"clamp(14px,3.5vw,24px) clamp(12px,3.5vw,24px) 20px"}}>

          <Gallery rtl={rtl}/>

          {/* Personal */}
          <Card icon={sectionIcons.personal} title={t("sections.personal")} delay={0}>
            {profileSections.personal?.map(([labelKey, value]) => (
              <Row key={labelKey} rowKey={labelKey} label={t(labelKey)} value={value} rtl={rtl} />
            ))}
          </Card>

          {/* Religious Details */}
          <Card icon={sectionIcons.religious} title={t("sections.religious")} delay={60}>
            {profileSections.religious?.map(([labelKey, value]) => (
              <Row key={labelKey} rowKey={labelKey} label={t(labelKey)} value={value} rtl={rtl} />
            ))}
          </Card>

          {/* Education */}
          <Card icon={sectionIcons.education} title={t("sections.education")} delay={60}>
            {profileSections.education?.map(([labelKey, value]) => (
              <Row key={labelKey} rowKey={labelKey} label={t(labelKey)} value={value} rtl={rtl} />
            ))}
          </Card>

          {/* Professional */}
          <Card icon={sectionIcons.professional} title={t("sections.professional")} delay={120}>
            {profileSections.professional?.map(([labelKey, value]) => (
              <Row key={labelKey} rowKey={labelKey} label={t(labelKey)} value={value} rtl={rtl} />
            ))}
          </Card>

          {/* Family */}
          <Card icon={sectionIcons.family} title={t("sections.family")} delay={180}>
            {profileSections.family?.map(([labelKey, value]) => (
              <Row key={labelKey} rowKey={labelKey} label={t(labelKey)} value={value} rtl={rtl} />
            ))}
            {/* Housing note */}
            <div style={{
              margin:"14px 0",padding:"14px 16px",
              background:"linear-gradient(135deg,rgba(201,168,76,0.08),rgba(201,168,76,0.03))",
              border:"1px solid rgba(201,168,76,0.2)",
              borderInlineStart:"3px solid #c9a84c",
              borderRadius:"8px"
            }}>
              <div style={{fontFamily:"Lato,sans-serif",color:"rgba(253,246,227,0.75)",fontSize:"clamp(11px,2.5vw,13px)",lineHeight:"1.8"}}>
                {t("text.housingNote")}
              </div>
            </div>
            {/* Siblings */}
            <div style={{marginTop:"4px",padding:"14px 16px",background:"rgba(201,168,76,0.04)",border:"1px solid rgba(201,168,76,0.12)",borderRadius:"8px"}}>
              <div style={{color:"rgba(201,168,76,0.5)",fontSize:"10px",letterSpacing:"1.5px",textTransform:"uppercase",marginBottom:"12px",fontFamily:"Lato,sans-serif"}}>{t("common.siblings")}</div>
              {siblings.map(s => (
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
          <Card icon={sectionIcons.about} title={t("sections.about")} delay={240}>
            <p style={{color:"rgba(253,246,227,0.75)",fontSize:"clamp(12px,2.8vw,14px)",lineHeight:"1.95",marginBottom:"12px",fontFamily:"Lato,sans-serif",fontWeight:"300"}}>
              {t("text.about1")}
            </p>
            <p style={{color:"rgba(253,246,227,0.5)",fontSize:"clamp(11px,2.5vw,13px)",lineHeight:"1.95",fontFamily:"Lato,sans-serif",fontWeight:"300"}}>
              {t("text.about2")}
            </p>
            <div style={{
              marginTop:"16px",
              padding:"14px 18px",
              background:"linear-gradient(135deg,rgba(201,168,76,0.1),rgba(201,168,76,0.04))",
              border:"1px solid rgba(201,168,76,0.25)",
              borderInlineStart:"3px solid #c9a84c",
              borderRadius:"8px"
            }}>
              <p style={{color:"#e8d5a0",fontSize:"clamp(11px,2.6vw,13px)",lineHeight:"2",fontFamily:"Lato,sans-serif",fontWeight:"300",fontStyle:"italic",margin:0}}>
                {t("text.aboutSupport")}
              </p>
            </div>
          </Card>

          {/* Core Values */}
          <Card icon={sectionIcons.coreValues} title={t("sections.coreValues")} delay={300}>
            <div style={{display:"flex",flexWrap:"wrap",gap:"0"}}>
              {coreValuesList.map(v => <Pill key={v}>{v}</Pill>)}
            </div>
          </Card>

          {/* Hobbies */}
          <Card icon={sectionIcons.hobbies} title={t("sections.hobbies")} delay={360}>
            <div className="two-col" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"}}>
              {hobbiesList.map(h => (
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
          <Card icon={sectionIcons.lifestyle} title={t("sections.lifestyle")} delay={420}>
            <p style={{color:"rgba(253,246,227,0.3)",fontSize:"10px",letterSpacing:"1.5px",textTransform:"uppercase",marginBottom:"12px",fontFamily:"Lato,sans-serif"}}>{t("common.strictlyAvoids")}</p>
            <div className="two-col" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"7px"}}>
              {lifestyleItems.map(({ icon, text }) => (
                <div key={text} style={{
                  display:"flex",alignItems:"center",gap:"8px",
                  padding:"9px 12px",
                  background:"rgba(201,168,76,0.04)",
                  border:"1px solid rgba(201,168,76,0.12)",
                  borderRadius:"8px"
                }}>
                  <span style={{fontSize:"14px"}}>{icon}</span>
                  <span style={{color:"#d4c070",fontSize:"clamp(10px,2.3vw,12px)",fontFamily:"Lato,sans-serif",fontWeight:"300",whiteSpace:"pre-line"}}>{text}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Food */}
          <Card icon={sectionIcons.food} title={t("sections.food")} delay={480}>
            <div style={{display:"flex",flexWrap:"wrap",gap:"8px"}}>
              {foodsList.map(f => (
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
          <Card icon={sectionIcons.mahr} title={t("sections.mahr")} delay={520}>
            <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
              <div style={{
                padding:"14px 16px",
                background:"linear-gradient(135deg,rgba(201,168,76,0.1),rgba(201,168,76,0.03))",
                border:"1px solid rgba(201,168,76,0.25)",
                borderRadius:"8px",
                fontFamily:"Lato,sans-serif",color:"rgba(253,246,227,0.8)",
                fontSize:"clamp(12px,2.8vw,14px)",lineHeight:"1.9",fontWeight:"300"
              }}>
                <InlineIconText icon="🤲">
                  {renderHighlightedText(
                    t("text.mahr1"),
                    getTextHighlights(i18n.language, "mahr1", accentTextStyle, strongAccentStyle)
                  )}
                </InlineIconText>
              </div>
              <div style={{
                padding:"14px 16px",
                background:"linear-gradient(135deg,rgba(201,168,76,0.08),rgba(201,168,76,0.02))",
                border:"1px solid rgba(201,168,76,0.2)",
                borderInlineStart:"3px solid #c9a84c",
                borderRadius:"8px",
                fontFamily:"Lato,sans-serif",color:"rgba(253,246,227,0.75)",
                fontSize:"clamp(12px,2.8vw,14px)",lineHeight:"1.9",fontWeight:"300"
              }}>
                <InlineIconText icon="✨">
                  {renderHighlightedText(
                    t("text.mahr2"),
                    getTextHighlights(i18n.language, "mahr2", accentTextStyle, strongAccentStyle)
                  )}
                </InlineIconText>
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
                <InlineIconText icon="🔒" dimmed>
                  {t("text.mahr3")}
                </InlineIconText>
              </div>
              <div style={{
                padding:"14px 16px",
                background:"linear-gradient(135deg,rgba(201,168,76,0.07),rgba(201,168,76,0.02))",
                border:"1px solid rgba(201,168,76,0.22)",
                borderRadius:"8px",
                fontFamily:"Lato,sans-serif",color:"rgba(253,246,227,0.78)",
                fontSize:"clamp(12px,2.8vw,14px)",lineHeight:"1.9",fontWeight:"300"
              }}>
                <div style={{
                  display:"flex",alignItems:"center",gap:"8px",
                  marginBottom:"10px",
                  fontFamily:"Playfair Display,serif",
                  color:"#e8d5a0",
                  fontSize:"clamp(13px,3vw,15px)",
                  fontWeight:"700"
                }}>
                  <span aria-hidden="true" style={{fontSize:"18px"}}>🤝</span>
                  <span>{t("text.groomSideTitle")}</span>
                </div>

                <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
                  <p style={{margin:0}}>
                    <InlineIconText icon="🤲">
                      {t("text.groomSide1")}
                    </InlineIconText>
                  </p>
                  <p style={{margin:0}}>{t("text.groomSide2")}</p>
                  <p style={{margin:0}}>
                    <InlineIconText icon="✨">
                      {t("text.groomSide3")}
                    </InlineIconText>
                  </p>
                  <p style={{margin:0,fontWeight:"800",color:"#fdf6e3"}}>
                    <InlineIconText icon="🤍">
                      {t("text.groomSide4")}
                    </InlineIconText>
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Future Vision */}
          <Card icon={sectionIcons.future} title={t("sections.future")} delay={535}>
            <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
              <p style={{color:"rgba(253,246,227,0.75)",fontSize:"clamp(12px,2.8vw,14px)",lineHeight:"1.95",fontFamily:"Lato,sans-serif",fontWeight:"300"}}>
                <InlineIconText icon="✨">
                  {renderHighlightedText(
                    t("text.future1"),
                    getTextHighlights(i18n.language, "future1", accentTextStyle, strongAccentStyle)
                  )}
                </InlineIconText>
              </p>
              <p style={{color:"rgba(253,246,227,0.65)",fontSize:"clamp(12px,2.8vw,14px)",lineHeight:"1.95",fontFamily:"Lato,sans-serif",fontWeight:"300"}}>
                <InlineIconText icon="✨">
                  {renderHighlightedText(
                    t("text.future2"),
                    getTextHighlights(i18n.language, "future2", accentTextStyle, strongAccentStyle)
                  )}
                </InlineIconText>
              </p>
              <div style={{
                padding:"14px 16px",
                background:"linear-gradient(135deg,rgba(201,168,76,0.09),rgba(201,168,76,0.02))",
                border:"1px solid rgba(201,168,76,0.2)",
                borderInlineStart:"3px solid #c9a84c",
                borderRadius:"8px",
                fontFamily:"Lato,sans-serif",color:"rgba(253,246,227,0.75)",
                fontSize:"clamp(12px,2.8vw,14px)",lineHeight:"1.95",fontWeight:"300"
              }}>
                <InlineIconText icon="🏡">
                  {renderHighlightedText(
                    t("text.future3"),
                    getTextHighlights(i18n.language, "future3", accentTextStyle, strongAccentStyle)
                  )}
                </InlineIconText>
              </div>
              <div style={{
                padding:"14px 16px",
                background:"linear-gradient(135deg,rgba(201,168,76,0.1),rgba(201,168,76,0.03))",
                border:"1px solid rgba(201,168,76,0.25)",
                borderRadius:"8px",
                fontFamily:"Playfair Display,serif",fontStyle:"italic",
                color:"#e8d5a0",fontSize:"clamp(12px,2.8vw,15px)",lineHeight:"1.9"
              }}>
                {t("text.futureQuote")}
              </div>
            </div>
          </Card>

          {/* Partner */}
          <Card icon={sectionIcons.partner} title={t("sections.partner")} delay={540}>
            <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
              <p style={{color:"rgba(253,246,227,0.75)",fontSize:"clamp(12px,2.8vw,14px)",lineHeight:"1.95",fontFamily:"Lato,sans-serif",fontWeight:"300"}}>
                {t("text.partner1")}
              </p>

              {/* Preferred */}
              <div style={{padding:"14px 16px",background:"linear-gradient(135deg,rgba(201,168,76,0.09),rgba(201,168,76,0.02))",border:"1px solid rgba(201,168,76,0.2)",borderInlineStart:"3px solid #c9a84c",borderRadius:"8px"}}>
                <div style={{color:"rgba(201,168,76,0.55)",fontSize:"10px",letterSpacing:"1.5px",textTransform:"uppercase",marginBottom:"10px",fontFamily:"Lato,sans-serif"}}>{t("common.preferredQualities")}</div>
                {preferredQualities.map(({ icon, text }) => (
                  <div key={text} style={{display:"flex",alignItems:"flex-start",gap:"10px",marginBottom:"9px"}}>
                    <span style={{fontSize:"14px",marginTop:"1px"}}>{icon}</span>
                    <span style={{color:"rgba(253,246,227,0.75)",fontSize:"clamp(12px,2.8vw,13px)",fontFamily:"Lato,sans-serif",fontWeight:"300",lineHeight:"1.7"}}>{text}</span>
                  </div>
                ))}
              </div>

              {/* Language */}
              <div style={{padding:"14px 16px",background:"rgba(201,168,76,0.04)",border:"1px solid rgba(201,168,76,0.12)",borderRadius:"8px"}}>
                <div style={{color:"rgba(201,168,76,0.55)",fontSize:"10px",letterSpacing:"1.5px",textTransform:"uppercase",marginBottom:"10px",fontFamily:"Lato,sans-serif"}}>{t("common.languageBackground")}</div>
                <p style={{color:"rgba(253,246,227,0.7)",fontSize:"clamp(12px,2.8vw,13px)",fontFamily:"Lato,sans-serif",fontWeight:"300",lineHeight:"1.85",marginBottom:"10px"}}>
                  {t("text.partnerLanguage")}
                </p>
                <div style={{display:"flex",flexWrap:"wrap",gap:"7px"}}>
                  {partnerLanguages.map(l => (
                    <span key={l} style={{padding:"5px 14px",background:"linear-gradient(135deg,rgba(201,168,76,0.12),rgba(201,168,76,0.04))",border:"1px solid rgba(201,168,76,0.25)",borderRadius:"20px",color:"#e8d090",fontSize:"clamp(11px,2.4vw,12px)",fontFamily:"Lato,sans-serif"}}>{l}</span>
                  ))}
                </div>
              </div>

              {/* Age preference */}
              <div style={{padding:"14px 16px",background:"rgba(201,168,76,0.04)",border:"1px solid rgba(201,168,76,0.12)",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"12px"}}>
                <div>
                  <div style={{color:"rgba(201,168,76,0.55)",fontSize:"10px",letterSpacing:"1.5px",textTransform:"uppercase",marginBottom:"5px",fontFamily:"Lato,sans-serif"}}>{t("common.preferredAgeRange")}</div>
                  <div style={{color:"#fdf6e3",fontSize:"clamp(14px,3vw,18px)",fontFamily:"Playfair Display,serif",fontWeight:"600",letterSpacing:"1px"}}>{t("profile.preferredAgeRangeValue")}</div>
                </div>
                <div style={{fontSize:"28px"}}>{sectionIcons.age}</div>
              </div>

              {/* Personal wish quote */}
              <div style={{padding:"14px 16px",background:"linear-gradient(135deg,rgba(201,168,76,0.1),rgba(201,168,76,0.03))",border:"1px solid rgba(201,168,76,0.25)",borderRadius:"8px",fontFamily:"Playfair Display,serif",fontStyle:"italic",color:"#e8d5a0",fontSize:"clamp(12px,2.8vw,15px)",lineHeight:"1.9"}}>
                {t("text.partnerQuote")}
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
            <div style={{position:"absolute",top:0,insetInline:"20px",height:"1px",background:"linear-gradient(to right,transparent,#c9a84c,transparent)"}}/>
            <div style={{
              fontFamily:"Playfair Display,serif",
              color:"#e8d5a0",fontSize:"clamp(13px,3vw,16px)",
              fontWeight:"700",letterSpacing:"2px",textTransform:"uppercase",
              marginBottom:"20px"
            }}>{t("sections.contact")}</div>
            <div style={{display:"flex",flexDirection:"column",gap:"12px",alignItems:"center"}}>
              {contactItems.map(({ href, icon, text }) => href ? (
                <a key={text} href={href} style={{
                  color:"#c9a84c",textDecoration:"none",
                  fontSize:"clamp(12px,3vw,15px)",
                  fontFamily:"Lato,sans-serif",fontWeight:"400",
                  letterSpacing:"0.3px"
                }}>{icon} {text}</a>
              ) : (
                <span key={text} style={{color:"#c9a84c",fontSize:"clamp(12px,3vw,14px)",fontFamily:"Lato,sans-serif"}}>{icon} {text}</span>
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
              {t("text.quranQuote")}
              <div style={{marginTop:"4px",fontFamily:"Lato,sans-serif",fontSize:"10px",letterSpacing:"2px",color:"rgba(201,168,76,0.3)"}}>{t("text.quranRef")}</div>
            </div>
          </div>
        </div>

        <div style={{height:"3px",background:"linear-gradient(90deg,transparent 0%,#8b6914 15%,#c9a84c 40%,#f0d876 60%,#c9a84c 80%,#8b6914 90%,transparent 100%)"}}/>
      </div>
    </div>
  );
}








