import React, { useState } from 'react';
import { MdCategory, MdContacts, MdHomeFilled } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa'; 

export function NavBar({ containerStyles }) {
  const [activeTab, setActiveTab] = useState("home");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <nav className={`${containerStyles} flex justify-center space-x-6 md:space-x-10`}>
        <a
          href="#home"
          onClick={() => handleTabClick("home")}
          className={`flexCenter gap-x-1 ${activeTab === "home" ? "active-link" : ""}`}
        >
          <MdHomeFilled />
          Home
        </a>
        <a
          href="#shop"
          onClick={() => handleTabClick("shop")}
          className={`flexCenter gap-x-1 ${activeTab === "shop" ? "active-link" : ""}`}
        >
          <MdCategory />
          Shop
        </a>
        {/* <a
          href="#contact"
          onClick={() => handleTabClick("contact")}
          className={`flexCenter gap-x-1 ${activeTab === "contact" ? "active-link" : ""}`}
        >
          <MdContacts />
          Contact
        </a> */}
      </nav>

      {/* WhatsApp Floating Button */}
      <a
        href={`https://wa.me/254721726183?text=${encodeURIComponent("Hello! What would you like to know about our services?")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
      >
        <FaWhatsapp size={32} color="white" />
      </a>
    </>
  );
}
