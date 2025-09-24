import express from "express";
import { generateToken, verifyToken } from "../../helper/token.helper"
const router = express.Router();

// Test route
router.get("/test", async (req,res) => {
    const token = generateToken({
        id: "12345",
        email: "test@gmail.com",
        roles: "user"
    });
    const user = verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1IiwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsInJvbGVzIjoidXNlciIsImlhdCI6MTc1ODYwNDY5MywiZXhwIjoxNzU5MjA5NDkzfQ.L3CJm8bGHJZllmUcarScxUdVsikegFyrIsCiqrZdM54');
    res.json({ message: "Test create token!", user});
})
export default router;