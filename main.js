// Get input fields
var basicPay = document.getElementById("basicPay");
var allowances = document.getElementById("allowances");
var statutory = document.getElementById("statutory");

// Get result span elements
var grossPaySpan = document.getElementById("grossPay");
var napsaSpan = document.getElementById("napsa");
var nhimaSpan = document.getElementById("nhima");
var totalContributionsSpan = document.getElementById("totalContributions");
var totalTaxDeductionsSpan = document.getElementById("totalTaxDeductions");
var totalDeductionsSpan = document.getElementById("totalDeductions");
var netSalarySpan = document.getElementById("netSalary");

// Get tax band table cells
var band1Income = document.getElementById("band1Income");
var band1Tax = document.getElementById("band1Tax");
var band2Income = document.getElementById("band2Income");
var band2Tax = document.getElementById("band2Tax");
var band3Income = document.getElementById("band3Income");
var band3Tax = document.getElementById("band3Tax");
var band4Income = document.getElementById("band4Income");
var band4Tax = document.getElementById("band4Tax");

// Get clear button
var clearBtn = document.getElementById("clearBtn");

// Calculate PAYE tax based on Zambian tax bands 2026
function calculatePAYE(chargeableIncome) {
    let tax = 0;
    let band1 = 0, band2 = 0, band3 = 0, band4 = 0;
    let taxBand1 = 0, taxBand2 = 0, taxBand3 = 0, taxBand4 = 0;

    // Band 1: First K5,100 @ 0%
    if (chargeableIncome > 0) {
        band1 = Math.min(chargeableIncome, 5100);
        taxBand1 = 0; // 0% tax
        tax += taxBand1;
    }

    // Band 2: K5,100.01 to K7,100 @ 20%
    if (chargeableIncome > 5100) {
        band2 = Math.min(chargeableIncome - 5100, 2000); // 7100 - 5100 = 2000
        taxBand2 = band2 * 0.20;
        tax += taxBand2;
    }

    // Band 3: K7,100.01 to K9,200 @ 30%
    if (chargeableIncome > 7100) {
        band3 = Math.min(chargeableIncome - 7100, 2100); // 9200 - 7100 = 2100
        taxBand3 = band3 * 0.30;
        tax += taxBand3;
    }

    // Band 4: Above K9,200 @ 37%
    if (chargeableIncome > 9200) {
        band4 = chargeableIncome - 9200;
        taxBand4 = band4 * 0.37;
        tax += taxBand4;
    }

    // Update tax band table
    band1Income.textContent = band1.toFixed(0);
    band1Tax.textContent = taxBand1.toFixed(0);
    band2Income.textContent = band2.toFixed(0);
    band2Tax.textContent = taxBand2.toFixed(0);
    band3Income.textContent = band3.toFixed(0);
    band3Tax.textContent = taxBand3.toFixed(0);
    band4Income.textContent = band4.toFixed(0);
    band4Tax.textContent = taxBand4.toFixed(0);

    return tax;
}

// Main calculation function
function calculateValues() {
    // Get values from inputs
    var basic = Number(basicPay.value) || 0;
    var allow = Number(allowances.value) || 0;
    var stat = Number(statutory.value) || 0;

    // Calculate Gross Pay
    var gross = basic + allow;

    // Calculate NAPSA (5% of gross, max K1,110.60 per month based on K22,212 ceiling)
    var napsa = Math.min(gross * 0.05, 1110.60);

    // Calculate NHIMA (1% of gross)
    var nhima = gross * 0.01;

    // Total Contributions
    var totalContributions = napsa + nhima + stat;

    // Calculate Chargeable Income (Gross - Total Contributions)
    var chargeableIncome = gross - totalContributions;
    chargeableIncome = Math.max(chargeableIncome, 0); // Ensure not negative

    // Calculate PAYE Tax
    var payeTax = calculatePAYE(chargeableIncome);

    // Total Tax Deductions (just PAYE in this case)
    var totalTaxDeductions = payeTax;

    // Total Deductions (Contributions + Tax)
    var totalDeductions = totalContributions + totalTaxDeductions;

    // Net Salary
    var netSalary = gross - totalDeductions;

    // Update display (round to 2 decimal places)
    grossPaySpan.textContent = "K " + gross.toFixed(2);
    napsaSpan.textContent = "K " + napsa.toFixed(2);
    nhimaSpan.textContent = "K " + nhima.toFixed(2);
    totalContributionsSpan.textContent = "K " + totalContributions.toFixed(2);
    totalTaxDeductionsSpan.textContent = "K " + totalTaxDeductions.toFixed(2);
    totalDeductionsSpan.textContent = "K " + totalDeductions.toFixed(2);
    netSalarySpan.textContent = "K " + netSalary.toFixed(2);
}

// Add event listeners for real-time calculation
basicPay.addEventListener("input", calculateValues);
allowances.addEventListener("input", calculateValues);
statutory.addEventListener("input", calculateValues);

// Clear button functionality
clearBtn.addEventListener("click", function() {
    // Clear input fields
    basicPay.value = "";
    allowances.value = "";
    statutory.value = "";

    // Reset all display values
    grossPaySpan.textContent = "K 0";
    napsaSpan.textContent = "K 0";
    nhimaSpan.textContent = "K 0";
    totalContributionsSpan.textContent = "K 0";
    totalTaxDeductionsSpan.textContent = "K 0";
    totalDeductionsSpan.textContent = "K 0";
    netSalarySpan.textContent = "K 0";

    // Reset tax band table
    band1Income.textContent = "0";
    band1Tax.textContent = "0";
    band2Income.textContent = "0";
    band2Tax.textContent = "0";
    band3Income.textContent = "0";
    band3Tax.textContent = "0";
    band4Income.textContent = "0";
    band4Tax.textContent = "0";
});
