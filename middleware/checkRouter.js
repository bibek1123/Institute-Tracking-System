const checkRouter = async (req, res, next) => {

  try {
    const instructor = req.instructorId
    if (req.method !== "GET") {
      if (req.method === "POST") {
        req.body.createdBy = instructor || {};
        req.body.createdAt = new Date()
      } else if (req.method === "PUT") {
        const softDelete = req.originalUrl.search("soft-delete");
        if (softDelete !== -1) {
          req.body.deletedBy = instructor || {};
          req.body.deletedAt = new Date()
        } else {
          req.body.updatedBy = instructor || {};
          req.body.updatedAt = new Date()
        }
      }
    }

    req.body.updatedBy = instructor || {};
    req.body.updatedAt = new Date()

    next()
  } catch (err) {
    throw new Error(err)
  }


}

module.exports = checkRouter