
// This is your new function. To start, set the name and path on the left.

const PROMPT_ID = {
  DANGER: "danger",
  LANGUAGE: "language",
  CRIME: "crime",
  BYE: "bye",
}


const LANGUAGE = {
  EN: "en",
  ZHT: "zht",
  ZHC: "zhc",
  HI: "hi",
  /*
  JA: "ja",
  KA: "ka",
  VI: "vi",
  TL: "tl",
  ES: "es",
  */
}

const LANGUAGES = [
  {[LANGUAGE.EN]: "English"},
  {[LANGUAGE.ZHT]: "Traditional Chinese"},
  {[LANGUAGE.ZHC]: "Simplified Chinese"},
  {[LANGUAGE.HI]: "Hindi"},
  //{[LANGUAGE.ES]: "Spanish"},
];

const PROMPT_DANGER = {
  id: PROMPT_ID.DANGER,
  [LANGUAGE.EN]: `Are you in physical danger? 
    1 Yes
    2 No`,
};

const PROMPT_LANGUAGE = {
  id: PROMPT_ID.LANGUAGE,
  [LANGUAGE.EN]: "What language do you prefer to respond in?\n" + LANGUAGES.map((langObj, i) => `${i+1} if ${Object.values(langObj)[0]}`).join("\n"),
  //"What language do you prefer to respond in?\n1 if English\n2 if Traditional Chinese\n",  //3 if Simplified Chinese\n4 if Korean\n5 if Tagalog\n6 if Vietnamese\nif Japanese\n8 if Hindi\n9 if Spanish
};

const PROMPT_CRIME = {
  id: PROMPT_ID.CRIME,
    [LANGUAGE.EN]: `What kind of incident are you reporting?
      1 Physical harm
      2 Threat of physical harm
      3 Verbal harassment/racial slur
      4 Refusal of Service from a business
      5 Vandalism/Graffiti
      6 Other (please give detail)`,
    [LANGUAGE.ZHT]: `你要舉報什麼樣的罪行？
      1 身體傷害
      2 身體傷害威脅
      3 言語騷擾/種族誹謗
      4 拒絕服務
      5 故意破壞/塗鴉
      6 其他(請提供詳細信息)`,
    [LANGUAGE.ZHC]: `您报告什么样的事件？
      1 个身体伤害
      2 人身伤害的威胁
      3 口语骚扰
      4 企业拒绝服务
      5 故意破坏
      6 其他（请提供详细信息）`,
    [LANGUAGE.HI]: `आप किस तरह की घटना की रिपोर्ट कर रहे हैं?
      1 शारीरिक नुकसान
      2 शारीरिक नुकसान का खतरा
      3 मौखिक उत्पीड़न
      4 एक व्यवसाय से सेवा से इनकार
      5 बर्बरता
      6 अन्य (कृपया विवरण दें)`,
};

const PROMPT_MEDIA = {
  [LANGUAGE.EN]: "Do you have a photo or video of the assailant? If so, can you send it?",
  [LANGUAGE.ZHT]: "您有襲擊者的照片或視頻嗎？如果是這樣，您可以發送嗎？",
  [LANGUAGE.ZHC]: "您有袭击者的照片或视频吗？如果是这样，您可以发送吗？",
  [LANGUAGE.HI]: `क्या आपके पास हमलावर की तस्वीर या वीडियो है? यदि हां, तो क्या आप इसे भेज सकते हैं?`,
};

const PROMPT_WHEN = {
  [LANGUAGE.EN]: `When did it happen?
    1 Just now
    2 Today
    3 Other date (please enter as MM/DD/YYYY)`,
  [LANGUAGE.ZHT]: `什麼時候發生的？
    1 剛才
    2 今天
    3 其他日期（請輸入MM/DD/YYYY）`,
  [LANGUAGE.ZHC]: `什么时候发生的？
    1 刚才
    2 今天
    3 其他日期（请输入MM/DD/YYYY）`,
  [LANGUAGE.HI]: `यह कब हुआ?
    1 अभी
    2 आज
    3 अन्य दिनांक (कृपया मिमी/डीडी/yyyy के रूप में दर्ज करें)`,
};

const PROMPT_WHERE = {
  [LANGUAGE.EN]: "Where did this happen? Cross streets, Address, City, Zipcode, State, Local landmark",
  [LANGUAGE.ZHT]: "這發生在哪裡？ 十字路口、地址、城市、郵政編碼、州、當地地標",
  [LANGUAGE.ZHC]: "这是在哪里发生的？跨街，地址，城市，邮政编码，州，当地地标",
  [LANGUAGE.HI]: `यह कहाँ हुआ? क्रॉस सड़कों, पता, शहर, ज़िपकोड, राज्य, स्थानीय लैंडमार्क`,
};

const PROMPT_AGE = {
  [LANGUAGE.EN]: `What is your age?
    1 60+
    2 50-59
    3 40-49
    4 30-39
    5 20-29
    6 under 19`,
  [LANGUAGE.ZHT]: `你幾歲？
    1 60+
    2 50-59
    3 40-49
    4 30-39
    5 20-29
    6以下19歲`,
  [LANGUAGE.ZHC]: `你几岁？
    1 60+
    2 50-59
    3 40-49
    4 30-39
    5 20-29
    6 以下19岁`,
  [LANGUAGE.HI]: `तुम्हारी उम्र क्या हैं?
    1 60+
    2 50-59
    3 40-49
    4 30-39
    5 20-29
    6 अंडर 19`,
};

const PROMPT_FOLLOWUP = {
  [LANGUAGE.EN]: `Would you be willing to be contacted about this at a later date?
    1 Yes
    2 No`,
  [LANGUAGE.ZHT]: `您是否願意稍後就此事與您聯繫？
    1 是
    2 不是`,
  [LANGUAGE.ZHC]: `您是否愿意在以后与您联系（如有必要）？
    1是
    2不`,
  [LANGUAGE.HI]: `क्या आप बाद की तारीख (यदि आवश्यक हो) पर संपर्क करने के लिए तैयार होंगे?
    1 हाँ
    2 नहीं`,
};

const PROMPT_PRIVACY = {
  [LANGUAGE.EN]: `Do you agree to opt-in to the privacy policy and terms of service that can be found at https://www.reporthate.info/privacy?
    1 Yes
    2 No
  `,
  [LANGUAGE.ZHT]: `您是否同意選擇可以在https://www.reporthate.info/privacy上找到的隱私政策和服務條款？
    1是
    2不
  `,
  [LANGUAGE.ZHC]: `您是否同意选择可以在https://www.reporthate.info/privacy上找到的隐私政策和服务条款？
    1是
    2不
  `,
  [LANGUAGE.HI]: `क्या आप गोपनीयता नीति और सेवा की शर्तों के लिए ऑप्ट-इन करने के लिए सहमत हैं जो https://www.reporthate.info/privacy पर देखे जा सकते हैं?
    1 हाँ
    2 नहीं`,
}

const PROMPT_BYE = {
  id: PROMPT_ID.BYE,
  [LANGUAGE.EN]: `Thank you. Your responses have been recorded and will be handed over to the appropriate authorities. Together we will all "STOPH8"`,
  [LANGUAGE.ZHT]: `謝謝你。您的答复已被記錄下來，並將移交給適當的當局。我們將共同“stoph8”`,
  [LANGUAGE.ZHC]: `谢谢你。您的答复已被记录下来，并将移交给适当的当局。我们将共同“stoph8”`,
  [LANGUAGE.HI]: `धन्यवाद। आपकी प्रतिक्रियाएं दर्ज की गई हैं और उन्हें उपयुक्त अधिकारियों को सौंप दिया जाएगा। साथ में हम सभी "stoph8" करेंगे`,
}

const PROMPTS = [
  PROMPT_DANGER,
  PROMPT_LANGUAGE,
  PROMPT_CRIME,
  PROMPT_MEDIA,
  PROMPT_WHEN,
  PROMPT_WHERE,
  PROMPT_AGE,
  PROMPT_FOLLOWUP,
  PROMPT_PRIVACY,
  PROMPT_BYE,
];

exports.handler = (context, event, callback) => {
  let body = event.Body;

  // Initialize a new Response and some TwiML
  const response = new Twilio.Response();
  const twiml = new Twilio.twiml.MessagingResponse();

  // Cookies are accessed by name from the event.request.cookies object
  // If the user doesn't have a count yet, initialize it to zero. Cookies are
  // always strings, so you'll need to convert the count to a number
  let promptIndex = Number(event.request.cookies.promptIndex) || 0;
  let language = event.request.cookies.language || LANGUAGE.EN;

  
  
  const prompt = PROMPTS[promptIndex];

  // Çurrent prompt has to be the one after language prompt aka Body is responding to previous prompt.
  const promptIndexLanguage = PROMPTS.findIndex(promptObj => promptObj.id === PROMPT_ID.LANGUAGE);
  //let debug = `index: ${promptIndex}\nlanguage: ${language}\nbody: ${body}\n langIndex: ${promptIndexLanguage}`;
  if (promptIndex === promptIndexLanguage + 1) {
    body = Number(body) - 1;
    language = Object.keys(LANGUAGES[body])[0] || LANGUAGE.EN;
  }
  
  let message = prompt[language];
  
  twiml.message(message);
  promptIndex++;

  response
    // Add the stringified TwiML to the response body
    .setBody(twiml.toString())
    // Since we're returning TwiML, the content type must be XML
    .appendHeader('Content-Type', 'text/xml')
    // You can increment the count state for the next message, or any other
    // operation that makes sense for your application's needs. Remember
    // that cookies are always stored as strings
    .setCookie('promptIndex', promptIndex.toString())
  
  if (language !== null) {
    response.setCookie('language', language)
  }


  if (promptIndex >= PROMPTS.length) {
    response.removeCookie('promptIndex');
    response.removeCookie('language');
  }

  return callback(null, response);
};
