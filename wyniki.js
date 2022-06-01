new URLSearchParams(window.location.search).forEach((value, name) => {
    console.log(`${name}: ${value}`)
    console.log(document.createElement("br"))
})