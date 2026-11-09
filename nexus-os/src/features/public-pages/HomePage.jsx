/** @format */

import { Link } from "react-router-dom";
import {
  FaRocket,
  FaCode,
  FaPaintBrush,
  FaChartLine,
  FaUsers,
  FaCheckCircle,
  FaQuoteLeft,
} from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import ParticleBackground from "../../ui/ParticleBackground";
import CountUp from "../../ui/CountUp";
import styles from "./HomePage.module.css";

function HomePage() {
  const [startCounting, setStartCounting] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStartCounting(true);
      },
      { threshold: 0.5 },
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.page}>
      <ParticleBackground />

      <section className={styles.hero}>
        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className={styles.eyebrow}>Agency Operating System</span>
          <h1 className={styles.title}>
            Run Your Entire Agency from a{" "}
            <span className={styles.highlight}>Single Dashboard</span>
          </h1>
          <p className={styles.subtitle}>
            Requests, budgets, and your team — one clear workflow, from the
            first request to launch day.
          </p>
          <div className={styles.ctaGroup}>
            <Link to="/signup/client" className={styles.ctaPrimary}>
              <FaRocket /> Start a Project
            </Link>
            <Link to="/signup/developer" className={styles.ctaSecondary}>
              <FaCode /> Join Our Team
            </Link>
          </div>
          <p className={styles.trustLine}>
            See it in action with the live demo — no signup required.
          </p>
        </motion.div>
      </section>

      <section className={styles.stats} ref={statsRef}>
        <CountUp
          end={200}
          label="Projects Delivered"
          icon={FaCheckCircle}
          startCounting={startCounting}
        />
        <CountUp
          end={50}
          label="Happy Clients"
          icon={FaUsers}
          startCounting={startCounting}
        />
        <CountUp
          end={15}
          label="Expert Developers"
          icon={FaCode}
          startCounting={startCounting}
        />
      </section>

      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>What We Do Best</h2>
        <div className={styles.featureGrid}>
          {[
            {
              icon: FaPaintBrush,
              title: "UI/UX Design",
              desc: "Beautiful, intuitive interfaces that users love.",
            },
            {
              icon: FaCode,
              title: "Web Development",
              desc: "High-performance web apps with modern tech.",
            },
            {
              icon: FaChartLine,
              title: "Dashboards & Analytics",
              desc: "Real-time metrics so you always know where every project stands.",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              className={styles.featureCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
            >
              <f.icon className={styles.featureIcon} />
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className={styles.howItWorks}>
        <h2 className={styles.sectionTitle}>How It Works</h2>
        <div className={styles.steps}>
          {[
            {
              step: 1,
              title: "Submit a Request",
              desc: "Tell us about your project. Every request is reviewed carefully.",
            },
            {
              step: 2,
              title: "We Build It",
              desc: "Our team builds with regular updates.",
            },
            {
              step: 3,
              title: "Launch & Scale",
              desc: "We deploy, monitor, and optimize.",
            },
          ].map((s, i) => (
            <motion.div
              key={i}
              className={styles.step}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <div className={styles.stepNumber}>{s.step}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className={styles.testimonials}>
        <h2 className={styles.sectionTitle}>What Clients Say</h2>
        <div className={styles.testimonialGrid}>
          {[
            {
              quote:
                "The whole request-to-launch flow was painless. I always knew where my project stood.",
              name: "Sarah M.",
              role: "Product Manager, RetailCo",
            },
            {
              quote:
                "Clear communication, regular updates, and a dashboard that finally makes sense.",
              name: "James T.",
              role: "Founder, Brightline",
            },
            {
              quote:
                "From first request to final delivery in record time. Highly recommended.",
              name: "Lena K.",
              role: "Marketing Lead, Northwind",
            },
          ].map((t, i) => (
            <motion.div
              key={i}
              className={styles.testimonialCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
            >
              <FaQuoteLeft className={styles.quoteIcon} />
              <p className={styles.quote}>{t.quote}</p>
              <div className={styles.quoteAuthor}>
                <span className={styles.authorName}>{t.name}</span>
                <span className={styles.authorRole}>{t.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className={styles.ctaBand}>
        <motion.div
          className={styles.ctaBandContent}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.ctaTitle}>
            Ready to turn your idea into a product?
          </h2>
          <p className={styles.ctaText}>
            Tell us what you're building — we'll take it from there.
          </p>
          <div className={styles.ctaGroup}>
            <Link to="/signup/client" className={styles.ctaPrimary}>
              <FaRocket /> Start a Project
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default HomePage;
