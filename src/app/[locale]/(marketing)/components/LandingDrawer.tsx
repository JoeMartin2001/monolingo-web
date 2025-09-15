"use client";

import React from "react";
import { useState } from "react";
import { MenuIcon } from "@/components/icons/MenuIcon";
import { DrawerMenu } from "@/components/layout/drawer-menu";
import ThemeToggle from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import Link from "next/link";
import { useTranslations } from "next-intl";

export const LandingDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("LandingPage");

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden"
        aria-label="Open navigation menu"
      >
        <MenuIcon className="w-6 h-6" />
      </button>

      <DrawerMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="space-y-6">
          {/* Theme and Language Controls */}
          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between">
              <p>{t("theme")}</p>

              <ThemeToggle />
            </div>

            <div className="flex items-center justify-between">
              <p>{t("language")}</p>

              <LanguageSwitcher />
            </div>
          </div>

          {/* Navigation Links */}
          <div
            className="space-y-3 pt-4 border-t"
            style={{ borderColor: "var(--border)" }}
          >
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-lg transition-colors text-base font-medium text-center"
              style={{
                backgroundColor: "var(--primary)",
                color: "var(--primary-foreground)",
              }}
            >
              {t("signIn")}
            </Link>
          </div>
        </div>
      </DrawerMenu>
    </>
  );
};
