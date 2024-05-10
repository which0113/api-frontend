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

  type BaseResponseChart = {
    code?: number;
    data?: Chart;
    message?: string;
  };

  type BaseResponseImageVO = {
    code?: number;
    data?: ImageVO;
    message?: string;
  };

  type BaseResponseInterfaceInfo = {
    code?: number;
    data?: InterfaceInfo;
    message?: string;
  };

  type BaseResponseListChart = {
    code?: number;
    data?: Chart[];
    message?: string;
  };

  type BaseResponseListInterfaceInfo = {
    code?: number;
    data?: InterfaceInfo[];
    message?: string;
  };

  type BaseResponseListUserVO = {
    code?: number;
    data?: UserVO[];
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

  type BaseResponsePageChart = {
    code?: number;
    data?: PageChart;
    message?: string;
  };

  type BaseResponsePageInterfaceInfo = {
    code?: number;
    data?: PageInterfaceInfo;
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

  type Chart = {
    chartData?: string;
    chartStatus?: string;
    chartType?: string;
    createTime?: string;
    execMessage?: string;
    genChart?: string;
    genResult?: string;
    goal?: string;
    id?: string;
    isDelete?: number;
    name?: string;
    updateTime?: string;
    userId?: string;
  };

  type ChartAddRequest = {
    chartData?: string;
    chartType?: string;
    goal?: string;
  };

  type ChartEditRequest = {
    chartData?: string;
    chartType?: string;
    goal?: string;
    id?: string;
  };

  type ChartUpdateRequest = {
    chartData?: string;
    chartType?: string;
    goal?: string;
    id?: string;
  };

  type DeleteRequest = {
    id?: string;
  };

  type Field = {
    fieldName?: string;
    value?: string;
  };

  type genChartByAiUsingPostParams = {
    chartType?: string;
    goal?: string;
    name?: string;
  };

  type getCaptchaUsingGetParams = {
    /** emailAccount */
    emailAccount?: string;
  };

  type getChartByIdUsingGetParams = {
    /** id */
    id?: string;
  };

  type getInterfaceInfoByIdUsingGetParams = {
    /** id */
    id?: string;
  };

  type getUserByIdUsingGetParams = {
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

  type InterfaceInfo = {
    avatarUrl?: string;
    createTime?: string;
    description?: string;
    id?: string;
    isDelete?: number;
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

  type InvokeRequest = {
    id?: string;
    requestParams?: Field[];
    userRequestParams?: string;
  };

  type listChartByPageUsingGetParams = {
    chartType?: string;
    current?: string;
    goal?: string;
    id?: string;
    name?: string;
    pageSize?: string;
    sortField?: string;
    sortOrder?: string;
    userId?: string;
  };

  type listChartUsingGetParams = {
    chartType?: string;
    current?: string;
    goal?: string;
    id?: string;
    name?: string;
    pageSize?: string;
    sortField?: string;
    sortOrder?: string;
    userId?: string;
  };

  type listInterfaceInfoByPageUsingGetParams = {
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

  type listInterfaceInfoBySearchTextPageUsingGetParams = {
    current?: string;
    pageSize?: string;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
  };

  type listInterfaceInfoUsingGetParams = {
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

  type listMyChartByPageUsingGetParams = {
    chartType?: string;
    current?: string;
    goal?: string;
    id?: string;
    name?: string;
    pageSize?: string;
    sortField?: string;
    sortOrder?: string;
    userId?: string;
  };

  type listUserByPageUsingGetParams = {
    current?: string;
    gender?: string;
    id?: string;
    pageSize?: string;
    sortField?: string;
    sortOrder?: string;
    userAccount?: string;
    userName?: string;
    userRole?: string;
  };

  type listUserUsingGetParams = {
    current?: string;
    gender?: string;
    id?: string;
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

  type PageChart = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: Chart[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type PageInterfaceInfo = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: InterfaceInfo[];
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

  type uploadFileUsingPostParams = {
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
    createTime?: string;
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
    createTime?: string;
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
