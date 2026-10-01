import { motion } from "motion/react";

import LogoMark from "./LogoMark.jsx";
import "./Footer.css";

const EASE = [0.16, 1, 0.3, 1];

const COLUMNS = [
  { title: "Product", links: ["The Card", "Limits", "Security", "Pricing"] },
  { title: "Company", links: ["About", "Careers", "Press", "Contact"] },
  { title: "Resources", links: ["Docs", "API", "Support", "Status"] },
  { title: "Legal", links: ["Privacy", "Terms", "Cookies"] },
];

const SOCIALS = ["X", "LinkedIn", "GitHub"];

/** Reveals once, on the same curve as the hero's entrance. */
const reveal = (delay = 0) => ({
  initial: { y: 20, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, delay, ease: EASE },
});

export default function Footer() {
  return (
    <footer className="nk-site-footer">
      <div className="nk-footer-inner">
        <div className="nk-footer-top">
          <motion.div className="nk-footer-cta" {...reveal(0)}>
            <div className="nk-footer-eyebrow">
              <span className="nk-dot" />
              <span>Now issuing worldwide</span>
            </div>
            <h2 className="nk-footer-title">
              Ready when
              <br />
              you are.
            </h2>
            <div className="nk-footer-actions">
              <button className="nk-btn nk-btn-solid" type="button">
                Get the card
              </button>
              <button className="nk-btn nk-btn-ghost" type="button">
                Talk to us
              </button>
            </div>
          </motion.div>

          <motion.nav className="nk-footer-cols" aria-label="Footer" {...reveal(0.1)}>
            {COLUMNS.map((col) => (
              <div className="nk-footer-col" key={col.title}>
                <p className="nk-col-title">{col.title}</p>
                <ul className="nk-col-list">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a className="nk-col-link" href="#top">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.nav>
        </div>

        <motion.div className="nk-footer-bar" {...reveal(0.2)}>
          <div className="nk-footer-brand">
            <LogoMark />
            <span className="nk-footer-brand-text">NeuralKinetics</span>
          </div>

          <p className="nk-copyright">
            &copy; 2026 NeuralKinetics. All rights reserved.
          </p>

          <div className="nk-socials">
            {SOCIALS.map((s) => (
              <a className="nk-pill nk-pill-link" href="#top" key={s}>
                {s}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
