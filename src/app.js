const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const session = require("express-session");
const dotenv = require("dotenv");
const { sequelize } = require("./models");
const bodyParser = require("body-parser");
const passport = require("passport");
const todoRouter = require("./routers/todoRouter");
const authRouter = require("./routers/authRouter");
const pageRouter = require("./routers/page");
dotenv.config();

const passportConfig = require("./passport");

const app = express();
passportConfig();
app.set("port", process.env.PORT || 3001);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser(process.env.COOKIE_SECRET));

// // 세션 미들웨어 설정
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", todoRouter);
app.use("/auth", authRouter);
app.use("/", pageRouter);

// 404 핸들러
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  console.log = error;
  error.status = 404;
  next(error);
});

// 에러 핸들러
app.use((err, req, res, next) => {
  console.error(err);
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

// 서버 시작
sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(process.env.PORT || 8002, () => {
      console.log("서버가 정상적으로 실행됐습니다.");
    });
  })
  .catch((err) => {
    console.error("데이터베이스 연결에 실패했습니다.", err);
  });

module.exports = app;
