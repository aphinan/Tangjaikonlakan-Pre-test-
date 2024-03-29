const axios = require("axios");
const apiUrl =
  "http://tangjaikonlakan.dyndns.org:8080/demo/isapi.dll/datasnap/rest/v1";
axios.defaults.headers.common["api-key"] = "gihuFSYfpM8d3240k2ZS7J4z236g84";

exports.read = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await axios.get(apiUrl + "/devicelist/");
    const producted = response.data.find((item) => item.device_id === id);

    if (producted) {
      res.send(producted);
    } else {
      res.status(404).json({ message: "Record not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.list = async (req, res) => {
  try {
    const response = await axios.get(apiUrl + "/devicelist");
    res.send(response.data);
  } catch (error) {
    res.status(500).json({ message: "Failed to list records" });
  }
};

exports.create = async (req, res) => {
  try {
    const response = await axios.post(apiUrl + "/Device", req.body);
    res.send(response.data);
  } catch (error) {
    res.status(500).json({ message: "Failed to create record" });
  }
};

exports.update = async (req, res) => {
  try {
    const response = await axios.put(apiUrl + "/UpdateDevice", req.body, {
      new: true,
    });
    res.send(response.data);
  } catch (error) {
    res.status(500).json({ message: "Failed to update records" });
  }
};

exports.remove = async (req, res) => {
  try {
    const response = await axios.put(apiUrl + "/DeleteDevice", req.body);
    res.send(response.data);
  } catch (error) {
    res.status(500).json({ message: "Failed to Delete records" });
  }
};

