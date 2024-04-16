const User = require("../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");

// 회원가입
exports.signup = async (req, res, next) => {
  const { email, name, nickname, password, age } = req.body;

  try {
    // 존재여부 확인
    const exUser = await User.findOne({ where: { email } });
    // 같은 이메일 사용자 존재하면 기존 회원 가입 페이지
    if (exUser) {
      const errorMessage = encodeURIComponent("이미 존재하는 회원");
      return res.redirect(`/auth/signup?error=exist&message=${errorMessage}`);
    }
    // 사용자 생성
    const hash = await bcrypt.hash(password, 12);
    const user = await User.create({
      email,
      name,
      nickname,
      password: hash,
      age, // 사용자의 나이도 함께 저장
    });
    return res.redirect("/");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 로그인
exports.login = async (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      const errorMessage = encodeURIComponent("로그인한 상태입니다.");
      return res.redirect(`/?error=${errorMessage}`);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect("/");
    });
  })(req, res, next);
};

// 로그아웃
exports.logout = (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
};
