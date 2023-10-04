
exports.handleCustomErrors = (err, req, res, next) => {
	if (err.status && err.msg) {
		res.status(err.status).send({ msg: err.msg });
	} else {
		next(err);
	}
};
exports.handlePsqlErrors = (err, req, res, next) => {
    if(err.code === "22P02" || err.code === "23502"){
        res.status(400).send({ msg: 'Bad request' })
    }
    if(err.code === "23502"){
        res.status()
    }
    else{
        next(err);
    }
};
exports.handle500Errors = (err,req,res,next) => {
    console.log(err, "Unhandled error");
    res.status(500).send({ msg: "Internal server error"})
};