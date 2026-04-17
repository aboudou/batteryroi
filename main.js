function calculate() {
  const cost       = parseFloat(document.getElementById('cost').value)        || 2500;
  const buyPrice   = parseFloat(document.getElementById('buyPrice').value)    || 0.21;
  const sellPrice  = parseFloat(document.getElementById('sellPrice').value)   ?? 0.13;
  const capacity   = parseFloat(document.getElementById('capacity').value)    || 5.12;
  const cycles     = parseFloat(document.getElementById('cycles').value)      || 6000;
  const eolCap     = parseFloat(document.getElementById('eolCapacity').value) || 80;
  const dod        = parseFloat(document.getElementById('dod').value)         || 90;
  const dodRef     = parseFloat(document.getElementById('dodRef').value)      || 90;
  const efficiency = parseFloat(document.getElementById('efficiency').value)  || 90;

  // Correction cycles selon la profondeur de décharge (loi puissance, exposant 1,2 typique LFP)
  const adjustedCycles    = cycles * Math.pow(dodRef / dod, 1.2);
  const grossDischarge    = capacity * adjustedCycles;
  const avgCapacityFactor = (1 + eolCap / 100) / 2;
  const effectiveEnergy   = grossDischarge * (dod / 100) * (efficiency / 100) * avgCapacityFactor;
  const savingsPerKwh     = buyPrice - sellPrice;
  const totalSavings      = effectiveEnergy * savingsPerKwh;
  const netResult         = totalSavings - cost;
  const profitable        = totalSavings > cost;

  const fmt     = (n) => n.toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  const fmtSign = (n) => (n >= 0 ? '+' : '−') + fmt(Math.abs(n));

  const resultEl = document.getElementById('result');
  resultEl.style.display = 'block';
  resultEl.className = profitable ? 'result-profitable' : 'result-loss';

  resultEl.innerHTML = `
    <div class="result-verdict">${profitable ? '● Rentable' : '● Non rentable'}</div>
    <div class="result-amount">${fmtSign(netResult)}&thinsp;<span class="result-currency">€</span></div>
    <div class="result-sub">${profitable
      ? "La batterie génère plus d'économies que son coût d'installation."
      : "Le coût d'installation dépasse les économies générées sur toute la durée de vie."
    }</div>
    <div class="result-details">
      <div class="detail-item">
        <div class="detail-label">Coût install.</div>
        <div class="detail-value">${fmt(cost)} €</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">Économies totales</div>
        <div class="detail-value">${fmt(totalSavings)} €</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">Cycles corrigés</div>
        <div class="detail-value">${fmt(adjustedCycles)}</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">Énergie utile</div>
        <div class="detail-value">${fmt(effectiveEnergy)} kWh</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">Gain / kWh</div>
        <div class="detail-value">${(savingsPerKwh * 100).toFixed(0)} c€</div>
      </div>
    </div>
  `;

  resultEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
