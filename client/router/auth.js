import express from 'express';

const router = express.Router();

// 로그인
router.get('/login', (req,res)=>{
    res.render("./auth/login.ejs");
});

// 약관
router.get('/terms', (req,res)=>{
    res.render("./auth/terms.ejs");
});

// 회원가입
router.get('/signUp', (req,res)=>{
    res.render("./auth/signUp.ejs");
});

// 아이디찾기
router.get('/findId', (req,res)=>{
    res.render("./auth/findId.ejs");
});

// 비밀번호 찾기
router.get('/findPW', (req,res)=>{
    res.render("./auth/findPW.ejs");
});

export default router;