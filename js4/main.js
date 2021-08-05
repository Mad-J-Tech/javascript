window.onload = () => {
    const URL = "https://opentdb.com/api.php?amount=10&category=9&difficulty=medium";

    fetch(URL)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Fetch: ${res.status} ${res.statusText}`);
            }
            return (res.json());
        })
        .then((json) => {

            // 表示を切り替える
            document.querySelector("#nowloading").style.display = "none";

            for (i = 0; i < 10; i++) {
                document.querySelector(`#question${i}`).style.display = "block";
            }
        })
        .catch((error) => {
            alert("エラーが発生しました");
            console.error(`[FetchAPI] ${error}, ${URL}`);
        })
}