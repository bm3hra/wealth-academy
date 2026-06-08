// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// SIP Calculator Logic
// Formula: M = P × ({[1 + i]n – 1} / i) × (1 + i)
function calculateSIP() {
    const P = parseFloat(document.getElementById('sipAmount').value);
    const annualRate = parseFloat(document.getElementById('sipReturn').value);
    const years = parseFloat(document.getElementById('sipYears').value);

    if(isNaN(P) || isNaN(annualRate) || isNaN(years) || P <= 0 || annualRate <= 0 || years <= 0) {
        alert("कृपया सही संख्या दर्ज करें।");
        return;
    }

    const n = years * 12; // total months
    const i = (annualRate / 100) / 12; // monthly interest rate

    // Future Value
    const M = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const totalInvested = P * n;
    const estReturns = M - totalInvested;

    // Formatting numbers to Indian Rupee format
    const formatCurrency = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

    document.getElementById('sipTotalValue').innerText = formatCurrency(Math.round(M));
    document.getElementById('sipInvestedAmount').innerText = formatCurrency(Math.round(totalInvested));
    document.getElementById('sipEstReturns').innerText = formatCurrency(Math.round(estReturns));
    
    document.getElementById('sipResult').style.display = 'block';
}

// Crorepati Calculator Logic
// Solves for n given M = 1,00,00,000
function calculateCrorepati() {
    const P = parseFloat(document.getElementById('croreAmount').value);
    const annualRate = parseFloat(document.getElementById('croreReturn').value);
    const target = 10000000; // 1 Crore

    if(isNaN(P) || isNaN(annualRate) || P <= 0 || annualRate <= 0) {
        alert("कृपया सही संख्या दर्ज करें।");
        return;
    }

    const i = (annualRate / 100) / 12; // monthly interest rate

    // Formula rearranged for n: 
    // M = P * (( (1+i)^n - 1 ) / i ) * (1+i)
    // (M * i) / (P * (1+i)) + 1 = (1+i)^n
    // n = log((M * i) / (P * (1+i)) + 1) / log(1+i)

    const numerator = Math.log(((target * i) / (P * (1 + i))) + 1);
    const denominator = Math.log(1 + i);
    const n_months = numerator / denominator;

    const years = Math.floor(n_months / 12);
    const months = Math.ceil(n_months % 12);

    let timeString = `${years} वर्ष`;
    if(months > 0) timeString += ` और ${months} महीने`;

    document.getElementById('croreYears').innerText = timeString;
    document.getElementById('croreResult').style.display = 'block';
}

// Lumpsum Calculator Logic
// Formula: M = P * (1 + r)^n
function calculateLumpsum() {
    const P = parseFloat(document.getElementById('lumpAmount').value);
    const annualRate = parseFloat(document.getElementById('lumpReturn').value);
    const years = parseFloat(document.getElementById('lumpYears').value);

    if(isNaN(P) || isNaN(annualRate) || isNaN(years) || P <= 0 || annualRate <= 0 || years <= 0) {
        alert("कृपया सही संख्या दर्ज करें।");
        return;
    }

    const r = annualRate / 100;
    const M = P * Math.pow(1 + r, years);
    const estReturns = M - P;

    const formatCurrency = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

    document.getElementById('lumpTotalValue').innerText = formatCurrency(Math.round(M));
    document.getElementById('lumpEstReturns').innerText = formatCurrency(Math.round(estReturns));
    document.getElementById('lumpResult').style.display = 'block';
}

// CAGR Calculator Logic
// Formula: CAGR = [(End / Start) ^ (1/n)] - 1
function calculateCAGR() {
    const startValue = parseFloat(document.getElementById('cagrStart').value);
    const endValue = parseFloat(document.getElementById('cagrEnd').value);
    const years = parseFloat(document.getElementById('cagrYears').value);

    if(isNaN(startValue) || isNaN(endValue) || isNaN(years) || startValue <= 0 || endValue <= 0 || years <= 0) {
        alert("कृपया सही संख्या दर्ज करें।");
        return;
    }

    const cagr = (Math.pow((endValue / startValue), (1 / years)) - 1) * 100;

    document.getElementById('cagrValue').innerText = cagr.toFixed(2) + "%";
    document.getElementById('cagrResult').style.display = 'block';
}

// EMI Calculator Logic
// Formula: E = P * r * (1 + r)^n / ((1 + r)^n - 1)
function calculateEMI() {
    const P = parseFloat(document.getElementById('emiAmount').value);
    const annualRate = parseFloat(document.getElementById('emiRate').value);
    const years = parseFloat(document.getElementById('emiYears').value);

    if(isNaN(P) || isNaN(annualRate) || isNaN(years) || P <= 0 || annualRate <= 0 || years <= 0) {
        alert("कृपया सही संख्या दर्ज करें।");
        return;
    }

    const r = (annualRate / 100) / 12; // monthly interest rate
    const n = years * 12; // total months

    const E = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    const totalPayment = E * n;
    const totalInterest = totalPayment - P;

    const formatCurrency = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

    document.getElementById('emiValue').innerText = formatCurrency(Math.round(E));
    document.getElementById('emiTotalPayment').innerText = formatCurrency(Math.round(totalPayment));
    document.getElementById('emiTotalInterest').innerText = formatCurrency(Math.round(totalInterest));
    document.getElementById('emiResult').style.display = 'block';
}

// Goal Planner Logic
// Formula: P = M / [ ({[1 + i]^n – 1} / i) × (1 + i) ] -> To find M: M = P * [ i / ({[1 + i]^n - 1} * (1 + i)) ]
function calculateGoalPlanner() {
    const targetAmount = parseFloat(document.getElementById('goalAmount').value);
    const years = parseFloat(document.getElementById('goalYears').value);
    const annualRate = parseFloat(document.getElementById('goalReturn').value);

    if(isNaN(targetAmount) || isNaN(years) || isNaN(annualRate) || targetAmount <= 0 || years <= 0 || annualRate <= 0) {
        alert("कृपया सही संख्या दर्ज करें।");
        return;
    }

    const n = years * 12; // total months
    const i = (annualRate / 100) / 12; // monthly interest rate

    // Calculate required monthly SIP
    // M = P * i / ( ( (1+i)^n - 1 ) * (1+i) )
    const requiredSIP = targetAmount * i / ( (Math.pow(1 + i, n) - 1) * (1 + i) );

    const formatCurrency = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

    document.getElementById('goalSIPValue').innerText = formatCurrency(Math.round(requiredSIP));
    document.getElementById('goalResult').style.display = 'block';
}

// Risk Profiler Logic
function calculateRiskProfile() {
    const q1 = parseInt(document.getElementById('riskQ1').value);
    const q2 = parseInt(document.getElementById('riskQ2').value);
    const q3 = parseInt(document.getElementById('riskQ3').value);

    const score = q1 + q2 + q3;

    let profileName = "";
    let profileDesc = "";
    let profileColor = "";

    if(score <= 4) {
        profileName = "Low Risk (सुरक्षित निवेशक)";
        profileDesc = "आप अपनी पूंजी सुरक्षित रखना पसंद करते हैं। फिक्स्ड डिपॉजिट और डेट म्यूचुअल फंड आपके लिए बेहतर हैं।";
        profileColor = "var(--success)";
    } else if(score <= 7) {
        profileName = "Moderate Risk (संतुलित निवेशक)";
        profileDesc = "आप जोखिम और रिटर्न में संतुलन चाहते हैं। लार्ज कैप स्टॉक्स और हाइब्रिड फंड आपके लिए अच्छे हैं।";
        profileColor = "var(--warning)";
    } else {
        profileName = "Aggressive Risk (जोखिम लेने वाले निवेशक)";
        profileDesc = "आप उच्च रिटर्न के लिए जोखिम लेने को तैयार हैं। स्मॉल/मिड कैप स्टॉक्स और इक्विटी म्यूचुअल फंड आपके लिए उत्तम हैं।";
        profileColor = "var(--danger)";
    }

    document.getElementById('riskProfileName').innerText = profileName;
    document.getElementById('riskProfileName').style.color = profileColor;
    document.getElementById('riskProfileDesc').innerText = profileDesc;

    document.getElementById('riskQuestions').style.display = 'none';
    document.getElementById('riskResult').style.display = 'block';
}

// Step-Up SIP Calculator Logic
function calculateStepUpSIP() {
    let P = parseFloat(document.getElementById('stepAmount').value);
    const stepUp = parseFloat(document.getElementById('stepUpRate').value) / 100;
    const annualRate = parseFloat(document.getElementById('stepReturn').value);
    const years = parseFloat(document.getElementById('stepYears').value);

    if(isNaN(P) || isNaN(stepUp) || isNaN(annualRate) || isNaN(years) || P <= 0 || years <= 0) {
        alert("कृपया सही संख्या दर्ज करें।");
        return;
    }

    const r = (annualRate / 100) / 12; // monthly rate
    let totalValue = 0;

    // Loop through each year
    for(let y = 1; y <= years; y++) {
        // Future value of 12 months of SIP at current P
        // M = P * [ ((1+r)^12 - 1) / r ] * (1+r)
        let yearlyInvestedFV = P * ((Math.pow(1 + r, 12) - 1) / r) * (1 + r);
        
        // This yearly chunk grows for the remaining years (years - y)
        let compoundedTillEnd = yearlyInvestedFV * Math.pow(1 + annualRate / 100, years - y);
        
        totalValue += compoundedTillEnd;
        
        // Step up the SIP amount for next year
        P = P * (1 + stepUp);
    }

    const formatCurrency = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
    document.getElementById('stepTotalValue').innerText = formatCurrency(Math.round(totalValue));
    document.getElementById('stepResult').style.display = 'block';
}

// Retirement Calculator Logic
function calculateRetirement() {
    const expense = parseFloat(document.getElementById('retireExpense').value);
    const yearsToRetire = parseFloat(document.getElementById('retireYears').value);
    const inflation = parseFloat(document.getElementById('retireInflation').value) / 100;

    if(isNaN(expense) || isNaN(yearsToRetire) || isNaN(inflation) || expense <= 0) return;

    // Future Expense = Current Expense * (1 + inflation)^years
    const futureExpenseMonthly = expense * Math.pow(1 + inflation, yearsToRetire);
    const futureExpenseYearly = futureExpenseMonthly * 12;

    // Rough rule of thumb: Multiply yearly expense by 25 to get required corpus (4% withdrawal rule)
    const requiredCorpus = futureExpenseYearly * 25;

    const formatCurrency = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
    document.getElementById('retireCorpus').innerText = formatCurrency(Math.round(requiredCorpus));
    document.getElementById('retireResult').style.display = 'block';
}

// Risk-Reward Calculator Logic
function calculateRiskReward() {
    const entry = parseFloat(document.getElementById('rrEntry').value);
    const sl = parseFloat(document.getElementById('rrStopLoss').value);
    const target = parseFloat(document.getElementById('rrTarget').value);

    if(isNaN(entry) || isNaN(sl) || isNaN(target) || entry === sl) return;

    const risk = Math.abs(entry - sl);
    const reward = Math.abs(target - entry);
    const ratio = (reward / risk).toFixed(2);

    document.getElementById('rrValue').innerText = `1 : ${ratio}`;
    document.getElementById('rrResult').style.display = 'block';
}

// Position Size Calculator Logic
function calculatePositionSize() {
    const capital = parseFloat(document.getElementById('psCapital').value);
    const riskPct = parseFloat(document.getElementById('psRiskPct').value);
    const slAmount = parseFloat(document.getElementById('psStopLossAmt').value);

    if(isNaN(capital) || isNaN(riskPct) || isNaN(slAmount) || slAmount <= 0) return;

    const maxRiskAmount = capital * (riskPct / 100);
    const shares = Math.floor(maxRiskAmount / slAmount);

    document.getElementById('psShares').innerText = shares + " Share(s)";
    document.getElementById('psResult').style.display = 'block';
}

// Financial Health Score Logic
function calculateHealthScore() {
    const q1 = parseInt(document.getElementById('fhQ1').value);
    const q2 = parseInt(document.getElementById('fhQ2').value);
    const q3 = parseInt(document.getElementById('fhQ3').value);
    const q4 = parseInt(document.getElementById('fhQ4').value);
    const q5 = parseInt(document.getElementById('fhQ5').value);

    const score = q1 + q2 + q3 + q4 + q5; // Max 100

    let msg = "";
    let color = "";

    if(score >= 80) {
        msg = "Excellent! आपकी वित्तीय स्थिति बहुत मजबूत है।";
        color = "var(--success)";
    } else if(score >= 50) {
        msg = "Good. लेकिन आपको अपने निवेश और बचत पर थोड़ा और ध्यान देने की आवश्यकता है।";
        color = "var(--warning)";
    } else {
        msg = "Poor. आपको तुरंत एक वित्तीय योजनाकार (Financial Planner) की आवश्यकता है।";
        color = "var(--danger)";
    }

    document.getElementById('fhScore').innerText = `${score}/100`;
    document.getElementById('fhScore').style.color = color;
    document.getElementById('fhMsg').innerText = msg;
    document.getElementById('fhResult').style.display = 'block';
}

// Portfolio X-Ray Logic
function calculateXRay() {
    const equity = parseFloat(document.getElementById('pxEquity').value);
    const debt = parseFloat(document.getElementById('pxDebt').value);
    const gold = parseFloat(document.getElementById('pxGold').value);

    if(isNaN(equity) || isNaN(debt) || isNaN(gold)) return;

    const total = equity + debt + gold;
    if(total !== 100) {
        alert("तीनों का कुल योग 100% होना चाहिए।");
        return;
    }

    let score = 0;
    let msg = "";

    // Simple rule-based scoring
    if(equity >= 40 && equity <= 70) score += 4;
    else if(equity > 70) score += 2; // Aggressive
    else score += 2; // Conservative

    if(debt >= 20 && debt <= 50) score += 4;
    else score += 2;

    if(gold >= 5 && gold <= 15) score += 2;
    else score += 1;

    if(score >= 8) {
        msg = "आपका पोर्टफोलियो बहुत अच्छी तरह से डायवर्सिफाइड है।";
    } else if(score >= 5) {
        msg = "डायवर्सिफिकेशन ठीक है, लेकिन सुधार की गुंजाइश है।";
    } else {
        msg = "आपका पोर्टफोलियो असंतुलित है। कृपया राहुल जी पलासिया से संपर्क करें।";
    }

    document.getElementById('pxScore').innerText = `${score}/10`;
    document.getElementById('pxMsg').innerText = msg;
    document.getElementById('pxResult').style.display = 'block';
}

// Tax Saving Planner Logic
function calculateTaxPlan() {
    const income = parseFloat(document.getElementById('taxIncome').value);
    const hasEPF = document.getElementById('taxEPF').value;

    if(isNaN(income) || income <= 0) return;

    let listHTML = "";

    if(income <= 500000) {
        listHTML = "<li>आपकी आय ₹5 लाख से कम है, इसलिए आपको कोई टैक्स नहीं देना है। निवेश भविष्य के लिए करें, टैक्स बचाने के लिए नहीं।</li>";
    } else {
        listHTML += `<li><strong>Section 80C (Max ₹1.5L):</strong> ${hasEPF === 'yes' ? 'आपका कुछ हिस्सा पहले से EPF में जा रहा है।' : ''} बाकी बचे हिस्से के लिए ELSS (Tax Saving Mutual Funds) या PPF में निवेश करें।</li>`;
        listHTML += `<li><strong>Section 80CCD(1B) (Max ₹50,000):</strong> NPS (National Pension System) में निवेश करके अतिरिक्त टैक्स बचाएं।</li>`;
        listHTML += `<li><strong>Section 80D (Health Insurance):</strong> अपने और परिवार के लिए हेल्थ इन्शुरन्स लें और ₹25,000 से ₹75,000 तक की छूट पाएं।</li>`;
        
        if(income > 1000000) {
            listHTML += `<li><strong>विशेष सलाह:</strong> आपकी आय अधिक है। राहुल जी पलासिया से मिलकर अपनी एक विस्तृत टैक्स प्लानिंग करवाएं।</li>`;
        }
    }

    document.getElementById('taxList').innerHTML = listHTML;
    document.getElementById('taxResult').style.display = 'block';
}

// AI Investment Assistant Logic
function askAI() {
    const queryVal = document.getElementById('aiQuery').value;
    const chatBox = document.getElementById('chatBox');

    let userMsg = "";
    let aiResponse = "";

    switch(queryVal) {
        case "1":
            userMsg = "₹5000 की SIP कहाँ शुरू करूँ?";
            aiResponse = "अगर आपका नज़रिया 5 साल से अधिक का है, तो Flexi-Cap या Large & Mid Cap फंड्स अच्छे विकल्प हैं। अधिक जानकारी के लिए 'परामर्श बुक करें'।";
            break;
        case "2":
            userMsg = "सबसे अच्छा म्यूचुअल फंड कौन सा है?";
            aiResponse = "सबसे अच्छा फंड आपके वित्तीय लक्ष्य और रिस्क प्रोफाइल पर निर्भर करता है। कृपया हमारा 'रिस्क प्रोफाइलर' टूल आज़माएं!";
            break;
        case "3":
            userMsg = "मार्केट क्रैश हो रहा है, क्या करूँ?";
            aiResponse = "मार्केट गिरावट एक अवसर हो सकता है! अपनी SIP जारी रखें और यदि आपके पास अतिरिक्त नकदी है, तो अच्छे स्टॉक्स में निवेश करें। घबराएं नहीं।";
            break;
        case "4":
            userMsg = "राहुल जी पलासिया से बात करनी है।";
            aiResponse = "बिल्कुल! आप सीधे उन्हें WhatsApp (+91 98284 14285) पर मैसेज कर सकते हैं या नीचे दिए गए 'संपर्क फॉर्म' को भर सकते हैं।";
            break;
    }

    const newUserChat = `<p style="font-size: 14px; margin-bottom: 10px; color: var(--secondary);"><strong>आप:</strong> ${userMsg}</p>`;
    const newAIChat = `<p style="font-size: 14px; margin-bottom: 10px;"><strong>AI:</strong> ${aiResponse}</p>`;

    chatBox.innerHTML += newUserChat + newAIChat;
    
    // Auto scroll to bottom
    chatBox.scrollTop = chatBox.scrollHeight;
}
