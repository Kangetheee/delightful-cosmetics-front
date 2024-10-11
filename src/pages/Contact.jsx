import React from 'react';
import { MdContacts } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa'; // Import WhatsApp icon

const Contact = ({ activeTab, handleTabClick }) => {
  const phoneNumber = '254701234567'; // Replace with your WhatsApp number
  const message = 'Hello! I would like to know more about your services.';
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      onClick={() => handleTabClick("contact")}
      className={`flexCenter gap-x-1 ${activeTab === "contact" ? "active-link" : ""}`}
      rel="noopener noreferrer"
    >
      <MdContacts />
      <span>Contact</span>
      <FaWhatsapp /> {/* Add WhatsApp icon next to contact */}
    </a>
  );
};

export default Contact;
