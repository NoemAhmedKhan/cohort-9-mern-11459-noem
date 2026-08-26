jest.mock("jsonwebtoken");
jest.mock("../../utils/logger", () => ({
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn()
}));
jest.mock("../../config/env", () => ({ JWT_SECRET: "test_secret" }));

const jwt = require("jsonwebtoken");
const { generateJWT, verifyJWT } = require("../../security/jwt");

describe("generateJWT", () => {
    it("signs a token using only the safe user fields (id, fullName, email)", async () => {
        jwt.sign.mockReturnValue("signed.token.value");
        const user = {
            _id: "user123",
            fullName: "John Doe",
            email: "john@gmail.com",
            password: "should-never-be-in-the-payload"
        };

        const token = await generateJWT(user);

        expect(jwt.sign).toHaveBeenCalledWith(
            { id: "user123", fullName: "John Doe", email: "john@gmail.com" },
            "test_secret",
            { expiresIn: "12h" }
        );
        expect(token).toBe("signed.token.value");
    });
});

describe("verifyJWT", () => {
    it("returns the decoded payload for a valid token", async () => {
        jwt.verify.mockReturnValue({ id: "user123" });

        const result = await verifyJWT("valid.token");

        expect(result).toEqual({ id: "user123" });
    });

    it("returns undefined (does not throw) for an invalid or expired token", async () => {
        jwt.verify.mockImplementation(() => {
            throw new Error("jwt expired");
        });

        const result = await verifyJWT("bad.token");

        expect(result).toBeUndefined();
    });
});