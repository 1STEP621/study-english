window.addEventListener("load", () => {
  //要素取得
  const wrapper = document.getElementsByClassName("wrapper")[0];

  if (location.search === "") {
    //HTML用意
    const inputSceneHTML = '<p>英単語と日本語のペアを入力してください。その中からランダムに選んで出題します。</p><textarea id="english" placeholder="英語(半角スペース)日本語&#10;英語(半角スペース)日本語&#10;︙"></textarea><a class="block-link button finish-input">入力をおわる</a>';
  
    //HTMLその1適用
    wrapper.insertAdjacentHTML("afterbegin", inputSceneHTML);
  
    //要素取得
    const finishInputBtn = document.getElementsByClassName("finish-input")[0];
    const inputArea = document.getElementById("english");
  
    //入力をおわるボタンがクリックされたら
    finishInputBtn.addEventListener("click", () => {
      history.pushState(null, "", "https://1step621.github.io/study-english/?input=" + inputArea.value.replace("\n", "{{br}}"));
      setQuestion(inputArea.value.split("\n").sort());
    });
  } else {
    setQuestion(decodeURI(location.search).split("=")[1].split("{{br}}").sort());
  }

  function setQuestion(wordList) {
    //HTMLその2を適用
    const answerSceneHTML = '<div id="question-wrapper"><p id="question"></p><div class="answer-input"><select name="answer-list" id="answer-list"><option value="選択してください">選択してください</option></select><a class="block-link button answer">解答</a></div></div>'
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
        questionWrapper.innerHTML = '<p>正解！</p><img src="correct.svg" alt="正解" width="150" height="150" class="check-answer"><a class="block-link button next">次へ</a>';
      } else {
        questionWrapper.innerHTML = '<p>間違い...</p><img src="incorrect.svg" alt="不正解" width="150" height="150" class="check-answer"><a class="block-link button next">次へ</a>';
      }
      const nextBtn = document.getElementsByClassName("next")[0];
      nextBtn.addEventListener("click", () => {
        setQuestion(wordList);
      });
    });
  }
});
