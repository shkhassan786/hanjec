document.addEventListener('DOMContentLoaded', () => {
  // Elements - primary phone
  const mobileInput = document.getElementById('mobile-input');
  const sendBtn = document.getElementById('send-otp-btn');
  const otpSectionPrimary = document.getElementById('otp-section-primary');
  const otpInputPrimary = document.getElementById('otp-input-primary');
  const verifyBtnPrimary = document.getElementById('verify-otp-btn-primary');
  const otpStatusPrimary = document.getElementById('otp-status-primary');
  const verifiedPhone = document.getElementById('verified-phone');

  // Aadhaar elements
  const aadhaarNumber = document.getElementById('aadhaar-number');
  const aadhaarMobile = document.getElementById('aadhaar-mobile');
  const sendAadhaarBtn = document.getElementById('send-otp-btn-aadhaar');
  const otpSectionAadhaar = document.getElementById('otp-section-aadhaar');
  const otpInputAadhaar = document.getElementById('otp-input-aadhaar');
  const verifyBtnAadhaar = document.getElementById('verify-otp-btn-aadhaar');
  const otpStatusAadhaar = document.getElementById('otp-status-aadhaar');
  const aadhaarUpload = document.getElementById('aadhaar-upload');
  const aadhaarVerifiedHidden = document.getElementById('aadhaar-verified');

  // PAN elements
  const panNumber = document.getElementById('pan-number');
  const panMobile = document.getElementById('pan-mobile');
  const sendPanBtn = document.getElementById('send-otp-btn-pan');
  const otpSectionPan = document.getElementById('otp-section-pan');
  const otpInputPan = document.getElementById('otp-input-pan');
  const verifyBtnPan = document.getElementById('verify-otp-btn-pan');
  const otpStatusPan = document.getElementById('otp-status-pan');
  const panUpload = document.getElementById('pan-upload');
  const panVerifiedHidden = document.getElementById('pan-verified');

  // Common
  const chk = document.getElementById('authorize-checkbox');
  const registerBtn = document.getElementById('register-btn');
  const nameInput = document.getElementById('authorize-name');
  const form = document.getElementById('supplier-form');

  const stateSelect = document.getElementById('state-select');
  const districtSelect = document.getElementById('district-select');

  if (!form) { console.error('Form not found.'); return; }

  // ---------- States/districts (same mapping as before) ----------
  const states = [
    "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
    "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka",
    "Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram",
    "Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana",
    "Tripura","Uttar Pradesh","Uttarakhand","West Bengal",
    "Andaman and Nicobar Islands","Chandigarh","Dadra and Nagar Haveli and Daman and Diu",
    "Delhi","Jammu and Kashmir","Ladakh","Lakshadweep","Puducherry"
  ];
  const districtsByState = {
    "Maharashtra": ["All Districts","Ahmednagar","Akola","Amravati","Aurangabad","Beed","Bhandara","Buldhana","Chandrapur","Dhule","Gadchiroli","Gondia","Hingoli","Jalgaon","Jalna","Kolhapur","Latur","Mumbai","Nagpur","Nanded","Nandurbar","Nashik","Osmanabad","Palghar","Parbhani","Pune","Raigad","Ratnagiri","Sangli","Satara","Sindhudurg","Thane","Wardha","Washim","Yavatmal"],
    "Karnataka": ["All Districts","Bagalkot","Bengaluru Rural","Bengaluru Urban","Belagavi","Ballari","Bidar","Chamarajanagar","Chikkamagaluru","Chitradurga","Dakshina Kannada","Davanagere","Dharwad","Gadag","Hassan","Haveri","Kalaburagi","Kodagu","Kolar","Koppal","Mandya","Mysuru","Raichur","Ramanagara","Shivamogga","Tumakuru","Udupi","Uttara Kannada","Vijayapura","Yadgir"],
    "Tamil Nadu": ["All Districts","Ariyalur","Chengalpattu","Chennai","Coimbatore","Cuddalore","Dharmapuri","Dindigul","Erode","Kallakurichi","Kancheepuram","Kanyakumari","Karur","Krishnagiri","Madurai","Nagapattinam","Namakkal","Nilgiris","Perambalur","Pudukkottai","Ramanathapuram","Ranipet","Salem","Sivaganga","Tenkasi","Thanjavur","Theni","Thiruvallur","Thiruvarur","Thiruchirappalli","Thirunelveli","Tirupathur","Tiruppur","Tiruvannamalai","Vellore","Viluppuram","Virudhunagar"],
    "Uttar Pradesh": ["All Districts","Agra","Aligarh","Prayagraj","Ambedkar Nagar","Amethi","Amroha","Auraiya","Azamgarh","Badaun","Baghpat","Bahraich","Ballia","Balrampur","Banda","Barabanki","Bareilly","Basti","Bijnor","Budaun","Bulandshahr","Chandauli","Chitrakoot","Deoria","Etah","Etawah","Farrukhabad","Fatehpur","Firozabad","Gautam Buddha Nagar","Ghaziabad","Ghazipur","Gonda","Gorakhpur","Hamirpur","Hapur","Hardoi","Hathras","Jalaun","Jaunpur","Jhansi","Kannauj","Kanpur Dehat","Kanpur Nagar","Kasganj","Kaushambi","Kushinagar","Lakhimpur Kheri","Lalitpur","Lucknow","Maharajganj","Mahoba","Mainpuri","Mathura","Mau","Meerut","Mirzapur","Moradabad","Muzaffarnagar","Pilibhit","Pratapgarh","Raebareli","Rampur","Saharanpur","Sambhal","Sant Kabir Nagar","Sultanpur","Shahjahanpur","Shrawasti","Siddharthnagar","Sitapur","Sonbhadra","Sultanpur","Unnao","Varanasi"],
    "West Bengal": ["All Districts","Alipurduar","Bankura","Birbhum","Cooch Behar","Dakshin Dinajpur","Darjeeling","Hooghly","Howrah","Jalpaiguri","Jhargram","Kalimpong","Kolkata","Malda","Murshidabad","Nadia","North 24 Parganas","Paschim Bardhaman","Paschim Medinipur","Purba Bardhaman","Purba Medinipur","Purulia","South 24 Parganas","Uttar Dinajpur"],
    "Delhi": ["All Districts","Central Delhi","East Delhi","New Delhi","North Delhi","North East Delhi","North West Delhi","Shahdara","South Delhi","South East Delhi","South West Delhi","West Delhi"],
    "Bihar": ["All Districts","Araria","Arwal","Aurangabad","Banka","Begusarai","Bhagalpur","Bhojpur","Buxar","Darbhanga","East Champaran","Gaya","Gopalganj","Jamui","Jehanabad","Kaimur","Katihar","Khagaria","Kishanganj","Lakhisarai","Madhepura","Madhubani","Munger","Muzaffarpur","Nalanda","Nawada","Patna","Purnia","Rohtas","Saharsa","Samastipur","Saran","Sheikhpura","Sheohar","Sitamarhi","Siwan","Supaul","Vaishali"],
    "Gujarat": ["All Districts","Ahmedabad","Amreli","Anand","Aravalli","Banaskantha","Bharuch","Bhavnagar","Botad","Chhota Udepur","Dahod","Dang","Devbhoomi Dwarka","Gandhinagar","Gir Somnath","Jamnagar","Junagadh","Kheda","Kutch","Mahisagar","Mehsana","Morbi","Narmada","Navsari","Patan","Panchmahal","Porbandar","Rajkot","Sabarkantha","Surat","Surendranagar","Tapi","Vadodara","Valsad"]
  };

  function populateStates() {
    if (!stateSelect) return;
    stateSelect.innerHTML = '<option value="">Select State / UT</option>';
    const allOpt = document.createElement('option');
    allOpt.value = "ALL";
    allOpt.textContent = "All States";
    stateSelect.appendChild(allOpt);
    states.forEach(s => {
      const o = document.createElement('option');
      o.value = s;
      o.textContent = s;
      stateSelect.appendChild(o);
    });
  }
  function populateDistrictsFor(state) {
    if (!districtSelect) return;
    districtSelect.innerHTML = '<option value="">Select District</option>';
    if (!state) { districtSelect.disabled = true; return; }
    if (state === 'ALL') {
      const o = document.createElement('option'); o.value = 'ALL_DISTRICTS'; o.textContent = 'All Districts'; districtSelect.appendChild(o); districtSelect.disabled = false; return;
    }
    const list = districtsByState[state];
    if (Array.isArray(list) && list.length) {
      list.forEach(d => { const o = document.createElement('option'); o.value = d; o.textContent = d; districtSelect.appendChild(o); });
      districtSelect.disabled = false;
    } else {
      const o = document.createElement('option'); o.value = 'ALL_DISTRICTS'; o.textContent = 'All Districts'; districtSelect.appendChild(o); districtSelect.disabled = false;
    }
  }
  populateStates();
  stateSelect?.addEventListener('change', e => populateDistrictsFor(e.target.value));

  // ---------- Firebase Phone Auth (OTP) for multiple numbers ----------
  if (!window.firebase || !firebase.auth) {
    console.warn('Firebase not initialized or firebase.auth missing. OTP will not work.');
  }

  // separate recaptcha verifiers and confirmationResults
  let recaptchaPrimary = null, recaptchaAadhaar = null, recaptchaPan = null;
  let confirmPrimary = null, confirmAadhaar = null, confirmPan = null;
  let phoneVerified = false, aadhaarVerified = false, panVerified = false;

  try { recaptchaPrimary = new firebase.auth.RecaptchaVerifier('recaptcha-container-primary', { size: 'invisible' }); } catch(e){ recaptchaPrimary = null; }
  try { recaptchaAadhaar = new firebase.auth.RecaptchaVerifier('recaptcha-container-aadhaar', { size: 'invisible' }); } catch(e){ recaptchaAadhaar = null; }
  try { recaptchaPan = new firebase.auth.RecaptchaVerifier('recaptcha-container-pan', { size: 'invisible' }); } catch(e){ recaptchaPan = null; }

  function setRegisterState() {
    registerBtn.disabled = !(phoneVerified && aadhaarVerified && panVerified && chk?.checked);
  }

  // ----- Primary phone send/verify -----
  sendBtn?.addEventListener('click', async () => {
    const phone = (mobileInput?.value || '').trim();
    if (!phone) { alert('Enter primary mobile with country code (e.g. +91...)'); return; }
    otpStatusPrimary.textContent = 'Sending OTP...';
    try {
      if (!recaptchaPrimary) recaptchaPrimary = new firebase.auth.RecaptchaVerifier('recaptcha-container-primary', { size: 'invisible' });
      await recaptchaPrimary.render();
      confirmPrimary = await firebase.auth().signInWithPhoneNumber(phone, recaptchaPrimary);
      otpSectionPrimary.style.display = 'block';
      otpStatusPrimary.textContent = 'OTP sent. Enter the code.';
    } catch (err) {
      console.error(err);
      otpStatusPrimary.textContent = 'Failed to send OTP: ' + (err.message || err);
      recaptchaPrimary = new firebase.auth.RecaptchaVerifier('recaptcha-container-primary', { size: 'invisible' });
    }
  });

  verifyBtnPrimary?.addEventListener('click', async () => {
    const code = (otpInputPrimary?.value || '').trim();
    if (!code || !confirmPrimary) { alert('Enter OTP or request again.'); return; }
    otpStatusPrimary.textContent = 'Verifying...';
    try {
      const res = await confirmPrimary.confirm(code);
      phoneVerified = true;
      verifiedPhone.value = res.user?.phoneNumber || mobileInput.value;
      otpStatusPrimary.textContent = 'Primary phone verified: ' + verifiedPhone.value;
      otpInputPrimary.disabled = true;
      verifyBtnPrimary.disabled = true;
      sendBtn.disabled = true;
      mobileInput.disabled = true;
      setRegisterState();
    } catch (err) {
      console.error(err);
      otpStatusPrimary.textContent = 'Invalid OTP. Try again.';
    }
  });

  // ----- Aadhaar send/verify -----
  sendAadhaarBtn?.addEventListener('click', async () => {
    const phone = (aadhaarMobile?.value || '').trim();
    const aad = (aadhaarNumber?.value || '').trim();
    if (!/^\d{12}$/.test(aad)) { alert('Enter valid 12-digit Aadhaar number.'); return; }
    if (!phone) { alert('Enter mobile number for Aadhaar OTP (+91...)'); return; }
    otpStatusAadhaar.textContent = 'Sending Aadhaar OTP...';
    try {
      if (!recaptchaAadhaar) recaptchaAadhaar = new firebase.auth.RecaptchaVerifier('recaptcha-container-aadhaar', { size: 'invisible' });
      await recaptchaAadhaar.render();
      confirmAadhaar = await firebase.auth().signInWithPhoneNumber(phone, recaptchaAadhaar);
      otpSectionAadhaar.style.display = 'flex';
      otpStatusAadhaar.textContent = 'OTP sent for Aadhaar. Enter the code.';
    } catch (err) {
      console.error(err);
      otpStatusAadhaar.textContent = 'Failed to send Aadhaar OTP: ' + (err.message || err);
      recaptchaAadhaar = new firebase.auth.RecaptchaVerifier('recaptcha-container-aadhaar', { size: 'invisible' });
    }
  });

  verifyBtnAadhaar?.addEventListener('click', async () => {
    const code = (otpInputAadhaar?.value || '').trim();
    if (!code || !confirmAadhaar) { alert('Enter Aadhaar OTP or request again.'); return; }
    otpStatusAadhaar.textContent = 'Verifying Aadhaar OTP...';
    try {
      const res = await confirmAadhaar.confirm(code);
      aadhaarVerified = true;
      aadhaarVerifiedHidden.value = '1';
      otpStatusAadhaar.textContent = 'Aadhaar verified for ' + (res.user?.phoneNumber || aadhaarMobile.value);
      otpInputAadhaar.disabled = true;
      verifyBtnAadhaar.disabled = true;
      sendAadhaarBtn.disabled = true;
      aadhaarMobile.disabled = true;
      aadhaarUpload.disabled = false;
      setRegisterState();
    } catch (err) {
      console.error(err);
      otpStatusAadhaar.textContent = 'Invalid Aadhaar OTP. Try again.';
    }
  });

  // ----- PAN send/verify -----
  sendPanBtn?.addEventListener('click', async () => {
    const phone = (panMobile?.value || '').trim();
    const pan = (panNumber?.value || '').trim();
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(pan)) { alert('Enter valid PAN (10 characters).'); return; }
    if (!phone) { alert('Enter mobile number for PAN OTP (+91...)'); return; }
    otpStatusPan.textContent = 'Sending PAN OTP...';
    try {
      if (!recaptchaPan) recaptchaPan = new firebase.auth.RecaptchaVerifier('recaptcha-container-pan', { size: 'invisible' });
      await recaptchaPan.render();
      confirmPan = await firebase.auth().signInWithPhoneNumber(phone, recaptchaPan);
      otpSectionPan.style.display = 'flex';
      otpStatusPan.textContent = 'OTP sent for PAN. Enter the code.';
    } catch (err) {
      console.error(err);
      otpStatusPan.textContent = 'Failed to send PAN OTP: ' + (err.message || err);
      recaptchaPan = new firebase.auth.RecaptchaVerifier('recaptcha-container-pan', { size: 'invisible' });
    }
  });

  verifyBtnPan?.addEventListener('click', async () => {
    const code = (otpInputPan?.value || '').trim();
    if (!code || !confirmPan) { alert('Enter PAN OTP or request again.'); return; }
    otpStatusPan.textContent = 'Verifying PAN OTP...';
    try {
      const res = await confirmPan.confirm(code);
      panVerified = true;
      panVerifiedHidden.value = '1';
      otpStatusPan.textContent = 'PAN verified for ' + (res.user?.phoneNumber || panMobile.value);
      otpInputPan.disabled = true;
      verifyBtnPan.disabled = true;
      sendPanBtn.disabled = true;
      panMobile.disabled = true;
      panUpload.disabled = false;
      setRegisterState();
    } catch (err) {
      console.error(err);
      otpStatusPan.textContent = 'Invalid PAN OTP. Try again.';
    }
  });

  // Authorize checkbox and register button
  chk?.addEventListener('change', () => setRegisterState());
  function setRegisterState() { registerBtn.disabled = !(phoneVerified && aadhaarVerified && panVerified && chk?.checked); }
  setRegisterState();

  registerBtn?.addEventListener('click', (e) => {
    if (!phoneVerified) { alert('Please verify primary mobile first.'); return; }
    if (!aadhaarVerified) { alert('Please verify Aadhaar OTP.'); return; }
    if (!panVerified) { alert('Please verify PAN OTP.'); return; }
    if (!chk?.checked) { alert('Please authorize before registering.'); return; }
    // optional signature check
    const signature = nameInput?.value?.trim() || '';
    if (!signature && !confirm('No signature name entered. Continue?')) return;
    // submit form
    form.submit();
  });
});