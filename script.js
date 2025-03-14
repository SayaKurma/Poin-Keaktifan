document.addEventListener("DOMContentLoaded", function() {
    let matchCount = 0;
    const rows = Array.from(document.querySelectorAll("tbody tr"));
    
    if (!document.getElementById("match-input")) {
        const inputContainer = document.querySelector(".input-container");
        if (!inputContainer) {
            const container = document.querySelector(".container");
            const inputContainerDiv = document.createElement("div");
            inputContainerDiv.className = "input-container";
            
            const label = document.createElement("label");
            label.setAttribute("for", "match-input");
            label.textContent = "Total Match:";
            
            const input = document.createElement("input");
            input.type = "number";
            input.id = "match-input";
            input.className = "match-input";
            input.min = "0";
            input.value = "0";
            
            inputContainerDiv.appendChild(label);
            inputContainerDiv.appendChild(input);
            container.insertBefore(inputContainerDiv, container.querySelector("table").parentNode);
        }
    }
    
    function updateTable() {
        rows.forEach(row => {
            const fmCell = row.querySelector(".fm");
            const dcCell = row.querySelector(".dc");
            const smCell = row.querySelector(".sm");
            const totalCell = row.querySelector(".total");
            const matchCell = row.querySelector(".match");
            
            const fm = parseInt(fmCell.textContent) || 0;
            const dc = parseInt(dcCell.textContent) || 0;
            
            const sm = Math.max(matchCount - (fm + dc), 0);
            
            const totalPoin = (fm * 2) + (dc * 1);
            
            matchCell.textContent = matchCount;
            smCell.textContent = sm;
            totalCell.textContent = totalPoin;
            
            if (fm > 0) {
                fmCell.style.textShadow = "0 0 10px rgba(255, 204, 0, 0.8)";
            }
            
            if (dc > 0) {
                dcCell.style.textShadow = "0 0 10px rgba(255, 69, 0, 0.8)";
            }
            
            if (totalPoin > 0) {
                totalCell.style.textShadow = "0 0 10px rgba(255, 204, 0, 0.8)";
                if (totalPoin > 10) {
                    totalCell.style.color = "#ff7b00";
                }
                if (totalPoin > 20) {
                    totalCell.style.color = "#ff4500";
                }
            }
        });
        
        rows.sort((a, b) => {
            const poinA = parseInt(a.querySelector(".total").textContent) || 0;
            const poinB = parseInt(b.querySelector(".total").textContent) || 0;
            
            if (poinA === poinB) {
                const fmA = parseInt(a.querySelector(".fm").textContent) || 0;
                const fmB = parseInt(b.querySelector(".fm").textContent) || 0;
                return fmB - fmA;
            }
            
            return poinB - poinA;
        });
        
        const tbody = document.getElementById("table-body");
        tbody.innerHTML = "";
        
        rows.forEach((row, index) => {
            row.cells[0].textContent = index + 1;
            tbody.appendChild(row);
            
            if (index === 0) {
                row.style.background = "rgba(255, 215, 0, 0.2)";
                row.style.transform = "translateY(-5px) scale(1.02)";
                row.style.boxShadow = "0 5px 15px rgba(255, 215, 0, 0.4)";
            } else if (index === 1) {
                row.style.background = "rgba(192, 192, 192, 0.15)";
                row.style.transform = "translateY(-3px) scale(1.01)";
                row.style.boxShadow = "0 5px 12px rgba(192, 192, 192, 0.3)";
            } else if (index === 2) {
                row.style.background = "rgba(205, 127, 50, 0.1)";
                row.style.transform = "translateY(-2px) scale(1.005)";
                row.style.boxShadow = "0 5px 10px rgba(205, 127, 50, 0.2)";
            }
        });
        
        createFireEffects();
    }
    
    function createFireEffects() {
        const topRows = rows.slice(0, 3);
        
        topRows.forEach((row, index) => {
            const totalPoints = parseInt(row.querySelector(".total").textContent) || 0;
            
            if (totalPoints > 0) {
                const nameCell = row.cells[1];
                const intensity = Math.min(totalPoints / 20, 1);
                
                if (index === 0) {
                    nameCell.style.textShadow = `0 0 ${10 * intensity}px rgba(255, 215, 0, 0.8)`;
                    nameCell.style.color = "#ffcc00";
                } else if (index === 1) {
                    nameCell.style.textShadow = `0 0 ${8 * intensity}px rgba(255, 215, 0, 0.6)`;
                    nameCell.style.color = "#ffd700";
                } else if (index === 2) {
                    nameCell.style.textShadow = `0 0 ${6 * intensity}px rgba(255, 215, 0, 0.4)`;
                    nameCell.style.color = "#ffdd55";
                }
            }
        });
    }
    
    document.addEventListener("click", function(e) {
        const target = e.target;
        
        if (target.classList.contains("fm") || target.classList.contains("dc")) {
            const currentValue = parseInt(target.textContent) || 0;
            const newValue = currentValue + 1;
            target.textContent = newValue;
            updateTable();
        }
    });
    
    document.addEventListener("contextmenu", function(e) {
        const target = e.target;
        
        if (target.classList.contains("fm") || target.classList.contains("dc")) {
            e.preventDefault();
            const currentValue = parseInt(target.textContent) || 0;
            const newValue = Math.max(currentValue - 1, 0);
            target.textContent = newValue;
            updateTable();
        }
    });
    
    document.getElementById("match-input").addEventListener("input", function() {
        matchCount = parseInt(this.value) || 0;
        updateTable();
    });
    
    document.querySelectorAll(".info").forEach(header => {
        header.addEventListener("click", function() {
            alert(header.dataset.info);
        });
    });
    
    function createFlames() {
        const flamesContainer = document.querySelector(".flames");
        if (!flamesContainer) return;
        
        flamesContainer.innerHTML = "";
        
        for (let i = 0; i < 20; i++) {
            const flame = document.createElement("div");
            flame.className = "flame";
            
            const left = Math.random() * 100;
            const height = 50 + Math.random() * 100;
            const width = height * 0.6;
            const delay = Math.random() * 5;
            
            flame.style.left = `${left}%`;
            flame.style.height = `${height}px`;
            flame.style.width = `${width}px`;
            flame.style.animationDelay = `${delay}s`;
            
            flamesContainer.appendChild(flame);
        }
    }
    
    createFlames();
    updateTable();
});
