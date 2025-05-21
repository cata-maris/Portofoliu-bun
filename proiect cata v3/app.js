// noOfProjectiles = 32;
// angle = 40;
// distance = ;
// length = 5;
// width = 3;
// height = 2.72;
// raza = 200;
// time = 1;
// expectedProbability = ;
// turningSpeed = 200;
// initialSpeed = 150;
// noOfTargets = ;

// Variables

let selectedAeroplane = 0; // 4 = vnt, 2 = bmb
let selectedWeaponry = 0; // 2 = prnd, 1 = tun
let noOfProjectiles = 0;
let angle = 0;
let distance = 0;
let length = 0;
let width = 0;
let height = 0;
let raza = 0;
let time = 0;
let expectedProbability = 0;
let speedOfTurning = 0;
let initialSpeed = 0;
let noOfTargets = 0;
let planenumber = 0;

let kp = 0;
let qt = 0;
let k = 0;
let u = 0;
let w = 0;
let qpo = 0;

let isHiddenL = true;
let isHiddenR = true;
let selectedAeroplaneModel = undefined;
let selectedWeaponryModel = undefined;

firstResult = true;
secondResult = true;
thirdResult = true;

firstResultValue = 0;
secondResultValue = 0;
thirdResultValue = 0;

// Table

let table = [
    [0.96, 0.94],
    [0.93, 0.90],
    [0.91, 0.87],
    [0.87, 0.84],
    [0.85, 0.81],
    [0.82, 0.77],
    [0.78, 0.72],
    [0.75, 0.68],
    [0.74, 0.66],
    [0.72, 0.65],
    [0.69, 0.63],
    [0.68, 0.62],
    [0.68, 0.62],
    [0.69, 0.62],
    [0.71, 0.64],
    [0.73, 0.67],
    [0.75, 0.69],
    [0.77, 0.71],
    [0.78, 0.72],
    [0.80, 0.74],
    [0.81, 0.75],
];
let obj = {
    "0.02": 0,
    "0.04": 1,
    "0.06": 2,
    "0.08": 3,
    "0.10": 4,
    "0.20": 5,
    "0.40": 6,
    "0.60": 7,
    "0.80": 8,
    "1.00": 9,
    "1.50": 10,
    "2.00": 11,
    "2.50": 12,
    "3.00": 13,
    "4.00": 14,
    "5.00": 15,
    "6.00": 16,
    "7.00": 17,
    "8.00": 18,
    "9.00": 19,
    "10.00": 20,
};

// Document Variables

const aeroplaneBtn = document.querySelector(".aeroplanes-btn");
const weaponryBtn = document.querySelector(".weaponry-btn");

const aeroplaneMenu = document.querySelector("#aeroplane-selector");
const weaponryMenu = document.querySelector("#weaponry-selector");

const vnt = document.querySelector("#vnt");
const bmb = document.querySelector("#bmb");
const prnd = document.querySelector("#prnd");
const tun = document.querySelector("#tun");

const form = document.querySelector(".eficacy-calc");

const noOfProjectilesInput = document.querySelector(
    '[name="no-of-projectiles"]'
);
const angleInput = document.querySelector('[name="angle"]');
const lengthInput = document.querySelector('[name="length"]');
const widthInput = document.querySelector('[name="width"]');
const heightInput = document.querySelector('[name="height"]');
const razaInput = document.querySelector('[name="raza"]');
const timeInput = document.querySelector('[name="time-of-firing"]');
const expectedProbabilityInput = document.querySelector(
    '[name="expected-probability"]'
);
const planenumberInput = document.querySelector('[name ="no-of-plane"]');
const speedOfTurningInput = document.querySelector('[name="speed-of-turning"]');
const initialSpeedInput = document.querySelector('[name="initial-speed"]');
const noOfTargetsInput = document.querySelector('[name="no-of-targets"]');

const resultWindow = document.querySelector(".result");
const resultRows = document.querySelector("#result-rows");
const closeBtn = document.querySelector(".close-btn");
const showResultsButton = document.querySelector(".show-results-btn");

// Functions

const setValues = () => {
    noOfProjectiles = Number(noOfProjectilesInput.value);
    angle = Number(angleInput.value);
    planenumber = Number (planenumberInput.value);
    length = Number(lengthInput.value);
    width = Number(widthInput.value);
    height = Number(heightInput.value);
    raza = Number(razaInput.value);
    time = Number(timeInput.value);
    expectedProbability = Number(expectedProbabilityInput.value);
    speedOfTurning = Number(speedOfTurningInput.value);
    initialSpeed = Number(initialSpeedInput.value);
    noOfTargets = Number(noOfTargetsInput.value);
};

const calcProbOfKill = () => {
    if (
        selectedAeroplane &&
        selectedWeaponry &&
        length &&
        width &&
        height &&
        angle &&
        selectedAeroplane &&
        speedOfTurning &&
        initialSpeed &&
        time &&
        raza &&
        noOfProjectiles
    ) {
        let surface =
            length *
            (width * Math.sin(angle * (Math.PI / 180)) +
                height * Math.cos(angle * (Math.PI / 180)));

        let n = selectedAeroplane;

        if (n === 4) {
            kp = 1; 
            qt = 0.95 * 0.95;
            qpo = 0.95;
        } else if (n === 2) {
            kp = 1;
            qt = 0.9 * 0.9;
            qpo= 0.9;
        }

        if (selectedWeaponry === 2) {
            k = 0.006;
            u = 0.8;
            w = 1.5;
        } else if (selectedWeaponry === 1) {
            k = 0.004;
            u = 0.75;
            w = 3;
        }

        let rc =
            Math.pow(speedOfTurning, 2) /
            (9.81 * (n - Math.cos((angle / 2) * (Math.PI / 180))));

        distance =
            Math.sqrt(Math.pow(raza, 2) + 2 * rc * raza) +
            (0.5 * (initialSpeed + speedOfTurning)) / 2 +
            ((initialSpeed + speedOfTurning) * time) / 4;

        let e = k * distance * kp;
        console.log("Abaterea probabila este ", e);

        let p =
            0.0725 *
            (surface /
                Math.pow((e + e / Math.sin(angle * (Math.PI / 180))) / 2, 2));

        let wi = 1 - Math.pow(1 - p / w, noOfProjectiles);

        let wfd = p * (1 - Math.pow(1 - 1 / w, noOfProjectiles));

        let avgHitCount = (noOfProjectiles * p) / w;

        if(avgHitCount >= 0.01 && avgHitCount < 0.10) {
            if(Math.trunc(avgHitCount * 100) % 2 === 0) {
                avgHitCount = Math.trunc(avgHitCount * 100) / 10;
            } else {
                avgHitCount = (Math.trunc(avgHitCount * 100) + 1) / 10;
            }
        }

        if(avgHitCount >= 0.20 && avgHitCount < 1) {
            if(Math.trunc(avgHitCount * 10) % 2 === 0) {
                avgHitCount = Math.trunc(avgHitCount * 10) / 10;
            } else {
                avgHitCount = (Math.trunc(avgHitCount * 10) + 1) / 10;
            }
        }
        if(avgHitCount >= 1) {
            avgHitCount = Math.round (avgHitCount);
        }
    

        let a = table[obj[(avgHitCount).toFixed(2)]]
        [selectedWeaponry - 1];


        let wv = a * wi + (1 - a) * wfd;

        let wn = 0;
        if(selectedAeroplane === 4) {
            wn = qt * wv;
        } else if(selectedAeroplane === 2) {
            wn = qt * wv;
        }

        firstResultValue = wn.toFixed(2);
        firstResult = true;
    } else {
        firstResult = false;
        if (!selectedAeroplane || !selectedWeaponry) {
            alert("Selecteaza un mod si un tip de armament!");
        }
    }
};


// Functie de calcul numar necesar de avioane

    const calcNoOfPlane = () => {
        if (firstResult &&
            expectedProbability) 
        {
            
            
            let noofplane = Math.log(1-expectedProbability) / Math.log(1-firstResultValue)
            secondResultValue = noofplane.toFixed(2);
            secondResult = true;
            
        }
           
    }

// fct de calcul nr mediu de tinte nimcite

    const  calcAvgTarget = () => {
        if (firstResultValue && planenumber){
            let wnmed = 1 - Math.pow( Math.E, firstResultValue * qpo* (-planenumber/noOfTargets));
            let mtc = noOfTargets * wnmed;
            thirdResultValue = mtc.toFixed(2);
            thirdresult=true;
        }
    }

    const writeRow = () => {
        if(
            firstResultValue ||
            secondResultValue ||
            thirdResultValue
        ) {
            resultRows.innerHTML += `
            <tr>
                <td>${noOfProjectiles}</td>
                <td>${angle}</td>
                <td>${distance.toFixed(2)}</td>
                <td>${length}</td>
                <td>${width}</td>
                <td>${height}</td>
                <td>${raza}</td>
                <td>${time}</td>
                <td>${expectedProbability}</td>
                <td>${speedOfTurning}</td>
                <td>${initialSpeed}</td>
                <td>${noOfTargets}</td>
                <td>${planenumber}</td>
                <td class="result-cell">${firstResult ? firstResultValue : "Nu au fost introduse destule valori"}</td>
                <td class="result-cell">${secondResult ? secondResultValue : "Nu au fost introduse destule valori"}</td>
                <td class="result-cell">${thirdResult ? thirdResultValue : "Nu au fost introduse destule valori"}</td>
            </tr>
            `;
            showResultWindow();
            
        } else {
            alert("Cod Eroare 01, Nu au fost introduse destule valori pentru a obtine un rezultat!")
        }
    };
    
    
    

// Event Functions

const showAeroplaneMenu = (e) => {
    e.preventDefault();
    if (isHiddenL) {
        aeroplaneMenu.style.transform = "scale(1)";
        aeroplaneMenu.style.opacity = 1;
        isHiddenL = false;
    } else {
        aeroplaneMenu.style.transform = "scale(0)";
        aeroplaneMenu.style.opacity = 0;
        isHiddenL = true;
    }
};

const showWeaponryMenu = (e) => {
    e.preventDefault();
    if (isHiddenR) {
        weaponryMenu.style.transform = "scale(1)";
        weaponryMenu.style.opacity = 1;
        isHiddenR = false;
    } else {
        weaponryMenu.style.transform = "scale(0)";
        weaponryMenu.style.opacity = 0;
        isHiddenR = true;
    }
};

const selectAeroplaneModel = (e) => {
    e.preventDefault();
    if (e.target.id === "vnt") {
        selectedAeroplane = 4;
        e.target.parentElement.style.border = "3px solid #d3c26f";
        e.target.parentElement.nextElementSibling.style.border = "none";
    } else {
        selectedAeroplane = 2;
        e.target.parentElement.style.border = "3px solid #d3c26f";
        e.target.parentElement.previousElementSibling.style.border = "none";
    }
};

const selectWeaponryModel = (e) => {
    e.preventDefault();
    if (e.target.id === "prnd") {
        selectedWeaponry = 2;
        e.target.parentElement.style.border = "3px solid #d3c26f";
        e.target.parentElement.nextElementSibling.style.border = "none";
    } else {
        selectedWeaponry = 1;
        e.target.parentElement.style.border = "3px solid #d3c26f";
        e.target.parentElement.previousElementSibling.style.border = "none";
    }
};

const showResultWindow = () => {
    resultWindow.style.display = "block";
    setTimeout(() => {
        resultWindow.style.transform = "scale(1) translateY(0)";
        resultWindow.style.opacity = 1;
    },10);
}

const showResultWindowEvent = (e) => {
    e.preventDefault();
    resultWindow.style.display = "block";
    setTimeout(() => {
        resultWindow.style.transform = "scale(1) translateY(0)";
        resultWindow.style.opacity = 1;
    },10);
}

const closeResultWindow = (e) => {
    e.preventDefault();
    resultWindow.style.transform = "scale(1.2) translateY(-300px)";
    resultWindow.style.opacity = 0;
    setTimeout(() => {
        resultWindow.style.display = "none";
    },500);
}

const calculateAll = (e) => {
    e.preventDefault();
    setValues();
    calcProbOfKill();
    calcNoOfPlane();
    calcAvgTarget();
    writeRow();
};

// Event Listeners

aeroplaneBtn.addEventListener("click", showAeroplaneMenu);
weaponryBtn.addEventListener("click", showWeaponryMenu);

vnt.addEventListener("click", selectAeroplaneModel);
bmb.addEventListener("click", selectAeroplaneModel);
prnd.addEventListener("click", selectWeaponryModel);
tun.addEventListener("click", selectWeaponryModel);

form.addEventListener("submit", calculateAll);

closeBtn.addEventListener("click", closeResultWindow);
showResultsButton.addEventListener("click", showResultWindowEvent);
