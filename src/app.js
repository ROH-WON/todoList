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
const userRouter = require("./routers/userRouter");
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

app.use("/api", todoRouter);
app.use("/", userRouter);

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

// const express = require("express");
// const path = require("path");
// const cookieParser = require("cookie-parser");
// const morgan = require("morgan");
// const session = require("express-session");
// const dotenv = require("dotenv");
// const { sequelize } = require("./models");
// const bodyParser = require("body-parser");
// const todoRouter = require("./routers/todoRouter");
// // const passport = require("./passport");

// dotenv.config();

// // Passport 설정
// // require("./passport")(passport);

// const app = express();

// app.set("port", process.env.PORT || 3001);

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// // 뷰 엔진 설정
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");

// // 정적 파일 서비스 결정
// app.use(express.static(path.join(__dirname, "public")));

// // 로깅 미들웨어 설정
// app.use(morgan("dev"));

// // 요청 바디 파서 설정
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// // 쿠키 파서 설정
// app.use(cookieParser(process.env.COOKIE_SECRET));

// // 새로운 라우터 사용
// app.use("/api", todoRouter);

// // 세션 미들웨어 설정
// app.use(
//   session({
//     resave: false,
//     saveUninitialized: false,
//     secret: process.env.COOKIE_SECRET,
//     cookie: {
//       httpOnly: true,
//       secure: false,
//     },
//   })
// );

// // Passport 미들웨어 설정
// // app.use(passport.initialize());
// // app.use(passport.session());

// // 404 핸들러
// app.use((req, res, next) => {
//   const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
//   console.log = error;
//   error.status = 404;
//   next(error);
// });

// // 에러 핸들러
// app.use((err, req, res, next) => {
//   console.error(err);
//   res.locals.message = err.message;
//   res.locals.error = process.env.NODE_ENV === "development" ? err : {};
//   res.status(err.status || 500);
//   res.render("error");
// });

// // 서버 시작
// sequelize
//   .sync({ force: false })
//   .then(() => {
//     app.listen(process.env.PORT || 8002, () => {
//       console.log("서버가 정상적으로 실행됐습니다.");
//     });
//   })
//   .catch((err) => {
//     console.error("데이터베이스 연결에 실패했습니다.", err);
//   });

// // app.listen(app.get('port'), () => {
// //   console.log(app.get('port'), '번 포트에서 대기중')
// // })
// module.exports = app;
