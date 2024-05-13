declare namespace API {
  type BaseResponseBiVO = {
    code?: number;
    data?: BiVO;
    message?: string;
  };

  type BaseResponseboolean = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseChartVO = {
    code?: number;
    data?: ChartVO;
    message?: string;
  };

  type BaseResponseImageVO = {
    code?: number;
    data?: ImageVO;
    message?: string;
  };

  type BaseResponseInterfaceInfoVO = {
    code?: number;
    data?: InterfaceInfoVO;
    message?: string;
  };

  type BaseResponselong = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseobject = {
    code?: number;
    data?: Record<string, any>;
    message?: string;
  };

  type BaseResponsePageChartVO = {
    code?: number;
    data?: PageChartVO;
    message?: string;
  };

  type BaseResponsePageInterfaceInfoVO = {
    code?: number;
    data?: PageInterfaceInfoVO;
    message?: string;
  };

  type BaseResponsePageUserVO = {
    code?: number;
    data?: PageUserVO;
    message?: string;
  };

  type BaseResponseUserLoginVO = {
    code?: number;
    data?: UserLoginVO;
    message?: string;
  };

  type BaseResponseUserVO = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  type BiVO = {
    chartId?: string;
    genChat?: string;
    genResult?: string;
  };

  type ChartAddRequest = {
    chartType?: string;
    execMessage?: string;
    goal?: string;
    name?: string;
  };

  type ChartUpdateRequest = {
    chartType?: string;
    execMessage?: string;
    goal?: string;
    id?: string;
    name?: string;
  };

  type ChartVO = {
    chartStatus?: string;
    chartType?: string;
    createUser?: string;
    execMessage?: string;
    genChart?: string;
    genResult?: string;
    goal?: string;
    id?: string;
    name?: string;
    updateTime?: string;
    userId?: string;
  };

  type DeleteRequest = {
    id?: string;
  };

  type Field = {
    fieldName?: string;
    value?: string;
  };

  type genChartByAiUsingPOSTParams = {
    chartType?: string;
    goal?: string;
    name?: string;
  };

  type getChartByIdUsingGETParams = {
    /** id */
    id?: string;
  };

  type getEmailCaptchaUsingGETParams = {
    /** emailAccount */
    emailAccount?: string;
  };

  type getInterfaceInfoByIdUsingGETParams = {
    /** id */
    id?: string;
  };

  type getUserByIdUsingGETParams = {
    /** id */
    id?: string;
  };

  type IdRequest = {
    id?: string;
  };

  type ImageVO = {
    name?: string;
    status?: string;
    uid?: string;
    url?: string;
  };

  type InterfaceInfoAddRequest = {
    description?: string;
    method?: string;
    name?: string;
    reduceScore?: number;
    requestExample?: string;
    requestHeader?: string;
    requestParams?: RequestParamsField[];
    responseHeader?: string;
    responseParams?: ResponseParamsField[];
    returnFormat?: string;
    url?: string;
  };

  type InterfaceInfoUpdateAvatarRequest = {
    avatarUrl?: string;
    id?: string;
  };

  type InterfaceInfoUpdateRequest = {
    avatarUrl?: string;
    description?: string;
    id?: string;
    method?: string;
    name?: string;
    reduceScore?: number;
    requestExample?: string;
    requestHeader?: string;
    requestParams?: RequestParamsField[];
    responseHeader?: string;
    responseParams?: ResponseParamsField[];
    returnFormat?: string;
    status?: number;
    url?: string;
  };

  type InterfaceInfoVO = {
    avatarUrl?: string;
    description?: string;
    id?: string;
    method?: string;
    name?: string;
    reduceScore?: string;
    requestExample?: string;
    requestHeader?: string;
    requestParams?: string;
    responseHeader?: string;
    responseParams?: string;
    returnFormat?: string;
    status?: number;
    totalInvokes?: string;
    updateTime?: string;
    url?: string;
    userId?: string;
  };

  type InvokeRequest = {
    id?: string;
    requestParams?: Field[];
    userRequestParams?: string;
  };

  type listChartByMyPageUsingGETParams = {
    chartStatus?: string;
    chartType?: string;
    createUser?: string;
    current?: string;
    genResult?: string;
    goal?: string;
    name?: string;
    pageSize?: string;
    sortField?: string;
    sortOrder?: string;
    userId?: string;
  };

  type listChartByPageUsingGETParams = {
    chartStatus?: string;
    chartType?: string;
    createUser?: string;
    current?: string;
    genResult?: string;
    goal?: string;
    name?: string;
    pageSize?: string;
    sortField?: string;
    sortOrder?: string;
    userId?: string;
  };

  type listInterfaceInfoByPageUsingGETParams = {
    current?: string;
    description?: string;
    method?: string;
    name?: string;
    pageSize?: string;
    reduceScore?: number;
    'responseParams[0].desc'?: string;
    'responseParams[0].fieldName'?: string;
    'responseParams[0].id'?: string;
    'responseParams[0].type'?: string;
    returnFormat?: string;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    url?: string;
    userId?: string;
  };

  type listInterfaceInfoBySearchPageUsingGETParams = {
    current?: string;
    description?: string;
    method?: string;
    name?: string;
    pageSize?: string;
    reduceScore?: number;
    'responseParams[0].desc'?: string;
    'responseParams[0].fieldName'?: string;
    'responseParams[0].id'?: string;
    'responseParams[0].type'?: string;
    returnFormat?: string;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    url?: string;
    userId?: string;
  };

  type listUserByPageUsingGETParams = {
    current?: string;
    gender?: string;
    pageSize?: string;
    sortField?: string;
    sortOrder?: string;
    userAccount?: string;
    userName?: string;
    userRole?: string;
  };

  type listUserBySearchPageUsingGETParams = {
    current?: string;
    gender?: string;
    pageSize?: string;
    sortField?: string;
    sortOrder?: string;
    userAccount?: string;
    userName?: string;
    userRole?: string;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageChartVO = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: ChartVO[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type PageInterfaceInfoVO = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: InterfaceInfoVO[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type PageUserVO = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: UserVO[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type RequestParamsField = {
    desc?: string;
    fieldName?: string;
    id?: string;
    required?: string;
    type?: string;
  };

  type ResponseParamsField = {
    desc?: string;
    fieldName?: string;
    id?: string;
    type?: string;
  };

  type uploadFileUsingPOSTParams = {
    biz?: string;
  };

  type UserAddRequest = {
    balance?: string;
    gender?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userPassword?: string;
    userRole?: string;
  };

  type UserBindEmailRequest = {
    captcha?: string;
    emailAccount?: string;
  };

  type UserEmailLoginRequest = {
    captcha?: string;
    emailAccount?: string;
  };

  type UserEmailRegisterRequest = {
    agreeToAnAgreement?: string;
    captcha?: string;
    emailAccount?: string;
    invitationCode?: string;
    userName?: string;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserLoginVO = {
    accessKey?: string;
    balance?: string;
    email?: string;
    gender?: string;
    id?: string;
    invitationCode?: string;
    secretKey?: string;
    status?: number;
    token?: string;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };

  type UserRegisterRequest = {
    agreeToAnAgreement?: string;
    checkPassword?: string;
    invitationCode?: string;
    userAccount?: string;
    userName?: string;
    userPassword?: string;
  };

  type UserUnBindEmailRequest = {
    captcha?: string;
    emailAccount?: string;
  };

  type UserUpdatePasswordRequest = {
    id?: string;
    userNewPassword?: string;
    userOldPassword?: string;
  };

  type UserUpdateRequest = {
    balance?: string;
    gender?: string;
    id?: string;
    status?: number;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userPassword?: string;
    userRole?: string;
  };

  type UserVO = {
    accessKey?: string;
    balance?: string;
    email?: string;
    gender?: string;
    id?: string;
    invitationCode?: string;
    secretKey?: string;
    status?: number;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };
}
