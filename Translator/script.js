document.addEventListener("DOMContentLoaded", function() {
    const inputText = document.getElementById("inputText");
    const targetLanguage = document.getElementById("targetLanguage");
    const translateButton = document.getElementById("translateButton");
    const outputText = document.getElementById("outputText");
  
    translateButton.addEventListener("click", function() {
      const textToTranslate = inputText.value;
      const languageCode = targetLanguage.value;
  
      if (textToTranslate.trim() === "") {
        outputText.textContent = "Ingrese un texto para traducir.";
        return;
      }
  
      fetchTranslation(textToTranslate, languageCode)
        .then(translation => {
          outputText.textContent = translation;
        })
        .catch(error => {
          console.error(error);
          outputText.textContent = "Ocurrió un error al traducir.";
        });
    });
  
    async function fetchTranslation(text, language) {
      const response = await fetch(
            `https://translation.googleapis.com/language/translate/v2?key=YOUR_API_KEY&q=${encodeURIComponent(
            text
            )}&target=${language}`
      );
      const data = await response.json();
      return data.data.translations[0].translatedText;
    }
  });
  