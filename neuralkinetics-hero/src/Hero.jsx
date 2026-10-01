import { Plus } from "lucide-react";
import { motion } from "motion/react";

import LogoMark from "./LogoMark.jsx";
import "./Hero.css";

const EASE = [0.16, 1, 0.3, 1];

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4";

/** 2x2 dot grid. */
function GridMark() {
  return (
    <svg className="nk-grid-icon" viewBox="0 0 12 12" aria-hidden="true">
      <g fill="#ffffff">
        <circle cx="3.5" cy="3.5" r="1.6" />
        <circle cx="8.5" cy="3.5" r="1.6" />
        <circle cx="3.5" cy="8.5" r="1.6" />
        <circle cx="8.5" cy="8.5" r="1.6" />
      </g>
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="nk-hero">
      {/*
        The wrapper carries the animation: motion writes `transform`, so
        centring has to come from the stage's grid rather than a translate,
        or the scale would clobber it.
      */}
      <div className="nk-video-stage">
        <motion.div
          className="nk-video-wrap"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: EASE }}
        >
          <video
            className="nk-video"
            src={VIDEO_SRC}
            autoPlay
            muted
            playsInline
            loop
          />
        </motion.div>
      </div>

      <motion.nav
        className="nk-nav"
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <div className="nk-nav-side">
          <a className="nk-brand" href="#top">
            <LogoMark />
            <span className="nk-brand-text">NeuralKinetics</span>
          </a>

          <button className="nk-menu" type="button">
            <span className="nk-menu-circle">
              <Plus size={12} strokeWidth={3} />
            </span>
            <span className="nk-menu-label">Menu</span>
          </button>

          <div className="nk-tags">
            <span className="nk-tag-text">Advanced Bionics</span>
            <span className="nk-tag-text">Cognitive AI</span>
          </div>
        </div>

        <div className="nk-nav-side">
          <div className="nk-adaptive">
            <button className="nk-adaptive-circle" type="button" aria-label="Open systems">
              <GridMark />
            </button>
            <span className="nk-adaptive-label">Adaptive Systems</span>
          </div>
        </div>
      </motion.nav>

      <motion.div
        className="nk-footer"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: EASE }}
      >
        <div className="nk-footer-left">
          <motion.div
            className="nk-subtitle"
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
          >
            <span className="nk-dot" />
            <span>Best digital banking card 2026</span>
          </motion.div>

          <motion.h1
            className="nk-heading"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
          >
            One Card, Zero
            <br />
            Limits. Worldwide.
          </motion.h1>

          <motion.div
            className="nk-actions"
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1, ease: EASE }}
          >
            <button className="nk-btn nk-btn-solid" type="button">
              See Features
            </button>
            <button className="nk-btn nk-btn-ghost" type="button">
              How It Works
            </button>
          </motion.div>
        </div>

        <div className="nk-footer-right">
          <span className="nk-pill">Neuromorphic</span>
          <span className="nk-pill">AGI</span>
          <span className="nk-pill">Cybernetics</span>
        </div>
      </motion.div>
    </section>
  );
}
