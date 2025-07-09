"use client";

import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { FaTwitter, FaTelegram, FaEthereum } from "react-icons/fa";
import { SiOptimism } from "react-icons/si";
import Image from "next/image";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

// Particles
const PARTICLES = Array.from({ length: 25 }).map((_, i) => ({
  id: i,
  size: 10 + Math.random() * 15,
  x: Math.random() * 100,
  y: Math.random() * 100,
  opacityPeak: 0.3 + Math.random() * 0.3,
  duration: 10 + Math.random() * 15,
  delay: Math.random() * 3,
}));
const IMAGE_PARTICLES = Array.from({ length: 15 }).map((_, i) => ({
  id: i,
  size: 20 + Math.random() * 30,
  x: Math.random() * 100,
  y: Math.random() * 100,
  rotation: Math.random() * 360,
  duration: 15 + Math.random() * 20,
  delay: Math.random() * 5,
}));

export default function Home() {
  const [stage, setStage] = useState<"logo" | "content">("logo");
  const controls = useAnimationControls();
  const contentRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const isScrollingDown = useRef(false);
  const isAnimating = useRef(false); // ✅ Prevent multiple triggers

  const { currentLanguage } = useLanguageContext();
  const { t, isLoading: translationLoading } = useTranslation(currentLanguage);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      isScrollingDown.current = y > lastScrollY.current;
      lastScrollY.current = y;

      if (isScrollingDown.current && y > 50 && stage === "logo") {
        revealContent();
      } else if (!isScrollingDown.current && y <= 10 && stage === "content") {
        revealLogo();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [stage, controls]);

  useEffect(() => {
    if (!translationLoading && stage === "logo") {
      revealLogo();
    }
  }, [translationLoading]);

  const revealContent = async () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    await controls.start({
      scale: 10,
      opacity: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    });

    setStage("content");
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: "smooth" });
      isAnimating.current = false;
    }, 500);
  };

  const revealLogo = async () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    controls.set({ scale: 10, opacity: 0 });
    await new Promise((resolve) => setTimeout(resolve, 10));
    await controls.start({
      scale: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    });

    setStage("logo");
    window.scrollTo({ top: 0, behavior: "smooth" });

    isAnimating.current = false;
  };

  if (translationLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="relative h-[200vh] bg-white overflow-x-hidden">
      {/* Language Switcher */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>

      {/* Particles */}
      <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.x}%`,
              top: `${p.y}%`,
              background: `radial-gradient(circle, rgba(255,50,50,${
                p.opacityPeak
              }) 0%, rgba(255,0,0,${
                p.opacityPeak * 0.7
              }) 70%, transparent 100%)`,
              filter: "blur(1px)",
            }}
            animate={{
              y: [0, -150, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0.2, p.opacityPeak, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
        {IMAGE_PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
            animate={{
              y: [0, -150, 0],
              x: [0, Math.random() * 100 - 50, 0],
              rotate: [p.rotation, p.rotation + 180, p.rotation + 360],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/image.png"
              alt=""
              width={p.size}
              height={p.size}
              className="w-full h-full object-contain"
              priority={p.id < 2}
            />
          </motion.div>
        ))}
      </div>

      {/* Logo Section */}
      <AnimatePresence mode="wait">
        {stage === "logo" && (
          <motion.div
            className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.div
              className="flex flex-col items-center justify-center pointer-events-auto"
              animate={controls}
            >
              <motion.div
                onClick={revealContent}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-52 h-52 md:w-72 md:h-72 flex items-center justify-center cursor-pointer"
              >
                <Image
                  src="/image.png"
                  alt={t("altText.logo")}
                  width={288}
                  height={288}
                  className="object-contain"
                  priority
                />
              </motion.div>
              <motion.div
                className="mt-8 flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <p className="text-gray-600 text-lg md:text-xl mb-2 font-medium">
                  {t("scrollPrompt")}
                </p>
                <motion.div
                  animate={{ y: [0, 8, 0], opacity: [0.6, 1, 0.6] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-red-500"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 5v14M19 12l-7 7-7-7" />
                  </svg>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div
        ref={contentRef}
        className="absolute top-[100vh] left-0 w-full h-screen flex items-center justify-center overflow-hidden"
      >
        <AnimatePresence>
          {stage === "content" && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="w-full h-full flex items-center justify-center px-4 sm:px-6"
            >
              <motion.div
                className="text-center w-full max-w-4xl"
                style={{
                  transform: "scale(var(--content-scale))",
                  transformOrigin: "center",
                }}
                ref={(node) => {
                  if (!node) return;
                  const updateScale = () => {
                    const vh = window.innerHeight;
                    const ch = node.scrollHeight;
                    const scale = Math.min(1, (vh * 0.8) / ch);
                    node.style.setProperty("--content-scale", scale.toString());
                  };
                  updateScale();
                  window.addEventListener("resize", updateScale);
                  return () =>
                    window.removeEventListener("resize", updateScale);
                }}
              >
                {/* Logo */}
                <motion.div
                  className="flex justify-center mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  <img
                    src="/wowoo.png"
                    alt={t("altText.wowbitLogo")}
                    className="h-16 md:h-20 lg:h-24 w-auto"
                  />
                </motion.div>

                {/* Tagline */}
                <motion.p
                  className="text-lg md:text-xl text-gray-600 mb-6 max-w-2xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  {t("tagline")}
                </motion.p>

                {/* Token Info Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(255,0,0,0.1)",
                  }}
                  className="bg-white rounded-xl shadow-md p-4 mb-6 max-w-xl mx-auto border border-gray-100 relative"
                >
                  <motion.div
                    className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-red-500/10 blur-xl"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
                    transition={{ duration: 8, repeat: Infinity }}
                  />
                  <div className="relative z-10">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 }}
                      className="flex items-center justify-between mb-4"
                    >
                      <h3 className="text-lg font-semibold text-gray-800">
                        {t("tokenInfo.title")}
                      </h3>
                      <div className="flex items-center space-x-1 text-red-500">
                        <SiOptimism className="text-base" />
                        <span className="text-xs font-medium">
                          {t("tokenInfo.network")}
                        </span>
                      </div>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        {
                          label: t("tokenInfo.fields.tokenName"),
                          value: t("tokenInfo.values.tokenName"),
                        },
                        {
                          label: t("tokenInfo.fields.symbol"),
                          value: t("tokenInfo.values.symbol"),
                        },
                        {
                          label: t("tokenInfo.fields.totalSupply"),
                          value: t("tokenInfo.values.totalSupply"),
                        },
                        {
                          label: t("tokenInfo.fields.decimal"),
                          value: t("tokenInfo.values.decimal"),
                        },
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          className="p-2 bg-gray-50 rounded-lg"
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.9 + i * 0.1 }}
                        >
                          <p className="text-xs text-gray-500">{item.label}</p>
                          <p className="text-sm font-medium text-red-500">
                            {item.value}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.3 }}
                      className="mt-4"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-2 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">
                            {t("tokenInfo.fields.contractAddress")}
                          </p>
                          <p className="text-sm font-mono text-red-500 break-all">
                            {t("tokenInfo.values.contractAddress")}
                          </p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-3 py-1.5 bg-red-500 text-white text-xs rounded-md font-medium sm:ml-0 mx-auto sm:mx-0 pointer-events-auto"
                          onClick={() =>
                            navigator.clipboard.writeText(
                              t("tokenInfo.values.contractAddress")
                            )
                          }
                        >
                          {t("tokenInfo.copyButton")}
                        </motion.button>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  className="flex flex-col sm:flex-row justify-center gap-3 mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  <motion.a
                    href="https://optimistic.etherscan.io/token/0x03cc5feF38896537c10Fcb30A53A1B12be101da6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-red-500 text-white rounded-full font-bold flex items-center justify-center space-x-2 hover:bg-red-600 transition-colors shadow-lg hover:shadow-red-500/40 text-sm"
                    whileHover={{
                      scale: 1.05,
                      boxShadow:
                        "0 10px 15px -3px rgba(255,0,0,0.3),0 4px 6px -4px rgba(255,0,0,0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.6 }}
                  >
                    <FaEthereum />
                    <span>{t("actions.viewOnOptimismScan")}</span>
                  </motion.a>
                  <motion.a
                    href={
                      currentLanguage === "ja"
                        ? "/WOWOO_JP.pdf"
                        : "/WOWOO_EN.pdf"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-white text-red-500 border-2 border-red-500 rounded-full font-bold hover:bg-red-50 transition-colors shadow-lg hover:shadow-red-500/20 text-sm"
                    whileHover={{
                      scale: 1.05,
                      boxShadow:
                        "0 10px 15px -3px rgba(255,0,0,0.2),0 4px 6px -4px rgba(255,0,0,0.2)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.7 }}
                  >
                    {t("actions.whitepaper")}
                  </motion.a>
                </motion.div>

                {/* Social Links */}
                <motion.div
                  className="flex justify-center space-x-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.8 }}
                >
                  {[
                    {
                      icon: <FaTwitter size={24} />,
                      href: "https://x.com/WowooHQ",
                    },
                    {
                      icon: <FaTelegram size={24} />,
                      href: "https://t.me/wowooofficial",
                    },
                  ].map((social, i) => (
                    <motion.a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-red-500/40 transition-all"
                      whileHover={{
                        y: -5,
                        scale: 1.1,
                        boxShadow: "0 10px 15px -3px rgba(255,0,0,0.4)",
                      }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 1.9 + i * 0.1,
                        type: "spring",
                        stiffness: 500,
                        damping: 15,
                      }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
