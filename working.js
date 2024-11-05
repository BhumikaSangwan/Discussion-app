let question = document.querySelector("#question");
let inputQues = document.querySelector("#inputQuestion");
let inputQBody = document.querySelector("#inputQBody");
let qSubmitBtn = document.querySelector("#qSubmit");
let resolveBtn = document.querySelector("#resolveBtn");
let currID = 0
let selectedQuestion = document.querySelector("#selectedQuestion");
let appendResponse = document.querySelector("#appendResponse");
let responseField = document.querySelector("#responseField");

let newQ = document.querySelector("#newQ");
let searchQ = document.querySelector("#searchQ");

let uniqueId = 1;
let questionList = getData() || [];
console.log(questionList);

let questionField = document.querySelector("#questionField");
let ques = document.querySelector(".ques");
let responseSubmit = document.querySelector("#responseSubmit");
let addedResponses = document.querySelector("#addedResponses");

function showQList(questionList) {
    questionField.innerText = '';
    if (questionList.length !== 0) {
        questionList.forEach(item => {
            createQuestion(item.title, item.body, item.id);
            showResponse(item.Name, item.comment);
            uniqueId = item.id;
            uniqueId++;
        });
    }
}
showQList(questionList);

function createQuestion(title, body, qId) {
    let lPaneQ = document.createElement('div');
    lPaneQ.setAttribute('class', "questionBox");
    let sub = document.createElement('div');
    sub.innerText = title;
    sub.setAttribute('class', 'sub');
    let qbody = document.createElement('div');
    qbody.innerText = body;
    qbody.setAttribute('class', 'qbody');
    lPaneQ.append(sub, qbody);
    lPaneQ.setAttribute('id', qId);
    questionField.append(lPaneQ);
}

questionField.addEventListener('click', (e) => {
    const ele = e.target.parentNode
    console.log(ele);
    let id = ele.getAttribute("id");
    const arr = getData();
    let index = arr.findIndex(element => element.id == id)
    console.log(arr[index]);
    if (index != -1) {

        let tit = arr[index].title;
        let bdy = arr[index].body;
        let id = arr[index].id;
        showQuestion(tit, bdy, id);
    }
    //console.log(arr[index].Name, arr[index].comment);
    showResponse(arr[index].Name, arr[index].comment);
});

qSubmitBtn.addEventListener('click', () => {
    if (inputQues.value.trim() && inputQBody.value.trim()) {
        let qObj = {
            title: inputQues.value,
            body: inputQBody.value,
            id: uniqueId,
            Name : [],
            comment : []
        };
        createQuestion(inputQues.value, inputQBody.value, uniqueId);
        questionList.push(qObj);
        //console.log(questionList);
        setData(questionList);

        inputQues.value = '';
        inputQBody.value = '';
        uniqueId++;
    }
    selectedQuestion.style.display = "none";
    responseField.style.display = "none";
    appendResponse.style.display = "none";
    question.style.display = "block";
})

newQ.addEventListener('click', () => {
    selectedQuestion.style.display = "none";
    responseField.style.display = "none";
    appendResponse.style.display = "none";
    question.style.display = "block";
    inputQues.value = "";
    inputQBody.value = "";
    showQList(questionList);
})

searchQ.addEventListener('keypress',()=>{
    questionList = getData();
    let arr = [];
    for(q of questionList){
        //if(searchQ.value == q.title)
       // if ( q.title.indexOf( searchQ.value ) > -1 ) {
        if(q.title.includes(searchQ.value)){
        //if(searchQ.value.match(q.title)){
            console.log(q.title);
            arr.push(q);
            console.log("equal..");
            // String B contains String A
            showQList(arr);
          }
    }
    console.log(arr);
})

function showQuestion(sub, qbody, qid) {
    currID = qid
    console.log(sub, qbody);
    //ques.setAttribute('id', qid);
    document.querySelector("#selectedQuestionSubject").innerText = sub;
    document.querySelector("#selectedQuestionBody").innerText = qbody;
    document.querySelector("#responserName").value = '';
    document.querySelector("#comment").value = '';
    question.style.display = "none";
    selectedQuestion.style.display = "block";
    responseField.style.display = "block";
    appendResponse.style.display = "block";
}

responseSubmit.addEventListener('click',()=>{addResponse(currID)});
resolveBtn.addEventListener('click', () => { resolve(currID) });

function resolve(qid) {
    questionList = questionList.filter(q => q.id != qid);
    setData(questionList);
    questionField.innerHTML = "";
    showQList(questionList);
    selectedQuestion.style.display = "block";
    responseField.style.display = "block";
    appendResponse.style.display = "block";
    question.style.display = "none";
    ques.innerText = '';
}

function addResponse(qid){
    let responserName = document.querySelector("#responserName");
    let Comment = document.querySelector("#comment");
    if(responserName.value.trim() !== '' && Comment.value.trim() !== ''){
        questionList = getData();
        const index = questionList.findIndex(e => e.id == qid);
        if(index != -1){
           questionList[index].Name.push(responserName.value);
           questionList[index].comment.push(Comment.value);
            setData(questionList);
            responserName.value = '';
            Comment.value = '';
            showResponse(questionList[index].Name, questionList[index].comment);
            console.log(questionList[index].Name, questionList[index].comment);
        }
    }
}

function showResponse(Name, comment){
    //console.log(Name, comment);
    //console.log(Name.length);
    addedResponses.innerText = '';
    let i = 0;
    while(i < Name.length){
        let div = document.createElement('div');
        div.style.borderBottom = 'none';
        div.style.borderRight = "none";
        div.style.borderTop = "2px solid gainsboro";
        if(i == 0){
            div.style.borderTop = "none";
        }
         div.setAttribute('class','questionBox');
         let rName = document.createElement('div');
         rName.setAttribute('class','sub');
         rName.innerText = Name[i];
         let rComment = document.createElement('div');
         rComment.setAttribute('class','qbody');
         rComment.innerText = comment[i];
         div.append(rName, rComment);
         addedResponses.append(div);
         i++;
    }
}

function setData(qList) {
    localStorage.setItem("qList", JSON.stringify(qList));
}

function getData() {
    return JSON.parse(localStorage.getItem("qList"));
}