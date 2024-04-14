// jsonの中身
let data;

// ボタンがクリックされたときに実行される関数
function loadTable() {
    const btn = document.querySelector(".executer");
    const charactorRadio = document.getElementById("charactor");
    const elementRadio = document.getElementById("element");
    const featuresRadio = document.getElementById("features");
    const elementLimitCheckbox = document.getElementById("elementLimit");

    if (elementRadio.checked) {
        // 元素縛りの処理
        console.log("元素縛りが選択されました");
        // ここに元素縛りの処理を追加
    } else if (featuresRadio.checked) {
        // 特徴縛りの処理
        console.log("特徴縛りが選択されました");
        // ここに特徴縛りの処理を追加
    } else {
        // キャラ縛りの処理
        const tableBody = document.querySelector("#dataTable tbody");
        tableBody.innerHTML = ""; // テーブルの中身をクリア

        // キャラクターをランダムに選択
        const characters = data.characters;
        const selectedCharacters = [];
        for (let i = 0; i < 4; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            selectedCharacters.push(characters[randomIndex]);
            characters.splice(randomIndex, 1); // 選択されたキャラクターをリストから削除
        }

        // ボスをランダムに選択
        const bosses = data.bosses;
        const randomBossIndex = Math.floor(Math.random() * bosses.length);
        const selectedBoss = bosses[randomBossIndex];

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

    // 必須元素の考慮の有無に応じた処理
    if (elementLimitCheckbox.checked) {
        console.log("必須元素を考慮します");
        // ここに必須元素を考慮した処理を追加
    } else {
        console.log("必須元素を考慮しません");
        // ここに必須元素を考慮しない処理を追加
    }
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
