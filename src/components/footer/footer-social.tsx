const socialData = [
  {
    id: 1,
    cls: "social-inst",
    href: "https://www.instagram.com/tutor360.br",
    iconClass: "fa-brands fa-instagram",
    alt: "Instagram",
  },
  {
    id: 2,
    cls: "social-wa",
    href: "https://wa.me/5500000000000", // Mentor: Lembre-se de trocar pelos seus números depois!
    iconClass: "fa-brands fa-whatsapp",
    alt: "WhatsApp",
  },
  {
    id: 3,
    cls: "social-yout",
    href: "https://www.youtube.com/@tutor360", 
    iconClass: "fa-brands fa-youtube",
    alt: "YouTube",
  },
  {
    id: 4,
    cls: "social-lnkd",
    href: "https://www.linkedin.com/company/tutor360",
    iconClass: "fa-brands fa-linkedin-in",
    alt: "LinkedIn",
  },
];

export default function FooterSocial() {
  return (
    <>
      {socialData.map((item) => (
        <a 
          key={item.id} 
          className={item.cls} 
          href={item.href} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <i className={item.iconClass}></i>
        </a>
      ))}
    </>
  );
}