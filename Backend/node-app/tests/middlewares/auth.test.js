jest.mock("../../security/jwt");
jest.mock("../../utils/logger", () => ({
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn()
}));

const { verifyJWT } = require("../../security/jwt");
const { validateForm, validateNote, authenticateUser } = require("../../middlewares/auth");

const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe("validateForm", () => {
    const validPassword = "Passw0rd!";

    it("calls next() when email and password meet all the rules", () => {
        const req = { body: { email: "user@gmail.com", password: validPassword } };
        const res = mockRes();
        const next = jest.fn();

        validateForm(req, res, next);

        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
    });

    it("rejects an email that is not a @gmail.com address", () => {
        const req = { body: { email: "user@yahoo.com", password: validPassword } };
        const res = mockRes();
        const next = jest.fn();

        validateForm(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(next).not.toHaveBeenCalled();
    });

    it("rejects a password missing an uppercase letter", () => {
        const req = { body: { email: "user@gmail.com", password: "passw0rd!" } };
        const res = mockRes();
        const next = jest.fn();

        validateForm(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(next).not.toHaveBeenCalled();
    });

    it("rejects a password that is too short", () => {
        const req = { body: { email: "user@gmail.com", password: "Aa1!" } };
        const res = mockRes();
        const next = jest.fn();

        validateForm(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    it("rejects when email or password is not a string (e.g. missing from body)", () => {
        const req = { body: { email: undefined, password: undefined } };
        const res = mockRes();
        const next = jest.fn();

        validateForm(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(next).not.toHaveBeenCalled();
    });
});

describe("validateNote", () => {
    const validContent = { type: "doc", content: [{ type: "paragraph" }] };

    it("calls next() and attaches req.title/req.content for a valid note", () => {
        const req = { body: { title: "My note", content: validContent } };
        const res = mockRes();
        const next = jest.fn();

        validateNote(req, res, next);

        expect(next).toHaveBeenCalled();
        expect(req.title).toBe("My note");
        expect(req.content).toBe(validContent);
    });

    it("rejects a missing/empty title", () => {
        const req = { body: { title: "   ", content: validContent } };
        const res = mockRes();
        const next = jest.fn();

        validateNote(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Title is required!" });
    });

    it("rejects a title longer than 100 characters", () => {
        const req = { body: { title: "a".repeat(101), content: validContent } };
        const res = mockRes();
        const next = jest.fn();

        validateNote(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Title should be less than 100 characters!" });
    });

    it("rejects content that is not an object (e.g. a string)", () => {
        const req = { body: { title: "My note", content: "not an object" } };
        const res = mockRes();
        const next = jest.fn();

        validateNote(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Invalid content format!" });
    });

    it("rejects content whose type is not 'doc'", () => {
        const req = { body: { title: "My note", content: { type: "paragraph", content: [] } } };
        const res = mockRes();
        const next = jest.fn();

        validateNote(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Invalid Tiptap document!" });
    });

    it("rejects an empty content.content array", () => {
        const req = { body: { title: "My note", content: { type: "doc", content: [] } } };
        const res = mockRes();
        const next = jest.fn();

        validateNote(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Content should not be empty!" });
    });
});

describe("authenticateUser", () => {
    it("returns 401 when there is no token cookie", async () => {
        const req = { cookies: {}, method: "GET", originalUrl: "/notes/1/view" };
        const res = mockRes();
        const next = jest.fn();

        await authenticateUser(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(next).not.toHaveBeenCalled();
    });

    it("returns 401 when the token is invalid or expired", async () => {
        verifyJWT.mockResolvedValue(undefined);
        const req = { cookies: { token: "bad.token" }, method: "GET", originalUrl: "/notes/1/view" };
        const res = mockRes();
        const next = jest.fn();

        await authenticateUser(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(next).not.toHaveBeenCalled();
    });

    it("attaches req.user and calls next() for a valid token", async () => {
        verifyJWT.mockResolvedValue({ id: "user123", fullName: "John Doe", email: "john@gmail.com" });
        const req = { cookies: { token: "good.token" }, method: "GET", originalUrl: "/notes/1/view" };
        const res = mockRes();
        const next = jest.fn();

        await authenticateUser(req, res, next);

        expect(req.user).toEqual({ id: "user123", fullName: "John Doe", email: "john@gmail.com" });
        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
    });
});