const maxAngle = 30, minAngle = -30;
let weightCounter = 0;
let leftTotalWeight, rightTotalWeight;
let state = {
    weights: [],
    angle: 0
}
const plank = document.getElementById('plank');
const leftWeightDisplay = document.getElementById('left-weight');
const rightWeightDisplay = document.getElementById('right-weight');
const angleDisplay = document.getElementById('tilt-angle');
const logsContainer = document.getElementById('logs');
const resetButton = document.getElementById('reset-button');

function updateBalance() {
    let leftTorque = 0;
    let rightTorque = 0;

    leftTotalWeight = 0;
    rightTotalWeight = 0;
   
    state.weights.forEach(function(i) {
        if (i.side === "left"){
            leftTorque += i.weight * i.distance;
            leftTotalWeight += i.weight;
        }
        else {
            rightTorque += i.weight * i.distance;
            rightTotalWeight += i.weight;
        }
    });

    let calculatedAngle = (rightTorque - leftTorque) / 10;

    if (calculatedAngle > maxAngle) {
        calculatedAngle = maxAngle;
    }
    if (calculatedAngle < minAngle){
        calculatedAngle = minAngle;
    }

    state.angle = calculatedAngle;
}

function render() {
   
    updateBalance();

    plank.innerHTML = '';

    state.weights.forEach(function(i) {
        const div = document.createElement('div');
        div.className = 'weight-object';
        div.innerText = i.weight + "KG";
       
        div.style.backgroundColor = i.color;
        div.style.width = (30 + i.weight * 2) + 'px';
        div.style.height = (30 + i.weight * 2) + 'px';

        if (i.side === "left") {
            div.style.left = (200 - i.distance) + 'px';
            leftWeightDisplay.innerText = leftTotalWeight + " KG";
        }
       
        else {
            div.style.left = (200 + i.distance) + 'px';
            rightWeightDisplay.innerText = rightTotalWeight + " KG";
        }

        plank.appendChild(div);
    });

    plank.style.transform = `rotate(${state.angle}deg)`;
 
    angleDisplay.innerText = state.angle.toFixed(1) + "°";

    localStorage.setItem('seesawState', JSON.stringify(state));
}


plank.addEventListener('click', (e) => {
    const rect = plank.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;

    const rad = state.angle * (Math.PI / 180);

    const rotatedX = (dx * Math.cos(rad)) + (dy * Math.sin(rad));
   
    //let clickX = e.clientX - rect.left;
    let distance = 0;
    let side = "";

    if (rotatedX < 0) {
        side = "left";
        distance = Math.abs(rotatedX);
    }
    else {
        side = "right";
        distance = rotatedX;
    }

    if (distance > 200) {
        distance = 200;
    }
   
    const weight = Math.floor(Math.random() * 10) + 1;
    const randomColor = `rgb(${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)})`;

    const newWeight = {
        weight: weight,
        side: side,
        distance: distance,
        color: randomColor
    };

    state.weights.push(newWeight);
    weightCounter++;

    const logItem = document.createElement('p');
    logItem.innerText = `${weight}KG dropped on ${side} side at ${Math.round(distance)}px from center`;
    logsContainer.prepend(logItem);
    render();
})

resetButton.addEventListener('click', function() {
    state.weights = [];
    state.angle = 0;
    leftTotalWeight = 0;
    rightTotalWeight = 0;
    localStorage.removeItem('seesawState');
    logsContainer.innerHTML = '';
    render();
});

const savedState = localStorage.getItem('seesawState');
if (savedState) {
    state = JSON.parse(savedState);
}
render();