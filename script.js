const generateBtn = document.getElementById("generateBtn");
const userInput = document.getElementById("userInput");
const aiResponse = document.getElementById("aiResponse");

const API_KEY = "AIzaSyDeRl5J_Z1W-soJkJ0mYDCxbzuJaWRuNws";

generateBtn.addEventListener("click", async () => {

  const prompt = userInput.value;

  if(prompt.trim() === ""){
    aiResponse.innerHTML = "Please enter a prompt.";
    return;
  }

  aiResponse.innerHTML = "Generating response...";

  try {

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    console.log(data);

    if (
      data.candidates &&
      data.candidates.length > 0
    ) {

      const reply =
        data.candidates[0].content.parts[0].text;

      aiResponse.innerHTML = reply;

    } 
    
    else {

      aiResponse.innerHTML =
        "No response generated.";

    }

  } 
  
  catch (error) {

    console.log(error);

    aiResponse.innerHTML =
      "Something went wrong.";

  }

});