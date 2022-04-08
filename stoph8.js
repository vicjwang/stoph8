
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
  //ES: "es",
}

const LANGUAGES = [
  {[LANGUAGE.EN]: "English"},
  {[LANGUAGE.ZHT]: "Traditional Chinese"},
  //{[LANGUAGE.ES]: "Spanish"},
];

const PROMPT_DANGER = {
  id: PROMPT_ID.DANGER,
  [LANGUAGE.EN]: "Are you in physical danger?\n1 if yes\n2 if no",
};

const PROMPT_LANGUAGE = {
  id: PROMPT_ID.LANGUAGE,
  [LANGUAGE.EN]: "What language do you prefer to respond in?\n" + LANGUAGES.map((langObj, i) => `${i+1} if ${Object.values(langObj)[0]}`).join("\n"),
  //"What language do you prefer to respond in?\n1 if English\n2 if Traditional Chinese\n",  //3 if Simplified Chinese\n4 if Korean\n5 if Tagalog\n6 if Vietnamese\nif Japanese\n8 if Hindi\n9 if Spanish
};

const PROMPT_CRIME = {
  id: PROMPT_ID.CRIME,
    [LANGUAGE.EN]: "What kind of incident are you reporting? \n1 if Physical Harm\n2 if Threat of physical harm\n3 if Verbal harassment/racial slur\n4 if Refusal of Service from a business\n5 if Vandalism/Graffiti\n6 if Other (please give detail)",
    [LANGUAGE.ZHT]: "你要舉報什麼樣的罪行？ \n1 身體傷害\n2 身體傷害威脅\n3 言語騷擾/種族誹謗\n4 拒絕服務\n5 故意破壞/塗鴉\n6 其他(請提供詳細信息)",

};

const PROMPT_MEDIA = {

};

const PROMPT_WHEN = {

};

const PROMPT_WHERE = {

};

const PROMPT_AGE = {

};

const PROMPT_FOLLOWUP = {

};

const PROMPT_BYE = {
  id: PROMPT_ID.BYE,
  [LANGUAGE.EN]: "Thank you. Your responses will be forwarded to the appropriate authorities and combined with other information from other victims and witnesses. Together we will all STOPH8",
  [LANGUAGE.ZHT]: "謝謝。您的回復將轉發給有關當局，並結合其他受害者和證人的其他信息。我們將一起 STOPH8",
}

const PROMPTS = [
  PROMPT_DANGER,
  PROMPT_LANGUAGE,
  PROMPT_CRIME,
  //PROMPT_MEDIA,
  //PROMPT_WHEN,
  //PROMPT_WHERE,
  //PROMPT_AGE,
  //PROMPT_FOLLOWUP,
  PROMPT_BYE
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
