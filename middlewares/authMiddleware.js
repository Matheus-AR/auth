module.exports = async function(req, res, next) {
    return res.status(401).json({msg: "Num vai não!"});
    next();
}