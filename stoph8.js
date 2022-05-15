const axios = require('axios');
const HATECRIMETRACKER_URL = 'https://api.tracker.1thing.org/incidents';
//const HATECRIMETRACKER_URL = ' https://270e-72-48-252-231.ngrok.io/incidents';
const SECRET = 'laksjdfpoqiweur092384-1023fmasdfs34';
INCIDENT_KEY = {
  WHERE: "incident_location",
  WHEN: "incident_time",
  INCIDENT: "incident",
  ID: "id",
};

const composePayload = ({when="", where="", incidentId=null} = {}) => {
  return {
  "secret": SECRET,
  "incident":
    {
      "abstract":"shortcode demo",
      "url":"https://shortcode.test.com",
      [INCIDENT_KEY.WHERE]: where,
      [INCIDENT_KEY.WHEN]: when,
      "title":"Shortcode Demo",
      "incident_source":"SHORTCODE",
      "created_by":"shortcode",
      [INCIDENT_KEY.ID]: incidentId,
    }
  };
};

AFFIRMATIVE = ["yes", "Yes", "Y", "1", 1];

const PROMPT_ID = {
  DANGER: "danger",
  LANGUAGE: "language",
  CRIME: "crime",
  WHEN: "when",
  WHERE: "where",
  BYE: "bye",
}

const LANGUAGE = {
  EN: "en",
  ZHT: "zht",
  ZHC: "zhc",
  HI: "hi",
  JA: "ja",
  KO: "ko",
  VI: "vi",
  TL: "tl",
  ES: "es",
  DE: "de",
  FR: "fr",
}

const LANGUAGES = [
  {[LANGUAGE.EN]: "English"},
  {[LANGUAGE.ZHT]: "繁體中文"},
  {[LANGUAGE.ZHC]: "简体中文"},
  {[LANGUAGE.HI]: "हिन्दी"},
  {[LANGUAGE.JA]: "日本語"},
  {[LANGUAGE.KO]: "한국어"},
  {[LANGUAGE.VI]: "Tiếng Việt"},
  {[LANGUAGE.TL]: "Tagalog"},
  {[LANGUAGE.CB]: "Cebuano"},
  {[LANGUAGE.ES]: "Español"},
  {[LANGUAGE.DE]: "Deutsch"},
  {[LANGUAGE.FR]: "Français"},
];

const PROMPT_DANGER = {
  id: PROMPT_ID.DANGER,
  [LANGUAGE.EN]: `Are you in physical danger? 
  1 - Yes
  2 - No`,
};

const RESPONSE_911 = `If this is an emergency, you are in immediate danger, or need medical assistance, please call 911 immediately.`;

const PROMPT_LANGUAGE = {
  id: PROMPT_ID.LANGUAGE,
  [LANGUAGE.EN]: "What language do you prefer to respond in?\n" + LANGUAGES.map((langObj, i) => `${i+1} - ${Object.values(langObj)[0]}`).join("\n"),
  /*
  "What language do you prefer to respond in?
  1 - English
  2 - 繁體中文
  3 - 简体中文
  4 - हिन्दी
  5 - 日本語
  6 - 한국어
  7 - Tiếng Việt
  8 - Tagalog
  9 - Cebuano
  10 - Español
  11 - Deutsch
  12 - Français"
  */
  //"What language do you prefer to respond in?\n1 if English\n2 if Traditional Chinese\n",  //3 if Simplified Chinese\n4 if Korean\n5 if Tagalog\n6 if Vietnamese\nif Japanese\n8 if Hindi\n9 if Spanish
};

const PROMPT_CRIME = {
  id: PROMPT_ID.CRIME,
    [LANGUAGE.EN]: `What kind of incident are you reporting? 
    1 - Physical Harm
    2 - Threat of Physical Harm
    3 - Verbal Harassment/Racial Slur
    4 - Refusal of Service from a business
    5 - Vandalism/Graffiti
    6 - Other (please give detail)`,
    [LANGUAGE.ZHT]: `請選擇您需要檢舉的事件類型：
    1 - 人身傷害
    2 - 人身暴力威脅
    3 - 語言侵犯/種族詆毀
    4 - 商家拒絕提供服務
    5 - 故意破壞物品/塗鴉
    6 - 其他（請提供詳情）`,
    [LANGUAGE.ZHC]: `请选择您需要举报的事件类型：
    1 - 人身伤害
    2 - 人身暴力威胁
    3 - 语言侵犯/种族诋毁
    4 - 商家拒绝提供服务
    5 - 故意破坏物品/涂鸦
    6 - 其他 (请提供详情)`,
    [LANGUAGE.HI]: `आप किस तरह की घटना की रिपोर्ट कर रहे हैं
    1 - शारीरिक नुकसान
    2 - शारीरिक नुकसान की धमकी
    3 - मौखिक उत्पीड़न/नस्लीय गाली
    4 - सेवा से इनकार
    5 - बर्बरता/भित्तिचित्र
    6 - अन्य`,
    [LANGUAGE.JA]: `どんな種類の事件に対して報告していますか？
    1 - 身体的危害　
    2 - 身体的危害の脅威　
    3 - 言葉の暴力／人種差別用語　
    4 - サービス提供の拒否　
    5 - 破損行為/落書き　
    6 - その他（詳細をお書きください）`,
    [LANGUAGE.KO]: `어떤 사건을 보고 하십니까?
    1 - 신체적 상해
    2 - 신체적 상해 위협
    3 - 언어폭력, 인종 비방
    4 - 서비스 거부
    5 - 공 공 기물 파손, 낙서
    6 - 다른 ________________`,
    [LANGUAGE.VI]: `Quý vị  đang báo cáo về sự cố, vấn đề nào? 
    1 - Tổn thương thể chất / cơ thể 
    2 - Đe doạ về gây tổn thương thể chất/cơ thể
    3 - Quấy rối thông qua lời nói / Lời nói phân biệt chủng tộc 
    4 - Từ chối phục vụ /dịch vụ từ một đơn vị doanh nghiệp 
    5 - Phá hoại tài sản / Vẽ bậy, vẽ Graffiti
    6 - Sự cố khác (Xin vui lòng cho biết thêm thông tin)`,
    [LANGUAGE.TL]: `Anong pangyayari ang ibabalita mo?  
    1 - Pisical na pananakit 
    2 - Pagbabanta ng pisical na pananakit 
    3 - Pandiwang pangligalig/Paninira ng lahi
    4 - Pagtanging serbisyo mula sa isang negosyo
    5 - Paninira/Bandalismo/Graffiti
    6 - Iba pang panganib (magbigay ng detalye)`,
    [LANGUAGE.CB]: `Unsa nga klase sa insidente and imong gibalita
    1 - Pisikal nga kadaot
    2 - Panghulga sa pisikal nga kadaot
    3 - Berbal nga harasment/ pabbiaybiay sa rasa
    4 - Pagdumili sa serbisyo gikan sa usa ka negosyo.
    5 - Bandalismo/graffiti
    6 - Ang uban pa (palihug ihatag ang detalye)`,
    [LANGUAGE.ES]: `¿Qué tipo de incidente está reportando?
    1 - Daño físico
    2 - Amenaza de daño físico
    3 - Acoso verbal/insulto racial
    4 - Rechazo de servicio en un negocio
    5 - Vandalismo/grafiti
    6 - Otro (por favor de detalles)`,
    [LANGUAGE.DE]: `Welche Art von Vorfall melden Sie?
    1 - Physischer Schaden
    2 - Androhung körperlicher Schaden
    3 - Verbale Belästigung/rasistische Beleidigung
    4 - Leistungsverweigerung durch ein Unternehmen
    5 - Vandalismus/Graffiti
    6 - Sonstiges (Bitte Einzelheiten angeben)`,
    [LANGUAGE.FR]: `Quel est le genre d'accident que vos rapportez?
    1 - blesse physique
    2 - menace physique 
    3 - menace verbale/ injure raciste
    4 - refus de service de la part d'un marchand
    5 - Vandalisme/ Graffiti
    6 - Autre, précisez`,
};

const PROMPT_MEDIA = {
  [LANGUAGE.EN]: `If you have a photo or video of the assailant or the incident, please provide. 
  If you do not have a photo or video, text "NO" to continue.`,
  [LANGUAGE.ZHT]: `請上傳圖片或視頻證據
  如無圖片或視頻證據，請回復"NO"繼續檢舉`,
  [LANGUAGE.ZHC]: `请上传图片或视频证据
  如无图片或视频证据，请回复"NO"继续举报`,
  [LANGUAGE.HI]: `यदि आपके पास हमलावर या घटना का कोई फोटो या वीडियो है, तो कृपया प्रदान करें
  यदि आपके पास कोई फ़ोटो या वीडियो नहीं है, तो जारी रखने के लिए "NO" टेक्स्ट करें`,
  [LANGUAGE.JA]: `もし危害を加えられた証拠となる写真や動画がありましたらご提出ください。もし無い場合は、"NO"とご送信ください。`,
  [LANGUAGE.KO]: `사건 가해자의 사진이나 동영상이 있으면제공 하세요. 사진이나 동영상이 없으면 문자로  "NO" 누르세요.`,
  [LANGUAGE.VI]: `Nếu quý vị có bằng chứng hình ảnh hoặc phim video về kẻ tấn công hoặc sự cố, xin vui lòng cung cấp.
  Nếu quý vị không có bằng chứng hình ảnh hoặc phim video, xin vui lòng nhắn tin "NO" để tiếp tục`,
  [LANGUAGE.TL]: `Kung meron kang litrato o kaya video ng taong umatake sayo o kaya ng pangyayari, pakiusap na ibigay sa amin. 
  Kung wala kang mga bagay na ito, pakiusap na itext ang salitang ""NO" upang magpatuloy.`,
  [LANGUAGE.CB]: `Kung naa kay litrato o video sa nag-atake o insidente, palihug paghatag. Kung wala kay litrato o vido, i-text ang "NO" aron magpadayon`,
  [LANGUAGE.ES]: `Si tiene una foto o video del agresor o del incidente por favor provéela.
  Si no tiene photo o video, haga text "NO" para continuar.`,
  [LANGUAGE.DE]: `Wenn Sie ein Foto oder Video des Angreifers oder des Vorfall haben, stellen Sie es bitte zur Verfügung.
  Wenn Sie kein Foto oder Video haben, schreiben Sie "NO", um fortzufahren.`,
  [LANGUAGE.FR]: `Si vous avez une photo ou un film de l'assaillant ou de l'accident, envoyez le nous. 
  Dans le cas contraire envoyez le message "NO" pour continuer.`,
};

const PROMPT_WHEN = {
  id: PROMPT_ID.WHEN,
  [LANGUAGE.EN]: `When did the incident happen?
  1 - Today
  If another date, please enter as MM/DD/YYYY`,
  [LANGUAGE.ZHT]: `您檢舉事件的發生時間？
  1 - 今天
  如非今天，請以月/日/年格式輸入日期(MM/DD/YYYY)。`,
  [LANGUAGE.ZHC]: `您举报事件的发生时间？
  1 - 今天
  如非今天，请以月/日/年格式输入日期(MM/DD/YYYY)。`,
  [LANGUAGE.HI]: `घटना कब हुई?
  1 - आज
  यदि कोई अन्य तिथि है, तो कृपया MM/DD/YYYY के रूप में दर्ज करें`,
  [LANGUAGE.JA]: `いつ被害にあわられましたか？
  1 - 今日　
  もし違う日の場合は月/日/年(MM/DD/YYYY)で記入してください。`,
  [LANGUAGE.KO]: `사건이 언제 일어났습니까?
  1 - 오늘
  다른 날이면 날짜를  쓰십시오 (MM/DD/YYYY).`,
  [LANGUAGE.VI]: `Sự cố/ Vấn đề xảy ra lúc nào? 
  1 - Hôm nay
  Nếu là ngày nào khác, xin vui lòng nhập ngày theo định dạng MM/DD/YYY (Tháng/Ngày/Năm)`,
  [LANGUAGE.TL]: `Kailan nangyari ang insidenteng ito?  
  1 - Ngayon 
  Kung hindi ngayon, pakiusap ilagay ang tamang petsa sa ganitong format MM/DD/YYYY`,
  [LANGUAGE.CB]: `Kung mahitabo ang insidente
  1 - karong adlawa.
  Kung lain nga petsa, palihog ibutang ang petsa isip MM/DD/YYYY`,
  [LANGUAGE.ES]: `¿Cuándo paso el incidente?
  1 - Hoy
  Si paso en otra fecha escríbala en el formato MM/DD/YYYY`,
  [LANGUAGE.DE]: `Wann ist der Vorfall passiert?
  1 - Heute
  Anderes Datum bitte im Format MM/TT/JJJJ`,
  [LANGUAGE.FR]: `Quand l'accident a-t-il eu lieu?
  1 - Aujourd'hui
  A une date différente, envoyer MM/DD/YYYY`,
};

const PROMPT_WHERE = {
  id: PROMPT_ID.WHERE,
  [LANGUAGE.EN]: "What is the zipcode did this happen in? If you don't know, enter city/state.",
  [LANGUAGE.ZHT]: "事件發生地址的郵編？如不確定，請輸入城市/州。",
  [LANGUAGE.ZHC]: "事件发生地点的邮编？如不确定，请输入城市/州。",
  [LANGUAGE.HI]: `यह किस ज़िपकोड में हुआ है? यदि आप नहीं जानते हैं, तो शहर/राज्य दर्ज करें।`,
  [LANGUAGE.JA]: `どこ（郵便番号）でそれはおきましたか？もし分からない場合は、町/州を記入してください。`,
  [LANGUAGE.KO]: `어느 지역 우편 번호 (집코드)에서 일어났습니까? 모르면 어느시, 어느주 인지 적으세요.`,
  [LANGUAGE.VI]: `Sự cố, vấn đề này đã xảy ra ở vùng zipcode nào? Nếu quý vị không biết mã zipcode, xin vui lòng điền Thành phố/Tiểu Bang.`,
  [LANGUAGE.TL]: `Zip Code ng pinangyarihan, pag hindi mo alam, ilagay ang lungsod/estado.`,
  [LANGUAGE.CB]: `Sa unsa nga zip code kini nahitabo?
  Kung wala ka nahibal-an pagsulod sa lungsod/estado.`,
  [LANGUAGE.ES]: `¿En qué código postal pasó? Si no sabe, escriba la ciudad/estado.`,
  [LANGUAGE.DE]: `In Welcher Postleitzahl ist das passiert? Wenn Sie es nicht wissen, geben Sie die Stadt/das Bundesland ein.`,
  [LANGUAGE.FR]: `Quel est le code postal du lieu de l'accident? Si non envoyez le nome de ville/Etat`,
};

const PROMPT_AGE = {
  [LANGUAGE.EN]: `What is your age?
  1 - 60+
  2 - 50-59
  3 - 40-49
  4 - 30-39
  5 - 20-29
  6 - 13-19`,
  [LANGUAGE.ZHT]: `您的年纪？
  1 - 60+
  2 - 50-59
  3 - 40-49
  4 - 30-39
  5 - 20-29
  6 - 13-19`,
  [LANGUAGE.ZHC]: `您的年纪？
  1 - 60+
  2 - 50-59
  3 - 40-49
  4 - 30-39
  5 - 20-29
  6 - 13-19`,
  [LANGUAGE.HI]: `तुम्हारी उम्र क्या हैं?
  1 - 60+
  2 - 50-59
  3 - 40-49
  4 - 30-39
  5 - 20-29
  6 - 13-19`,
  [LANGUAGE.JA]: `年齢を教えてください。
  1 - 60+ 
  2 - 50-59 
  3 - 40-49 
  4 - 30-39 
  5 - 20-29 
  6 - 13-19`,
  [LANGUAGE.KO]: `귀하의 나이는어떻게 되십니까?  
  1 - 60+ 
  2 - 50-59 
  3 - 40-49 
  4 - 30-39 
  5 - 20-29 
  6 - 13-19`,
  [LANGUAGE.VI]: `Quý vị bao nhiêu tuổi? 
  1 - 60+
  2 - 50-59
  3 - 40-49
  4 - 30-39
  5 - 20-29
  6 - 13-19`,
  [LANGUAGE.TL]: `Ano ang iyong edad?
  1 - 60+
  2 - 50-59
  3 - 40-49
  4 - 30-39
  5 - 20-29
  6 - 13-19`,
  [LANGUAGE.CB]: `Unsa imong edad?
  1 - 60+
  2 - 50-59
  3 - 40-49
  4 - 30-39
  5 - 20-29
  6 - 13-19`,
  [LANGUAGE.ES]: `¿Cuál es su edad? 
  1 - 60+
  2 - 50-59
  3 - 40-49
  4 - 30-39
  5 - 20-29
  6 - 13-19`,
  [LANGUAGE.DE]: `Wie alt Sind Sie?
  1 - 60+
  2 - 50-59
  3 - 40-49
  4 - 30-39
  5 - 20-29
  6 - 13-19`,
  [LANGUAGE.FR]: `Quel âge avez-vous?
  1 - 60+
  2 - 50-59
  3 - 40-49
  4 - 30-39
  5 - 20-29
  6 - 13-19`
};

const PROMPT_FOLLOWUP = {
  [LANGUAGE.EN]: `Would you be willing to be contacted about this at a later date?
  1 - Yes
  2 - No`,
  [LANGUAGE.ZHT]: `您是否允許我們稍後聯繫您？
  1 - 是
  2 - 否`,
  [LANGUAGE.ZHC]: `您是否允许我们稍后联系您？
  1 - 是
  2 - 否`,
  [LANGUAGE.HI]: `क्या आप बाद में इस बारे में संपर्क करने के इच्छुक होंगे?
  1 - हां
  2 - नहीं`,
  [LANGUAGE.JA]: `あなたはこの件に関して後日連絡を受ける事を希望しますか？　
  1 - はい　
  2 - いいえ`,
  [LANGUAGE.KO]: `이 일로 나중 날짜에 연락 해도 되겠습니까?
  1 - 네
  2 - 아니요`,
  [LANGUAGE.VI]: `Quý vị có sẵn sàng để được liên hệ về sự cố, vấn đề này vào một ngày gần đây hay không? 
  1 - Có 
  2 - Không`,
  [LANGUAGE.TL]: `Gusto mo ba o handa ka bang makipag ugnayan sa ibang araw?
  1 - Oo
  2 - Hindi`,
  [LANGUAGE.CB]: `Andam ka ba nga makontak bahin niini sa ulahi nga petsa?
  1 - Oo
  2 - Dili`,
  [LANGUAGE.ES]: `Estaría dispuesto(a) a ser contactado(a) sobre el incidente en una fecha más adelante?
  1 - Sí
  2 - No`,
  [LANGUAGE.DE]: `Sind Sie einverstanden, diesbezüglich zu einem späteren Zeitpunkt kontaktiert zu werden?
  1 - Ja
  2 - Nein`,
  [LANGUAGE.FR]: `Voulez vous être contacté à une date ultérieure sur ce sujet?
  1 - Oui
  2 - Non`,
};

const PROMPT_PRIVACY = {
  [LANGUAGE.EN]: `Do you agree to opt-in to the STOPH8 privacy policy (reporthate.info/privacy) and terms of service (reporthate.info/terms)? 
  1 - Yes
  2 - No
  `,
  [LANGUAGE.ZHT]: `您是否同意STOPH8服務的隱私權政策(reporthate.info/privacy)與服務條款(reporthate.info/terms)?
  1 - 是
  2 - 否
  `,
  [LANGUAGE.ZHC]: `您是否同意STOPH8服务的隐私权政策(reporthate.info/privacy)与服务条款(reporthate.info/terms)? 
  1 - 是
  2 - 否
  `,
  [LANGUAGE.HI]: `क्या आप STOPH8 गोपनीयता नीति (reporthate.info/privacy) और सेवा की शर्तों में ऑप्ट-इन करने के लिए सहमत हैं (reporthate.info/terms)? 
  1 - हां
  2 - नहीं`,
  [LANGUAGE.JA]: `あなたはストップH8の個人情報の取り扱い(reporthate.info/privacy) と利用規約(reporthate.info/terms)に同意しますか？`,
  [LANGUAGE.KO]: `스톱H8 개인 정보 정책 (reporthate.info/privacy) 그리고 서비스 약관에 (reporthate.info/terms) 옵트인/동의 하시겠습니까?
  1 - 네
  2 - 아니요`,
  [LANGUAGE.VI]: `Quý vị có đồng ý và sử dụng với chính sách bảo mật của STOPH8 (reporthate.info/privacy) và điều khoản dịch vụ (reporthate.info/terms) hay không? 
  1 - Có 
  2 - Không`,
  [LANGUAGE.TL]: `Sumasangayon ka ba na pumayag sa STOPH8 Patakaran sa Privacy (reporthate.info/privacy) at Panuntunan ng Serbisyo (reporthate.info/terms)? 
  1 - Yes
  2 - No`,
  [LANGUAGE.CB]: `Mouyon ka ba sa pag-Opt-in sa STOPH8 Privacy Policy (reporthate.info/privacy) ug Termino sa Serbisyo (reporthate.info/terms)?  
  1 - Oo  
  2 - Dili`,
  [LANGUAGE.ES]: `Si esta de acuerdo con STOPH8 Polica de Privacidad (reporthate.info/privacy) y Terminos del Servicio (reporthate.info/terms)? 
  1 - Sí
  2 - No`,
  [LANGUAGE.DE]: `Sind Sie damit einverstanden, der Datenschutzrichtlinie (reporthate.info/privacy) und den Nutzungsbedingungen (reporthate.info/terms) von STOPH8 zuzustimmen? 
  1 - Ja 
  2 - Nein`,
  [LANGUAGE.FR]: `Acceptez-vous la police de confidentialité de STOPH8 (reporthate.info/privacy) avec ses conditions de service (reporthate.info/terms).
  1 - Oui
  2 - Non`
}

const PROMPT_BYE = {
  id: PROMPT_ID.BYE,
  [LANGUAGE.EN]: `Thank you for your submission. Your report will be collected and compiled with other reports to more capably address hate incidents.`,
  [LANGUAGE.ZHT]: `感謝您的提交。我們會將收集到的信息用於更有效地處理仇恨事件。`,
  [LANGUAGE.ZHC]: `感谢您的提交。我们会将收集到的信息使用于更有效的处理仇恨事件。`,
  [LANGUAGE.HI]: `आपके निवेदन के लिए धन्यवाद। नफरत की घटनाओं को अधिक कुशलता से संबोधित करने के लिए आपकी रिपोर्ट को अन्य रिपोर्टों के साथ एकत्र और संकलित किया जाएगा`,
  [LANGUAGE.JA]: `ご回答いただきありがとうございました。憎悪犯罪に関する対策を行う為に、あなたと他の方の回答内容に基づきの取り組みを行っていきます。`,
  [LANGUAGE.KO]: `제출 해 주셔서 감사합니다. 귀하의 보고서는 다른 보고서들과 수집 되어 증오 사건 들을 저항 하는데 쓰여질 것입니다.`,
  [LANGUAGE.VI]: `Cảm ơn về sự phản hồi của quý vị. Bản báo cáo của quý vị sẽ được thu thập và tổng hợp cùng với các bản báo cáo khác để giải quyết vấn đề bị thù ghét một cách chính xác hơn.`,
  [LANGUAGE.TL]: `Salamat sa iyong pagsusumite. Ang iyong ulat ay kokolektahin at isasama sa iba pang mga ulat upang mas mahusay na matugunan ang mga insidente ng poot.`,
  [LANGUAGE.CB]: `Salamat sa imong pagsumite. Ang imong report kolektahon ug itipon sa ubang mga report aron mas matubag ang mga insidente sa pagdumot.`,
  [LANGUAGE.ES]: `Gracias por su sumisión. Su informe será coleccionado y compilado con los demás informes para abordar el odio de una manera más capaz.`,
  [LANGUAGE.DE]: `Vielen Dank für Ihre Teilnahme. Ihr Bericht wird gesammelt und mit anderen Berichten zusammengestellt, um Hassvorfallen besser begegnen zu können.`,
  [LANGUAGE.FR]: `Merci pour votre demande. Votre Rapport sera gardé et soumis avec d'autres rapports afin de consolider le cas des incidents haineux.`,
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

exports.handler = async (context, event, callback) => {
  let body = event.Body;

  // Initialize a new Response and some TwiML
  const response = new Twilio.Response();
  const twiml = new Twilio.twiml.MessagingResponse();

  // Cookies are accessed by name from the event.request.cookies object
  // If the user doesn't have a count yet, initialize it to zero. Cookies are
  // always strings, so you'll need to convert the count to a number
  let promptIndex = Number(event.request.cookies.promptIndex) || 0;
  let language = event.request.cookies.language || LANGUAGE.EN;

  const promptIndexDanger = PROMPTS.findIndex(promptObj => promptObj.id === PROMPT_ID.DANGER);
  
  // Shortcirtuit if user in danger.
  if (promptIndex === promptIndexDanger + 1 && AFFIRMATIVE.includes(body)) {
    let message = RESPONSE_911;
  
    twiml.message(message);

    response
      // Add the stringified TwiML to the response body
      .setBody(twiml.toString())
      // Since we're returning TwiML, the content type must be XML
      .appendHeader('Content-Type', 'text/xml')

    response.removeCookie('promptIndex');
    response.removeCookie('language');
    response.removeCookie('when');
    response.removeCookie('incidentId');
    return callback(null, response);
  }

  const promptIndexWhen = PROMPTS.findIndex(promptObj => promptObj.id === PROMPT_ID.WHEN);
  const promptIndexWhere = PROMPTS.findIndex(promptObj => promptObj.id === PROMPT_ID.WHERE);

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

  response
    // Add the stringified TwiML to the response body
    .setBody(twiml.toString())
    // Since we're returning TwiML, the content type must be XML
    .appendHeader('Content-Type', 'text/xml')

  if (language !== null) {
    response.setCookie('language', language)
  }

  try {
    const incidentId = event.request.cookies.incidentId || null;
    let when = event.request.cookies.when || '';
    if (promptIndex === promptIndexWhen + 1) {
      when = ["just now", "now", "today", "1", "2"].includes(body.toLowerCase()) ? new Date().toISOString() : body; 
      var bodyWhen = composePayload({when, incidentId});
      var respWhen = await axios.post(HATECRIMETRACKER_URL, bodyWhen);
      const {incident_id} = respWhen.data;
      response.setCookie('incidentId', incident_id);
      response.setCookie('when', when);
    }

    if (promptIndex === promptIndexWhere + 1) {
      var where = body;
      var bodyWhere = composePayload({when, where, incidentId})
      var respWhere = await axios.post(HATECRIMETRACKER_URL, bodyWhere);
      const {incident_id} = respWhere.data;
      response.setCookie('incidentId', incident_id);
    }

  } catch(error) {
    console.error(error);
  }

  // Should be towards end.
  promptIndex++;

  // You can increment the count state for the next message, or any other
  // operation that makes sense for your application's needs. Remember
  // that cookies are always stored as strings
  response.setCookie('promptIndex', promptIndex.toString())


  // Should be very last
  if (promptIndex >= PROMPTS.length) {
    response.removeCookie('promptIndex');
    response.removeCookie('language');
    response.removeCookie('when');
    response.removeCookie('incidentId');
  }

  return callback(null, response);
};
