import React, { useEffect } from "react";

const ARABIC_DUA =
  "اللَّهُمَّ بَارِكْ لَنَا فِي حُبِّنَا، وَاجْمَعْ بَيْنَنَا عَلَى الْخَيْرِ، وَارْزُقْنَا السَّعَادَةَ وَالطُّمَأْنِينَةَ، وَاجْعَلْنَا مِنَ الصَّالِحِينَ.";

const ACCENT_GRADIENT =
  "linear-gradient(90deg, rgba(34,197,94,1), rgba(59,130,246,1), rgba(168,85,247,1), rgba(244,114,182,1))";

const MESSAGE = `Alhamdulillah I have found my soulmate (my Roohi).
With gratitude to Allah, this journey has come to a beautiful end.

This website will no longer be active.
Thank you to everyone who visited and supported along the way.

Please keep us in your duas
Inshallah, I will also remember all of you in my prayers.`;

const SPECIAL_NOTE = `To my Roohi…
You are not just my soulmate; you are my peace (sakinah), my answered dua, and one of Allah's most beautiful gifts in my life.

If you ever see this, just know: choosing you is the best decision I have ever made, Alhamdulillah.
Inshallah, I will spend my life honoring you, protecting your heart, and making you smile.

Please keep me, and keep us, in your duas and in your salah; and Inshallah, we will remember you in ours too.`;

export default function ClosingOverlay() {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.classList.add("closing-overlay-open");
    return () => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.classList.remove("closing-overlay-open");
    };
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Website closing message"
      className="closing-overlay-root"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: [
          "radial-gradient(900px 600px at 18% 12%, rgba(34,197,94,0.18), transparent 60%)",
          "radial-gradient(900px 600px at 82% 18%, rgba(59,130,246,0.16), transparent 58%)",
          "radial-gradient(1100px 700px at 50% 100%, rgba(168,85,247,0.14), transparent 60%)",
          "rgba(0, 0, 0, 0.72)"
        ].join(", "),
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        padding: "24px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div
        style={{
          width: "min(860px, 100%)",
          maxHeight: "calc(100vh - 48px)",
          overflowY: "auto"
        }}
      >
        <div
          style={{
            background: ACCENT_GRADIENT,
            padding: 1,
            borderRadius: 18,
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.55)"
          }}
        >
          <div
            style={{
              background:
                "linear-gradient(180deg, rgba(10, 10, 10, 0.82), rgba(10, 10, 10, 0.72))",
              borderRadius: 17,
              padding: "22px 18px",
              color: "rgba(255, 255, 255, 0.92)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              backdropFilter: "blur(10px)"
            }}
          >
            <div
              style={{
                height: 4,
                borderRadius: 999,
                background: ACCENT_GRADIENT,
                opacity: 0.9,
                marginBottom: 14
              }}
            />

            <h1
              style={{
                margin: "0 0 12px",
                fontSize: 28,
                lineHeight: 1.15,
                color: "rgba(255, 255, 255, 0.96)",
                backgroundImage: ACCENT_GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              This website is now closed
            </h1>

            <div
              style={{
                whiteSpace: "pre-wrap",
                lineHeight: 1.7,
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.10)",
                borderRadius: 14,
                padding: "14px 14px"
              }}
            >
              {MESSAGE}
            </div>

            <div
              style={{
                height: 1,
                margin: "18px 0",
                background:
                  "linear-gradient(90deg, rgba(34,197,94,0.0), rgba(255,255,255,0.16), rgba(244,114,182,0.0))"
              }}
            />

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontSize: 13,
                letterSpacing: 0.4,
                opacity: 0.95,
                padding: "6px 10px",
                borderRadius: 999,
                background: "rgba(34,197,94,0.12)",
                border: "1px solid rgba(34,197,94,0.25)",
                marginBottom: 10
              }}
            >
              Dua
            </div>
            <div
              dir="rtl"
              lang="ar"
              style={{
                fontSize: 20,
                lineHeight: 1.85,
                whiteSpace: "pre-wrap",
                background: "rgba(59,130,246,0.08)",
                border: "1px solid rgba(59,130,246,0.22)",
                borderRadius: 14,
                padding: "14px 14px"
              }}
            >
              {ARABIC_DUA}
            </div>

            <div
              style={{
                height: 1,
                margin: "18px 0",
                background:
                  "linear-gradient(90deg, rgba(34,197,94,0.0), rgba(255,255,255,0.16), rgba(244,114,182,0.0))"
              }}
            />

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontSize: 13,
                letterSpacing: 0.4,
                opacity: 0.95,
                padding: "6px 10px",
                borderRadius: 999,
                background: "rgba(244,114,182,0.12)",
                border: "1px solid rgba(244,114,182,0.25)",
                marginBottom: 10
              }}
            >
              💌 A Special Note (for my roohi)
            </div>
            <div
              style={{
                whiteSpace: "pre-wrap",
                lineHeight: 1.7,
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.10)",
                borderRadius: 14,
                padding: "14px 14px"
              }}
            >
              {SPECIAL_NOTE}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
