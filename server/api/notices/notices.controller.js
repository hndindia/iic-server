const {
  uploadFileInDrive,
  deleteFileInDrive,
  generatePublicUrlInDrive
} = require("../../services/google-drive-service");
const Notice = require("./notices.schema");

exports.createNotice = async (req, res) => {
  try {
    const { originalname, mimetype, path } = req.file;

    const gd_upload_res = await uploadFileInDrive(originalname, mimetype, path);

    const { id, name, mimeType } = gd_upload_res;

    const { webViewLink } = await generatePublicUrlInDrive(id);

    const { semester, branch } = req.body;

    const noticeData = {
      semester,
      branch,
      notice_drive_id: id,
      notice_drive_name: name,
      notice_drive_mimeType: mimeType,
      notice_drive_view_link: webViewLink
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

    const googleDriveRes = await deleteFileInDrive(notice.notice_drive_id);

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

    const notice = await Notice.find({ branch: req.query.branch_id });
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
