const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// 회원가입
router.post("/signup", userController.signup);

// 로그인
router.post("/login", userController.login);

// 회원 조회
router.get("/find", userController.find);

// 정보 수정
router.put("/update", userController.update);

// 로그아웃
router.get("/logout", userController.logout);

module.exports = router;
