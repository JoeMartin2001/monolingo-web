import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import React, { Fragment } from "react";
import { XIcon } from "../icons/XIcon";
import { useTranslations } from "next-intl";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  closeOnOverlayClick?: boolean;
  direction?: "left" | "right";
};

export const DrawerMenu = (props: Props) => {
  const {
    isOpen,
    onClose,
    title,
    children,
    closeOnOverlayClick = true,
    direction = "right",
  } = props;

  const t = useTranslations("DrawerMenu");

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={closeOnOverlayClick ? onClose : () => {}}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div
              className={`pointer-events-none fixed inset-y-0 ${
                direction === "left" ? "left-0" : "right-0"
              } flex max-w-full ${direction === "left" ? "pr-10" : "pl-10"}`}
            >
              <TransitionChild
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom={
                  direction === "left"
                    ? "-translate-x-full"
                    : "translate-x-full"
                }
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo={
                  direction === "left"
                    ? "-translate-x-full"
                    : "translate-x-full"
                }
              >
                <DialogPanel className="pointer-events-auto w-screen max-w-sm">
                  <div className="flex h-full flex-col bg-background shadow-xl">
                    <div className="flex items-center justify-between p-4 shadow">
                      <DialogTitle as="h3" className="text-lg font-semibold">
                        {title || t("menu")}
                      </DialogTitle>
                      <button
                        type="button"
                        className="rounded-lg p-2 transition-colors"
                        onClick={onClose}
                        aria-label={t("close")}
                      >
                        <XIcon className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="relative flex-1 p-4 overflow-y-auto overflow-x-visible">
                      {children}
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
