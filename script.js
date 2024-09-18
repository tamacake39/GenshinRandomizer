// jsonの中身
let data;

// ボタンがクリックされたときに実行される関数
function loadTable() {
    const btn = document.querySelector(".executer");
    const charactorRadio = document.getElementById("charactor");
    const elementRadio = document.getElementById("element");
    const featuresRadio = document.getElementById("features");
    const elementLimitCheckbox = document.getElementById("elementLimit");
    const includeLocalLegend = document.getElementById("includeLocalLegend");

    const tableBody = document.querySelector("#dataTable tbody");
    tableBody.innerHTML = ""; // テーブルの中身をクリア

    // 選択されたキャラクターを格納する配列
    let selectedCharacters = [...Array(4)].map(() => 0);

    // ボスをランダムに選択
    let bosses = [];
    if (includeLocalLegend.checked) {
        bosses = data.bosses.concat(data.locallegend);
    } else {
        bosses = data.bosses.concat();
    }
    const randomBossIndex = Math.floor(Math.random() * bosses.length);
    let selectedBoss = bosses[randomBossIndex];

    if (elementRadio.checked) {
        // 元素縛りの処理

        // 元素（elements）をランダムに選択
        const list = data.elements.concat();
        for (let i = 0; i < 4; i++) {
            const randomIndex = Math.floor(Math.random() * list.length);
            selectedCharacters[i] = list[randomIndex];
            // list.splice(randomIndex, 1); // 元素は重複を許可
        }

        // 必須元素の考慮の有無に応じた処理
        if (elementLimitCheckbox.checked) {
            // 無相の草の処理
            if (selectedBoss === "無相の草") {
                let flag = true;
                for (let i = 0; i < 4; i++) {
                    // 選択されたキャラクターに「草」が含まれているかどうか
                    if (selectedCharacters[i] === "草") {
                        flag = false;
                    }
                }
                // 条件を満たさないときbitはtrue
                if (flag) {
                    selectedCharacters[0] = "草";
                }
            }

            // TODO: 他のボスの処理
        }
    } else if (featuresRadio.checked) {
        // 特徴縛りの処理

        // 特徴（features）をランダムに選択
        const list = data.features.concat();
        for (let i = 0; i < 4; i++) {
            const randomIndex = Math.floor(Math.random() * list.length);
            selectedCharacters[i] = list[randomIndex];
            // list.splice(randomIndex, 1); // 元素は重複を許可
        }
    } else {
        // キャラ縛りの処理

        // キャラクター（charactors）をランダムに選択
        let list = data.characters.concat();
        list = shuffleArray(list);
        for (let i = 0; i < 4; i++) {
            selectedCharacters[i] = list[i];
            list.splice(i, 1); // 選択されたキャラクターをリストから削除
        }

        // 必須元素の考慮の有無に応じた処理
        if (elementLimitCheckbox.checked) {
            // 無相の草の処理
            if (selectedBoss === "無相の草") {
                let flag = true;
                for (let i = 0; i < 4; i++) {
                    // 選択されたキャラクターに「草」が含まれているかどうか
                    if (selectedCharacters[i].elements === "草") {
                        flag = false;
                    }
                }
                // 条件を満たさないときbitはtrue
                if (flag) {
                    // 草を検索して0と入れ替え
                    selectedCharacters[0] = data.characters.find(
                        (character) => character.elements === "草"
                    );
                }
            }

            // TODO: 他のボスの処理
        }

        // オブジェクトをnameに変換
        selectedCharacters = selectedCharacters.map((character) => {
            if (character.name === "?") {
                console.log(character.hoyowiki);
            }
            return character.name;
        });
    }

    // なんとなくシャッフル
    selectedCharacters = shuffleArray(selectedCharacters);

    // 選択されたキャラクターとボスをテーブルに挿入
    let count = 1;
    selectedCharacters.forEach((character) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                <td>${count++}P</td>
                <td>${character}</td>
            `;
        tableBody.appendChild(row);
    });

    const bossRow = document.createElement("tr");
    bossRow.innerHTML = `
            <td>ボス</td>
            <td>${selectedBoss}</td>
        `;
    tableBody.appendChild(bossRow);
}

// HTMLが読み込まれたときに実行される初期化関数
document.addEventListener("DOMContentLoaded", async () => {
    const getData = async () => {
        return await fetch("data.json")
            .then((response) => response.json())
            .catch((error) => {
                console.error(
                    "データの読み込み中にエラーが発生しました:",
                    error
                );
                alert(
                    "データの読み込み中にエラーが発生しました\nページをリロードしてください"
                );
            });
    };
    data = await getData();

    // executeボタンがクリックされたときの処理
    const btn = document.querySelector(".executer");
    btn.addEventListener("click", loadTable);
    loadTable();
});

const shuffleArray = (array) => {
    const cloneArray = [...array];
    for (let i = cloneArray.length - 1; i >= 0; i--) {
        let rand = Math.floor(Math.random() * (i + 1));
        // 配列の要素の順番を入れ替える
        let tmpStorage = cloneArray[i];
        cloneArray[i] = cloneArray[rand];
        cloneArray[rand] = tmpStorage;
    }
    return cloneArray;
};
