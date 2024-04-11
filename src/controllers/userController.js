const User = require("../models/user");
const bcrypt = require("bcrypt");
const SAVEID = "saveId"; //상수값으로 만들어서 저장
//회원가입
exports.signup = async (req, res) => {
  const { email, name, nickname, password, age } = req.body;

  try {
    //존재여부 확인
    const find = await User.findOne({ where: { email } });

    if (find) {
      return res.redirect("/signup?error=exist"); //json({ success: false, message: "이미 존재하는 회원" });
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
    // res.json({ success: true });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  // req.body
  const { email, password, save } = req.body;
  try {
    //검색 findOne
    const result = await User.findOne({ where: { email, password } });

    if (result) {
      req.session.User = result; //로그인한 사람에 대해 저장함
      if (save === "save") {
        res.cookie(SAVEID, result.id, { maxAge: 100000, httpOnly: true });
      } else {
        res.clearCookie(SAVEID);
      }
      res.json({ success: true, result });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error("Error logging in: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
//회원조회
exports.find = async (req, res) => {
  try {
    console.log(req.session.User);
    const { id } = req.session.User;

    const result = await User.findByPk(id, {
      attributes: ["email", "password"],
    });
    console.log("result", result);
    res.json({ success: true, result });
  } catch (error) {
    console.error("Error finding user: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
//정보수정
exports.update = async (req, res) => {
  const { password, name, age, nickname } = req.body;
  const { id } = req.session.User; //이때 id는 프론트가 아니라 백엔드에서 가져옴
  const result = await User.update({ password: password }, { where: { id } });
  console.log("update", result);
  const result2 = await Profile.update(
    { name, age, nickname },
    { where: { userId: id } }
  );
  res.json({ success: true });
};
//로그아웃
exports.logout = (req, res) => {
  if (req.session.member) {
    //세션제거
    req.session.destroy(() => {
      res.clearCookie(SAVEID);
      res.json({ success: true });
    });
  } else {
    res.json({ success: false, message: "로그인 상태가 아닙니다." });
  }
};
//쿠키 보내기
exports.getCookie = (req, res) => {
  if (req.cookies[SAVEID]) {
    res.json({ isLoggedIn: true });
  } else {
    res.json({ isLoggedIn: false });
  }
};
