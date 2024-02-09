class ServerError extends  Error{
     constructor(action) {
         super(`server Error -couldn't ${action} shelters`);
         this.name="ServerError";
         this.status=500;
     }
}

class NotfoundError extends  Error{
    constructor(entity) {
        super(`${entity} not found`);
        this.name="NotFoundError";
        this.status=404;
    }
}

class BadRequestError extends  Error{
    constructor(element) {
        super(`please provide ${element}`);
        this.name="BadRequestError";
        this.status=400;
    }
}

module.exports = {
    ServerError,
    NotfoundError,
    BadRequestError,
};