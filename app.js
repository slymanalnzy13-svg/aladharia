const getCalculatorElements = () => ({
  form: document.getElementById("xp-form"),
  jobSalesMessageEl: document.getElementById("jobSalesMessage"),
  currentLevelInput: document.getElementById("currentLevel"),
  targetLevelInput: document.getElementById("targetLevel"),
  xpPerSaleInput: document.getElementById("xpPerSale"),
  errorEl: document.getElementById("error"),
  totalXpEl: document.getElementById("totalXp"),
  salesNeededEl: document.getElementById("salesNeeded"),
  fromLevelEl: document.getElementById("fromLevel"),
  toLevelEl: document.getElementById("toLevel"),
  levelsCountEl: document.getElementById("levelsCount"),
});

const MAX_LEVEL = 400;

const JOBS = {
  farmer: {
    label: "وظيفة المزارع",
    unit: "عصير",
    tiers: [
      { from: 1, to: 2, amount: 375 },
      { from: 2, to: 3, amount: 625 },
      { from: 3, to: 4, amount: 625 },
      { from: 4, to: 5, amount: 875 },
    ],
  },
  shepherd: {
    label: "وظيفة المراعي",
    unit: "حليب",
    tiers: [],
  },
};

const XP_TABLE = {
  1: 0,
  2: 800,
  3: 2100,
  4: 3800,
  5: 6100,
  6: 9500,
  7: 12500,
  8: 16000,
  9: 19800,
  10: 24000,
  11: 28500,
  12: 33400,
  13: 38700,
  14: 44200,
  15: 50200,
  16: 56400,
  17: 63000,
  18: 69900,
  19: 77100,
  20: 84700,
  21: 92500,
  22: 100700,
  23: 109200,
  24: 118000,
  25: 127100,
  26: 136500,
  27: 146200,
  28: 156200,
  29: 166500,
  30: 177100,
  31: 188000,
  32: 199200,
  33: 210700,
  34: 222400,
  35: 234500,
  36: 246800,
  37: 259400,
  38: 272300,
  39: 285500,
  40: 299000,
  41: 312700,
  42: 326800,
  43: 341000,
  44: 355600,
  45: 370500,
  46: 385600,
  47: 401000,
  48: 416600,
  49: 432600,
  50: 448800,
  51: 465200,
  52: 482000,
  53: 499000,
  54: 516300,
  55: 533800,
  56: 551600,
  57: 569600,
  58: 588000,
  59: 606500,
  60: 625400,
  61: 644500,
  62: 663800,
  63: 683400,
  64: 703300,
  65: 723400,
  66: 743800,
  67: 764500,
  68: 785400,
  69: 806500,
  70: 827900,
  71: 849600,
  72: 871500,
  73: 893600,
  74: 916000,
  75: 938700,
  76: 961600,
  77: 984700,
  78: 1008100,
  79: 1031800,
  80: 1055700,
  81: 1079800,
  82: 1104200,
  83: 1128800,
  84: 1153700,
  85: 1178800,
  86: 1204200,
  87: 1229800,
  88: 1255600,
  89: 1281700,
  90: 1308100,
  91: 1334600,
  92: 1361400,
  93: 1388500,
  94: 1415800,
  95: 1443300,
  96: 1471100,
  97: 1499100,
  98: 1527300,
  99: 1555800,
  100: 1584350,
  101: 1612950,
  102: 1641600,
  103: 1670300,
  104: 1699050,
  105: 1727850,
  106: 1756700,
  107: 1785600,
  108: 1814550,
  109: 1843550,
  110: 1872600,
  111: 1901700,
  112: 1930850,
  113: 1960050,
  114: 1989300,
  115: 2018600,
  116: 2047950,
  117: 2077350,
  118: 2106800,
  119: 2136300,
  120: 2165850,
  121: 2195450,
  122: 2225100,
  123: 2254800,
  124: 2284550,
  125: 2314350,
  126: 2344200,
  127: 2374100,
  128: 2404050,
  129: 2434050,
  130: 2464100,
  131: 2494200,
  132: 2524350,
  133: 2554550,
  134: 2584800,
  135: 2615100,
  136: 2645450,
  137: 2675850,
  138: 2706300,
  139: 2736800,
  140: 2767350,
  141: 2797950,
  142: 2828600,
  143: 2859300,
  144: 2890050,
  145: 2920850,
  146: 2951700,
  147: 2982600,
  148: 3013550,
  149: 3044550,
  150: 3075600,
  151: 3106700,
  152: 3137850,
  153: 3169050,
  154: 3200300,
  155: 3231600,
  156: 3262950,
  157: 3294350,
  158: 3325800,
  159: 3357300,
  160: 3388850,
  161: 3420450,
  162: 3452100,
  163: 3483800,
  164: 3515550,
  165: 3547350,
  166: 3579200,
  167: 3611100,
  168: 3643050,
  169: 3675050,
  170: 3707100,
  171: 3739200,
  172: 3771350,
  173: 3803550,
  174: 3835800,
  175: 3868100,
  176: 3900450,
  177: 3932850,
  178: 3965300,
  179: 3997800,
  180: 4030350,
  181: 4062950,
  182: 4095600,
  183: 4128300,
  184: 4161050,
  185: 4193850,
  186: 4226700,
  187: 4259600,
  188: 4292550,
  189: 4325550,
  190: 4358600,
  191: 4391700,
  192: 4424850,
  193: 4458050,
  194: 4491300,
  195: 4524600,
  196: 4557950,
  197: 4591350,
  198: 4624800,
  199: 4658300,
  200: 4691850,
  201: 4725450,
  202: 4759100,
  203: 4792800,
  204: 4826550,
  205: 4860350,
  206: 4894200,
  207: 4928100,
  208: 4962050,
  209: 4996050,
  210: 5030100,
  211: 5064200,
  212: 5098350,
  213: 5132550,
  214: 5166800,
  215: 5201100,
  216: 5235450,
  217: 5269850,
  218: 5304300,
  219: 5338800,
  220: 5373350,
  221: 5407950,
  222: 5442600,
  223: 5477300,
  224: 5512050,
  225: 5546850,
  226: 5581700,
  227: 5616600,
  228: 5651550,
  229: 5686550,
  230: 5721600,
  231: 5756700,
  232: 5791850,
  233: 5827050,
  234: 5862300,
  235: 5897600,
  236: 5932950,
  237: 5968350,
  238: 6003800,
  239: 6039300,
  240: 6074850,
  241: 6110450,
  242: 6146100,
  243: 6181800,
  244: 6217550,
  245: 6253350,
  246: 6289200,
  247: 6325100,
  248: 6361050,
  249: 6397050,
  250: 6433100,
  251: 6469200,
  252: 6505350,
  253: 6541550,
  254: 6577800,
  255: 6614100,
  256: 6650450,
  257: 6686850,
  258: 6723300,
  259: 6759800,
  260: 6796350,
  261: 6832950,
  262: 6869600,
  263: 6906300,
  264: 6943050,
  265: 6979850,
  266: 7016700,
  267: 7053600,
  268: 7090550,
  269: 7127550,
  270: 7164600,
  271: 7201700,
  272: 7238850,
  273: 7276050,
  274: 7313300,
  275: 7350600,
  276: 7387950,
  277: 7425350,
  278: 7462800,
  279: 7500300,
  280: 7537850,
  281: 7575450,
  282: 7613100,
  283: 7650800,
  284: 7688550,
  285: 7726350,
  286: 7764200,
  287: 7802100,
  288: 7840050,
  289: 7878050,
  290: 7916100,
  291: 7954200,
  292: 7992350,
  293: 8030550,
  294: 8068800,
  295: 8107100,
  296: 8145450,
  297: 8183850,
  298: 8222300,
  299: 8260800,
  300: 8299350,
  301: 8337950,
  302: 8376600,
  303: 8415300,
  304: 8454050,
  305: 8492850,
  306: 8531700,
  307: 8570600,
  308: 8609550,
  309: 8648550,
  310: 8687600,
  311: 8726700,
  312: 8765850,
  313: 8805050,
  314: 8844300,
  315: 8883600,
  316: 8922950,
  317: 8962350,
  318: 9001800,
  319: 9041300,
  320: 9080850,
  321: 9120450,
  322: 9160100,
  323: 9199800,
  324: 9239550,
  325: 9279350,
  326: 9319200,
  327: 9359100,
  328: 9399050,
  329: 9439050,
  330: 9479100,
  331: 9519200,
  332: 9559350,
  333: 9599550,
  334: 9639800,
  335: 9680100,
  336: 9720450,
  337: 9760850,
  338: 9801300,
  339: 9841800,
  340: 9882350,
  341: 9922950,
  342: 9963600,
  343: 10004300,
  344: 10045050,
  345: 10085850,
  346: 10126700,
  347: 10167600,
  348: 10208550,
  349: 10249550,
  350: 10290600,
  351: 10331700,
  352: 10372850,
  353: 10414050,
  354: 10455300,
  355: 10496600,
  356: 10537950,
  357: 10579350,
  358: 10620800,
  359: 10662300,
  360: 10703850,
  361: 10745450,
  362: 10787100,
  363: 10828800,
  364: 10870550,
  365: 10912350,
  366: 10954200,
  367: 10996100,
  368: 11038050,
  369: 11080050,
  370: 11122100,
  371: 11164200,
  372: 11206350,
  373: 11248550,
  374: 11290800,
  375: 11333100,
  376: 11375450,
  377: 11417850,
  378: 11460300,
  379: 11502800,
  380: 11545350,
  381: 11587950,
  382: 11630600,
  383: 11673300,
  384: 11716050,
  385: 11758850,
  386: 11801700,
  387: 11844600,
  388: 11887550,
  389: 11930550,
  390: 11973600,
  391: 12016700,
  392: 12059850,
  393: 12103050,
  394: 12146300,
  395: 12189600,
  396: 12232950,
  397: 12276350,
  398: 12319800,
  399: 12363300,
  400: 12406850,
};

const formatNumber = (value) => new Intl.NumberFormat("ar").format(value);

const normalizeNumberInput = (value) =>
  value
    .toString()
    .replace(/[٠-٩]/g, (digit) => "٠١٢٣٤٥٦٧٨٩".indexOf(digit))
    .replace(/[۰-۹]/g, (digit) => "۰۱۲۳۴۵۶۷۸۹".indexOf(digit));

const parseNumberInput = (value) => {
  const normalized = normalizeNumberInput(value).trim();
  return normalized ? parseInt(normalized, 10) : NaN;
};


const calculate = () => {
  const {
    jobSalesMessageEl,
    currentLevelInput,
    targetLevelInput,
    xpPerSaleInput,
    errorEl,
    totalXpEl,
    salesNeededEl,
    fromLevelEl,
    toLevelEl,
    levelsCountEl,
  } = getCalculatorElements();

  if (
    !currentLevelInput ||
    !targetLevelInput ||
    !xpPerSaleInput ||
    !errorEl ||
    !totalXpEl ||
    !salesNeededEl ||
    !fromLevelEl ||
    !toLevelEl ||
    !levelsCountEl
  ) {
    return;
  }
  const currentLevel = parseNumberInput(currentLevelInput.value);
  const targetLevel = parseNumberInput(targetLevelInput.value);
  const xpPerSale = parseNumberInput(xpPerSaleInput.value);

  errorEl.textContent = "";

  if (Number.isNaN(currentLevel) || Number.isNaN(targetLevel)) {
    errorEl.textContent = "الرجاء إدخال أرقام صحيحة للمستويات.";
    return;
  }

  if (
    currentLevel < 1 ||
    targetLevel < 1 ||
    currentLevel > MAX_LEVEL ||
    targetLevel > MAX_LEVEL
  ) {
    errorEl.textContent = `الرجاء إدخال مستوى بين 1 و ${MAX_LEVEL}.`;
    return;
  }

  if (targetLevel <= currentLevel) {
    errorEl.textContent = "المستوى المطلوب يجب أن يكون أكبر من المستوى الحالي.";
    return;
  }

  const currentTotal = XP_TABLE[currentLevel];
  const targetTotal = XP_TABLE[targetLevel];

  if (currentTotal === undefined || targetTotal === undefined) {
    errorEl.textContent = "جدول الخبرة غير مكتمل. الرجاء التواصل مع الإدارة.";
    return;
  }
  const totalNeeded = targetTotal - currentTotal;
  const levelsCount = targetLevel - currentLevel;

  totalXpEl.textContent = formatNumber(totalNeeded);
  fromLevelEl.textContent = currentLevel;
  toLevelEl.textContent = targetLevel;
  levelsCountEl.textContent = formatNumber(levelsCount);

  if (!Number.isNaN(xpPerSale) && xpPerSale > 0) {
    const salesNeeded = Math.ceil(totalNeeded / xpPerSale);
    salesNeededEl.textContent = formatNumber(salesNeeded);
  } else {
    salesNeededEl.textContent = "—";
  }

  if (jobSalesMessageEl) {
    jobSalesMessageEl.textContent = "";
  }

};

const initCalculator = () => {
  const { form, errorEl } = getCalculatorElements();

  if (!form) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    calculate();
  });

  ["input", "change"].forEach((type) => {
    form.addEventListener(type, () => {
      if (errorEl && errorEl.textContent) {
        errorEl.textContent = "";
      }
    });
  });

  calculate();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCalculator);
} else {
  initCalculator();
}
