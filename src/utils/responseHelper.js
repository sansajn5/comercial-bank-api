module.exports.malformedRequest = (field, req, res, next) => {
    return res.status(400).json({
      error: `Malformed request, ${field} is missing`
    })
}
  