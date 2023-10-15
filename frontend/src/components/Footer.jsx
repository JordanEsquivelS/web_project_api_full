import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  const symbol = String.fromCharCode(169);

  return (
    <footer className="footer">
      <p className="footer__copyright">
        {` ${symbol} ${year} Jordan Esquivel Silva `}
      </p>
    </footer>
  );
};

export default Footer;
