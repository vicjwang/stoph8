
// This is your new function. To start, set the name and path on the left.

const PROMPTS_INTRO = [
  "Are you in physical danger?\n1 if yes\n2 if no",
  "What language do you prefer to respond in?\n1 if English\n2 if Traditional Chinese\n",  //3 if Simplified Chinese\n4 if Korean\n5 if Tagalog\n6 if Vietnamese\nif Japanese\n8 if Hindi\n9 if Spanish
];

const PROMPTS_EN = [
  "What kind of incident are you reporting? \n1 if Physical Harm\n2 if Threat of physical harm\n3 if Verbal harassment/racial slur\n4 if Refusal of Service from a business\n5 if Vandalism/Graffiti\n6 if Other (please give detail)",
  "Thank you. Your responses will be forwarded to the appropriate authorities and combined with other information from other victims and witnesses. Together we will all STOPH8",
];

const PROMPTS_ZHT = [
  "你要舉報什麼樣的罪行？ \n1 身體傷害\n2 身體傷害威脅\n3 言語騷擾/種族誹謗\n4 拒絕服務\n5 故意破壞/塗鴉\n6 其他(請提供詳細信息)",
  "謝謝。您的回復將轉發給有關當局，並結合其他受害者和證人的其他信息。我們將一起 STOPH8",
];

const LANGUAGE = {
  EN: "en",
  ZHT: "zht"
}

const LANGUAGE_PROMPTS = {
  [LANGUAGE.EN]: PROMPTS_EN,
  [LANGUAGE.ZHT]: PROMPTS_ZHT
}

exports.handler = (context, event, callback) => {
  let body = event.Body;

  // Initialize a new Response and some TwiML
  const response = new Twilio.Response();
  const twiml = new Twilio.twiml.MessagingResponse();

  // Cookies are accessed by name from the event.request.cookies object
  // If the user doesn't have a count yet, initialize it to zero. Cookies are
  // always strings, so you'll need to convert the count to a number
  let promptIndex = Number(event.request.cookies.promptIndex) || 0;
  let language = event.request.cookies.language || null;

  if (promptIndex === PROMPTS_INTRO.length) {
    body = Number(body);
    switch (body) {
      case 1:
        language = LANGUAGE.EN;
        break;
      case 2:
        language = LANGUAGE.ZHT;
        break;
      default:
    }
  }

  let message = ""; //`body: ${body}\nindex: ${promptIndex}\nlanguage: ${language} ${typeof language}`;
  if (language === null) {
    message = `${message}\n${PROMPTS_INTRO[promptIndex]}`;
  } else {
    message = `${message}\n${LANGUAGE_PROMPTS[language][promptIndex - PROMPTS_INTRO.length]}`;
  }
  
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


  if (promptIndex >= PROMPTS_INTRO.length + PROMPTS_EN.length) {
    response.removeCookie('promptIndex');
    response.removeCookie('language');
  }

  return callback(null, response);
};

