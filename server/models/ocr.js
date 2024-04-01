const tesseract = require("node-tesseract-ocr")


const config = {
  lang: "eng",
  oem: 1,
  psm: 3,
}

tesseract
  .recognize("./pic.jpg", config)
  .then((text) => {
    console.log("Result:", text)
  })
  .catch((error) => {
    console.log(error.message)
  })
