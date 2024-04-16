const express = require("express");
const passport = require("passport");

const { isLoggedIn, isNotLoggedIn } = require("../middlewares");
const { signup, login, logout } = require("../controllers/authController");

const authRouter = express.Router();

// 회원가입
authRouter.post("/signup", isNotLoggedIn, signup);

// 로그인
authRouter.get("/login", isNotLoggedIn, login);

// 로그아웃
authRouter.get("/logout", isLoggedIn, logout);

module.exports = authRouter;
