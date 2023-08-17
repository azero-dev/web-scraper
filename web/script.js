document.getElementById("submitButton").addEventListener("click", async () => {
  try {
    const selectedOption = document.querySelector('input[name="option"]:checked')
    const url = document.getElementById("urlInput").value
    const responseEle = document.getElementById('response')

    if (!selectedOption || !url) {
      alert("Please select an option and enter an URL.")
      return;
    }

    responseEle.innerHTML = 'Loading...'
    const optionValue = selectedOption.value

    const response = await fetch(`http://localhost:8080/?url=${url}&option=${optionValue}`)

    if (response.ok) {
      if (optionValue === 'screenshot') {
        const responseData = await response.blob()
        const imgURL = URL.createObjectURL(responseData)
        const imgElement = document.createElement('img')
        imgElement.src = imgURL
        responseEle.innerHTML = ''
        responseEle.appendChild(imgElement)
      } else if (optionValue === 'links') {
        const data = await response.json()
        const links = data.links
        const linksList = links.map(link => `<p><a href="${link}">${link}</a></p>`).join('')
        responseEle.innerHTML = linksList
      }
    } else {
      responseEle.innerHTML = 'It seems that something went wrong in the server.'
      console.error("Error in the API:", response.statusText)
    }
  } catch (error) {
    responseEle.innerHTML = 'It seems that something went wrong. Check the console.'
    console.error("Error:", error)
  }
})
