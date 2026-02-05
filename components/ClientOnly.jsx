"use client";

import Popup from "./Popup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ClientOnly() {
  return (
    <>
      <Popup />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
      />
    </>
  );
}
