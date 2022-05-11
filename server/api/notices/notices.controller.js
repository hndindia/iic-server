const {
  uploadFileInDrive,
  deleteFileInDrive,
  generatePublicUrlInDrive
} = require("../../services/google-drive-service");
const Notice = require("./notices.schema");

exports.createNotice = async (req, res) => {
  try {
    const { mimetype, path } = req.file;
    const { file_name, semester, branch } = req.body;

    const gd_upload_res = await uploadFileInDrive(file_name, mimetype, path);

    const { id, mimeType } = gd_upload_res;

    const { webViewLink, thumbnailLink } = await generatePublicUrlInDrive(id);

    const noticeData = {
      semester,
      branch,
      drive_id: id,
      file_name,
      mime_type: mimeType,
      view_link: webViewLink,
      thumbnail_link: thumbnailLink
    };

    const notice = await Notice.create(noticeData);

    res.status(200).json({
      success: true,
      notice
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error
    });
  }
};

exports.deleteNoticeById = async (req, res) => {
  try {
    const notice = await Notice.findOne({ _id: req.params.noticeId });

    if (!notice) {
      return res.status(404).json({
        success: false,
        error: "Notice not found"
      });
    }

    const googleDriveRes = await deleteFileInDrive(notice.drive_id);

    const { deletedCount } = await Notice.deleteOne({ _id: req.params.noticeId });

    res.status(200).json({
      success: true,
      deletedCount,
      googleDriveRes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.getNotice = async (req, res) => {
  try {
    //?branch_id="ID"
    //TODO sort with sem and branch

    const notice = await Notice.find({ branch: req.query.branch_id })
      .sort({ createdAt: -1 })
      .populate("semester", "_id value")
      .populate("branch", "_id name");

    if (!notice) {
      return res.status(404).json({
        success: false,
        error: "Notice not found"
      });
    }

    res.status(200).json({
      success: true,
      data_length: notice.length,
      data: notice
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
