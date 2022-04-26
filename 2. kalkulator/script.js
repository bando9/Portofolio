// membuat ojek calculator
const calculator = {

	// membuat variabel
	displayNumber: '0', // menampilkan layar, harus sama dg id display
	operator: null,
	firstNumber: null,
	waitingForSecondNumber: false // menunggu angka kedua
};

// fungsi update layar
function updateDisplay() {

	// mengembalikkan id displayNumber dg menambah text var displayNumber
	document.querySelector('#displayNumber').innerText = calculator.displayNumber;
}

// fungsi menghapus data
function clearCalculator() {
	calculator.displayNumber = '0';
	calculator.operator = null;
	calculator.firstNumber = null;
	calculator.waitingForSecondNumber = false;
}

// fungsi memasukkan angka
function inputDigit(digit) {

	// membuat display tanpa 0 didepannya
	if(calculator.displayNumber === '0') {
		calculator.displayNumber = digit;
	} else {
		calculator.displayNumber += digit;
	}
}

// displayNumber akan di negatifkan
function inverseNumber() {
	if(calculator.displayNumber === '0') {
		return;
	}

	calculator.displayNumber = calculator.displayNumber * -1;
}

const buttons = document.querySelectorAll(".button"); // mengambil semua elemen class button
for (let button of buttons) {

	// mendapatkan nilai seluruh button
	button.addEventListener('click', function(event) {

		const target = event.target; // mendapatkan objek elemen yg diklik

		// ketika target merupakan elemen ber kelas .clear, maka akan menggunakan fungsi clearCalculator()
		if(target.classList.contains('clear')) {
			clearCalculator();
			updateDisplay();
			return; // digunakan agar kode dibawahnya tidak ikut terksekusi
		}

		if(target.classList.contains('negative')) {
			inverseNumber();
			updateDisplay();
			return;
		}

		if(target.classList.contains('equals')) {
			performaCalculation();
			updateDisplay();
			return;
		}

		if(target.classList.contains('operator')) {
			handleOperator(target.innerText);
			return;
		}


		inputDigit(target.innerText);
		updateDisplay(); // menampilkan fungsi updateDisplay pd layar
	});
} 



function handleOperator(operator) {
	if (!calculator.waitingForSecondNumber) {
		calculator.operator = operator;
		calculator.waitingForSecondNumber = true;
		calculator.firstNumber = calculator.displayNumber;
		calculator.displayNumber = '0';
	} else {
		alert('Operator sudah ditetapkan')
	}
}

function performaCalculation() {
	if (calculator.firstNumber == null || calculator.operator == null) {
		alert("Anda belum menetapkan operator");
		return;
	}


	let result = 0;
	if (calculator.operator === "+") {
		result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
	} else {
		result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
	}

	calculator.displayNumber = result;
}