window.addEventListener("load", () => {
  //要素取得
  const wrapper = document.getElementsByClassName("wrapper")[0];

  if (location.search === "") {
    //HTML用意
    const inputSceneHTML = '<textarea id="english" placeholder="改行で区切ってください。"></textarea><a class="block-link button finish-input">入力をおわる</a>';
  
    //HTMLその1適用
    wrapper.insertAdjacentHTML("afterbegin", inputSceneHTML);
  
    //要素取得
    const finishInputBtn = document.getElementsByClassName("finish-input")[0];
    const inputArea = document.getElementById("english");
  
    //入力をおわるボタンがクリックされたら
    finishInputBtn.addEventListener("click", () => {
      setQuestion(inputArea.value.split("\n"));
    });
  } else {
    setQuestion(decodeURI(location.search).split("=")[1].split("{{br}}"));
  }

  function setQuestion(wordList) {
    //HTMLその2を適用
    const answerSceneHTML = '<div id="question-wrapper"><p id="question"></p><div><select name="answer-list" id="answer-list"><option value=""></option></select><a class="block-link button answer">解答</a></div></div>'
    wrapper.innerHTML = answerSceneHTML;
    //要素取得
    const questionWrapper = document.getElementById("question-wrapper");
    const question = document.getElementById("question");
    const answerList = document.getElementById("answer-list");
    const answerBtn = document.getElementsByClassName("answer")[0];

    //単語をランダムに選ぶ
    const word = wordList[Math.floor(Math.random() * wordList.length)].split(" ");
    //日本語部分と英語部分を取り出す
    const japanese = word.slice(-1).join(" ");
    const english = word.slice(0, -1).join(" ");
    //画面上に反映
    question.innerText = japanese;
    wordList.forEach(word => {
      const option = word.split(" ").slice(0, -1).join(" ");

      const optionElem = document.createElement("option");
      optionElem.value = option;
      optionElem.innerText = option;
      answerList.appendChild(optionElem);
    });

    answerBtn.addEventListener("click", () => {
      if (answerList.value === english) {
        questionWrapper.innerHTML = '<p>正解！</p><a class="block-link button next">次へ</a>';
      } else {
        questionWrapper.innerHTML = '<p>間違い...</p><a class="block-link button next">次へ</a>';
      }
      const nextBtn = document.getElementsByClassName("next")[0];
      nextBtn.addEventListener("click", () => {
        setQuestion(wordList);
      });
    });
  }
});