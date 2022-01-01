const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

const { login   } = require("./routes/register/login.js")
const { signUp  } = require("./routes/register/signUp.js")

// post 형식으로 보내려면 꼭 필요한 parse 과정
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    console.log("hihi")
    res.json({
        success: true,
    });
});

app.post('/login', login)
app.post('/signUp', signUp)

app.listen(port, () => {
    console.log(`server is listening at ${port}`);
});



/* 
1. 라즈베리 혹은 젯슨나노에서 신호를 수신하는 클래스
1.1 긴급신호
1.2 센서값
1.3 

2. 알람 만드는 클래스
3. 사용자 , 보호자 db 구성

사용자 
- 사용자 이름, 사용자 주소, 사용자 번호
보호자
- 보호자 이름, 보호자 주소, 사용자 이름+주소 (key)

4. 

*/



