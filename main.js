window.addEventListener("load", () => {
  //要素取得
  const wrapper = document.getElementsByClassName("wrapper")[0];

  //クエリパラメータの有無で条件分岐
  if (location.search === "") {
    //HTMLその1適用
    const inputSceneHTML = '<p>英単語と日本語のペアを入力してください。その中からランダムに選んで出題します。</p><textarea id="english" placeholder="英語(半角スペース)日本語&#10;英語(半角スペース)日本語&#10;︙"></textarea><a class="block-link button finish-input">入力をおわる</a>';
    wrapper.innerHTML = inputSceneHTML;

    //要素取得
    const finishInputBtn = document.getElementsByClassName("finish-input")[0];
    const inputArea = document.getElementById("english");

    //入力をおわるボタンがクリックされたら
    finishInputBtn.addEventListener("click", () => {
      //setQuestionに入力の配列を渡して開始
      const questionsList = inputArea.value.split("\n");
      setQuestion(questionsList);
    });
  } else {
    //クエリパラメータの内容を加工して配列にし、setQuestionに渡す
    const questionsList = decodeURI(location.search).split("=")[1].split("{{br}}")
    setQuestion(questionsList);
    //そのままだとURLでバレバレなので隠す
    history.replaceState(null, "", "https://1step621.github.io/study-english/");
  }

  function setQuestion(wordPairList) {
    wordPairList = wordPairList.sort();
    //HTMLその2を適用
    const answerSceneHTML = '<div id="question-wrapper"><p id="question"></p><div class="answer-input"><select name="answer-list" id="answer-list"><option value="選択してください">選択してください</option></select><a class="block-link button answer">解答</a></div><a class="block-link button copy-url">問題のURLをコピー</a></div>';
    wrapper.innerHTML = answerSceneHTML;

    //要素取得
    const questionWrapper = document.getElementById("question-wrapper");
    const question = document.getElementById("question");
    const answerList = document.getElementById("answer-list");
    const answerBtn = document.getElementsByClassName("answer")[0];
    const copyUrlBtn = document.getElementsByClassName("copy-url")[0];

    //単語をランダムに選ぶ
    console.log(wordPairList);
    const wordPair = wordPairList[Math.floor(Math.random() * wordPairList.length)];
    //日本語部分と英語部分を取り出す
    const japanese = wordPair.split(" ").slice(-1).join(" ");
    const english = wordPair.split(" ").slice(0, -1).join(" ");
    //画面上に反映
    question.innerText = japanese;
    wordPairList.forEach(wordPair => {
      //英語部分の取り出し
      const option = wordPair.split(" ").slice(0, -1).join(" ");

      //選択肢に追加
      const optionElem = document.createElement("option");
      optionElem.value = option;
      optionElem.innerText = option;
      answerList.appendChild(optionElem);
    });

    //urlのコピー
    copyUrlBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(encodeURI("https://1step621.github.io/study-english/?input=" + wordPairList.join("{{br}}")));
      copyUrlBtn.innerText = "コピーしました";
      setTimeout(() => {
        copyUrlBtn.innerText = "問題のURLをコピー";
      }, 1000);
    });

    //答え合わせ
    answerBtn.addEventListener("click", () => {
      if (answerList.value === english) {
        questionWrapper.innerHTML = '<p>正解！</p><img src="correct.svg" alt="正解" width="150" height="150" class="check-answer"><a class="block-link button next">次へ</a><a class="block-link button copy-url">問題のURLをコピー</a>';
      } else {
        if (answerList.value === "選択してください") {
          questionWrapper.innerHTML = `<p>間違い...</p><img src="incorrect.svg" alt="不正解" width="150" height="150" class="check-answer"><p>正解は${english}で、あなたは未回答でした。</p><a class="block-link button next">次へ</a><a class="block-link button copy-url">問題のURLをコピー</a>`;
        } else {
          questionWrapper.innerHTML = `<p>間違い...</p><img src="incorrect.svg" alt="不正解" width="150" height="150" class="check-answer"><p>正解は${english}で、あなたの答えは${answerList.value}でした。</p><a class="block-link button next">次へ</a><a class="block-link button copy-url">問題のURLをコピー</a>`;
        }

        const copyUrlBtn = document.getElementsByClassName("copy-url")[0];
        //urlのコピー
        copyUrlBtn.addEventListener("click", () => {
          navigator.clipboard.writeText(encodeURI("https://1step621.github.io/study-english/?input=" + wordPairList.join("{{br}}")));
          copyUrlBtn.innerText = "コピーしました";
          setTimeout(() => {
            copyUrlBtn.innerText = "問題のURLをコピー";
          }, 1000);
        });
      }

      //要素の取得
      const nextBtn = document.getElementsByClassName("next")[0];
      //次へボタンがクリックされたとき
      nextBtn.addEventListener("click", () => {
        //次の問題へ
        setQuestion(wordPairList);
      });
    });
  }
});
