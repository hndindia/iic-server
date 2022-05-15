const { config } = require("../config");
const { google } = require("googleapis");
const fs = require("fs");

const oauth2Client = new google.auth.OAuth2(
  config.oauth.client_id,
  config.oauth.client_secret,
  config.oauth.redirect_uri
);

oauth2Client.setCredentials({ refresh_token: config.oauth.refresh_token });

const drive = google.drive({
  version: "v3",
  auth: oauth2Client
});

module.exports.uploadFileInDrive = async (name, mimeType, path) => {
  const response = await drive.files.create({
    requestBody: {
      name,
      mimeType
    },
    media: {
      mimeType,
      body: fs.createReadStream(path)
    }
  });

  console.log(response.data);
  return response.data;
};

module.exports.deleteFileInDrive = async (fileId) => {
  const response = await drive.files.delete({
    fileId
  });

  return response.status;
};

module.exports.generatePublicUrlInDrive = async (fileId) => {
  await drive.permissions.create({
    fileId: fileId,
    requestBody: {
      role: "reader",
      type: "anyone"
    }
  });

  const result = await drive.files.get({
    fileId: fileId,
    fields: "webViewLink, webContentLink, thumbnailLink"
  });

  console.log("GD RES - ", result.data);

  return result.data;
};
