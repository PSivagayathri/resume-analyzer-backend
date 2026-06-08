const axios = require("axios");
const FormData = require("form-data");

exports.analyzeResume = async (req, res) => {

  try {

    const formData = new FormData();

    formData.append(
      "file",
      req.file.buffer,
      req.file.originalname
    );

    const response = await axios.post(
      process.env.PYTHON_API,
      formData,
      {
        headers: formData.getHeaders()
      }
    );

    res.json(response.data);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: error.message
    });
  }
};