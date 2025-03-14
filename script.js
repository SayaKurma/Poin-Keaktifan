document.addEventListener("DOMContentLoaded", function() {
    let matchCount = 0;

    function updateTable() {
        let rows = Array.from(document.querySelectorAll("tbody tr"));
        
        rows.forEach(row => {
            let fm = parseInt(row.querySelector(".fm").textContent) || 0;
            let dc = parseInt(row.querySelector(".dc").textContent) || 0;
            
            let sm = Math.max(matchCount - (fm + dc), 0);
            let totalPoin = (fm * 2) + (dc * 1);

            row.querySelector(".match").textContent = matchCount;
            row.querySelector(".sm").textContent = sm;
            row.querySelector(".total").textContent = totalPoin;
        });

        rows.sort((a, b) => {
            let poinA = parseInt(a.querySelector(".total").textContent) || 0;
            let poinB = parseInt(b.querySelector(".total").textContent) || 0;
            return poinB - poinA;
        });

        let tbody = document.getElementById("table-body");
        tbody.innerHTML = "";
        rows.forEach((row, index) => {
            row.cells[0].textContent = index + 1;
            tbody.appendChild(row);
        });
    }

    document.getElementById("match-input").addEventListener("input", function() {
        matchCount = parseInt(this.value) || 0;
        updateTable();
    });

    document.querySelectorAll(".info").forEach(header => {
        header.addEventListener("click", function() {
            alert(header.dataset.info);
        });
    });

    updateTable();
});
