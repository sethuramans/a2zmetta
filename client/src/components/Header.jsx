import React  from "react";

const Header = (props) => {
  const { title } = props;
  return (
    <section id="hero" className="hero section dark-background">
      <h2 className="text-center mb-4 text-white title">{title}</h2>
    </section>
  );
};

export default Header;
