var gitakFamily = [
    { name : '김기택', description : '전원백수 가족의 가장, 생활고 속에서도 가족애가 돈독하다'},
    { name : '충숙', description : '기택의 아내, 과거 해머 던지기 선수였으며 힘이 세다'},
    { name : '김기우', description : '기택네 아들. 백수로 지내다 박사장네에 영어 과외선생이 된다'},
    { name : '김기정', description : '기택네 딸. 다송의 미술 과외 선생님'},
]

var dongikFamily = [
    { name : '박동익', description : '글로벌 IT 기억의 젊은 CEO 근사한 언덕 위의 집에 사는 부유층 가족의 가장'},
    { name : '연교', description : '박 사장의 아내. 사춘기 달과 어린 아들의 교육에 전적으로 매달리는 심플한 성격이다'},
    { name : '박다혜', description : '사춘기 고2 딸. 김기우에게 영어과외를 받게 된다'},
    { name : '박다송', description : '인디언 놀이에 푹 빠져 있는 엉뚱하고 산만한 10살 아들. 초등학교 1학년 때 집에서 귀신을 본 트라우마가 있다'},
]

function getGitakFamily(){
    for(var i = 1; i < 5; i++){
        var section = document.getElementById(i);
        console.log(section);
        section.innerHTML = `hello ${i}`;
    }
}

getGitakFamily();