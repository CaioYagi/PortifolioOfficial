import React, { useState } from "react";

const translations = {
  en: {
    greeting: "Hello!",
    button: "Switch to Portuguese"
  },
  pt: {
    greeting: "Olá!",
    button: "Mudar para Inglês"
  }
};

function LanguageSwitcher() {
  const [lang, setLang] = useState("en");

  const toggleLang = () => {
    setLang(lang === "en" ? "pt" : "en");
  };

  return (
    <div>
      <h1>{translations[lang].greeting}</h1>
      <button onClick={toggleLang}>
        {translations[lang].button}
      </button>
    </div>
  );
}

export default LanguageSwitcher;