const request=require("supertest");
const app=require("../index");
const shelterRepository=require("../repositories/shelterRepository");
const {BadRequestError,NotfoundError,ServerError}=require("../Error/error");
const {Error} = require("mongoose");

jest.mock("../repositories/shelterRepository");


// GET all shelters tests
describe("get/shelters", () => {
    beforeEach(() => jest.clearAllMocks());

    // Success
    it('should return all shelters', async () => {
        const tempShelters = [
            { id: "65c3af856b5ccbf11de1bc13", location: 'Sakhnin', title: 'Doha', capacity: 11 },
            { id: "65c3af856b5ccbf11de1bc14", location: 'Tel-aviv', title: 'Blomfed-stadium', capacity: 13 }
        ];
        shelterRepository.getallshelters.mockResolvedValue(tempShelters);
        const res = await request(app).get("/shelters/");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(tempShelters);
    });

    // 404Not Found
    it('should return 404 when no shelters are found', async () => {
        shelterRepository.getallshelters.mockResolvedValue([]);
        const res = await request(app).get("/shelters/");
        expect(res.statusCode).toEqual(404);
    });

    // Server Error
    it('should return 500 when an error occurs', async () => {
        shelterRepository.getallshelters.mockRejectedValue(new ServerError("Internal Server Error"));
        const res = await request(app).get("/shelters/");
        expect(res.statusCode).toEqual(500);
    });
});





describe("get/shelters/:id",()=>{
    beforeEach(() => jest.clearAllMocks());

    // Success200
    it("should return a shelter by ID", async () => {
        const TempShelter = { id: "65c3af856b5ccbf11de1bc13", location: 'Sakhnin', title: 'Doha', capacity: 11};
       shelterRepository.getShelterById.mockResolvedValue(TempShelter);
        const id=TempShelter.id;
        console.log(id);
        const res = await request(app).get(`/shelters/${id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(TempShelter);
    });

    // 404Not Found
    it('should return 404 when shelter not found', async () => {
         shelterRepository.getShelterById.mockResolvedValue(null);
         const res = await request(app).get("/shelters/nonexistentID");
         expect(res.statusCode).toEqual(404);
        expect(res.body).toEqual({ message: "shelter with id ${id} not found" });

    });

     // Server Error
     it('should return 500 when an error occurs', async () => {
         shelterRepository.getShelterById.mockRejectedValue(new ServerError("Internal Server Error"));
         const res = await request(app).get("/shelters/errorid");
         expect(res.statusCode).toEqual(500);
         expect(res.body).toEqual({ message: "server Error -couldn't Internal Server Error shelters" });

     });

 });
//
//
//
//  // create shelters tests
describe("POST/shelters/add_shelter",()=>{
    beforeEach(() => jest.clearAllMocks());

    //Success201
    it("create a new shelter", async () => {
        const newShelterData = {location: 'TEL-Aviv', title: 'shenkar', capacity: 399};
        shelterRepository.createShelter.mockResolvedValue({id: "65c3af856b5ccbf11de1bc14", ...newShelterData});
        const res = await request(app).post("/shelters/add_shelter").send(newShelterData);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual(expect.objectContaining(newShelterData));
        expect(res.body).toHaveProperty('id');

    });
    //400BadRequestError
    it("return 400 when the specified", async () => {
        shelterRepository.createShelter.mockResolvedValue(null);
        const res = await request(app).post("/shelters/add_shelter");
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({ message: "please provide location,title,capacity" });
    });

    //500Server Error
    it("return 500 Internal Server Error", async () => {
        shelterRepository.createShelter.mockRejectedValue(new ServerError("Internal Server Error"));
        const res = await request(app).get("/shelters/add_shelter");
        expect(res.statusCode).toEqual(500);
    });

});

// // EDIT shelters tests
describe("PUT/shelters/:id", () => {
    beforeEach(() => jest.clearAllMocks());

    it("update the shelter", async () => {
        const updatedShelterData = { location: 'sakhnin', title: 'street58', capacity: 130 };
        const shelterId = "65c3af856b5ccbf11de1bc13";
        shelterRepository.updateshelter.mockResolvedValue({ id: shelterId, ...updatedShelterData });
        const res = await request(app).put(`/shelters/${shelterId}`).send(updatedShelterData);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ id: shelterId, ...updatedShelterData });
    });


    it("return 400 BadRequestError", async () => {
        const  updatedShelterData = {location: 'sakhnin', title: 'street58', capacity: 130 };
        shelterRepository.updateshelter.mockResolvedValue(updatedShelterData);

        const res = await request(app).put(`/shelters/:id`).send(updatedShelterData);

        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({ message:"please provide provid  correct ID " });
    });

    it("return 500 Internal Server Error", async () => {
        const shelterId = "65c3af856b5ccbf11de1bc13";
        shelterRepository.updateshelter.mockRejectedValue(new Error("Internal server error"));

        const res = await request(app).put(`/shelters/${shelterId}`).send({ location: 'Any Location', title: 'Any Title', capacity: 50 });

        expect(res.statusCode).toEqual(500);
        expect(res.body).toEqual({ message: "Internal server error" });
    });
});



// DELETE shelters tests
describe("DELETE /shelters/:id", () => {
    beforeEach(() => jest.clearAllMocks());


    it('delete a shelter', async () => {
        const id = "65c3af856b5ccbf11de1bc13";
        const deleteShelter = { id: "65c3af856b5ccbf11de1bc13", location: 'Sakhnin', title: 'Doha', capacity: 11 };

        shelterRepository.deleteshelter.mockResolvedValue(deleteShelter);
        const res = await request(app).delete(`/shelters/${id}`);
        expect(res.statusCode).toEqual(204);
    });

    it('should return 400 when shelter not found', async () => {
        const invalidId = "invalidId";
        shelterRepository.deleteshelter.mockRejectedValue(new BadRequestError("Invalid ID format"));
        const res = await request(app).delete(`/shelters/${invalidId}`);
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({ message: "please provide Invalid ID format" });
     });

    // Server Error
     it('should return 500 when an error occurs', async () => {
         shelterRepository.deleteshelter.mockRejectedValue(new ServerError("Internal Server Error"));
         const res = await request(app).delete("/shelters/errorid");
         expect(res.statusCode).toEqual(500);
     });

});



