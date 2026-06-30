const sdkBase = "https://www.gstatic.com/" + "fire" + "basejs/11.10.0/";
let initializeApp;
let getAuth;
let GoogleAuthProvider;
let onAuthStateChanged;
let signInWithPopup;
let addDoc;
let collection;
let deleteDoc;
let doc;
let getDoc;
let onSnapshot;
let orderBy;
let query;
let serverTimestamp;
let setDoc;
let updateDoc;
let getRecordStore;
let servicesInitPromise = null;

const LS_PREFIX = "codeV01DStudio.";
const RECORD_STORE_ID = "code-void-booking";
const KAKAO_CHANNEL_URL = "http://pf.kakao.com/_dxfKKX/chat";
const PROFILE_GUIDE_URL = "https://blog.naver.com/code_v01d/224328830243";
const CONCEPT_GUIDE_URL = "https://blog.naver.com/code_v01d/224328857251";
const SLOT_DATA_VERSION = 11;
const DEFAULT_CALENDAR_OPEN_DAYS = 30;
const MOBILE_INITIAL_WEEK_COUNT = 3;
const SLOT_CLOSE_WINDOW_MS = 60 * 60 * 1000;
const KOREA_UTC_OFFSET_MS = 9 * 60 * 60 * 1000;
const CALENDAR_ROLLOVER_HOUR_KST = 12;
const appConfig = {
  apiKey: "AIzaSyDsYlsmaK_eyh-FskxAF_hlY0-wdUMlmaw",
  authDomain: "arcross-1b910." + "fire" + "baseapp.com",
  projectId: "arcross-1b910",
  storageBucket: "arcross-1b910." + "fire" + "basestorage.app",
  messagingSenderId: "59050851856",
  appId: "1:59050851856:web:c5b87067805c382f291495",
  measurementId: "G-34D025NSWQ"
};
const storage = {
  get(key, fallback) {
    try {
      const value = localStorage.getItem(LS_PREFIX + key);
      return value ? JSON.parse(value) : fallback;
    } catch (error) {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(LS_PREFIX + key, JSON.stringify(value));
    } catch (error) {
      // The page should still work if storage is unavailable or full.
    }
  }
};

const i18n = {
  ko: {
    brandHome: "예약 관리 시스템",
    nestDanceLabel: "네스트 댄스:",
    codeVoidLabel: "코드보이드:",
    navLinks: "링크",
    navConcepts: "컨셉",
    navCalendar: "예약 캘린더",
    navNotices: "안내",
    adminMode: "관리자",
    heroEyebrow: "촬영과 댄스 클래스 예약을 한번에",
    studioLabel: "About Us",
    heroCopy: "코드보이드의 컨셉츄얼한 촬영 및 합성과 네스트 스튜디오의 프로페셔널한 댄스 클래스를 한 자리에서 만나보세요!",
    bookLink: "예약 문의",
    conceptTitle: "원하는 컨셉을 골라보세요",
    seeConcepts: "컨셉 보기",
    viewGuide: "안내 보기",
    selectThisConcept: "이 컨셉 선택",
    selectConcept: "컨셉 선택",
    calendarTitle: "예약 캘린더",
    studioTabCode: "코드보이드",
    studioTabNest: "네스트 댄스",
    nestStudioTitle: "Nest Studio",
    nestStudioIntro: "Nest Studio 일정은 문의하기로 선호 시간대와 위치를 남겨주세요.",
    nestStudioHelper: "요청자가 많을 때 상담과 일정 조율에 도움이 됩니다.",
    nestStudioButton: "Nest Studio 문의하기",
    nestTimetableChipDays: "7일 클래스표",
    nestTimetableChipTimes: "18:00 - 22:00",
    nestTimetableChipClasses: "댄스 클래스",
    nestCalendarHint: "원하는 수업을 선택해 주세요.",
    nestSelectedSlotTitle: "선택한 클래스",
    nestSelectedSlotHelper: "원하는 수업 슬롯을 선택하고 이름과 연락처를 남겨주세요.",
    nestNoSlotSelected: "수강 가능한 클래스를 선택해 주세요. 여러 개 선택해도 됩니다.",
    nestSelectedSlotCount: "{count}개 클래스 선택됨",
    nestMemoPlaceholder: "예: 수강 희망 클래스, 경험 여부, 문의 내용",
    nestAutoSaveNote: "SMS 문의는 이름, 연락처, 클래스, 메모를 모두 입력하면 활성화됩니다. 카카오 채널 버튼은 문의 내용을 복사한 뒤 채널을 엽니다.",
    nestClassAdminTitle: "네스트 댄스 일정 관리",
    nestClassAdminHelper: "요일, 시작 시간, 클래스명, 강사명을 입력해 수업을 추가하거나 수정합니다.",
    nestClassAdminDay: "요일",
    nestClassAdminStart: "시작 시간",
    nestClassAdminName: "클래스명",
    nestClassAdminInstructor: "강사명",
    nestClassAdminAdd: "수업 추가",
    nestClassAdminUpdate: "변경 저장",
    nestClassAdminCancel: "취소",
    nestClassEdit: "수정",
    nestClassDelete: "삭제",
    nestClassAdded: "수업이 추가되었습니다.",
    nestClassUpdated: "수업이 수정되었습니다.",
    nestClassDeleted: "수업이 삭제되었습니다.",
    nestClassFormInvalid: "요일, 시작 시간, 클래스명을 입력해 주세요.",
    nestClassDeleteConfirm: "이 수업을 삭제할까요?",
    nestClassLocalOnly: "브라우저에는 저장되었습니다. Firebase 규칙 배포 후 전체 방문자에게 동기화됩니다.",
    weekdayRequest: "문의하기",
    selectedSlotTitle: "선택한 슬롯",
    selectedSlotHelper: "가능한 모든 시간대를 선택해 주세요.",
    noSlotSelected: "가능한 슬롯을 여러 개 선택해 주세요. 요청자가 많을 때 상담과 일정 조율에 도움이 됩니다.",
    selectedSlotCount: "{count}개 슬롯 선택됨",
    selectedSlotText: "{date} {time}",
    weekdaySelectedText: "{date} 요청하기",
    preferredDetailsText: "선호 시간대, 선호 위치를 메모에 적어주세요.",
    calendarWindowTitle: "캘린더 공개 기간",
    calendarWindowIntro: "방문자에게 열어둘 날짜 범위를 정합니다.",
    calendarOpenStartLabel: "공개 시작일",
    calendarOpenEndLabel: "공개 종료일",
    saveCalendarWindow: "공개 기간 저장",
    calendarWindowSaved: "캘린더 공개 기간이 저장되었습니다.",
    calendarWindowInvalid: "공개 종료일은 시작일 이후로 설정해 주세요.",
    adminSlotToggleHint: "관리자 모드에서는 캘린더 슬롯을 눌러 마감/오픈을 전환할 수 있습니다.",
    adminClosedState: "마감",
    adminOpenState: "오픈",
    slotClosedByAdmin: "슬롯이 마감 처리되었습니다.",
    slotOpenedByAdmin: "슬롯이 다시 열렸습니다.",
    googleSignIn: "Google로 로그인",
    googleSignOut: "로그아웃",
    authSignedOut: "관리자 계정으로 Google 로그인해 주세요.",
    authSignedIn: "Google 계정으로 로그인 중",
    adminSignedInAs: "관리자 계정으로 로그인되어 있습니다.",
    adminWrongAccountInfo: "관리자 권한이 없는 계정입니다. 관리자 계정으로 다시 로그인해 주세요.",
    adminGoogleOnlyInfo: "관리자 모드는 승인된 Google 계정으로만 열 수 있습니다.",
    serviceReady: "연결 준비 완료",
    connectionUnavailable: "연결을 확인할 수 없습니다. 카카오채널 문의는 계속 가능합니다.",
    saveSucceeded: "문의 내용이 저장되었습니다.",
    saveFailed: "저장에 실패했습니다. 카카오채널로 문의 내용을 보내주세요.",
    loadFailed: "주문을 불러오지 못했습니다.",
    authRequired: "관리자 작업에는 Google 로그인이 필요합니다.",
    namePlaceholder: "이름",
    contactPlaceholder: "연락처 / 이메일",
    memoPlaceholder: "예: 문의 / 예약 내용을 적어주세요",
    preferredMemoPlaceholder: "예: 문의 / 예약, 선호 시간대, 선호 위치",
    adminMemoPlaceholder: "관리 메모",
    inquiryButton: "내용 복사 + 카카오 채널 열기",
    smsInquiryButton: "SMS 문의",
    inquiryKakaoButton: "내용 복사 + 카카오 채널 열기",
    chooseSlotFirst: "이름을 입력하면 카카오채널을 열 수 있습니다.",
    smsNeedsAllFields: "SMS 문의는 이름, 연락처, 컨셉, 슬롯, 메모를 모두 입력해 주세요.",
    nestSmsNeedsAllFields: "SMS 문의는 이름, 연락처, 클래스, 메모를 모두 입력해 주세요.",
    smsInquiryOpened: "SMS 앱을 열었습니다. 작성된 내용을 확인해 보내주세요.",
    slotClosed: "이 슬롯은 마감되었습니다.",
    inquiryAdded: "문의가 관리자 주문함에 추가되었습니다.",
    inquiryCopied: "문의 내용이 복사되고 관리자 주문함에 추가되었습니다. 카카오채널에서 붙여넣어 보내주세요.",
    inquiryCopyFailed: "관리자 주문함에 추가되었습니다. 복사가 막힌 경우 선택한 내용을 직접 카카오채널에 보내주세요.",
    copyMessageTitle: "[Code V01D 예약 문의]",
    nestCopyMessageTitle: "[Nest Studio 클래스 문의]",
    copyNameLabel: "이름",
    copyContactLabel: "연락처",
    copyConceptLabel: "컨셉",
    copySlotsLabel: "후보 슬롯",
    copyMemoLabel: "메모",
    autoSaveNote: "SMS 문의는 모든 정보를 입력하고 슬롯을 선택하면 활성화됩니다. 카카오 채널 버튼은 문의 내용을 복사한 뒤 채널을 엽니다.",
    adminKicker: "Admin workspace",
    adminTitle: "운영 모드",
    adminIntro: "Google 관리자 로그인으로 열리는 운영 화면입니다. 캘린더 확인, 칸반 관리, 주문 추가, 방문 인사이트를 한 곳에서 확인합니다.",
    adminStatus: "관리자 보기 켜짐",
    adminPasswordTitle: "관리자 로그인",
    adminPasswordIntro: "Google 계정으로 관리자 모드를 열어주세요.",
    adminPasswordLabel: "관리자 로그인",
    adminPasswordPlaceholder: "Google 계정",
    adminPasswordCancel: "취소",
    adminPasswordSubmit: "Google로 열기",
    adminPasswordWrong: "관리자 권한이 있는 Google 계정으로 로그인해 주세요.",
    adminUnlocked: "관리자 모드가 열렸습니다.",
    tabChecker: "캘린더 체크",
    tabKanban: "칸반 관리",
    tabOrders: "인입 주문",
    tabReservations: "예약 기록",
    tabInsights: "인사이트",
    checkerTitle: "슬롯별 요청 현황",
    tableDate: "날짜",
    tableTime: "시간",
    tableStatus: "상태",
    closedStatus: "마감",
    pastDate: "지난 날짜",
    unavailableDate: "예약 불가",
    recentOrdersTitle: "최근 인입",
    noOrders: "아직 인입 주문이 없습니다.",
    ordersTitle: "인입 주문 섹션",
    orderName: "이름",
    orderConcept: "컨셉",
    orderSlot: "후보 슬롯",
    orderStatus: "상태",
    orderMemo: "메모",
    orderReservation: "예약 연결",
    requestLink: "요청 연결",
    fillReservation: "예약 기록으로 연결",
    manualAddTitle: "주문 수동 추가",
    addIncomingOrder: "인입 주문 추가",
    orderAdded: "인입 주문이 추가되었습니다.",
    reservationsTitle: "예약 기록",
    reservationRecordTitle: "예약 기록 추가",
    reservationRequestLabel: "연결할 요청",
    manualReservationOption: "요청 없이 직접 추가",
    reservationSlot: "확정 슬롯",
    reservationStatus: "예약 상태",
    reservationMemo: "예약 메모",
    addReservation: "예약 기록 추가",
    reservationAdded: "예약 기록이 추가되었습니다.",
    noReservations: "아직 예약 기록이 없습니다.",
    reservationManual: "수동 기록",
    reservationLinkedTo: "요청 #{id}",
    popularConcepts: "인기 컨셉",
    visits: "방문 수",
    inquiries: "문의 수",
    openOrders: "진행 중 주문",
    conversion: "문의 전환율",
    noticeTitle: "서비스 이용 안내",
    noticeFoldOpen: "서비스 안내 펼쳐보기",
    noticeFoldClose: "서비스 안내 접기",
    noticeTabTerms: "서비스 안내",
    noticeTabInquiry: "상담 정보",
    estimateInfoTitle: "견적 안내 및 기타사항",
    estimateInfoOne: "보정본 추가 시 장당 10,000원 (보정 수정은 1회 무료로 제공됩니다.)",
    estimateInfoTwo: "전체 촬영본은 촬영일로부터 2일 이내 메일로 발송됩니다.",
    estimateInfoThree: "합성 작업의 경우 1회 수정은 무료이며, 그 이상은 정상가의 50% 금액으로 디자인 1개 추가가 가능합니다.",
    estimateInfoFour: "입금 확인 후 예약 및 작업이 확정됩니다.",
    estimateInfoFive: "보정본 및 아트워크의 경우 평균 3일 이내 전달되며, 작업 상황에 따라 최대 7일까지 소요될 수 있습니다.",
    cautionTitle: "유의사항",
    cautionOne: "제삼자의 저작권 및 초상권을 침해하는 작업은 진행하지 않습니다.",
    cautionTwo: "타인의 사진, 상업 이미지, 캐릭터, 브랜드 요소를 무단으로 사용하는 작업은 제한될 수 있습니다.",
    cautionThree: "최종 선택되지 않은 기획안, 시안, 작업물의 소유권은 전문가에게 있습니다.",
    cautionFour: "작업 확정 후 과도한 방향 변경은 추가 비용이 발생할 수 있습니다. (컨셉/개인 컨셉의 경우)",
    serviceGuideTitle: "서비스 이용 안내",
    serviceGuideOne: "예약 및 작업은 입금 확인 후 확정됩니다.",
    serviceGuideTwo: "촬영은 송파구 스튜디오에서 진행됩니다.",
    serviceGuideThree: "상세 주소와 예약 시간은 확정 후 개별 안내드립니다.",
    deliverablesTitle: "결과물 전달",
    deliverablesOne: "촬영본 전체 및 보정본은 촬영일로부터 2일 이내 메일로 발송됩니다.",
    deliverablesTwo: "최종 결과물은 평균 3일 이내 전달됩니다.",
    deliverablesThree: "작업 상황에 따라 최대 7일까지 소요될 수 있습니다.",
    revisionCostTitle: "수정 및 추가 비용",
    revisionCostOne: "보정 수정 1회, 합성 수정 1회는 무료로 제공됩니다.",
    revisionCostTwo: "보정본 추가는 장당 10,000원입니다.",
    revisionCostThree: "추가 수정 또는 다른 디자인 버전 제작은 정상가의 50% 금액으로 진행됩니다.",
    quoteChangeTitle: "견적 변동 안내",
    quoteChangeOne: "출장비, 스타일링, 모델 섭외, 의상 및 소품 준비 여부에 따라 비용이 달라질 수 있습니다.",
    quoteChangeTwo: "추가 장비, 합성 난이도, 컨셉 준비 범위에 따라 최종 견적이 변동될 수 있습니다.",
    quoteChangeThree: "상시 컨셉 및 개인 컨셉 촬영의 정확한 금액은 상담 후 확정됩니다.",
    workRightsTitle: "작업 제한 및 저작권",
    workRightsOne: "제삼자의 저작권 및 초상권을 침해하는 작업은 진행하지 않습니다.",
    workRightsTwo: "타인의 사진, 상업 이미지, 캐릭터, 브랜드 요소의 무단 사용은 제한될 수 있습니다.",
    workRightsThree: "최종 선택되지 않은 기획안, 시안, 작업물의 소유권은 전문가에게 있습니다.",
    refundGuideTitle: "환불 안내",
    refundGuideOne: "촬영일 기준 7일 전까지 취소 시 전액 환불됩니다.",
    refundGuideTwo: "촬영일 기준 3~6일 전 취소 시 결제 금액의 50%가 환불됩니다.",
    refundGuideThree: "촬영일 기준 2일 이내 및 당일 취소는 환불이 불가합니다.",
    refundGuideFour: "보정 및 합성 추가 작업은 작업 확정 후 5시간이 지난 경우 단순 변심에 의한 환불이 불가합니다.",
    inquiryInfoTitle: "문의 시 보내주시면 좋은 내용",
    inquiryInfoOne: "원하는 서비스명",
    inquiryInfoTwo: "희망 날짜 및 시간",
    inquiryInfoThree: "촬영 또는 합성 목적",
    inquiryInfoFour: "참고 (시안, 보정) 레퍼런스",
    inquiryInfoFive: "원하는 결과물 수량",
    inquiryInfoSix: "포트폴리오 공개 가능 여부",
    inquiryInfoSeven: "기타 요청사항",
    inquiryInfoEight: "기타 요청사항",
    footerNote: "© 2026 Code V01D Studio x Nest Dance Studio",
    previous: "이전",
    next: "다음",
    delete: "삭제",
    moved: "상태가 변경되었습니다.",
    deleted: "주문이 삭제되었습니다.",
    dropped: "칸반 카드가 이동되었습니다.",
    anonymous: "익명 문의",
    statuses: {
      incoming: "인입",
      styling: "스타일링",
      shooting: "촬영",
      editing: "보정",
      done: "완료"
    },
    reservationStatuses: {
      confirmed: "확정",
      completed: "완료",
      cancelled: "취소"
    },
    concepts: {
      profileA: { title: "기본 촬영", desc: "", price: "₩60,000" },
      headgear: { title: "컨셉 촬영", desc: "", price: "₩100,000" },
      package: { title: "개인 유료 커미션", desc: "", price: "₩120,000" },
      nestDanceClass: { title: "Nest Studio 댄스 클래스", desc: "", price: "" }
    }
  },
  en: {
    brandHome: "Reservation Management System",
    nestDanceLabel: "Nest Dance:",
    codeVoidLabel: "Code Void:",
    navLinks: "Links",
    navConcepts: "Concepts",
    navCalendar: "Reservation Calendar",
    navNotices: "Guide",
    adminMode: "Admin",
    heroEyebrow: "Photo shoots and dance class bookings all at once",
    studioLabel: "About Us",
    heroCopy: "Meet Code V01D's conceptual shoots and composites, and Nest Studio's professional dance classes, all in one place!",
    bookLink: "Reservation Inquiry",
    conceptTitle: "Choose the concept you want",
    seeConcepts: "View concept",
    viewGuide: "View guide",
    selectThisConcept: "Select this concept",
    selectConcept: "Select concept",
    calendarTitle: "Reservation Calendar",
    studioTabCode: "코드보이드",
    studioTabNest: "네스트 댄스",
    nestStudioTitle: "Nest Studio",
    nestStudioIntro: "For Nest Studio schedules, leave your preferred time and location through inquiry.",
    nestStudioHelper: "This helps consultation and scheduling when there are many requests.",
    nestStudioButton: "Inquire for Nest Studio",
    nestTimetableChipDays: "7-day class table",
    nestTimetableChipTimes: "18:00 - 22:00",
    nestTimetableChipClasses: "Dance classes",
    nestCalendarHint: "Please choose the classes you want.",
    nestSelectedSlotTitle: "Selected classes",
    nestSelectedSlotHelper: "Choose the class slots you want and leave your name and contact.",
    nestNoSlotSelected: "Please choose available classes. You can select more than one.",
    nestSelectedSlotCount: "{count} classes selected",
    nestMemoPlaceholder: "Ex: desired class, experience level, inquiry details",
    nestAutoSaveNote: "SMS inquiry is enabled when name, contact, class, and memo are all filled in. The Kakao Channel button copies the inquiry content, then opens the channel.",
    nestClassAdminTitle: "Nest Dance Schedule Manager",
    nestClassAdminHelper: "Add or edit a class with day, start time, class name, and instructor.",
    nestClassAdminDay: "Day",
    nestClassAdminStart: "Start time",
    nestClassAdminName: "Class name",
    nestClassAdminInstructor: "Instructor",
    nestClassAdminAdd: "Add class",
    nestClassAdminUpdate: "Save changes",
    nestClassAdminCancel: "Cancel",
    nestClassEdit: "Edit",
    nestClassDelete: "Delete",
    nestClassAdded: "Class added.",
    nestClassUpdated: "Class updated.",
    nestClassDeleted: "Class deleted.",
    nestClassFormInvalid: "Please enter day, start time, and class name.",
    nestClassDeleteConfirm: "Delete this class?",
    nestClassLocalOnly: "Saved in this browser. It will sync for visitors after Firebase rules are deployed.",
    weekdayRequest: "Inquire",
    selectedSlotTitle: "Selected slots",
    selectedSlotHelper: "Please select all possible time slots.",
    noSlotSelected: "Please select several possible slots. This helps consultation and scheduling when there are many requests.",
    selectedSlotCount: "{count} slots selected",
    selectedSlotText: "{date} {time}",
    weekdaySelectedText: "{date} request",
    preferredDetailsText: "Please write your preferred time and preferred location in the memo.",
    calendarWindowTitle: "Calendar display period",
    calendarWindowIntro: "Set the date range to show to visitors.",
    calendarOpenStartLabel: "Display start date",
    calendarOpenEndLabel: "Display end date",
    saveCalendarWindow: "Save display period",
    calendarWindowSaved: "Calendar display period has been saved.",
    calendarWindowInvalid: "Please set the display end date after the start date.",
    adminSlotToggleHint: "In admin mode, you can click calendar slots to switch them between closed and open.",
    adminClosedState: "Closed",
    adminOpenState: "Open",
    slotClosedByAdmin: "The slot has been marked as closed.",
    slotOpenedByAdmin: "The slot has been reopened.",
    googleSignIn: "Sign in with Google",
    googleSignOut: "Sign out",
    authSignedOut: "Please sign in with the admin Google account.",
    authSignedIn: "Signed in with a Google account",
    adminSignedInAs: "You are signed in with an admin account.",
    adminWrongAccountInfo: "This account does not have admin permission. Please sign in again with the admin account.",
    adminGoogleOnlyInfo: "Admin mode can only open with an approved Google account.",
    serviceReady: "Connection ready",
    connectionUnavailable: "Could not check the connection. Kakao Channel inquiry is still available.",
    saveSucceeded: "Inquiry content has been saved.",
    saveFailed: "Saving failed. Please send the inquiry content through Kakao Channel.",
    loadFailed: "Could not load orders.",
    authRequired: "Google sign-in is required for admin actions.",
    namePlaceholder: "Name",
    contactPlaceholder: "Contact / email",
    memoPlaceholder: "Ex: write your inquiry / reservation details",
    preferredMemoPlaceholder: "Ex: inquiry / reservation, preferred time, preferred location",
    adminMemoPlaceholder: "Admin memo",
    inquiryButton: "Copy message + open Kakao Channel",
    smsInquiryButton: "SMS inquiry",
    inquiryKakaoButton: "Copy message + open Kakao Channel",
    chooseSlotFirst: "Enter your name to open Kakao Channel.",
    smsNeedsAllFields: "For SMS inquiry, please fill in name, contact, concept, slot, and memo.",
    nestSmsNeedsAllFields: "For SMS inquiry, please fill in name, contact, class, and memo.",
    smsInquiryOpened: "The SMS app has opened. Please review the written message and send it.",
    slotClosed: "This slot has been closed.",
    inquiryAdded: "The inquiry has been added to the admin order box.",
    inquiryCopied: "The inquiry content has been copied and added to the admin order box. Please paste and send it in Kakao Channel.",
    inquiryCopyFailed: "It has been added to the admin order box. If copying was blocked, please send the selected content directly through Kakao Channel.",
    copyMessageTitle: "[Code V01D Reservation Inquiry]",
    nestCopyMessageTitle: "[Nest Studio Class Inquiry]",
    copyNameLabel: "Name",
    copyContactLabel: "Contact",
    copyConceptLabel: "Concept",
    copySlotsLabel: "Candidate slots",
    copyMemoLabel: "Memo",
    autoSaveNote: "SMS inquiry is enabled when all information is entered and a slot is selected. The Kakao Channel button copies the inquiry content, then opens the channel.",
    adminKicker: "Admin workspace",
    adminTitle: "Operations mode",
    adminIntro: "This operations screen opens with Google admin sign-in. Check the calendar, manage kanban, add orders, and view visit insights in one place.",
    adminStatus: "Admin view on",
    adminPasswordTitle: "Admin sign-in",
    adminPasswordIntro: "Please open admin mode with a Google account.",
    adminPasswordLabel: "Admin sign-in",
    adminPasswordPlaceholder: "Google account",
    adminPasswordCancel: "Cancel",
    adminPasswordSubmit: "Open with Google",
    adminPasswordWrong: "Please sign in with a Google account that has admin permission.",
    adminUnlocked: "Admin mode has opened.",
    tabChecker: "Calendar checker",
    tabKanban: "Kanban management",
    tabOrders: "Incoming orders",
    tabReservations: "Reservation records",
    tabInsights: "Insights",
    checkerTitle: "Request status by slot",
    tableDate: "Date",
    tableTime: "Time",
    tableStatus: "Status",
    closedStatus: "Closed",
    pastDate: "Past date",
    unavailableDate: "Reservation unavailable",
    recentOrdersTitle: "Recent incoming orders",
    noOrders: "No incoming orders yet.",
    ordersTitle: "Incoming order section",
    orderName: "Name",
    orderConcept: "Concept",
    orderSlot: "Candidate slots",
    orderStatus: "Status",
    orderMemo: "Memo",
    orderReservation: "Reservation link",
    requestLink: "Request link",
    fillReservation: "Connect to reservation record",
    manualAddTitle: "Add order manually",
    addIncomingOrder: "Add incoming order",
    orderAdded: "Incoming order added.",
    reservationsTitle: "Reservation records",
    reservationRecordTitle: "Add reservation record",
    reservationRequestLabel: "Request to connect",
    manualReservationOption: "Add directly without request",
    reservationSlot: "Confirmed slot",
    reservationStatus: "Reservation status",
    reservationMemo: "Reservation memo",
    addReservation: "Add reservation record",
    reservationAdded: "Reservation record added.",
    noReservations: "No reservation records yet.",
    reservationManual: "Manual record",
    reservationLinkedTo: "Request #{id}",
    popularConcepts: "Popular concepts",
    visits: "Visits",
    inquiries: "Inquiries",
    openOrders: "Open orders",
    conversion: "Inquiry conversion rate",
    noticeTitle: "Service Usage Guide",
    noticeFoldOpen: "View service guide",
    noticeFoldClose: "Close service guide",
    noticeTabTerms: "Service guide",
    noticeTabInquiry: "Consultation info",
    estimateInfoTitle: "Estimate guide and other notes",
    estimateInfoOne: "Additional retouched images are 10,000 KRW each. One retouch revision is included free of charge.",
    estimateInfoTwo: "All original shoot files are sent by email within 2 days of the shoot.",
    estimateInfoThree: "For composite work, one revision is included free of charge. Additional designs can be added at 50% of the regular price.",
    estimateInfoFour: "Bookings and work are confirmed after payment is received.",
    estimateInfoFive: "Retouched images and artwork are usually delivered within 3 days, and may take up to 7 days depending on workload.",
    cautionTitle: "Important notes",
    cautionOne: "Work that infringes third-party copyright or portrait rights is not accepted.",
    cautionTwo: "Unauthorized use of another person's photo, commercial image, character, or brand element may be restricted.",
    cautionThree: "Unselected plans, drafts, and working files remain owned by the professional.",
    cautionFour: "Excessive direction changes after work confirmation may incur additional costs for concept or personal concept work.",
    serviceGuideTitle: "Service Usage Guide",
    serviceGuideOne: "Bookings and work are confirmed after payment is received.",
    serviceGuideTwo: "Shoots take place at the Songpa-gu studio.",
    serviceGuideThree: "The exact address and reservation time are shared individually after confirmation.",
    deliverablesTitle: "Deliverables",
    deliverablesOne: "All shoot files and retouched images are sent by email within 2 days of the shoot.",
    deliverablesTwo: "Final deliverables are usually sent within 3 days.",
    deliverablesThree: "Depending on workload, delivery may take up to 7 days.",
    revisionCostTitle: "Revisions and extra costs",
    revisionCostOne: "One retouch revision and one composite revision are included free of charge.",
    revisionCostTwo: "Additional retouched images are 10,000 KRW each.",
    revisionCostThree: "Extra revisions or another design version are billed at 50% of the regular price.",
    quoteChangeTitle: "Estimate change guide",
    quoteChangeOne: "Pricing may vary depending on travel, styling, model casting, wardrobe, and prop preparation.",
    quoteChangeTwo: "Extra equipment, composite difficulty, and concept preparation scope may change the final estimate.",
    quoteChangeThree: "Exact pricing for standing concept shoots and personal concept shoots is confirmed after consultation.",
    workRightsTitle: "Work restrictions and copyright",
    workRightsOne: "Work that infringes third-party copyright or portrait rights is not accepted.",
    workRightsTwo: "Unauthorized use of another person's photo, commercial image, character, or brand element may be restricted.",
    workRightsThree: "Unselected plans, drafts, and working files remain owned by the professional.",
    refundGuideTitle: "Refund policy",
    refundGuideOne: "Cancellation at least 7 days before the shoot is fully refundable.",
    refundGuideTwo: "Cancellation 3-6 days before the shoot is refunded at 50% of the payment amount.",
    refundGuideThree: "Cancellation within 2 days of the shoot or on the shoot date is non-refundable.",
    refundGuideFour: "Additional retouching or composite work is non-refundable for simple change-of-mind after 5 hours have passed from work confirmation.",
    inquiryInfoTitle: "Helpful details to send with your inquiry",
    inquiryInfoOne: "Requested service name",
    inquiryInfoTwo: "Preferred date and time",
    inquiryInfoThree: "Shoot or composite purpose",
    inquiryInfoFour: "References for drafts or retouching",
    inquiryInfoFive: "Desired number of deliverables",
    inquiryInfoSix: "Portfolio publishing permission",
    inquiryInfoSeven: "Other requests",
    inquiryInfoEight: "Other requests",
    footerNote: "© 2026 Code V01D Studio x Nest Dance Studio",
    previous: "Previous",
    next: "Next",
    delete: "Delete",
    moved: "Status changed.",
    deleted: "Order deleted.",
    dropped: "Kanban card moved.",
    anonymous: "Anonymous inquiry",
    statuses: {
      incoming: "Incoming",
      styling: "Styling",
      shooting: "Shooting",
      editing: "Editing",
      done: "Done"
    },
    reservationStatuses: {
      confirmed: "Confirmed",
      completed: "Completed",
      cancelled: "Cancelled"
    },
    concepts: {
      profileA: { title: "Basic Shoot", desc: "", price: "₩60,000" },
      headgear: { title: "Concept Shoot", desc: "", price: "₩100,000" },
      package: { title: "Paid Personal Commission", desc: "", price: "₩120,000" },
      nestDanceClass: { title: "Nest Studio Dance Class", desc: "", price: "" }
    }
  }
};

const conceptMeta = [
  { id: "profileA", symbol: "✦" },
  { id: "headgear", symbol: "●" },
  { id: "package", symbol: "✺" }
];

const nestWeekDays = [
  { id: "mon", ko: "월", en: "MON", koLong: "월요일", enLong: "Monday" },
  { id: "tue", ko: "화", en: "TUE", koLong: "화요일", enLong: "Tuesday" },
  { id: "wed", ko: "수", en: "WED", koLong: "수요일", enLong: "Wednesday" },
  { id: "thu", ko: "목", en: "THU", koLong: "목요일", enLong: "Thursday" },
  { id: "fri", ko: "금", en: "FRI", koLong: "금요일", enLong: "Friday" },
  { id: "sat", ko: "토", en: "SAT", koLong: "토요일", enLong: "Saturday" },
  { id: "sun", ko: "일", en: "SUN", koLong: "일요일", enLong: "Sunday" }
];

const defaultNestClassSlots = [
  { id: "nest-mon-1800-kpop", day: "mon", time: "18:00", end: "19:00", title: "K-pop", teacher: "" },
  { id: "nest-mon-1900-choreo-minseo", day: "mon", time: "19:00", end: "20:00", title: "Choreo Basic", teacher: "Minseo" },
  { id: "nest-mon-2000-kpop-yerin", day: "mon", time: "20:00", end: "21:00", title: "K-pop Dance", teacher: "Yerin" },
  { id: "nest-tue-1800-dance-create", day: "tue", time: "18:00", end: "19:00", title: "Dance Basic", teacher: "Create" },
  { id: "nest-tue-1900-hiphop-nayz", day: "tue", time: "19:00", end: "20:00", title: "Hiphop Basic", teacher: "Nayz" },
  { id: "nest-tue-2000-choreo-minseo", day: "tue", time: "20:00", end: "21:00", title: "Choreo Basic", teacher: "Minseo" },
  { id: "nest-wed-1900-hiphop-nayz", day: "wed", time: "19:00", end: "20:00", title: "Hiphop Basic", teacher: "Nayz" },
  { id: "nest-wed-2000-kpop-yerin", day: "wed", time: "20:00", end: "21:00", title: "K-pop Dance", teacher: "Yerin" },
  { id: "nest-wed-2100-popping-create", day: "wed", time: "21:00", end: "22:00", title: "Popping", teacher: "Create" },
  { id: "nest-thu-1800-dance-create", day: "thu", time: "18:00", end: "19:00", title: "Dance Basic", teacher: "Create" },
  { id: "nest-thu-1900-hiphop-nayz", day: "thu", time: "19:00", end: "20:00", title: "Hiphop Basic", teacher: "Nayz" },
  { id: "nest-thu-2000-choreo-minseo", day: "thu", time: "20:00", end: "21:00", title: "Choreo Basic", teacher: "Minseo" },
  { id: "nest-fri-1900-popup", day: "fri", time: "19:00", end: "20:00", title: "Pop Up Class", teacher: "" },
  { id: "nest-fri-2000-house-create", day: "fri", time: "20:00", end: "21:00", title: "House Dance", teacher: "Create" },
  { id: "nest-sat-1900-hiphop-freestyle-create", day: "sat", time: "19:00", end: "20:00", title: "Hiphop Freestyle", teacher: "Create" },
  { id: "nest-sun-1900-popup", day: "sun", time: "19:00", end: "20:00", title: "Pop Up Class", teacher: "" },
  { id: "nest-sun-2000-dance-create", day: "sun", time: "20:00", end: "21:00", title: "Dance Basic", teacher: "Create" }
];

const statusOrder = ["incoming", "styling", "shooting", "editing", "done"];
const weekendSlotTimes = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
let lang = storage.get("lang", "ko");
let selectedSlotIds = [];
let selectedNestSlotIds = [];
let editingNestSlotId = "";
let draggedOrderId = null;
let serviceReady = false;
let appInstance = null;
let authClient = null;
let recordStore = null;
let currentUser = null;
let currentAdminUid = "";
let mobileCalendarSelectionByWeek = {};
let mobileCalendarExpanded = false;
let noticesExpanded = false;
let authStateCheckId = 0;
let unsubscribeOrderRecords = null;
let unsubscribeCalendarSettings = null;
let unsubscribeSlotOverrides = [];
let unsubscribeReservationRecords = null;
let unsubscribeNestClassSlots = null;
let remoteNestClassesLoaded = false;
let remoteNestClassesEmpty = false;
let nestClassSeedPromise = null;
let renderAllQueued = false;

async function loadRemoteSdk() {
  if (initializeApp) return;
  const [appSdk, authSdk, recordSdk] = await Promise.all([
    import(sdkBase + "fire" + "base-app.js"),
    import(sdkBase + "fire" + "base-auth.js"),
    import(sdkBase + "fire" + "base-" + "fire" + "store.js")
  ]);
  ({ initializeApp } = appSdk);
  ({ getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } = authSdk);
  ({
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    updateDoc
  } = recordSdk);
  getRecordStore = recordSdk["get" + "Fire" + "store"];
}

async function initializeServices() {
  if (serviceReady) return true;
  if (servicesInitPromise) return servicesInitPromise;

  servicesInitPromise = (async () => {
    try {
      await loadRemoteSdk();
      appInstance = initializeApp(appConfig);
      authClient = getAuth(appInstance);
      recordStore = getRecordStore(appInstance, RECORD_STORE_ID);
      serviceReady = true;
      subscribeCalendarSettings();
      subscribeSlotOverrides();
      subscribeNestClassSlots();
      onAuthStateChanged(authClient, async user => {
        const checkId = ++authStateCheckId;
        currentUser = user;
        currentAdminUid = "";
        updateAuthUi();
        const hasAccess = user ? await hasAdminAccess(user) : false;
        if (checkId !== authStateCheckId || user?.uid !== currentUser?.uid) return;
        currentAdminUid = hasAccess ? user.uid : "";
        updateAuthUi();
        if (user === currentUser && isAdminUser(user)) {
          saveCalendarSettingsRecord(calendarSettings).catch(error => {
            console.warn("Calendar rollover sync failed", error);
          });
          subscribeOrderRecords();
          subscribeReservations();
          ensureRemoteNestClassSeed();
        } else {
          unsubscribeFromOrderRecords();
          unsubscribeFromReservations();
          if (document.body.classList.contains("admin-on")) setAdminMode(false);
        }
      });
      updateAuthUi();
      return true;
    } catch (error) {
      serviceReady = false;
      console.warn("Service initialization failed", error);
      updateAuthUi();
      return false;
    } finally {
      servicesInitPromise = null;
    }
  })();

  return servicesInitPromise;
}

function isAdminUser(user = currentUser) {
  return Boolean(user && user.emailVerified && user.uid && user.uid === currentUser?.uid && user.uid === currentAdminUid);
}

function updateAuthUi() {
  const adminInfo = document.getElementById("adminAuthInfo");

  if (adminInfo) {
    if (!serviceReady) {
      adminInfo.textContent = t("connectionUnavailable");
    } else if (isAdminUser()) {
      adminInfo.textContent = t("adminSignedInAs");
    } else if (currentUser) {
      adminInfo.textContent = t("adminWrongAccountInfo");
    } else {
      adminInfo.textContent = t("adminGoogleOnlyInfo");
    }
  }
}

async function signInWithGoogle({ forceAccountSelect = false } = {}) {
  if (!serviceReady) await initializeServices();
  if (!serviceReady || !authClient) throw new Error("Service is not ready");
  if (currentUser && !forceAccountSelect) return currentUser;
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  const result = await signInWithPopup(authClient, provider);
  currentUser = result.user;
  currentAdminUid = "";
  const hasAccess = await hasAdminAccess(result.user);
  if (result.user?.uid === currentUser?.uid) currentAdminUid = hasAccess ? result.user.uid : "";
  updateAuthUi();
  return result.user;
}

async function hasAdminAccess(user) {
  if (!serviceReady || !recordStore || !user?.uid || !user.emailVerified) return false;
  try {
    const snapshot = await getDoc(adminMarkerDoc(user.uid));
    return snapshot.exists();
  } catch (error) {
    console.warn("Admin marker check failed", error);
    return false;
  }
}

function inquiryCollection() {
  return collection(recordStore, "inquiries");
}

function orderRecordDoc(orderId) {
  return doc(recordStore, "inquiries", orderId);
}

function adminMarkerDoc(uid) {
  return doc(recordStore, "admins", uid);
}

function calendarSettingsDoc() {
  return doc(recordStore, "settings", "calendar");
}

function slotOverrideDoc(slotId) {
  return doc(recordStore, "slotOverrides", slotId);
}

function reservationsCollection() {
  return collection(recordStore, "reservations");
}

function nestClassSlotsCollection() {
  return collection(recordStore, "nestClasses");
}

function nestClassSlotDoc(slotId) {
  return doc(recordStore, "nestClasses", slotId);
}

function isValidNestDay(dayId) {
  return nestWeekDays.some(day => day.id === dayId);
}

function normalizeClassTime(value) {
  const raw = String(value || "").trim();
  const match = raw.match(/^([01]?\d|2[0-3])(?::?([0-5]\d))?$/);
  if (!match) return "";
  return `${String(Number(match[1])).padStart(2, "0")}:${match[2] || "00"}`;
}

function addOneHourToClassTime(time) {
  const normalized = normalizeClassTime(time);
  if (!normalized) return "";
  const [hours, minutes] = normalized.split(":").map(Number);
  return `${String((hours + 1) % 24).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function compareNestClassSlots(a, b) {
  const dayOrder = nestWeekDays.findIndex(day => day.id === a.day) - nestWeekDays.findIndex(day => day.id === b.day);
  return dayOrder || String(a.time).localeCompare(String(b.time)) || String(a.title).localeCompare(String(b.title));
}

function nestClassSortKey(slot) {
  const dayIndex = nestWeekDays.findIndex(day => day.id === slot.day);
  return `${String(Math.max(0, dayIndex)).padStart(2, "0")}-${slot.time}-${slot.title}`;
}

function newNestClassSlotId(day, time) {
  return `nest-${day}-${String(time || "").replace(/[^0-9]/g, "")}-${newId().slice(0, 8)}`;
}

function normalizeNestClassSlot(slot = {}, fallbackId = "") {
  const day = isValidNestDay(slot.day) ? slot.day : "mon";
  const time = normalizeClassTime(slot.time);
  const title = String(slot.title || "").trim().slice(0, 80);
  if (!time || !title) return null;
  const end = normalizeClassTime(slot.end) || addOneHourToClassTime(time);
  const teacher = String(slot.teacher || "").trim().slice(0, 80);
  const id = String(slot.id || fallbackId || newNestClassSlotId(day, time)).trim().slice(0, 96);
  const normalized = { id, day, time, end, title, teacher };
  return { ...normalized, sortKey: nestClassSortKey(normalized) };
}

function normalizeNestClassSlots(slotList = []) {
  const slotsById = new Map();
  (Array.isArray(slotList) ? slotList : []).forEach((slot, index) => {
    const normalized = normalizeNestClassSlot(slot, `nest-class-${index}`);
    if (normalized) slotsById.set(normalized.id, normalized);
  });
  return [...slotsById.values()].sort(compareNestClassSlots);
}

function nestClassSlotPayload(slot) {
  const normalized = normalizeNestClassSlot(slot);
  return {
    day: normalized.day,
    time: normalized.time,
    end: normalized.end,
    title: normalized.title,
    teacher: normalized.teacher,
    sortKey: normalized.sortKey,
    updatedAt: serverTimestamp()
  };
}

function recordSnapshotToNestClassSlot(docSnapshot) {
  const data = docSnapshot.data();
  return normalizeNestClassSlot({ id: docSnapshot.id, ...data }, docSnapshot.id);
}

async function saveNestClassSlotRecord(slot) {
  if (!serviceReady) await initializeServices();
  if (!serviceReady || !recordStore || !isAdminUser()) return null;
  const normalized = normalizeNestClassSlot(slot);
  if (!normalized) return null;
  await setDoc(nestClassSlotDoc(normalized.id), nestClassSlotPayload(normalized));
  return normalized;
}

async function deleteNestClassSlotRecord(slotId) {
  if (!serviceReady) await initializeServices();
  if (!serviceReady || !recordStore || !isAdminUser()) return null;
  await deleteDoc(nestClassSlotDoc(slotId));
  return slotId;
}

function subscribeNestClassSlots() {
  if (!serviceReady || !recordStore || unsubscribeNestClassSlots) return;
  unsubscribeNestClassSlots = onSnapshot(nestClassSlotsCollection(), snapshot => {
    const firstRemoteLoad = !remoteNestClassesLoaded;
    remoteNestClassesLoaded = true;
    remoteNestClassesEmpty = snapshot.empty;
    if (snapshot.empty) {
      if (firstRemoteLoad && isAdminUser()) ensureRemoteNestClassSeed();
      if (!firstRemoteLoad) {
        nestClassSlots = [];
        selectedNestSlotIds = [];
        editingNestSlotId = "";
        saveState();
        requestRenderAll();
      }
      return;
    }

    const nextSlots = normalizeNestClassSlots(snapshot.docs.map(recordSnapshotToNestClassSlot).filter(Boolean));
    nestClassSlots = nextSlots;
    selectedNestSlotIds = selectedNestSlotIds.filter(slotId => nestClassSlots.some(slot => slot.id === slotId));
    if (editingNestSlotId && !nestClassSlots.some(slot => slot.id === editingNestSlotId)) editingNestSlotId = "";
    saveState();
    requestRenderAll();
  }, error => {
    console.warn("Nest class subscription failed", error);
  });
}

async function ensureRemoteNestClassSeed() {
  if (!serviceReady || !recordStore || !isAdminUser() || !remoteNestClassesLoaded || !remoteNestClassesEmpty || nestClassSeedPromise) return;
  nestClassSeedPromise = Promise.all(nestClassSlots.map(slot => saveNestClassSlotRecord(slot)))
    .catch(error => {
      console.warn("Nest class seed failed", error);
    })
    .finally(() => {
      nestClassSeedPromise = null;
    });
  return nestClassSeedPromise;
}

function orderSlotSummary(slotIds) {
  const labels = compactSlotLabels(slotIds).filter(label => label && label !== "—");
  return labels.join("\n");
}

function recordPayloadFromOrder({ name, contact, concept, slotIds, slotSummary, memo }, source = "public") {
  const cleanSlotIds = [...new Set((Array.isArray(slotIds) ? slotIds : []).filter(Boolean))].slice(0, 20);
  const owner = source === "admin" ? currentUser : null;
  const summary = String(slotSummary || orderSlotSummary(cleanSlotIds));
  return {
    name: String(name || "").trim() || t("anonymous"),
    contact: String(contact || "").trim(),
    concept: String(concept || ""),
    slotText: summary,
    slotIdsText: cleanSlotIds.join(","),
    memo: String(memo || "").trim(),
    status: "incoming",
    source,
    ownerUid: owner?.uid || "",
    ownerEmail: owner?.email || "",
    ownerName: owner?.displayName || "",
    language: lang,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };
}

async function saveOrderRecord(details, source = "public") {
  if (!serviceReady) await initializeServices();
  if (!serviceReady || !recordStore) return null;
  if (source === "admin" && !isAdminUser()) return null;
  return addDoc(inquiryCollection(), recordPayloadFromOrder(details, source));
}

function recordSnapshotToOrder(docSnapshot) {
  const data = docSnapshot.data();
  const slotIds = String(data.slotIdsText || "").split(",").map(item => item.trim()).filter(Boolean);
  return {
    id: docSnapshot.id,
    recordId: docSnapshot.id,
    name: data.name || t("anonymous"),
    contact: data.contact || "",
    concept: data.concept || "",
    slotId: slotIds[0] || "",
    slotIds,
    slotSummary: data.slotText || "",
    status: statusOrder.includes(data.status) ? data.status : "incoming",
    memo: data.memo || "",
    createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : new Date().toISOString()
  };
}

function unsubscribeFromOrderRecords() {
  if (unsubscribeOrderRecords) {
    unsubscribeOrderRecords();
    unsubscribeOrderRecords = null;
  }
}

function subscribeOrderRecords() {
  if (!serviceReady || !recordStore || unsubscribeOrderRecords) return;
  const q = query(inquiryCollection(), orderBy("createdAt", "desc"));
  unsubscribeOrderRecords = onSnapshot(q, snapshot => {
    orders = snapshot.docs.map(recordSnapshotToOrder);
    saveState();
    renderAll();
  }, error => {
    console.warn("Order subscription failed", error);
    showToast(t("loadFailed"));
  });
}

function rebuildSlotsFromCalendarSettings(nextSettings) {
  calendarSettings = normalizeCalendarSettings(nextSettings);
  slots = makeSlots(calendarSettings, slots);
  selectedSlotIds = selectedSlotIds.filter(slotId => slots.some(slot => slot.id === slotId));
  saveState();
  subscribeSlotOverrides();
  renderAll();
  persistRolledCalendarSettings(nextSettings);
}

function persistRolledCalendarSettings(sourceSettings) {
  const source = normalizeCalendarSettings({
    openStartDate: sourceSettings?.openStartDate,
    openEndDate: sourceSettings?.openEndDate
  });
  const changed = source.openStartDate !== sourceSettings?.openStartDate || source.openEndDate !== sourceSettings?.openEndDate;
  if (!changed || !isAdminUser()) return;
  saveCalendarSettingsRecord(source).catch(error => {
    console.warn("Calendar rollover save failed", error);
  });
}

function applyCalendarRollover() {
  const previousSettings = calendarSettings;
  const nextSettings = normalizeCalendarSettings(calendarSettings);
  if (
    nextSettings.openStartDate === previousSettings.openStartDate &&
    nextSettings.openEndDate === previousSettings.openEndDate
  ) return;

  rebuildSlotsFromCalendarSettings(nextSettings);
  if (isAdminUser()) {
    saveCalendarSettingsRecord(nextSettings).catch(error => {
      console.warn("Calendar rollover save failed", error);
    });
  }
}

function subscribeCalendarSettings() {
  if (!serviceReady || !recordStore || unsubscribeCalendarSettings) return;
  unsubscribeCalendarSettings = onSnapshot(calendarSettingsDoc(), snapshot => {
    if (snapshot.exists()) {
      rebuildSlotsFromCalendarSettings(snapshot.data());
    }
  }, error => {
    console.warn("Calendar settings subscription failed", error);
  });
}

function unsubscribeFromSlotOverrides() {
  unsubscribeSlotOverrides.forEach(unsubscribe => unsubscribe());
  unsubscribeSlotOverrides = [];
}

function subscribeSlotOverrides() {
  if (!serviceReady || !recordStore || !slots.length) return;
  unsubscribeFromSlotOverrides();
  const visibleSlotIds = [...new Set(slots.map(slot => slot.id))];
  slotOverrides = Object.fromEntries(Object.entries(slotOverrides).filter(([slotId]) => visibleSlotIds.includes(slotId)));
  visibleSlotIds.forEach(slotId => {
    const unsubscribe = onSnapshot(slotOverrideDoc(slotId), snapshot => {
      let changed = false;
      if (snapshot.exists()) {
        const data = snapshot.data();
        const nextOverride = {
          slotId: data.slotId || slotId,
          date: data.date || "",
          time: data.time || "",
          kind: data.kind || "",
          closed: Boolean(data.closed)
        };
        const previous = slotOverrides[slotId];
        changed = !previous ||
          previous.date !== nextOverride.date ||
          previous.time !== nextOverride.time ||
          previous.kind !== nextOverride.kind ||
          previous.closed !== nextOverride.closed;
        slotOverrides = {
          ...slotOverrides,
          [slotId]: nextOverride
        };
      } else {
        if (!slotOverrides[slotId]) return;
        const nextOverrides = { ...slotOverrides };
        delete nextOverrides[slotId];
        slotOverrides = nextOverrides;
        changed = true;
      }
      if (changed) {
        saveState();
        requestRenderAll();
      }
    }, error => {
      console.warn("Slot override subscription failed", error);
    });
    unsubscribeSlotOverrides.push(unsubscribe);
  });
}

async function saveCalendarSettingsRecord(settings) {
  if (!serviceReady) await initializeServices();
  if (!serviceReady || !recordStore || !isAdminUser()) return null;
  const normalized = normalizeCalendarSettings(settings);
  await setDoc(calendarSettingsDoc(), {
    openStartDate: normalized.openStartDate,
    openEndDate: normalized.openEndDate,
    updatedAt: serverTimestamp()
  });
  return normalized;
}

async function saveSlotOverrideRecord(slot, closed) {
  if (!serviceReady) await initializeServices();
  if (!serviceReady || !recordStore || !isAdminUser() || !slot) return null;
  await setDoc(slotOverrideDoc(slot.id), {
    slotId: slot.id,
    date: slot.date,
    time: String(slot.time || ""),
    kind: slot.kind,
    closed: Boolean(closed),
    updatedAt: serverTimestamp()
  });
  return Boolean(closed);
}

function reservationPayload({ requestId, name, contact, concept, slotId, memo, status = "confirmed" }) {
  return {
    requestId: String(requestId || "").trim(),
    name: String(name || "").trim() || t("anonymous"),
    contact: String(contact || "").trim(),
    concept: String(concept || ""),
    slotId: String(slotId || ""),
    slotText: slotId ? formatSlot(slotId) : "",
    status: ["confirmed", "completed", "cancelled"].includes(status) ? status : "confirmed",
    memo: String(memo || "").trim(),
    source: "admin",
    createdByUid: currentUser?.uid || "",
    language: lang,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };
}

async function saveReservationRecord(details) {
  if (!serviceReady) await initializeServices();
  if (!serviceReady || !recordStore || !isAdminUser()) return null;
  return addDoc(reservationsCollection(), reservationPayload(details));
}

function recordSnapshotToReservation(docSnapshot) {
  const data = docSnapshot.data();
  return {
    id: docSnapshot.id,
    recordId: docSnapshot.id,
    requestId: data.requestId || "",
    name: data.name || t("anonymous"),
    contact: data.contact || "",
    concept: data.concept || "",
    slotId: data.slotId || "",
    slotText: data.slotText || "",
    status: ["confirmed", "completed", "cancelled"].includes(data.status) ? data.status : "confirmed",
    memo: data.memo || "",
    createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : new Date().toISOString()
  };
}

function unsubscribeFromReservations() {
  if (unsubscribeReservationRecords) {
    unsubscribeReservationRecords();
    unsubscribeReservationRecords = null;
  }
}

function subscribeReservations() {
  if (!serviceReady || !recordStore || unsubscribeReservationRecords) return;
  const q = query(reservationsCollection(), orderBy("createdAt", "desc"));
  unsubscribeReservationRecords = onSnapshot(q, snapshot => {
    reservations = snapshot.docs.map(recordSnapshotToReservation);
    saveState();
    renderAll();
  }, error => {
    console.warn("Reservation subscription failed", error);
    showToast(t("loadFailed"));
  });
}

function startOfToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function isoDateFromUtcMs(utcMs) {
  return new Date(utcMs).toISOString().slice(0, 10);
}

function currentKoreaServiceDate(now = new Date()) {
  const koreaNowMs = now.getTime() + KOREA_UTC_OFFSET_MS;
  const koreaDate = new Date(koreaNowMs);
  const rolloverPassed = koreaDate.getUTCHours() >= CALENDAR_ROLLOVER_HOUR_KST;
  const serviceDateMs = Date.UTC(
    koreaDate.getUTCFullYear(),
    koreaDate.getUTCMonth(),
    koreaDate.getUTCDate() + (rolloverPassed ? 1 : 0)
  );
  return isoDateFromUtcMs(serviceDateMs);
}

function daysBetweenISO(startIso, endIso) {
  const start = new Date(`${startIso}T00:00:00`);
  const end = new Date(`${endIso}T00:00:00`);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return 0;
  return Math.floor((end - start) / 86400000);
}

function startOfMondayWeek(date) {
  const start = new Date(date);
  const weekday = start.getDay();
  const offset = weekday === 0 ? -6 : 1 - weekday;
  start.setDate(start.getDate() + offset);
  return start;
}

function toISODate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function isISODateString(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function defaultCalendarSettings() {
  const start = addDays(startOfToday(), 1);
  return {
    openStartDate: toISODate(start),
    openEndDate: toISODate(addDays(start, DEFAULT_CALENDAR_OPEN_DAYS - 1))
  };
}

function normalizeCalendarSettings(settings) {
  const fallback = defaultCalendarSettings();
  const openStartDate = isISODateString(settings?.openStartDate) ? settings.openStartDate : fallback.openStartDate;
  const rawEndDate = isISODateString(settings?.openEndDate) ? settings.openEndDate : fallback.openEndDate;
  const normalized = {
    openStartDate,
    openEndDate: rawEndDate >= openStartDate ? rawEndDate : openStartDate
  };
  return rollCalendarSettingsForward(normalized);
}

function rollCalendarSettingsForward(settings, now = new Date()) {
  const serviceDate = currentKoreaServiceDate(now);
  if (!settings?.openStartDate || settings.openStartDate >= serviceDate) return settings;

  const dayShift = daysBetweenISO(settings.openStartDate, serviceDate);
  if (dayShift <= 0) return settings;

  return {
    openStartDate: serviceDate,
    openEndDate: toISODate(addDays(new Date(`${settings.openEndDate}T00:00:00`), dayShift))
  };
}

function calendarDayCount(settings) {
  const start = new Date(`${settings.openStartDate}T00:00:00`);
  const end = new Date(`${settings.openEndDate}T00:00:00`);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start) return DEFAULT_CALENDAR_OPEN_DAYS;
  return Math.min(120, Math.floor((end - start) / 86400000) + 1);
}

function makeSlots(settings, previousSlots = []) {
  const normalized = normalizeCalendarSettings(settings);
  const previousById = new Map(previousSlots.map(slot => [slot.id, slot]));
  const slots = [];
  const base = new Date(`${normalized.openStartDate}T00:00:00`);
  for (let d = 0; d < calendarDayCount(normalized); d += 1) {
    const date = addDays(base, d);
    const iso = toISODate(date);
    const day = date.getDay();
    const isWeekend = day === 0 || day === 6;
    const times = isWeekend ? weekendSlotTimes : ["request"];
    times.forEach((time, index) => {
      slots.push({
        id: `${iso}-${time}`,
        date: iso,
        time,
        kind: isWeekend ? "time" : "weekdayRequest",
        requests: previousById.get(`${iso}-${time}`)?.requests || 0,
        reserved: false,
        capacity: 6
      });
    });
  }
  storage.set("slots", slots);
  storage.set("slotDataVersion", SLOT_DATA_VERSION);
  return slots;
}

let calendarSettings = normalizeCalendarSettings(storage.get("calendarSettings", null));
let slotOverrides = storage.get("slotOverrides", {});
let slots = makeSlots(calendarSettings, storage.get("slots", []));
let nestClassSlots = normalizeNestClassSlots(storage.get("nestClassSlots", defaultNestClassSlots));
let reservations = storage.get("reservations", []);
let orders = storage.get("orders", [
  {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + 1),
    name: "민지",
    contact: "minji@example.com",
    concept: "profileA",
    slotId: slots[2]?.id || "",
    status: "incoming",
    memo: "핑크 리본 소품 희망",
    createdAt: new Date().toISOString()
  },
  {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + 2),
    name: "Hana",
    contact: "hana@example.com",
    concept: "package",
    slotId: slots[6]?.id || "",
    status: "editing",
    memo: "SNS 공개 가능",
    createdAt: new Date(Date.now() - 86400000).toISOString()
  }
]);

function saveState() {
  storage.set("slots", slots);
  storage.set("orders", orders);
  storage.set("calendarSettings", calendarSettings);
  storage.set("slotOverrides", slotOverrides);
  storage.set("nestClassSlots", nestClassSlots);
  storage.set("reservations", reservations);
}

function t(key) {
  return key.split(".").reduce((acc, part) => acc && acc[part], i18n[lang]) || key;
}

function interpolate(template, vars) {
  return template.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? "");
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  }[char]));
}

function escapeAttr(value) {
  return escapeHTML(value);
}

function safeText(value, fallback = "—") {
  const text = String(value ?? "").trim();
  return escapeHTML(text || fallback);
}

function safeNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function formatDate(iso, options = {}) {
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return String(iso || "—");
  return new Intl.DateTimeFormat(lang === "ko" ? "ko-KR" : "en-US", {
    month: "short",
    day: "numeric",
    weekday: options.weekday || "short"
  }).format(date);
}

function formatShortMonthDay(iso) {
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return String(iso || "—");
  return `${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
}

function formatDateRangeShort(startIso, endIso = startIso) {
  return startIso === endIso
    ? formatShortMonthDay(startIso)
    : `${formatShortMonthDay(startIso)}-${formatShortMonthDay(endIso)}`;
}

function isoDateTime(iso) {
  return new Date(`${iso}T00:00:00`).getTime();
}

function isNextISODate(previousIso, nextIso) {
  if (!previousIso || !nextIso) return false;
  return toISODate(addDays(new Date(`${previousIso}T00:00:00`), 1)) === nextIso;
}

function formatWeekdayRangeLabel(rangeSlots) {
  const dates = rangeSlots.map(slot => slot.date).sort();
  return `${formatDateRangeShort(dates[0], dates[dates.length - 1])} · ${slotDisplayLabel(rangeSlots[0])}`;
}

function compactSlotLabels(slotIds) {
  const slotById = new Map(slots.map(slot => [slot.id, slot]));
  const orderedSlots = [...new Set(slotIds)]
    .map(slotId => slotById.get(slotId))
    .filter(Boolean)
    .sort((a, b) => isoDateTime(a.date) - isoDateTime(b.date) || String(a.time).localeCompare(String(b.time)));
  const labels = [];
  let weekdayRange = [];

  const flushWeekdayRange = () => {
    if (!weekdayRange.length) return;
    labels.push(formatWeekdayRangeLabel(weekdayRange));
    weekdayRange = [];
  };

  orderedSlots.forEach(slot => {
    if (slot.kind === "weekdayRequest") {
      const previous = weekdayRange[weekdayRange.length - 1];
      if (!previous || isNextISODate(previous.date, slot.date)) {
        weekdayRange.push(slot);
      } else {
        flushWeekdayRange();
        weekdayRange.push(slot);
      }
      return;
    }

    flushWeekdayRange();
    labels.push(formatSlot(slot.id));
  });

  flushWeekdayRange();
  return labels;
}

function formatMonthLegend(iso) {
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return String(iso || "—");
  return `${String(date.getFullYear()).slice(2)}.${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function formatWeekday(iso) {
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return String(iso || "—");
  return new Intl.DateTimeFormat(lang === "ko" ? "ko-KR" : "en-US", {
    weekday: "short"
  }).format(date);
}

function formatSlot(slotId) {
  const slot = slots.find(item => item.id === slotId);
  if (!slot) return "—";
  return `${formatDate(slot.date)} ${slotDisplayLabel(slot)}`;
}

function orderSlotIds(order) {
  if (Array.isArray(order?.slotIds) && order.slotIds.length) return order.slotIds.filter(Boolean);
  return order?.slotId ? [order.slotId] : [];
}

function formatOrderSlots(order, separator = " · ") {
  const labels = compactSlotLabels(orderSlotIds(order)).filter(label => label && label !== "—");
  if (!labels.length && order?.slotSummary) return order.slotSummary.split("\n").filter(Boolean).join(separator);
  return labels.length ? labels.join(separator) : "—";
}

function renderOrderSlotLines(order) {
  const labels = compactSlotLabels(orderSlotIds(order)).filter(label => label && label !== "—");
  if (!labels.length && order?.slotSummary) return order.slotSummary.split("\n").map(label => safeText(label)).join("<br>");
  return labels.length ? labels.map(label => safeText(label)).join("<br>") : "—";
}

function toggleSlotSelection(slotId) {
  const slot = slots.find(item => item.id === slotId);
  if (!slot || isSlotBlocked(slot)) return;
  selectedSlotIds = selectedSlotIds.includes(slotId)
    ? selectedSlotIds.filter(id => id !== slotId)
    : [...selectedSlotIds, slotId];
}

function toggleSlotRangeSelection(slotIds) {
  const availableIds = slotIds
    .map(slotId => slots.find(item => item.id === slotId))
    .filter(slot => slot && !isSlotBlocked(slot))
    .map(slot => slot.id);
  if (!availableIds.length) return;
  const allSelected = availableIds.every(slotId => selectedSlotIds.includes(slotId));
  selectedSlotIds = allSelected
    ? selectedSlotIds.filter(slotId => !availableIds.includes(slotId))
    : [...new Set([...selectedSlotIds, ...availableIds])];
}

async function toggleAdminSlotClosed(slotId) {
  if (!isAdminUser()) {
    showToast(t("authRequired"));
    return;
  }
  const slot = slots.find(item => item.id === slotId);
  if (!slot) return;
  const wasClosed = isAdminClosedSlot(slot);
  const nextClosed = !wasClosed;
  const previous = slotOverrides[slotId];
  slotOverrides[slotId] = {
    slotId,
    date: slot.date,
    time: String(slot.time || ""),
    kind: slot.kind,
    closed: nextClosed
  };
  saveState();
  renderAll();
  try {
    await saveSlotOverrideRecord(slot, nextClosed);
    showToast(t(nextClosed ? "slotClosedByAdmin" : "slotOpenedByAdmin"));
  } catch (error) {
    console.warn("Slot override save failed", error);
    if (previous) {
      slotOverrides[slotId] = previous;
    } else {
      delete slotOverrides[slotId];
    }
    saveState();
    renderAll();
    showToast(t("saveFailed"));
  }
}

async function toggleAdminSlotRangeClosed(slotIds) {
  if (!isAdminUser()) {
    showToast(t("authRequired"));
    return;
  }
  const rangeSlots = slotIds
    .map(slotId => slots.find(item => item.id === slotId))
    .filter(Boolean);
  if (!rangeSlots.length) return;
  const nextClosed = !rangeSlots.every(isAdminClosedSlot);
  const previousOverrides = new Map(rangeSlots.map(slot => [slot.id, slotOverrides[slot.id]]));
  rangeSlots.forEach(slot => {
    slotOverrides[slot.id] = {
      slotId: slot.id,
      date: slot.date,
      time: String(slot.time || ""),
      kind: slot.kind,
      closed: nextClosed
    };
  });
  saveState();
  renderAll();
  try {
    await Promise.all(rangeSlots.map(slot => saveSlotOverrideRecord(slot, nextClosed)));
    showToast(t(nextClosed ? "slotClosedByAdmin" : "slotOpenedByAdmin"));
  } catch (error) {
    console.warn("Slot range override save failed", error);
    previousOverrides.forEach((previous, slotId) => {
      if (previous) {
        slotOverrides[slotId] = previous;
      } else {
        delete slotOverrides[slotId];
      }
    });
    saveState();
    renderAll();
    showToast(t("saveFailed"));
  }
}

function hasInvalidSelectedSlot() {
  return selectedSlotIds.some(slotId => {
    const slot = slots.find(item => item.id === slotId);
    return !slot || isSlotBlocked(slot);
  });
}

function currentInquiryDetails() {
  return {
    name: document.getElementById("customerName")?.value || "",
    contact: document.getElementById("customerContact")?.value || "",
    concept: document.getElementById("conceptSelect")?.value || "",
    slotIds: [...selectedSlotIds],
    memo: document.getElementById("customerMemo")?.value || ""
  };
}

function hasCompleteSmsInquiry(details = currentInquiryDetails()) {
  return Boolean(
    String(details.name || "").trim() &&
    String(details.contact || "").trim() &&
    String(details.concept || "").trim() &&
    String(details.memo || "").trim() &&
    details.slotIds.length &&
    !hasInvalidSelectedSlot()
  );
}

function updateInquiryButtonState() {
  const kakaoButton = document.getElementById("inquiryButton");
  const smsButton = document.getElementById("smsInquiryButton");
  const details = currentInquiryDetails();
  const hasName = Boolean(String(details.name || "").trim());
  const hasInvalidSlot = hasInvalidSelectedSlot();
  if (kakaoButton) kakaoButton.disabled = !hasName || hasInvalidSlot;
  if (smsButton) smsButton.disabled = !hasCompleteSmsInquiry(details);
}

function composeInquiryMessage({ name, contact, concept, slotIds, memo }) {
  const conceptInfo = t(`concepts.${concept}`);
  const slotLines = compactSlotLabels(slotIds).filter(label => label && label !== "—");
  return [
    t("copyMessageTitle"),
    `${t("copyNameLabel")}: ${String(name || "").trim() || t("anonymous")}`,
    `${t("copyContactLabel")}: ${String(contact || "").trim() || "—"}`,
    `${t("copyConceptLabel")}: ${conceptInfo?.title || concept || "—"}`,
    `${t("copySlotsLabel")}:`,
    ...(slotLines.length ? slotLines.map(label => `- ${label}`) : ["- —"]),
    `${t("copyMemoLabel")}: ${String(memo || "").trim() || "—"}`
  ].join("\n");
}

function smsUrlFromMessage(message) {
  return `sms:?&body=${encodeURIComponent(message)}`;
}

function selectedInquirySlotsAreUsable(slotIds) {
  const chosenSlots = slotIds.map(id => slots.find(item => item.id === id)).filter(Boolean);
  return !slotIds.length || (chosenSlots.length === slotIds.length && !chosenSlots.some(isSlotBlocked));
}

function recordPublicInquiry(inquiryDetails, form) {
  const localOrderId = newId();
  selectedSlotIds = [];
  addOrder({ ...inquiryDetails, id: localOrderId });
  form.reset();
  renderSelectedSlot();
  saveOrderRecord(inquiryDetails, "public").then(docRef => {
    const recordId = docRef?.id || "";
    if (!recordId) return;
    const order = orders.find(item => item.id === localOrderId);
    if (order) {
      order.id = recordId;
      order.recordId = recordId;
      saveState();
      renderAll();
    }
    showToast(t("saveSucceeded"));
  }).catch(error => {
    console.warn("Inquiry save failed", error);
    showToast(t("saveFailed"));
  });
}

async function copyTextToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      // Fall through to the textarea copy path.
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "-9999px";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  try {
    return document.execCommand("copy");
  } catch (error) {
    return false;
  } finally {
    textarea.remove();
  }
}

function slotDisplayLabel(slot) {
  if (!slot) return "—";
  return slot.kind === "weekdayRequest" || slot.time === "request" ? t("weekdayRequest") : String(slot.time || "");
}

function slotStartDate(slot) {
  if (!slot || !/^\d{2}:\d{2}$/.test(String(slot.time || ""))) return null;
  const date = new Date(`${slot.date}T${slot.time}:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function isWeekendSlot(slot) {
  if (!slot || slot.kind !== "time") return false;
  const date = new Date(`${slot.date}T00:00:00`);
  if (Number.isNaN(date.getTime())) return false;
  const day = date.getDay();
  return day === 0 || day === 6;
}

function isAutoClosedSlot(slot) {
  if (!isWeekendSlot(slot)) return false;
  const start = slotStartDate(slot);
  if (!start) return false;
  return start.getTime() - Date.now() <= SLOT_CLOSE_WINDOW_MS;
}

function isPastWeekdayRequest(slot) {
  if (!slot || slot.kind !== "weekdayRequest") return false;
  const slotDate = new Date(`${slot.date}T23:59:59`);
  return !Number.isNaN(slotDate.getTime()) && slotDate.getTime() < Date.now();
}

function isAdminClosedSlot(slot) {
  return Boolean(slot && slotOverrides[slot.id]?.closed);
}

function isSlotBlocked(slot) {
  return Boolean(slot?.reserved) || isAdminClosedSlot(slot) || isAutoClosedSlot(slot) || isPastWeekdayRequest(slot);
}

function setLanguage(nextLang) {
  lang = nextLang;
  document.documentElement.lang = lang;
  storage.set("lang", lang);
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.textContent = t(key);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    el.setAttribute("placeholder", t(key));
  });
  document.querySelectorAll("[data-lang-option]").forEach(button => {
    button.setAttribute("aria-pressed", String(button.dataset.langOption === lang));
  });
  updateAuthUi();
  updateNoticeFoldUi();
  renderAll();
}

function renderConceptOptions(selectId) {
  const select = document.getElementById(selectId);
  if (!select) return;
  const current = select.value;
  select.innerHTML = `<option value="">${t("selectConcept")}</option>` + conceptMeta.map(({ id }) => {
    const concept = t(`concepts.${id}`);
    return `<option value="${escapeAttr(id)}">${safeText(concept.title)}</option>`;
  }).join("");
  if (current) select.value = current;
}

function slotOptionLabel(slot) {
  const label = `${formatDate(slot.date)} · ${slotDisplayLabel(slot)}`;
  return isSlotBlocked(slot) ? `${label} · ${t("adminClosedState")}` : label;
}

function renderSlotOptions(selectId = "adminSlot") {
  const select = document.getElementById(selectId);
  if (!select) return;
  const current = select.value;
  select.innerHTML = slots.map(slot => `<option value="${escapeAttr(slot.id)}">${safeText(slotOptionLabel(slot))}</option>`).join("");
  if (current) select.value = current;
}

function renderReservationRequestOptions() {
  const select = document.getElementById("reservationRequest");
  if (!select) return;
  const current = select.value;
  select.innerHTML = `<option value="">${safeText(t("manualReservationOption"))}</option>` + orders.map(order => `
    <option value="${escapeAttr(order.id)}">${safeText(order.name)} · ${safeText(orderLabel(order))} · ${safeText(formatOrderSlots(order))}</option>
  `).join("");
  if (current) select.value = current;
}

function renderReservationStatusOptions() {
  const select = document.getElementById("reservationStatus");
  if (!select) return;
  const current = select.value || "confirmed";
  select.innerHTML = ["confirmed", "completed", "cancelled"].map(status => `
    <option value="${escapeAttr(status)}">${safeText(t(`reservationStatuses.${status}`))}</option>
  `).join("");
  select.value = current;
}

function renderCalendarWindowForm() {
  const start = document.getElementById("calendarOpenStart");
  const end = document.getElementById("calendarOpenEnd");
  if (!start || !end) return;
  if (document.activeElement !== start) start.value = calendarSettings.openStartDate;
  if (document.activeElement !== end) end.value = calendarSettings.openEndDate;
}

function renderConceptCards() {
  const grid = document.getElementById("conceptGrid");
  grid.innerHTML = conceptMeta.map(({ id, symbol }) => {
    const concept = t(`concepts.${id}`);
    const isProfileGuide = id === "profileA";
    const guideUrl = isProfileGuide ? PROFILE_GUIDE_URL : CONCEPT_GUIDE_URL;
    const guideLabel = isProfileGuide ? t("viewGuide") : t("seeConcepts");
    return `
      <article class="concept-card" data-concept="${escapeAttr(id)}" data-symbol="${escapeAttr(symbol)}">
        <h3>${safeText(concept.title)}</h3>
        <div class="concept-actions">
          <a class="primary-btn" href="${escapeAttr(guideUrl)}" target="_blank" rel="noopener noreferrer">${safeText(guideLabel)}</a>
          <button class="ghost-btn concept-pick-btn" type="button" data-concept-pick="${escapeAttr(id)}">${safeText(t("selectThisConcept"))}</button>
          <span class="price-chip">${safeText(concept.price)}</span>
        </div>
      </article>
    `;
  }).join("");

  grid.querySelectorAll("[data-concept-pick]").forEach(button => {
    button.addEventListener("click", () => {
      const conceptId = button.getAttribute("data-concept-pick");
      const select = document.getElementById("conceptSelect");
      if (select) select.value = conceptId;
      document.getElementById("calendar")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function groupSlotsByDate() {
  return slots.reduce((acc, slot) => {
    acc[slot.date] = acc[slot.date] || [];
    acc[slot.date].push(slot);
    return acc;
  }, {});
}

function futureCalendarWeeks() {
  const openStart = new Date(`${calendarSettings.openStartDate}T00:00:00`);
  const openEnd = addDays(openStart, calendarDayCount(calendarSettings) - 1);
  let weekStart = startOfMondayWeek(openStart);
  const weeks = [];
  while (weekStart <= openEnd) {
    weeks.push(Array.from({ length: 7 }, (_, dayIndex) => {
      const date = addDays(weekStart, dayIndex);
      const iso = toISODate(date);
      return {
        iso,
        inWindow: date >= openStart && date <= openEnd
      };
    }));
    weekStart = addDays(weekStart, 7);
  }
  return weeks;
}

function weekMonthLabels(weekDays) {
  return [...new Set(weekDays.filter(day => day.inWindow).map(day => formatMonthLegend(day.iso)))];
}

function slotsForDate(date) {
  return slots
    .filter(slot => slot.date === date)
    .sort((a, b) => String(a.time).localeCompare(String(b.time)));
}

function visibleWeekCells(weekDates) {
  const weekdayCells = [];
  let weekdayRun = null;
  const weekendDays = [];

  const flushWeekdayRun = () => {
    if (!weekdayRun) return;
    weekdayCells.push(weekdayRun);
    weekdayRun = null;
  };

  weekDates.forEach(day => {
    const date = new Date(`${day.iso}T00:00:00`);
    const weekday = date.getDay();
    if (weekday >= 1 && weekday <= 5) {
      const requestSlot = slotsForDate(day.iso).find(slot => slot.kind === "weekdayRequest");
      const isAvailable = Boolean(day.inWindow && requestSlot);
      const type = isAvailable ? "weekdayRange" : "unavailableRange";
      if (!weekdayRun || weekdayRun.type !== type) flushWeekdayRun();
      if (!weekdayRun) weekdayRun = isAvailable
        ? { type, slots: [] }
        : { type, days: [] };
      if (isAvailable) {
        weekdayRun.slots.push(requestSlot);
      } else {
        weekdayRun.days.push(day);
      }
      return;
    }
    flushWeekdayRun();
    weekendDays.push(day.inWindow ? { type: "day", day } : { type: "unavailableDay", day });
  });
  flushWeekdayRun();

  return [
    ...weekdayCells,
    ...weekendDays
  ];
}

function weekKey(weekDates) {
  const dates = weekDates.filter(day => day.inWindow).map(day => day.iso);
  return dates.length ? `${dates[0]}_${dates[dates.length - 1]}` : "";
}

function calendarCellKey(cell) {
  if (cell.type === "weekdayRange") return `weekday_${cell.slots.map(slot => slot.date).join("_")}`;
  if (cell.type === "unavailableRange") return `unavailable_${cell.days.map(day => day.iso).join("_")}`;
  return `${cell.type}_${cell.day.iso}`;
}

function isUnavailableCell(cell) {
  return cell.type === "unavailableRange" || cell.type === "unavailableDay";
}

function unavailableStatusForDate(iso) {
  return isoDateTime(iso) < isoDateTime(calendarSettings.openStartDate)
    ? t("pastDate")
    : t("unavailableDate");
}

function unavailableCellDateRange(cell) {
  if (cell.type === "unavailableRange") {
    return formatDateRangeShort(cell.days[0].iso, cell.days[cell.days.length - 1].iso);
  }
  return formatDate(cell.day.iso);
}

function calendarCellLabel(cell) {
  if (cell.type === "weekdayRange") return formatWeekdayRangeLabel(cell.slots);
  if (cell.type === "unavailableRange") {
    return `${unavailableCellDateRange(cell)} · ${unavailableStatusForDate(cell.days[0].iso)}`;
  }
  if (cell.type === "unavailableDay") {
    return `${formatDate(cell.day.iso)} · ${unavailableStatusForDate(cell.day.iso)}`;
  }
  return `${formatDate(cell.day.iso)} · ${formatWeekday(cell.day.iso)}`;
}

function miniCellNumber(cell) {
  if (cell.type === "weekdayRange") return `${new Date(`${cell.slots[0].date}T00:00:00`).getDate()}-${new Date(`${cell.slots[cell.slots.length - 1].date}T00:00:00`).getDate()}`;
  if (cell.type === "unavailableRange") return `${new Date(`${cell.days[0].iso}T00:00:00`).getDate()}-${new Date(`${cell.days[cell.days.length - 1].iso}T00:00:00`).getDate()}`;
  return new Date(`${cell.day.iso}T00:00:00`).getDate();
}

function miniCellWeekday(cell) {
  if (cell.type === "weekdayRange") return cell.slots.length === 1 ? formatWeekday(cell.slots[0].date) : `${formatWeekday(cell.slots[0].date)}-${formatWeekday(cell.slots[cell.slots.length - 1].date)}`;
  if (cell.type === "unavailableRange") return cell.days.length === 1 ? formatWeekday(cell.days[0].iso) : `${formatWeekday(cell.days[0].iso)}-${formatWeekday(cell.days[cell.days.length - 1].iso)}`;
  return formatWeekday(cell.day.iso);
}

function cellHasSelectedSlot(cell) {
  if (cell.type === "weekdayRange") return cell.slots.some(slot => selectedSlotIds.includes(slot.id));
  if (cell.type === "day") return slotsForDate(cell.day.iso).some(slot => selectedSlotIds.includes(slot.id));
  return false;
}

function renderMobileCalendarTools(weekId, cells, selectedKey) {
  if (!weekId) return "";
  return `
    <div class="mobile-calendar-tools">
      <div class="mobile-mini-calendar" aria-label="${escapeAttr(t("calendarTitle"))}">
        ${cells.map(cell => {
          const key = calendarCellKey(cell);
          const unavailable = isUnavailableCell(cell);
          return `
            <button
              class="mobile-mini-day ${key === selectedKey ? "is-active" : ""} ${unavailable ? "is-unavailable" : ""} ${cellHasSelectedSlot(cell) ? "is-selected" : ""}"
              type="button"
              data-mobile-week="${escapeAttr(weekId)}"
              data-mobile-cell-choice="${escapeAttr(key)}"
              ${unavailable ? "disabled" : ""}
              aria-pressed="${key === selectedKey ? "true" : "false"}"
              aria-label="${escapeAttr(calendarCellLabel(cell))}"
            >
              <strong>${safeText(miniCellNumber(cell))}</strong>
              <span>${safeText(miniCellWeekday(cell))}</span>
            </button>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

function renderUnavailableRangeCell(days, mobileKey = "", isMobileActive = false) {
  const dateLabel = formatDateRangeShort(days[0].iso, days[days.length - 1].iso);
  const weekdayLabel = days.length === 1
    ? formatWeekday(days[0].iso)
    : `${formatWeekday(days[0].iso)}-${formatWeekday(days[days.length - 1].iso)}`;
  return `
    <section class="calendar-day-column is-weekday is-weekday-range is-unavailable ${isMobileActive ? "is-mobile-active" : ""}" data-mobile-cell="${escapeAttr(mobileKey)}">
      <div class="calendar-day-head">
        <strong>${safeText(dateLabel)}</strong>
        <span>${safeText(weekdayLabel)}</span>
      </div>
      <div class="calendar-slot-list">
        <button class="slot-btn is-unavailable" type="button" disabled>
          <span class="slot-time">${safeText(unavailableStatusForDate(days[0].iso))}</span>
        </button>
      </div>
    </section>
  `;
}

function renderUnavailableDayCell(day, mobileKey = "", isMobileActive = false) {
  return `
    <section class="calendar-day-column is-unavailable ${isMobileActive ? "is-mobile-active" : ""}" data-mobile-cell="${escapeAttr(mobileKey)}">
      <div class="calendar-day-head">
        <strong>${safeText(new Date(`${day.iso}T00:00:00`).getDate())}</strong>
        <span>${safeText(formatWeekday(day.iso))}</span>
      </div>
      <div class="calendar-slot-list">
        <button class="slot-btn is-unavailable" type="button" disabled>
          <span class="slot-time">${safeText(unavailableStatusForDate(day.iso))}</span>
        </button>
      </div>
    </section>
  `;
}

function renderWeekdayRangeCell(rangeSlots, adminEditing, mobileKey = "", isMobileActive = false) {
  const rangeSlotIds = rangeSlots.map(slot => slot.id);
  const availableIds = rangeSlots.filter(slot => !isSlotBlocked(slot)).map(slot => slot.id);
  const isSelected = Boolean(availableIds.length) && availableIds.every(slotId => selectedSlotIds.includes(slotId));
  const isBlocked = !availableIds.length;
  const adminClosedCount = rangeSlots.filter(isAdminClosedSlot).length;
  const isAdminClosed = adminClosedCount === rangeSlots.length;
  const label = formatWeekdayRangeLabel(rangeSlots);
  const weekdayLabel = rangeSlots.length === 1
    ? formatWeekday(rangeSlots[0].date)
    : `${formatWeekday(rangeSlots[0].date)}-${formatWeekday(rangeSlots[rangeSlots.length - 1].date)}`;
  const adminState = adminClosedCount
    ? `${adminClosedCount}/${rangeSlots.length} ${t("adminClosedState")}`
    : t("adminOpenState");

  return `
    <section class="calendar-day-column is-weekday is-weekday-range ${isMobileActive ? "is-mobile-active" : ""}" data-mobile-cell="${escapeAttr(mobileKey)}">
      <div class="calendar-day-head">
        <strong>${safeText(formatDateRangeShort(rangeSlots[0].date, rangeSlots[rangeSlots.length - 1].date))}</strong>
        <span>${safeText(weekdayLabel)}</span>
      </div>
      <div class="calendar-slot-list">
        <button
          class="slot-btn is-request is-range ${isSelected ? "is-selected" : ""} ${isBlocked ? "is-blocked" : ""} ${isAdminClosed ? "is-admin-closed" : ""} ${adminEditing ? "is-admin-edit" : ""}"
          type="button"
          data-slot-range="${escapeAttr(rangeSlotIds.join(","))}"
          ${isBlocked && !adminEditing ? "disabled" : ""}
          aria-pressed="${adminEditing ? isAdminClosed : isSelected ? "true" : "false"}"
          aria-label="${escapeAttr(label)}"
        >
          <span class="slot-time">${safeText(t("weekdayRequest"))}</span>
          ${adminEditing ? `<span class="slot-admin-state">${safeText(adminState)}</span>` : ""}
        </button>
      </div>
    </section>
  `;
}

function renderCalendarDayCell(day, adminEditing, mobileKey = "", isMobileActive = false) {
  const date = day.iso;
  const daySlots = slotsForDate(date);
  return `
    <section class="calendar-day-column ${isMobileActive ? "is-mobile-active" : ""}" data-mobile-cell="${escapeAttr(mobileKey)}">
      <div class="calendar-day-head">
        <strong>${safeText(new Date(`${date}T00:00:00`).getDate())}</strong>
        <span>${safeText(formatWeekday(date))}</span>
      </div>
      <div class="calendar-slot-list">
        ${daySlots.map(slot => {
          const isBlocked = isSlotBlocked(slot);
          const isAdminClosed = isAdminClosedSlot(slot);
          const isSelected = selectedSlotIds.includes(slot.id);
          const isDisabled = isBlocked && !adminEditing;
          return `
            <button
              class="slot-btn ${isSelected ? "is-selected" : ""} ${isBlocked ? "is-blocked" : ""} ${isAdminClosed ? "is-admin-closed" : ""} ${adminEditing ? "is-admin-edit" : ""}"
              type="button"
              data-slot-id="${escapeAttr(slot.id)}"
              ${isDisabled ? "disabled" : ""}
              aria-pressed="${adminEditing ? isAdminClosed : isSelected ? "true" : "false"}"
              aria-label="${escapeAttr(`${formatDate(slot.date)} ${slotDisplayLabel(slot)}`)}"
            >
              <span class="slot-time">${safeText(slotDisplayLabel(slot))}</span>
              ${adminEditing ? `<span class="slot-admin-state">${safeText(t(isAdminClosed ? "adminClosedState" : "adminOpenState"))}</span>` : ""}
            </button>
          `;
        }).join("")}
      </div>
    </section>
  `;
}

function renderCalendar() {
  const grid = document.getElementById("calendarGrid");
  const weeks = futureCalendarWeeks();
  const adminEditing = document.body.classList.contains("admin-on") && isAdminUser();

  grid.innerHTML = `
    <div class="month-calendar ${mobileCalendarExpanded ? "is-mobile-expanded" : ""}" aria-label="${escapeAttr(t("calendarTitle"))}">
      ${weeks.map((weekDates, weekIndex) => {
        const monthLabels = weekMonthLabels(weekDates);
        const cells = visibleWeekCells(weekDates);
        if (!cells.length) return "";
        const currentWeekKey = weekKey(weekDates);
        const selectableCells = cells.filter(cell => !isUnavailableCell(cell));
        const fallbackMobileKey = calendarCellKey(selectableCells[0] || cells[0]);
        const selectedMobileKey = selectableCells.some(cell => calendarCellKey(cell) === mobileCalendarSelectionByWeek[currentWeekKey])
          ? mobileCalendarSelectionByWeek[currentWeekKey]
          : fallbackMobileKey;
        return `
        <div class="calendar-week-block ${weekIndex >= MOBILE_INITIAL_WEEK_COUNT ? "is-mobile-extra" : ""}">
          <div class="calendar-week-heading">
            ${monthLabels.map((label, index) => `
              ${index ? `<span class="calendar-month-separator" aria-hidden="true">/</span>` : ""}
              <span class="calendar-month-chip">${safeText(label)}</span>
            `).join("")}
          </div>
        ${renderMobileCalendarTools(currentWeekKey, cells, selectedMobileKey)}
        <div class="calendar-week-row">
          ${cells.map(cell => {
            const cellKey = calendarCellKey(cell);
            if (cell.type === "weekdayRange") return renderWeekdayRangeCell(cell.slots, adminEditing, cellKey, cellKey === selectedMobileKey);
            if (cell.type === "unavailableRange") return renderUnavailableRangeCell(cell.days, cellKey, cellKey === selectedMobileKey);
            if (cell.type === "unavailableDay") return renderUnavailableDayCell(cell.day, cellKey, cellKey === selectedMobileKey);
            return renderCalendarDayCell(cell.day, adminEditing, cellKey, cellKey === selectedMobileKey);
          }).join("")}
        </div>
        </div>
      `; 
      }).join("")}
      <button class="mobile-calendar-more" type="button" data-mobile-calendar-more>
        ${safeText(lang === "ko" ? "더 보기" : "Show more")}
      </button>
    </div>
  `;

  grid.querySelectorAll("[data-mobile-cell-choice]").forEach(button => {
    button.addEventListener("click", () => {
      mobileCalendarSelectionByWeek[button.getAttribute("data-mobile-week")] = button.getAttribute("data-mobile-cell-choice");
      renderCalendar();
    });
  });

  grid.querySelectorAll("[data-mobile-calendar-more]").forEach(button => {
    button.addEventListener("click", () => {
      mobileCalendarExpanded = true;
      renderCalendar();
    });
  });

  grid.querySelectorAll("[data-slot-id]").forEach(button => {
    button.addEventListener("click", () => {
      const slotId = button.getAttribute("data-slot-id");
      if (document.body.classList.contains("admin-on") && isAdminUser()) {
        toggleAdminSlotClosed(slotId);
        return;
      }
      toggleSlotSelection(slotId);
      renderCalendar();
      renderSelectedSlot();
    });
  });

  grid.querySelectorAll("[data-slot-range]").forEach(button => {
    button.addEventListener("click", () => {
      const slotIds = button.getAttribute("data-slot-range").split(",").filter(Boolean);
      if (document.body.classList.contains("admin-on") && isAdminUser()) {
        toggleAdminSlotRangeClosed(slotIds);
        return;
      }
      toggleSlotRangeSelection(slotIds);
      renderCalendar();
      renderSelectedSlot();
    });
  });

}

function renderSelectedSlot() {
  const summary = document.getElementById("selectedSlotSummary");
  const memo = document.getElementById("customerMemo");
  const selectedSlots = selectedSlotIds
    .map(slotId => slots.find(item => item.id === slotId))
    .filter(Boolean);
  if (!selectedSlots.length) {
    summary.innerHTML = `<p>${safeText(t("noSlotSelected"))}</p>`;
    memo.setAttribute("placeholder", t("memoPlaceholder"));
    updateInquiryButtonState();
    return;
  }
  const hasWeekdayRequest = selectedSlots.some(slot => slot.kind === "weekdayRequest");
  const selectedLabels = compactSlotLabels(selectedSlotIds);
  summary.innerHTML = `
    <p><strong>${safeText(interpolate(t("selectedSlotCount"), { count: selectedLabels.length }))}</strong></p>
    <ul class="selected-slot-list">
      ${selectedLabels.map(label => `<li>${safeText(label)}</li>`).join("")}
    </ul>
    ${hasWeekdayRequest ? `<p>${safeText(t("preferredDetailsText"))}</p>` : ""}
  `;
  memo.setAttribute("placeholder", hasWeekdayRequest ? t("preferredMemoPlaceholder") : t("memoPlaceholder"));
  updateInquiryButtonState();
}

function nestDayInfo(dayId) {
  return nestWeekDays.find(day => day.id === dayId) || nestWeekDays[0];
}

function nestDayPrimary(day) {
  return lang === "ko" ? day.ko : day.en;
}

function nestDaySecondary(day) {
  return lang === "ko" ? day.en : day.enLong;
}

function nestSlotById(slotId) {
  return nestClassSlots.find(slot => slot.id === slotId);
}

function nestSlotsForDay(dayId) {
  return nestClassSlots
    .filter(slot => slot.day === dayId)
    .sort((a, b) => String(a.time).localeCompare(String(b.time)));
}

function formatNestSlot(slot) {
  if (!slot) return "—";
  const day = nestDayInfo(slot.day);
  const dayLabel = lang === "ko" ? day.koLong : day.enLong;
  const teacher = slot.teacher ? ` · ${slot.teacher}` : "";
  return `${dayLabel} ${slot.time}-${slot.end} · ${slot.title}${teacher}`;
}

function selectedNestSlotLabels(slotIds = selectedNestSlotIds) {
  return [...new Set(slotIds)]
    .map(nestSlotById)
    .filter(Boolean)
    .sort((a, b) => {
      const dayOrder = nestWeekDays.findIndex(day => day.id === a.day) - nestWeekDays.findIndex(day => day.id === b.day);
      return dayOrder || String(a.time).localeCompare(String(b.time));
    })
    .map(formatNestSlot);
}

function toggleNestSlotSelection(slotId) {
  if (!nestSlotById(slotId)) return;
  selectedNestSlotIds = selectedNestSlotIds.includes(slotId)
    ? selectedNestSlotIds.filter(id => id !== slotId)
    : [...selectedNestSlotIds, slotId];
}

function currentNestInquiryDetails() {
  const slotSummary = selectedNestSlotLabels().join("\n");
  return {
    name: document.getElementById("nestCustomerName")?.value || "",
    contact: document.getElementById("nestCustomerContact")?.value || "",
    concept: "nestDanceClass",
    slotIds: [...selectedNestSlotIds],
    slotSummary,
    memo: document.getElementById("nestCustomerMemo")?.value || ""
  };
}

function hasCompleteNestSmsInquiry(details = currentNestInquiryDetails()) {
  return Boolean(
    String(details.name || "").trim() &&
    String(details.contact || "").trim() &&
    String(details.memo || "").trim() &&
    details.slotIds.length
  );
}

function updateNestInquiryButtonState() {
  const kakaoButton = document.getElementById("nestInquiryButton");
  const smsButton = document.getElementById("nestSmsInquiryButton");
  const details = currentNestInquiryDetails();
  const hasName = Boolean(String(details.name || "").trim());
  if (kakaoButton) kakaoButton.disabled = !hasName || !details.slotIds.length;
  if (smsButton) smsButton.disabled = !hasCompleteNestSmsInquiry(details);
}

function composeNestInquiryMessage(details) {
  const conceptInfo = t("concepts.nestDanceClass");
  const slotLines = selectedNestSlotLabels(details.slotIds);
  return [
    t("nestCopyMessageTitle"),
    `${t("copyNameLabel")}: ${String(details.name || "").trim() || t("anonymous")}`,
    `${t("copyContactLabel")}: ${String(details.contact || "").trim() || "—"}`,
    `${t("copyConceptLabel")}: ${conceptInfo?.title || "Nest Studio"}`,
    `${t("copySlotsLabel")}:`,
    ...(slotLines.length ? slotLines.map(label => `- ${label}`) : ["- —"]),
    `${t("copyMemoLabel")}: ${String(details.memo || "").trim() || "—"}`
  ].join("\n");
}

function recordNestPublicInquiry(inquiryDetails, form) {
  const localOrderId = newId();
  const details = {
    ...inquiryDetails,
    slotSummary: inquiryDetails.slotSummary || selectedNestSlotLabels(inquiryDetails.slotIds).join("\n")
  };
  selectedNestSlotIds = [];
  addOrder({ ...details, id: localOrderId });
  form.reset();
  renderNestCalendar();
  renderSelectedNestSlot();
  saveOrderRecord(details, "public").then(docRef => {
    const recordId = docRef?.id || "";
    if (!recordId) return;
    const order = orders.find(item => item.id === localOrderId);
    if (order) {
      order.id = recordId;
      order.recordId = recordId;
      saveState();
      renderAll();
    }
    showToast(t("saveSucceeded"));
  }).catch(error => {
    console.warn("Nest inquiry save failed", error);
    showToast(t("saveFailed"));
  });
}

function isNestClassAdminEditing() {
  return document.body.classList.contains("admin-on") && isAdminUser();
}

function renderNestClassAdminForm() {
  const editingSlot = nestSlotById(editingNestSlotId);
  const selectedDay = editingSlot?.day || "mon";
  const selectedTime = editingSlot?.time || "18:00";
  const title = editingSlot?.title || "";
  const teacher = editingSlot?.teacher || "";
  const isEditing = Boolean(editingSlot);
  return `
    <div class="nest-class-admin-panel">
      <div>
        <strong>${safeText(t("nestClassAdminTitle"))}</strong>
        <span>${safeText(t("nestClassAdminHelper"))}</span>
      </div>
      <form class="nest-class-admin-form" id="nestClassAdminForm">
        <input type="hidden" id="nestAdminSlotId" value="${escapeAttr(editingSlot?.id || "")}">
        <label class="sr-only" for="nestAdminDay">${safeText(t("nestClassAdminDay"))}</label>
        <select class="field" id="nestAdminDay" required>
          ${nestWeekDays.map(day => `
            <option value="${escapeAttr(day.id)}" ${day.id === selectedDay ? "selected" : ""}>${safeText(lang === "ko" ? day.koLong : day.enLong)}</option>
          `).join("")}
        </select>
        <label class="sr-only" for="nestAdminStart">${safeText(t("nestClassAdminStart"))}</label>
        <input class="field" id="nestAdminStart" type="time" step="3600" value="${escapeAttr(selectedTime)}" aria-label="${escapeAttr(t("nestClassAdminStart"))}" required>
        <label class="sr-only" for="nestAdminTitle">${safeText(t("nestClassAdminName"))}</label>
        <input class="field" id="nestAdminTitle" type="text" maxlength="80" value="${escapeAttr(title)}" placeholder="${escapeAttr(t("nestClassAdminName"))}" required>
        <label class="sr-only" for="nestAdminTeacher">${safeText(t("nestClassAdminInstructor"))}</label>
        <input class="field" id="nestAdminTeacher" type="text" maxlength="80" value="${escapeAttr(teacher)}" placeholder="${escapeAttr(t("nestClassAdminInstructor"))}">
        <button class="primary-btn" type="submit">${safeText(t(isEditing ? "nestClassAdminUpdate" : "nestClassAdminAdd"))}</button>
        <button class="ghost-btn" type="button" data-nest-admin-cancel ${isEditing ? "" : "hidden"}>${safeText(t("nestClassAdminCancel"))}</button>
      </form>
    </div>
  `;
}

function renderNestClassSlot(slot, adminEditing) {
  const isSelected = selectedNestSlotIds.includes(slot.id);
  const slotContent = `
    <span class="slot-time">${safeText(`${slot.time}-${slot.end}`)}</span>
    <span class="nest-slot-name">${safeText(slot.title)}</span>
    ${slot.teacher ? `<span class="nest-slot-teacher">${safeText(slot.teacher)}</span>` : ""}
  `;
  const pressed = isSelected ? "true" : "false";
  const label = escapeAttr(formatNestSlot(slot));
  if (!adminEditing) {
    return `
      <button
        class="slot-btn nest-slot-btn ${isSelected ? "is-selected" : ""}"
        type="button"
        data-nest-slot-id="${escapeAttr(slot.id)}"
        aria-pressed="${pressed}"
        aria-label="${label}"
      >
        ${slotContent}
      </button>
    `;
  }

  return `
    <article class="slot-btn nest-slot-btn nest-slot-card ${isSelected ? "is-selected" : ""}">
      <button
        class="nest-slot-main"
        type="button"
        data-nest-slot-id="${escapeAttr(slot.id)}"
        aria-pressed="${pressed}"
        aria-label="${label}"
      >
        ${slotContent}
      </button>
      <div class="nest-slot-admin-actions" aria-label="${escapeAttr(t("nestClassAdminTitle"))}">
        <button class="nest-slot-admin-btn" type="button" data-nest-edit="${escapeAttr(slot.id)}" aria-label="${escapeAttr(`${t("nestClassEdit")} ${formatNestSlot(slot)}`)}">${safeText(t("nestClassEdit"))}</button>
        <button class="nest-slot-admin-btn is-delete" type="button" data-nest-delete="${escapeAttr(slot.id)}" aria-label="${escapeAttr(`${t("nestClassDelete")} ${formatNestSlot(slot)}`)}">×</button>
      </div>
    </article>
  `;
}

function editNestClassSlot(slotId) {
  if (!isNestClassAdminEditing() || !nestSlotById(slotId)) return;
  editingNestSlotId = slotId;
  renderNestCalendar();
  requestAnimationFrame(() => {
    document.getElementById("nestClassAdminForm")?.scrollIntoView({ behavior: "smooth", block: "center" });
    document.getElementById("nestAdminTitle")?.focus();
  });
}

function cancelNestClassEdit() {
  editingNestSlotId = "";
  renderNestCalendar();
}

async function saveNestClassFromForm(event) {
  event.preventDefault();
  if (!isNestClassAdminEditing()) {
    showToast(t("authRequired"));
    return;
  }

  const slotId = document.getElementById("nestAdminSlotId")?.value || "";
  const day = document.getElementById("nestAdminDay")?.value || "mon";
  const time = normalizeClassTime(document.getElementById("nestAdminStart")?.value);
  const title = document.getElementById("nestAdminTitle")?.value || "";
  const teacher = document.getElementById("nestAdminTeacher")?.value || "";
  const normalized = normalizeNestClassSlot({
    id: slotId || newNestClassSlotId(day, time),
    day,
    time,
    end: addOneHourToClassTime(time),
    title,
    teacher
  });

  if (!normalized) {
    showToast(t("nestClassFormInvalid"));
    event.target.reportValidity();
    return;
  }

  const wasEditing = Boolean(slotId);
  nestClassSlots = normalizeNestClassSlots([
    ...nestClassSlots.filter(slot => slot.id !== normalized.id),
    normalized
  ]);
  editingNestSlotId = "";
  saveState();
  renderNestCalendar();
  renderSelectedNestSlot();

  try {
    const saved = await saveNestClassSlotRecord(normalized);
    showToast(t(saved ? (wasEditing ? "nestClassUpdated" : "nestClassAdded") : "nestClassLocalOnly"));
  } catch (error) {
    console.warn("Nest class save failed", error);
    showToast(t("nestClassLocalOnly"));
  }
}

async function deleteNestClassSlot(slotId) {
  if (!isNestClassAdminEditing()) {
    showToast(t("authRequired"));
    return;
  }
  if (!nestSlotById(slotId)) return;
  if (!window.confirm(t("nestClassDeleteConfirm"))) return;

  nestClassSlots = nestClassSlots.filter(slot => slot.id !== slotId);
  selectedNestSlotIds = selectedNestSlotIds.filter(id => id !== slotId);
  if (editingNestSlotId === slotId) editingNestSlotId = "";
  saveState();
  renderNestCalendar();
  renderSelectedNestSlot();

  try {
    const deleted = await deleteNestClassSlotRecord(slotId);
    showToast(t(deleted ? "nestClassDeleted" : "nestClassLocalOnly"));
  } catch (error) {
    console.warn("Nest class delete failed", error);
    showToast(t("nestClassLocalOnly"));
  }
}

function renderNestCalendar() {
  const board = document.getElementById("nestClassCalendar");
  if (!board) return;
  const adminEditing = isNestClassAdminEditing();
  board.innerHTML = `
    <div class="month-calendar nest-class-calendar" aria-label="${escapeAttr(t("studioTabNest"))}">
      ${adminEditing ? renderNestClassAdminForm() : ""}
      <div class="calendar-week-block">
        <div class="calendar-week-heading">
          <span class="calendar-month-chip">${safeText(t("nestTimetableChipClasses"))}</span>
          <span>${safeText(t("nestCalendarHint"))}</span>
        </div>
        <div class="calendar-week-row nest-week-row">
          ${nestWeekDays.map(day => {
            const daySlots = nestSlotsForDay(day.id);
            return `
              <section class="calendar-day-column">
                <div class="calendar-day-head">
                  <strong>${safeText(nestDayPrimary(day))}</strong>
                  <span>${safeText(nestDaySecondary(day))}</span>
                </div>
                <div class="calendar-slot-list">
                  ${daySlots.map(slot => renderNestClassSlot(slot, adminEditing)).join("")}
                </div>
              </section>
            `;
          }).join("")}
        </div>
      </div>
    </div>
  `;

  board.querySelectorAll("[data-nest-slot-id]").forEach(button => {
    button.addEventListener("click", () => {
      toggleNestSlotSelection(button.getAttribute("data-nest-slot-id"));
      renderNestCalendar();
      renderSelectedNestSlot();
    });
  });

  board.querySelector("#nestClassAdminForm")?.addEventListener("submit", saveNestClassFromForm);
  board.querySelector("[data-nest-admin-cancel]")?.addEventListener("click", cancelNestClassEdit);
  board.querySelectorAll("[data-nest-edit]").forEach(button => {
    button.addEventListener("click", () => editNestClassSlot(button.getAttribute("data-nest-edit")));
  });
  board.querySelectorAll("[data-nest-delete]").forEach(button => {
    button.addEventListener("click", () => deleteNestClassSlot(button.getAttribute("data-nest-delete")));
  });
}

function renderSelectedNestSlot() {
  const summary = document.getElementById("nestSelectedSummary");
  const memo = document.getElementById("nestCustomerMemo");
  if (!summary || !memo) return;
  const labels = selectedNestSlotLabels();
  if (!labels.length) {
    summary.innerHTML = `<p>${safeText(t("nestNoSlotSelected"))}</p>`;
    memo.setAttribute("placeholder", t("nestMemoPlaceholder"));
    updateNestInquiryButtonState();
    return;
  }
  summary.innerHTML = `
    <p><strong>${safeText(interpolate(t("nestSelectedSlotCount"), { count: labels.length }))}</strong></p>
    <ul class="selected-slot-list">
      ${labels.map(label => `<li>${safeText(label)}</li>`).join("")}
    </ul>
  `;
  memo.setAttribute("placeholder", t("nestMemoPlaceholder"));
  updateNestInquiryButtonState();
}

function newId() {
  return crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function addOrder({ id, recordId, name, contact, concept, slotId, slotIds, slotSummary, memo, status = "incoming" }) {
  const cleanName = String(name || "").trim() || t("anonymous");
  const cleanSlotIds = [...new Set((Array.isArray(slotIds) && slotIds.length ? slotIds : [slotId]).filter(Boolean))];
  const orderId = String(id || recordId || newId());
  orders = orders.filter(order => order.id !== orderId);
  orders.unshift({
    id: orderId,
    recordId: String(recordId || id || ""),
    name: cleanName,
    contact: String(contact || "").trim(),
    concept,
    slotId: cleanSlotIds[0] || "",
    slotIds: cleanSlotIds,
    slotSummary: String(slotSummary || orderSlotSummary(cleanSlotIds)),
    status,
    memo: String(memo || "").trim(),
    createdAt: new Date().toISOString()
  });
  cleanSlotIds.forEach(id => {
    const slot = slots.find(item => item.id === id);
    if (slot) slot.requests += 1;
  });
  saveState();
  renderAll();
}

function addReservation({ id, recordId, requestId, name, contact, concept, slotId, slotText, memo, status = "confirmed" }) {
  const reservationId = String(id || recordId || newId());
  const cleanSlotId = String(slotId || "");
  reservations = reservations.filter(reservation => reservation.id !== reservationId);
  reservations.unshift({
    id: reservationId,
    recordId: String(recordId || id || ""),
    requestId: String(requestId || ""),
    name: String(name || "").trim() || t("anonymous"),
    contact: String(contact || "").trim(),
    concept: String(concept || ""),
    slotId: cleanSlotId,
    slotText: String(slotText || (cleanSlotId ? formatSlot(cleanSlotId) : "")),
    status: ["confirmed", "completed", "cancelled"].includes(status) ? status : "confirmed",
    memo: String(memo || "").trim(),
    createdAt: new Date().toISOString()
  });
  if (cleanSlotId) {
    const slot = slots.find(item => item.id === cleanSlotId);
    if (slot) {
      slotOverrides[cleanSlotId] = {
        slotId: cleanSlotId,
        date: slot.date,
        time: String(slot.time || ""),
        kind: slot.kind,
        closed: true
      };
    }
  }
  if (requestId) {
    const order = orders.find(item => item.id === requestId);
    if (order) {
      order.status = "shooting";
      updateOrderRecordStatus(order);
    }
  }
  saveState();
  renderAll();
}

function compactCheckerRows() {
  const rows = [];

  futureCalendarWeeks().forEach(weekDates => {
    visibleWeekCells(weekDates).forEach(cell => {
      if (isUnavailableCell(cell)) return;
      if (cell.type === "weekdayRange") {
        const rangeSlots = cell.slots;
        const closedCount = rangeSlots.filter(isSlotBlocked).length;
        rows.push({
          group: rangeSlots.map(slot => slot.date).join("_"),
          date: formatDateRangeShort(rangeSlots[0].date, rangeSlots[rangeSlots.length - 1].date),
          time: slotDisplayLabel(rangeSlots[0]),
          closed: closedCount === rangeSlots.length,
          status: closedCount ? `${closedCount}/${rangeSlots.length} ${t("closedStatus")}` : "—"
        });
        return;
      }

      slotsForDate(cell.day.iso).forEach(slot => {
        const isBlocked = isSlotBlocked(slot);
        rows.push({
          group: slot.date,
          date: formatDate(slot.date),
          time: slotDisplayLabel(slot),
          closed: isBlocked,
          status: isBlocked ? t("closedStatus") : "—"
        });
      });
    });
  });

  return rows;
}

function renderCheckerTable() {
  const body = document.getElementById("slotTableBody");
  const rows = compactCheckerRows();
  const groupCounts = rows.reduce((acc, row) => {
    acc[row.group] = (acc[row.group] || 0) + 1;
    return acc;
  }, {});
  const renderedGroups = new Set();

  body.innerHTML = rows.map(row => {
    const startsGroup = !renderedGroups.has(row.group);
    if (startsGroup) renderedGroups.add(row.group);
    return `
    <tr class="${startsGroup ? "is-group-start" : ""}">
      ${startsGroup ? `<td class="date-group" rowspan="${groupCounts[row.group]}">${safeText(row.date)}</td>` : ""}
      <td>${safeText(row.time)}</td>
      <td>${row.closed ? `<span class="status-pill">${safeText(row.status)}</span>` : safeText(row.status)}</td>
    </tr>
  `;
  }).join("");
}
function orderLabel(order) {
  if (!order?.concept) return "—";
  const concept = t(`concepts.${order.concept}`);
  return concept && concept.title ? concept.title : order.concept;
}

function shortId(id) {
  return String(id || "").slice(0, 6) || "—";
}

function reservationForOrder(orderId) {
  return reservations.find(reservation => reservation.requestId === orderId);
}

function reservationStatusLabel(status) {
  return t(`reservationStatuses.${status}`) || status || "—";
}

function renderRecentOrders() {
  const list = document.getElementById("recentOrdersList");
  if (!orders.length) {
    list.innerHTML = `<div class="empty-state">${safeText(t("noOrders"))}</div>`;
    return;
  }
  list.innerHTML = orders.slice(0, 5).map(order => `
    <div class="kanban-card">
      <strong>${safeText(order.name)} · ${safeText(orderLabel(order))}</strong>
      <small>${renderOrderSlotLines(order)}<br>${safeText(order.contact)}<br>${safeText(order.memo)}</small>
      <span class="status-pill">${safeText(t(`statuses.${order.status}`))}</span>
    </div>
  `).join("");
}

function renderOrdersTable() {
  const body = document.getElementById("ordersTableBody");
  if (!orders.length) {
    body.innerHTML = `<tr><td colspan="6">${safeText(t("noOrders"))}</td></tr>`;
    return;
  }
  body.innerHTML = orders.map(order => `
    <tr>
      <td>${safeText(order.name)}</td>
      <td>${safeText(orderLabel(order))}</td>
      <td>${safeText(formatOrderSlots(order))}</td>
      <td><span class="status-pill">${safeText(t(`statuses.${order.status}`))}</span></td>
      <td>${safeText(order.memo)}</td>
      <td>${renderOrderReservationCell(order)}</td>
    </tr>
  `).join("");

  body.querySelectorAll("[data-fill-reservation]").forEach(button => {
    button.addEventListener("click", () => prefillReservationFromOrder(button.getAttribute("data-fill-reservation")));
  });
}

function renderOrderReservationCell(order) {
  const linked = reservationForOrder(order.id);
  if (linked) {
    const label = linked.slotText || formatSlot(linked.slotId);
    return `<span class="linked-chip">${safeText(reservationStatusLabel(linked.status))} · ${safeText(label)}</span>`;
  }
  return `<button class="tiny-btn" type="button" data-fill-reservation="${escapeAttr(order.id)}">${safeText(t("fillReservation"))}</button>`;
}

function renderReservationsTable() {
  const body = document.getElementById("reservationsTableBody");
  if (!body) return;
  if (!reservations.length) {
    body.innerHTML = `<tr><td colspan="5">${safeText(t("noReservations"))}</td></tr>`;
    return;
  }
  body.innerHTML = reservations.map(reservation => {
    const request = orders.find(order => order.id === reservation.requestId);
    const linkedText = request
      ? `${t("reservationLinkedTo").replace("{id}", shortId(request.id))} · ${request.name}`
      : t("reservationManual");
    return `
      <tr>
        <td>${safeText(reservation.name)}</td>
        <td>${safeText(linkedText)}</td>
        <td>${safeText(reservation.slotText || formatSlot(reservation.slotId))}</td>
        <td><span class="status-pill">${safeText(reservationStatusLabel(reservation.status))}</span></td>
        <td>${safeText(reservation.memo)}</td>
      </tr>
    `;
  }).join("");
}

function renderKanban() {
  const board = document.getElementById("kanbanBoard");
  board.innerHTML = statusOrder.map(status => {
    const cards = orders.filter(order => order.status === status);
    return `
      <section class="kanban-column" data-kanban-status="${escapeAttr(status)}">
        <h3><span>${safeText(t(`statuses.${status}`))}</span><span>${cards.length}</span></h3>
        ${cards.length ? cards.map(order => renderKanbanCard(order)).join("") : `<div class="empty-state">—</div>`}
      </section>
    `;
  }).join("");

  board.querySelectorAll(".kanban-card").forEach(card => {
    card.addEventListener("dragstart", () => {
      draggedOrderId = card.getAttribute("data-order-id");
      card.classList.add("dragging");
    });
    card.addEventListener("dragend", () => {
      draggedOrderId = null;
      card.classList.remove("dragging");
    });
  });

  board.querySelectorAll(".kanban-column").forEach(column => {
    column.addEventListener("dragover", event => event.preventDefault());
    column.addEventListener("drop", () => {
      if (!draggedOrderId) return;
      const order = orders.find(item => item.id === draggedOrderId);
      if (!order) return;
      order.status = column.getAttribute("data-kanban-status");
      updateOrderRecordStatus(order);
      saveState();
      renderAll();
      showToast(t("dropped"));
    });
  });

  board.querySelectorAll("[data-move]").forEach(button => {
    button.addEventListener("click", () => {
      const [orderId, direction] = button.getAttribute("data-move").split(":");
      moveOrder(orderId, direction === "next" ? 1 : -1);
    });
  });

  board.querySelectorAll("[data-delete]").forEach(button => {
    button.addEventListener("click", () => deleteOrder(button.getAttribute("data-delete")));
  });
}

function renderKanbanCard(order) {
  return `
    <article class="kanban-card" draggable="true" data-order-id="${escapeAttr(order.id)}">
      <strong>${safeText(order.name)}</strong>
      <small>${safeText(orderLabel(order))}<br>${renderOrderSlotLines(order)}<br>${safeText(order.memo)}</small>
      <div class="kanban-actions">
        <button class="tiny-btn" type="button" data-move="${escapeAttr(order.id)}:prev">← ${safeText(t("previous"))}</button>
        <button class="tiny-btn" type="button" data-move="${escapeAttr(order.id)}:next">${safeText(t("next"))} →</button>
        <button class="tiny-btn" type="button" data-delete="${escapeAttr(order.id)}">${safeText(t("delete"))}</button>
      </div>
    </article>
  `;
}

function moveOrder(orderId, step) {
  const order = orders.find(item => item.id === orderId);
  if (!order) return;
  const index = statusOrder.indexOf(order.status);
  const nextIndex = Math.max(0, Math.min(statusOrder.length - 1, index + step));
  order.status = statusOrder[nextIndex];
  updateOrderRecordStatus(order);
  saveState();
  renderAll();
  showToast(t("moved"));
}

function deleteOrder(orderId) {
  const order = orders.find(item => item.id === orderId);
  deleteOrderRecord(order);
  orders = orders.filter(order => order.id !== orderId);
  saveState();
  renderAll();
  showToast(t("deleted"));
}

async function updateOrderRecordStatus(order) {
  if (!serviceReady) await initializeServices();
  if (!serviceReady || !recordStore || !isAdminUser() || !order?.recordId) return;
  try {
    await updateDoc(orderRecordDoc(order.recordId), {
      status: order.status,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.warn("Status update failed", error);
    showToast(t("saveFailed"));
  }
}

async function deleteOrderRecord(order) {
  if (!serviceReady) await initializeServices();
  if (!serviceReady || !recordStore || !isAdminUser() || !order?.recordId) return;
  try {
    await deleteDoc(orderRecordDoc(order.recordId));
  } catch (error) {
    console.warn("Delete failed", error);
    showToast(t("saveFailed"));
  }
}

function visitHistogramData(totalVisits = 0) {
  const history = storage.get("visitHistory", {});
  const today = new Date(`${currentKoreaServiceDate()}T00:00:00`);
  const days = Array.from({ length: 7 }, (_, index) => {
    const iso = toISODate(addDays(today, index - 6));
    return {
      iso,
      label: formatWeekday(iso),
      count: safeNumber(history?.[iso])
    };
  });
  if (!days.some(day => day.count) && totalVisits) {
    days[days.length - 1].count = totalVisits;
  }
  return days;
}

function renderVisitHistogramCard(visits) {
  const days = visitHistogramData(visits);
  const max = Math.max(1, ...days.map(day => day.count));
  return `
    <article class="metric-card visit-histogram-card">
      <span>${safeText(t("visits"))}</span>
      <strong>${safeText(visits)}</strong>
      <div class="visit-histogram" aria-label="${escapeAttr(t("visits"))}">
        ${days.map(day => {
          const height = day.count ? Math.max(14, Math.round((day.count / max) * 100)) : 5;
          return `
            <div class="visit-bar" aria-label="${escapeAttr(`${formatDate(day.iso)} ${day.count}`)}">
              <i style="height: ${height}%;"></i>
              <small>${safeText(day.label)}</small>
            </div>
          `;
        }).join("")}
      </div>
    </article>
  `;
}

function renderMetrics() {
  const visits = storage.get("visits", 1);
  const inquiries = orders.length;
  const openOrders = orders.filter(order => order.status !== "done").length;
  const conversion = visits ? Math.round((inquiries / visits) * 100) : 0;
  const metrics = [
    [t("inquiries"), inquiries],
    [t("openOrders"), openOrders],
    [t("conversion"), `${conversion}%`]
  ];
  document.getElementById("metricGrid").innerHTML = [
    renderVisitHistogramCard(visits),
    ...metrics.map(([label, value]) => `
      <article class="metric-card"><span>${safeText(label)}</span><strong>${safeText(value)}</strong></article>
    `)
  ].join("");

  const counts = conceptMeta.map(({ id }) => ({
    id,
    label: t(`concepts.${id}`).title,
    count: orders.filter(order => order.concept === id).length
  }));
  const max = Math.max(1, ...counts.map(item => item.count));
  document.getElementById("conceptBars").innerHTML = counts.map(item => `
    <div class="bar-row">
      <span>${safeText(item.label)}</span>
      <div class="bar-track"><div class="bar-fill" style="width: ${Math.max(8, safeNumber(item.count) / max * 100)}%;"></div></div>
      <strong>${safeText(item.count)}</strong>
    </div>
  `).join("");
}

function renderAll() {
  renderConceptCards();
  renderConceptOptions("conceptSelect");
  renderCalendar();
  renderSelectedSlot();
  renderNestCalendar();
  renderSelectedNestSlot();
  if (!document.body.classList.contains("admin-on")) return;
  renderConceptOptions("adminConcept");
  renderConceptOptions("reservationConcept");
  renderSlotOptions();
  renderSlotOptions("reservationSlot");
  renderReservationRequestOptions();
  renderReservationStatusOptions();
  renderCalendarWindowForm();
  renderCheckerTable();
  renderRecentOrders();
  renderOrdersTable();
  renderReservationsTable();
  renderKanban();
  renderMetrics();
}

function requestRenderAll() {
  if (renderAllQueued) return;
  renderAllQueued = true;
  requestAnimationFrame(() => {
    renderAllQueued = false;
    renderAll();
  });
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function setAdminMode(enabled) {
  const adminSwitch = document.getElementById("adminSwitch");
  const canEnable = Boolean(enabled && isAdminUser());
  adminSwitch.checked = canEnable;
  document.body.classList.toggle("admin-on", canEnable);
  if (!canEnable) editingNestSlotId = "";
  renderAll();
  return canEnable;
}

function showAdminTab(tab) {
  document.querySelectorAll(".admin-tab").forEach(item => item.classList.toggle("is-active", item.getAttribute("data-tab") === tab));
  document.querySelectorAll(".admin-panel").forEach(panel => panel.classList.toggle("is-active", panel.id === `panel-${tab}`));
}

function showStudioTab(tab) {
  document.querySelectorAll("[data-studio-tab]").forEach(button => {
    const isActive = button.dataset.studioTab === tab;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
    button.tabIndex = isActive ? 0 : -1;
  });
  document.querySelectorAll("[data-studio-panel]").forEach(panel => {
    const isActive = panel.dataset.studioPanel === tab;
    panel.classList.toggle("is-active", isActive);
    panel.hidden = !isActive;
  });
}

function showNoticeTab(tab) {
  document.querySelectorAll("[data-notice-tab]").forEach(button => {
    const isActive = button.dataset.noticeTab === tab;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
    button.tabIndex = isActive ? 0 : -1;
  });
  document.querySelectorAll("[data-notice-panel]").forEach(panel => {
    const isActive = panel.dataset.noticePanel === tab;
    panel.classList.toggle("is-active", isActive);
    panel.hidden = !isActive;
  });
}

function updateNoticeFoldUi() {
  const button = document.getElementById("noticeFoldToggle");
  const body = document.getElementById("noticeFoldBody");
  const label = document.getElementById("noticeFoldLabel");
  const icon = document.getElementById("noticeFoldIcon");
  if (!button || !body || !label || !icon) return;
  body.hidden = !noticesExpanded;
  button.setAttribute("aria-expanded", String(noticesExpanded));
  label.textContent = t(noticesExpanded ? "noticeFoldClose" : "noticeFoldOpen");
  icon.textContent = noticesExpanded ? "-" : "+";
}

function toggleNoticeFold() {
  noticesExpanded = !noticesExpanded;
  updateNoticeFoldUi();
}

function openAdminLock() {
  if (isAdminUser()) {
    unlockAdmin();
    return;
  }
  const lock = document.getElementById("adminLock");
  lock.classList.add("is-open");
  updateAuthUi();
  requestAnimationFrame(() => document.getElementById("adminGoogleButton").focus());
}

function closeAdminLock() {
  document.getElementById("adminLock").classList.remove("is-open");
  setAdminMode(false);
}

function unlockAdmin() {
  if (!isAdminUser()) {
    setAdminMode(false);
    showToast(t("adminPasswordWrong"));
    return;
  }
  document.getElementById("adminLock").classList.remove("is-open");
  if (!setAdminMode(true)) return;
  showToast(t("adminUnlocked"));
  document.getElementById("adminHub").scrollIntoView({ behavior: "smooth", block: "start" });
}

async function requestAdminAccess() {
  try {
    await signInWithGoogle({ forceAccountSelect: true });
  } catch (error) {
    console.warn("Admin Google sign-in failed", error);
    showToast(t("connectionUnavailable"));
    return;
  }
  if (isAdminUser()) {
    unlockAdmin();
    return;
  }
  showToast(t("adminPasswordWrong"));
}

function prefillReservationFromOrder(orderId) {
  const order = orders.find(item => item.id === orderId);
  if (!order) return;
  showAdminTab("reservations");
  renderReservationRequestOptions();
  document.getElementById("reservationRequest").value = order.id;
  document.getElementById("reservationName").value = order.name || "";
  document.getElementById("reservationContact").value = order.contact || "";
  document.getElementById("reservationConcept").value = order.concept || "";
  document.getElementById("reservationSlot").value = orderSlotIds(order)[0] || slots[0]?.id || "";
  document.getElementById("reservationMemo").value = order.memo || "";
  document.getElementById("reservationRecordForm").scrollIntoView({ behavior: "smooth", block: "center" });
}

function bindEvents() {
  document.querySelectorAll("[data-lang-option]").forEach(button => {
    button.addEventListener("click", () => setLanguage(button.dataset.langOption));
  });

  document.querySelectorAll("[data-studio-tab]").forEach(button => {
    button.addEventListener("click", () => showStudioTab(button.dataset.studioTab));
  });
  showStudioTab("code");
  document.querySelector('a[href="#notices"]')?.addEventListener("click", () => showStudioTab("code"));

  document.querySelectorAll("[data-notice-tab]").forEach(button => {
    button.addEventListener("click", () => showNoticeTab(button.dataset.noticeTab));
  });
  showNoticeTab("terms");
  document.getElementById("noticeFoldToggle")?.addEventListener("click", toggleNoticeFold);
  updateNoticeFoldUi();

  ["customerName", "customerContact", "customerMemo"].forEach(id => {
    document.getElementById(id)?.addEventListener("input", updateInquiryButtonState);
  });
  document.getElementById("conceptSelect")?.addEventListener("change", updateInquiryButtonState);

  ["nestCustomerName", "nestCustomerContact", "nestCustomerMemo"].forEach(id => {
    document.getElementById(id)?.addEventListener("input", updateNestInquiryButtonState);
  });

  const adminSwitch = document.getElementById("adminSwitch");
  adminSwitch.checked = false;
  document.body.classList.remove("admin-on");
  adminSwitch.addEventListener("change", () => {
    if (adminSwitch.checked) {
      setAdminMode(false);
      openAdminLock();
    } else {
      setAdminMode(false);
    }
  });

  document.getElementById("adminLockForm").addEventListener("submit", event => {
    event.preventDefault();
    requestAdminAccess();
  });

  document.getElementById("adminCancelButton").addEventListener("click", closeAdminLock);
  document.getElementById("adminLock").addEventListener("click", event => {
    if (event.target.id === "adminLock") closeAdminLock();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && document.getElementById("adminLock").classList.contains("is-open")) {
      closeAdminLock();
    }
  });

  document.getElementById("smsInquiryButton").addEventListener("click", () => {
    const form = document.getElementById("inquiryForm");
    const inquiryDetails = currentInquiryDetails();
    if (!hasCompleteSmsInquiry(inquiryDetails)) {
      showToast(t("smsNeedsAllFields"));
      updateInquiryButtonState();
      return;
    }
    if (!selectedInquirySlotsAreUsable(inquiryDetails.slotIds)) {
      showToast(t("slotClosed"));
      renderAll();
      return;
    }
    const message = composeInquiryMessage(inquiryDetails);
    recordPublicInquiry(inquiryDetails, form);
    window.location.href = smsUrlFromMessage(message);
    showToast(t("smsInquiryOpened"));
  });

  document.getElementById("inquiryForm").addEventListener("submit", async event => {
    event.preventDefault();
    const inquiryDetails = currentInquiryDetails();
    if (!String(inquiryDetails.name || "").trim()) {
      showToast(t("chooseSlotFirst"));
      event.target.reportValidity();
      return;
    }
    if (!selectedInquirySlotsAreUsable(inquiryDetails.slotIds)) {
      showToast(t("slotClosed"));
      renderAll();
      return;
    }
    const copyPromise = copyTextToClipboard(composeInquiryMessage(inquiryDetails));
    const kakaoWindow = window.open(KAKAO_CHANNEL_URL, "_blank");
    if (kakaoWindow) kakaoWindow.opener = null;
    recordPublicInquiry(inquiryDetails, event.target);
    copyPromise.then(copied => showToast(t(copied ? "inquiryCopied" : "inquiryCopyFailed")));
    if (!kakaoWindow) window.location.href = KAKAO_CHANNEL_URL;
  });

  document.getElementById("nestSmsInquiryButton")?.addEventListener("click", () => {
    const form = document.getElementById("nestInquiryForm");
    const inquiryDetails = currentNestInquiryDetails();
    if (!hasCompleteNestSmsInquiry(inquiryDetails)) {
      showToast(t("nestSmsNeedsAllFields"));
      updateNestInquiryButtonState();
      return;
    }
    const message = composeNestInquiryMessage(inquiryDetails);
    recordNestPublicInquiry(inquiryDetails, form);
    window.location.href = smsUrlFromMessage(message);
    showToast(t("smsInquiryOpened"));
  });

  document.getElementById("nestInquiryForm")?.addEventListener("submit", async event => {
    event.preventDefault();
    const inquiryDetails = currentNestInquiryDetails();
    if (!String(inquiryDetails.name || "").trim()) {
      showToast(t("chooseSlotFirst"));
      event.target.reportValidity();
      return;
    }
    if (!inquiryDetails.slotIds.length) {
      showToast(t("nestNoSlotSelected"));
      return;
    }
    const copyPromise = copyTextToClipboard(composeNestInquiryMessage(inquiryDetails));
    const kakaoWindow = window.open(KAKAO_CHANNEL_URL, "_blank");
    if (kakaoWindow) kakaoWindow.opener = null;
    recordNestPublicInquiry(inquiryDetails, event.target);
    copyPromise.then(copied => showToast(t(copied ? "inquiryCopied" : "inquiryCopyFailed")));
    if (!kakaoWindow) window.location.href = KAKAO_CHANNEL_URL;
  });

  document.getElementById("adminAddOrderForm").addEventListener("submit", async event => {
    event.preventDefault();
    const orderDetails = {
      name: document.getElementById("adminName").value,
      contact: document.getElementById("adminContact").value,
      concept: document.getElementById("adminConcept").value,
      slotIds: [document.getElementById("adminSlot").value].filter(Boolean),
      memo: document.getElementById("adminMemo").value
    };
    let recordId = "";
    try {
      if (!isAdminUser()) await signInWithGoogle({ forceAccountSelect: true });
      if (!isAdminUser()) {
        showToast(t("adminPasswordWrong"));
        return;
      }
      const docRef = await saveOrderRecord(orderDetails, "admin");
      recordId = docRef?.id || "";
    } catch (error) {
      console.warn("Admin order save failed", error);
      showToast(t("saveFailed"));
    }
    addOrder({ ...orderDetails, id: recordId });
    event.target.reset();
    renderSlotOptions();
    showToast(t("orderAdded"));
  });

  document.getElementById("calendarWindowForm").addEventListener("submit", async event => {
    event.preventDefault();
    const openStartDate = document.getElementById("calendarOpenStart").value;
    const openEndDate = document.getElementById("calendarOpenEnd").value;
    if (openEndDate < openStartDate) {
      showToast(t("calendarWindowInvalid"));
      return;
    }
    const nextSettings = normalizeCalendarSettings({ openStartDate, openEndDate });
    rebuildSlotsFromCalendarSettings(nextSettings);
    try {
      await saveCalendarSettingsRecord(nextSettings);
      showToast(t("calendarWindowSaved"));
    } catch (error) {
      console.warn("Calendar settings save failed", error);
      showToast(t("saveFailed"));
    }
  });

  document.getElementById("reservationRequest").addEventListener("change", event => {
    if (event.target.value) prefillReservationFromOrder(event.target.value);
  });

  document.getElementById("reservationRecordForm").addEventListener("submit", async event => {
    event.preventDefault();
    const details = {
      requestId: document.getElementById("reservationRequest").value,
      name: document.getElementById("reservationName").value,
      contact: document.getElementById("reservationContact").value,
      concept: document.getElementById("reservationConcept").value,
      slotId: document.getElementById("reservationSlot").value,
      status: document.getElementById("reservationStatus").value,
      memo: document.getElementById("reservationMemo").value
    };
    let recordId = "";
    try {
      if (!isAdminUser()) await signInWithGoogle({ forceAccountSelect: true });
      if (!isAdminUser()) {
        showToast(t("adminPasswordWrong"));
        return;
      }
      const docRef = await saveReservationRecord(details);
      recordId = docRef?.id || "";
      const slot = slots.find(item => item.id === details.slotId);
      if (slot) await saveSlotOverrideRecord(slot, true);
    } catch (error) {
      console.warn("Reservation save failed", error);
      showToast(t("saveFailed"));
    }
    addReservation({ ...details, id: recordId });
    event.target.reset();
    renderAll();
    showToast(t("reservationAdded"));
  });

  document.querySelectorAll(".admin-tab").forEach(button => {
    button.addEventListener("click", () => {
      showAdminTab(button.getAttribute("data-tab"));
    });
  });
}

function initVisits() {
  const visits = storage.get("visits", 0) + 1;
  storage.set("visits", visits);
  const today = currentKoreaServiceDate();
  const rawHistory = storage.get("visitHistory", {});
  const history = rawHistory && typeof rawHistory === "object" && !Array.isArray(rawHistory) ? rawHistory : {};
  if (!Object.keys(history).length && visits > 1) {
    history[today] = visits;
  } else {
    history[today] = safeNumber(history[today]) + 1;
  }
  const cutoff = toISODate(addDays(new Date(`${today}T00:00:00`), -30));
  storage.set("visitHistory", Object.fromEntries(
    Object.entries(history).filter(([iso]) => iso >= cutoff)
  ));
}

function scheduleAfterFirstPaint(callback) {
  requestAnimationFrame(() => setTimeout(callback, 0));
}

function runWhenIdle(callback, timeout = 1200) {
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(callback, { timeout });
  } else {
    setTimeout(callback, timeout);
  }
}

function queueNonCriticalWork() {
  scheduleAfterFirstPaint(() => {
    document.body.classList.add("media-ready");
    runWhenIdle(() => initializeServices());
  });
}

function startCalendarRolloverTimer() {
  applyCalendarRollover();
  setInterval(applyCalendarRollover, 60 * 1000);
}

initVisits();
bindEvents();
setLanguage(lang);
startCalendarRolloverTimer();
queueNonCriticalWork();
updateAuthUi();
