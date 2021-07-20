const formidable = require("formidable");
const { setDict } = require("../service/dictionary");

const dictionaryUpdateRoutes = function ({ app, getGlobalStat }) {
  app.get("/dictionary/upload", (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(
      `<html><form action="dictionary/upload" method="post" 
      enctype="multipart/form-data">
        <input type="file" name="filetoupload"><br>
        <input type="submit">
      </form></html>`
    );
    return res.end();
  });

  app.post("/dictionary/upload", (req, res) => {
    console.log("fileupload fileupload fileupload fileupload");
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      setDict(files.filetoupload.path);
      res.write("File uploaded");
      res.end();
    });
  });
};

module.exports = { dictionaryUpdateRoutes };
