export const defaultLocales = (getLabelByCode: (code: string) => string) => {

    return {
        data: {
            steps: [
                {label: getLabelByCode('WHERE_TO') || getLabelByCode('-'), href: '#', value: 'created'},
                {label: getLabelByCode('CONTENT') || getLabelByCode('-'), href: '#', value: 'content'},
                {label: getLabelByCode('TRACKING_AND_WEIGHT') || getLabelByCode('-'), href: '#', value: 'tracking'},
            ],
            topLinks: [
                {label: getLabelByCode('SERVICES') || getLabelByCode('-'), href: '/services'},
                {label: getLabelByCode('BLOG') || getLabelByCode('-'), href: '/blogs'},
                {label: getLabelByCode('FAQ') || getLabelByCode('-'), href: '/faq'},
                {label: getLabelByCode('HOW_IT_WORKS') || getLabelByCode('-'), href: '/how-it-works'},
                {label: getLabelByCode('CONTACT') || getLabelByCode('-'), href: '/contact'},
            ],
            bottomLinks: [
                {label: getLabelByCode('DASHBOARD') || getLabelByCode('-'), href: '/dashboard', hrefValue: ['/dashboard', '/dashboard/support']},
                {label: getLabelByCode('PROFILE') || getLabelByCode('-'), href: '/dashboard/profile', hrefValue: ['/dashboard/profile', '/dashboard/profile/', '/dashboard/profile/recipients', '/dashboard/profile/address']},
                {label: getLabelByCode('ORDERS') || getLabelByCode('-'), href: '/dashboard/parcels', hrefValue: ['/dashboard/parcels', '/dashboard/parcels/create', '/dashboard/parcels/create/second-step', '/dashboard/parcels/create/third-step', '/dashboard/delivering', '/dashboard/delivering', '/dashboard/parcels/create/third', '/dashboard/parcels/view/[id]', '/dashboard/cart']},
                {label: getLabelByCode('NOTIFICATIONS') || getLabelByCode('-'), href: '/dashboard/notifications', hrefValue: '/dashboard/notifications'},
                {label: getLabelByCode('HOW_IT_WORKS') || getLabelByCode('-'), href: 'how-it-work', hrefValue: 'how-it-work'},
            ],
            parcelTabs: [
                getLabelByCode('CREATE_ORDER') || getLabelByCode('-'),
                getLabelByCode('ALL_ORDERS') || getLabelByCode('-'),
                getLabelByCode('SAVED') || getLabelByCode('-'),
                getLabelByCode('DELIVERY'),
            ],
            profileTabs: [
                getLabelByCode('PERSONAL_DATA') || getLabelByCode('-'),
                getLabelByCode('RECIPIENTS') || getLabelByCode('-'),
                getLabelByCode('DELIVERY_ADDRESSES') || getLabelByCode('-')
            ],
            authTab: [
                getLabelByCode('REGISTER') || getLabelByCode('-'),
                getLabelByCode('LOGIN') || getLabelByCode('-')
            ],
            mainTabs: [
                getLabelByCode('OVERVIEW') || getLabelByCode('-'),
                getLabelByCode('WRITE_EMAIL') || getLabelByCode('-')
            ]
        },
        schemas: {
            stepSchema: {
                ADDRESS_REQUIRED: getLabelByCode('ADDRESS_REQUIRED') || getLabelByCode('-'),
                COUNTRY_REQUIRED: getLabelByCode('COUNTRY_REQUIRED') || getLabelByCode('-'),
                RECIPIENT_REQUIRED: getLabelByCode('RECIPIENT_REQUIRED') || getLabelByCode('-'),
                WAREHOUSE_REQUIRED: getLabelByCode('WAREHOUSE_REQUIRED') || getLabelByCode('-'),
                TARIFF_REQUIRED: getLabelByCode('TARIFF_REQUIRED') || getLabelByCode('-'),
                LOCALITY_REQUIRED: getLabelByCode('LOCALITY_REQUIRED') || getLabelByCode('-'),
                ADD_PRODUCT: getLabelByCode('ADD_PRODUCT') || getLabelByCode('-'),
                TRACKING_REQUIRED: getLabelByCode('TRACKING_REQUIRED') || getLabelByCode('-'),
                MAX_IMAGE_ITEMS: getLabelByCode('MAX_IMAGE_ITEMS') || getLabelByCode('-'),
                WEIGHT_REQUIRED: getLabelByCode('WEIGHT_REQUIRED') || getLabelByCode('-')
            }
        },
        pages: {
            login: {
                EMAIL: getLabelByCode('EMAIL') || getLabelByCode('-'),
                PASSWORD: getLabelByCode('PASSWORD') || getLabelByCode('-'),
                REMEMBER_ME: getLabelByCode('REMEMBER_ME') || getLabelByCode('-'),
                FORGOT_PASSWORD: getLabelByCode('FORGOT_PASSWORD') || getLabelByCode('-'),
                LOGIN: getLabelByCode('LOGIN') || getLabelByCode('-'),
                INVALID_EMAIL: getLabelByCode('INVALID_EMAIL') || getLabelByCode('-'),
                MIN_LENGTH_PASSWORD: getLabelByCode('MIN_LENGTH_PASSWORD') || getLabelByCode('-'),
                INVALID_CREDENTIALS: getLabelByCode('INVALID_CREDENTIALS') || getLabelByCode('-')
            },
            register: {
                NAME: getLabelByCode('NAME') || getLabelByCode('-'),
                EMAIL: getLabelByCode('EMAIL') || getLabelByCode('-'),
                PASSWORD: getLabelByCode('PASSWORD') || getLabelByCode('-'),
                PASSWORD_CONFIRMATION: getLabelByCode('PASSWORD_CONFIRMATION') || getLabelByCode('-'),
                GENERATE_PASSWORD: getLabelByCode('GENERATE_PASSWORD') || getLabelByCode('-'),
                REGISTER: getLabelByCode('REGISTER') || getLabelByCode('-'),
                REQUIRED_FIELD: getLabelByCode('REQUIRED_FIELD') || getLabelByCode('-'),
                INVALID_EMAIL: getLabelByCode('INVALID_EMAIL') || getLabelByCode('-'),
                MIN_LENGTH_PASSWORD: getLabelByCode('MIN_LENGTH_PASSWORD') || getLabelByCode('-'),
                PASSWORDS_DO_NOT_MATCH: getLabelByCode('PASSWORDS_DO_NOT_MATCH') || getLabelByCode('-')
            },
            reset: {
                EMAIL: getLabelByCode('EMAIL') || getLabelByCode('-'),
                SEND: getLabelByCode('SEND') || getLabelByCode('-'),
                INVALID_EMAIL: getLabelByCode('INVALID_EMAIL') || getLabelByCode('-')
            },
            confirmReset: {
                TITLE: getLabelByCode('RESET_PASSWORD') || getLabelByCode('-'),
                EMAIL: getLabelByCode('EMAIL') || getLabelByCode('-'),
                NEW_PASSWORD: getLabelByCode('NEW_PASSWORD') || getLabelByCode('-'),
                CONFIRM_NEW_PASSWORD: getLabelByCode('CONFIRM_NEW_PASSWORD') || getLabelByCode('-'),
                SEND: getLabelByCode('SEND') || getLabelByCode('-'),
                INVALID_EMAIL: getLabelByCode('INVALID_EMAIL') || getLabelByCode('-'),
                MIN_LENGTH_PASSWORD: getLabelByCode('MIN_LENGTH_PASSWORD') || getLabelByCode('-'),
                PASSWORDS_DO_NOT_MATCH: getLabelByCode('PASSWORDS_DO_NOT_MATCH') || getLabelByCode('-')
            },
            parcels: {
                NO_ORDERS: getLabelByCode('NO_ORDERS') || getLabelByCode('-'),
                NOTHING_FOUND: getLabelByCode('NOTHING_FOUND') || getLabelByCode('-'),
                PAYMENT_SUCCESS: getLabelByCode('PAYMENT_SUCCESS') || getLabelByCode('-')
            },
            notifications: {
                ALL: getLabelByCode('ALL') || getLabelByCode('-'),
                ENTER_ORDER_NUMBER: getLabelByCode('ENTER_ORDER_NUMBER') || getLabelByCode('-')
            },
            parcelDetails: {
                ALL_ORDERS: getLabelByCode('ALL_ORDERS') || getLabelByCode('-'),
                ORDER: getLabelByCode('ORDER') || getLabelByCode('-'),
                STATUS: getLabelByCode('STATUS') || getLabelByCode('-'),
                DATE: getLabelByCode('DATE') || getLabelByCode('-')
            },
            addresses: {
                ENTER_CITY: getLabelByCode('NTER_CITY') || getLabelByCode('-'),
                ADD: getLabelByCode('ADD') || getLabelByCode('-')
            },
            recipients: {
                ENTER_LAST_NAME: getLabelByCode('ENTER_LAST_NAME') || getLabelByCode('-'),
                ADD: getLabelByCode('ADD') || getLabelByCode('-')
            },
            support: {
                WRITE_SUPPORT: getLabelByCode('WRITE_SUPPORT') || getLabelByCode('-'),
                TEAM_WILL_LISTEN: getLabelByCode('TEAM_WILL_LISTEN') || getLabelByCode('-'),
                SELECT_THEME: getLabelByCode('SELECT_THEME') || getLabelByCode('-'),
                MESSAGE: getLabelByCode('MESSAGE') || getLabelByCode('-'),
                AGREE_POLICY: getLabelByCode('AGREE_POLICY') || getLabelByCode('-'),
                SEND: getLabelByCode('SEND') || getLabelByCode('-'),
                THEMES: [
                    {id: 1, label: getLabelByCode('THEME_1') || getLabelByCode('-')}
                ]
            }
        },
        components: {
            UserCardDashboard: {
                FULL_NAME_NOT_SET: getLabelByCode('FULL_NAME_NOT_SET') || getLabelByCode('-'),
                DATE_LABEL: getLabelByCode('DATE_LABEL') || getLabelByCode('-'),
                DATE_VALUE: getLabelByCode('DATE_VALUE') || getLabelByCode('-'),
                PHONE_LABEL: getLabelByCode('PHONE_LABEL') || getLabelByCode('-'),
                EMAIL_LABEL: getLabelByCode('EMAIL_LABEL') || getLabelByCode('-'),
                NO_DATA: '-'
            },
            AddressCardDashboard: {
                TITLE: getLabelByCode('ADDRESS_CARD_DASHBOARD_TITLE') || getLabelByCode('-'),
                SUB_TITLE: getLabelByCode('ADDRESS_CARD_DASHBOARD_SUB_TITLE') || getLabelByCode('-'),
                TOTAL_LABEL: getLabelByCode('OVERALL') || getLabelByCode('-'),
                TOTAL_VALUE: getLabelByCode('TOTAL_VALUE') || getLabelByCode('-'),
                ZERO: getLabelByCode('ZERO') || getLabelByCode('-')
            },
            DeliveryCardDashboard: {
                TITLE: getLabelByCode('DELIVERY_CARD_DASHBOARD_TITLE') || getLabelByCode('-'),
                TRACKER_LABEL: getLabelByCode('TRACKER') || getLabelByCode('-'),
                TRACKER_VALUE: getLabelByCode('TRACKER_VALUE') || getLabelByCode('-'),
                DATE_LABEL: getLabelByCode('DATE') || getLabelByCode('-'),
                DATE_VALUE: getLabelByCode('DATE_VALUE') || getLabelByCode('-'),
                STATUS: getLabelByCode('SENT') || getLabelByCode('-')
            },
            DraftCardDashboard: {
                TITLE: getLabelByCode('DRAFT') || getLabelByCode('-'),
                SUB_TITLE: getLabelByCode('DRAFT_CARD_DASHBOARD_SUB_TITLE') || getLabelByCode('-'),
                TOTAL_LABEL: getLabelByCode('OVERALL') || getLabelByCode('-'),
                TOTAL_VALUE: getLabelByCode('TOTAL_VALUE') || getLabelByCode('-'),
                ZERO: getLabelByCode('ZERO') || getLabelByCode('-')
            },
            FaqCardDashboard: {
                TITLE: getLabelByCode('TITLE') || getLabelByCode('-'),
                SUB_TITLE: getLabelByCode('FAQ_CARD_DASHBOARD_SUB_TITLE') || getLabelByCode('-')
            },
            NotificationCardDashboard: {
                TITLE: getLabelByCode('NOTIFICATION_TITLE') || getLabelByCode('-'),
                SUB_TITLE: getLabelByCode('NOTIFICATION_SUB_TITLE') || getLabelByCode('-'),
                TOTAL_LABEL: getLabelByCode('OVERALL') || getLabelByCode('-'),
                TOTAL_VALUE: getLabelByCode('TOTAL_VALUE') || getLabelByCode('-')
            },
            OrdersCardDashboard: {
                TITLE: getLabelByCode('ORDERS_CARD_DASHBOARD') || getLabelByCode('-'),
                SUB_TITLE: getLabelByCode('ORDERS_CARD_DASHBOARD_SUB_TITLE') || getLabelByCode('-'),
                TOTAL_LABEL: getLabelByCode('OVERALL') || getLabelByCode('-'),
                TOTAL_VALUE: getLabelByCode('TOTAL_VALUE') || getLabelByCode('-'),
                ZERO: getLabelByCode('ZERO') || getLabelByCode('-')
            },
            RecipientCardDashboard: {
                TITLE: getLabelByCode('RECIPIENTS') || getLabelByCode('-'),
                SUB_TITLE: getLabelByCode('RECIPIENTS_SUB_TITLE') || getLabelByCode('-'),
                TOTAL_LABEL: getLabelByCode('OVERALL') || getLabelByCode('-'),
                ZERO: getLabelByCode('ZERO') || getLabelByCode('-')
            },
            ParcelRowCard: {
                ORDER: getLabelByCode('ORDER') || getLabelByCode('-'),
                TRACKER: getLabelByCode('TRACKER') || getLabelByCode('-'),
                SENDER: getLabelByCode('SENDER') || getLabelByCode('-'),
                DELIVERY: getLabelByCode('DELIVERY') || getLabelByCode('-'),
                RECIPIENT: getLabelByCode('RECIPIENT') || getLabelByCode('-'),
                STATUS: getLabelByCode('STATUS') || getLabelByCode('-'),
                PAID: getLabelByCode('PAID') || getLabelByCode('-'),
                UNKNOWN: getLabelByCode('UNKNOWN') || getLabelByCode('-'),
                SEPARATOR: getLabelByCode('SEPARATOR') || getLabelByCode('-')
            },
            ConfirmCreateDialog: {
                TITLE: getLabelByCode('CONFIRM') || getLabelByCode('-'),
                BODY: getLabelByCode('CONFIRM_BODY') || getLabelByCode('-'),
                CONTINUE_PREVIOUS: getLabelByCode('CONFIRM_PREV') || getLabelByCode('-'),
                CREATE_NEW: getLabelByCode('CREATE_NEW') || getLabelByCode('-')
            },
            NotificationCard: {
                ORDER: getLabelByCode('ORDER') || getLabelByCode('-'),
                DATE: getLabelByCode('DATE') || getLabelByCode('-'),
                STATUS: getLabelByCode('STATUS') || getLabelByCode('-'),
                ORDER_NUMBER: getLabelByCode('ORDER_NUMBER') || getLabelByCode('-'),
                DELIVERY_DATE: getLabelByCode('DELIVERY_DATE') || getLabelByCode('-'),
                STATUS_DELIVERED: getLabelByCode('STATUS_DELIVERED') || getLabelByCode('-')
            },
            ParcelAdditionalCard: {
                TITLE: getLabelByCode('ADDITIONAL_SERVICES') || getLabelByCode('-')
            },
            ParcelAddressCard: {
                DELIVERY_ADDRESS_TITLE: getLabelByCode('DELIVERY_ADDRESS_TITLE') || getLabelByCode('-'),
                DELIVERY_ADDRESS_TITLE_WITH_WAREHOUSE: getLabelByCode('DELIVERY_ADDRESS_TITLE_WITH_WAREHOUSE') || getLabelByCode('-'),
                RECIPIENT: getLabelByCode('RECIPIENT') || getLabelByCode('-'),
                RECIPIENT_NAME: getLabelByCode('RECIPIENT_NAME') || getLabelByCode('-'),
                WAREHOUSE_ADDRESS: getLabelByCode('POSTEXPERT_ADDRESS') || getLabelByCode('-'),
                UNKNOWN: getLabelByCode('UNKNOWN') || getLabelByCode('-')
            },
            ParcelBaseCard: {
                TITLE: getLabelByCode('PARCEL_BASE_CARD_TITLE') || getLabelByCode('-'),
                DESTINATION: getLabelByCode('DESTINATION') || getLabelByCode('-'),
                LOCALITY_PLACEHOLDER: getLabelByCode('LOCALITY') || getLabelByCode('-'),
                WEIGHT_PLACEHOLDER: getLabelByCode('WEIGHT_PLACEHOLDER') || getLabelByCode('-'),
                WEIGHT_UNIT: getLabelByCode('WEIGHT_UNIT') || getLabelByCode('-'),
                PICKUP_POINT: getLabelByCode('PICKUP_POINT') || getLabelByCode('-'),
                TARIFF_SELECTION: getLabelByCode('TARIFF_SELECTION') || getLabelByCode('-'),
                DELIVERY_COST: getLabelByCode('DELIVERY_COST') || getLabelByCode('-'),
                TO: getLabelByCode('TO') || getLabelByCode('-'),
                INFO: getLabelByCode('INFO') || getLabelByCode('-'),
                MAX_WEIGHT_MESSAGE: getLabelByCode('MAX_WEIGHT_MESSAGE') || getLabelByCode('-')
            },
            ParcelContentCard: {
                TITLE: getLabelByCode('CONTENT') || getLabelByCode('-'),
                INDEX: getLabelByCode('INDEX') || getLabelByCode('-'),
                NAME: getLabelByCode('NAME') || getLabelByCode('-'),
                COST_PLACEHOLDER: getLabelByCode('COST_PLACEHOLDER') || getLabelByCode('-'),
                NO_PRODUCTS: getLabelByCode('NO_PRODUCTS') || getLabelByCode('-'),
                ADD_PRODUCT: getLabelByCode('ADD_PRODUCT') || getLabelByCode('-'),
                SAVE_DRAFT: getLabelByCode('SAVE_DRAFT') || getLabelByCode('-'),
                CONTENT_PLACEHOLDER: getLabelByCode('CONTENT_PLACEHOLDER') || getLabelByCode('-')
            },
            ParcelInfoCard: {
                CALCULATION: getLabelByCode('CALCULATION') || getLabelByCode('-'),
                WAREHOUSE: getLabelByCode('WAREHOUSE') || getLabelByCode('-'),
                DESTINATION: getLabelByCode('DESTINATION') || getLabelByCode('-'),
                WEIGHT: getLabelByCode('WEIGHT') || getLabelByCode('-'),
                TARIFF: getLabelByCode('TARIFF') || getLabelByCode('-'),
                DELIVERY_TIME: getLabelByCode('DELIVERY_TIME') || getLabelByCode('-'),
                INSURANCE: getLabelByCode('INSURANCE') || getLabelByCode('-'),
                TOTAL: getLabelByCode('TOTAL') || getLabelByCode('-'),
                PAY: getLabelByCode('PAY') || getLabelByCode('-'),
                SAVE_DRAFT: getLabelByCode('SAVE_DRAFT') || getLabelByCode('-')
            },
            ParcelRecipientCard: {
                TITLE: getLabelByCode('PARCEL_RECIPIENT_CARD_TITLE') || getLabelByCode('-'),
                RECIPIENT: getLabelByCode('RECIPIENT') || getLabelByCode('-'),
                SENDER: getLabelByCode('SENDER') || getLabelByCode('-'),
                NO_DATA: '-',
                EDIT: getLabelByCode('EDIT') || getLabelByCode('-')
            },
            ParcelTariffCard: {
                TO: getLabelByCode('TO') || getLabelByCode('-'),
                KG: getLabelByCode('KG') || getLabelByCode('-'),
                EUR: getLabelByCode('EUR') || getLabelByCode('-')
            },
            ParcelTrackingCard: {
                TITLE: getLabelByCode('DELIVERY_ADDRESS') || getLabelByCode('-'),
                TRACKING_NUMBER_LABEL: getLabelByCode('SET_TRACKING_NUMBER') || getLabelByCode('-'),
                WEIGHT_LABEL: getLabelByCode('SET_WEIGHT_PARCEL') || getLabelByCode('-'),
                UPLOAD_IMAGE_ERROR: getLabelByCode('UPLOAD_IMAGE_ERROR') || getLabelByCode('-')
            },
            ParcelViewCard: {
                TITLE: getLabelByCode('TITLE') || getLabelByCode('-'),
                ADDRESS_POSTEXPERT: getLabelByCode('ADDRESS_POSTEXPERT') || getLabelByCode('-'),
                ADDRESS_RUSSIA: getLabelByCode('ADDRESS_RUSSIA') || getLabelByCode('-'),
                RECIPIENT_RUSSIA: getLabelByCode('RECIPIENT_RUSSIA') || getLabelByCode('-'),
                WEIGHT: getLabelByCode('WEIGHT') || getLabelByCode('-'),
                TARIFF: getLabelByCode('TARIFF') || getLabelByCode('-'),
                DELIVERY_METHOD: getLabelByCode('DELIVERY_METHOD') || getLabelByCode('-'),
                ADDITIONAL_SERVICES: getLabelByCode('ADDITIONAL_SERVICES') || getLabelByCode('-'),
                TRACKING_NUMBER: getLabelByCode('TRACKING_NUMBER') || getLabelByCode('-'),
                NO_TRACKING_NUMBER: getLabelByCode('TRACKING_NUMBER_NOT_SELECTED') || getLabelByCode('-'),
                NO_ADDRESS_SELECTED: getLabelByCode('WAREHOUSE_NOT_SELECTED') || getLabelByCode('-'),
                NO_RECIPIENT_SELECTED: getLabelByCode('RECIPIENT_NOT_SELECTED') || getLabelByCode('-'),
                POSITION: [
                    getLabelByCode('POSITION') || getLabelByCode('-'),
                    getLabelByCode('POSITIONS') || getLabelByCode('-'),
                    getLabelByCode('POSITIONS_G') || getLabelByCode('-')
                ],
                CONTENT: getLabelByCode('CONTENT') || getLabelByCode('-')
            },
            DialogPreview: {
                TITLE: getLabelByCode('PREVIEW_ORDER') || getLabelByCode('-')
            },
            StepForm: {
                BACK: getLabelByCode('BACK') || getLabelByCode('-'),
                NEXT: getLabelByCode('NEXT') || getLabelByCode('-')
            },
            TrackingStepForm: {
                HOW_IT_WORKS: getLabelByCode('HOW_IT_WORKS') || getLabelByCode('-'),
                PREVIEW_ORDER: getLabelByCode('PREVIEW_ORDER') || getLabelByCode('-'),
                BACK: getLabelByCode('BACK') || getLabelByCode('-'),
                SAVE_AND_PAY: getLabelByCode('SAVE_AND_PAY') || getLabelByCode('-')
            },
            AddressCard: {
                DELETE_ADDRESS: getLabelByCode('DELETE_ADDRESS') || getLabelByCode('-'),
                DELETE: getLabelByCode('DELETE') || getLabelByCode('-'),
                EDIT: getLabelByCode('EDIT') || getLabelByCode('-'),
                DELIVERY_ADDRESS: getLabelByCode('DELIVERY_ADDRESS') || getLabelByCode('-'),
                DEFAULT: getLabelByCode('DEFAULT') || getLabelByCode('-'),
                COUNTRY: getLabelByCode('COUNTRY') || getLabelByCode('-'),
                CITY: getLabelByCode('CITY') || getLabelByCode('-'),
                HOUSE: getLabelByCode('HOUSE') || getLabelByCode('-'),
                ZIP_CODE: getLabelByCode('ZIP_CODE') || getLabelByCode('-'),
                REGION: getLabelByCode('REGION') || getLabelByCode('-'),
                STREET: getLabelByCode('STREET') || getLabelByCode('-'),
                APARTMENT: getLabelByCode('APARTMENT') || getLabelByCode('-')
            },
            CredentialsCard: {
                MAIN: getLabelByCode('MAIN') || getLabelByCode('-'),
                EDIT: getLabelByCode('EDIT') || getLabelByCode('-'),
                CHANGE: getLabelByCode('CHANGE') || getLabelByCode('-'),
                IMAGE_UPLOAD_HINT: getLabelByCode('IMAGE_UPLOAD_HINT') || getLabelByCode('-'),
                FULL_NAME: getLabelByCode('FULL_NAME') || getLabelByCode('-'),
                EMAIL: getLabelByCode('EMAIL') || getLabelByCode('-'),
                PHONE: getLabelByCode('PHONE') || getLabelByCode('-'),
                AVATAR_UPDATED: getLabelByCode('AVATAR_UPDATED') || getLabelByCode('-')
            },
            DeleteUserCard: {
                DELETE_ACCOUNT: getLabelByCode('DELETE_ACCOUNT') || getLabelByCode('-'),
                DELETE: getLabelByCode('DELETE') || getLabelByCode('-'),
                DELETE_DESCRIPTION: getLabelByCode('DELETE_DESCRIPTION') || getLabelByCode('-')
            },
            MyAddressCard: {
                SENDER_ADDRESS: getLabelByCode('SENDER_ADDRESS') || getLabelByCode('-'),
                ADDRESS: getLabelByCode('ADDRESS') || getLabelByCode('-'),
                ZIP_CODE: getLabelByCode('ZIP_CODE') || getLabelByCode('-'),
                EDIT: getLabelByCode('EDIT') || getLabelByCode('-')
            },
            PasswordCard: {
                CHANGE_PASSWORD: getLabelByCode('CHANGE_PASSWORD') || getLabelByCode('-'),
                SAVE: getLabelByCode('SAVE') || getLabelByCode('-'),
                ENTER_OLD_PASSWORD: getLabelByCode('ENTER_OLD_PASSWORD') || getLabelByCode('-'),
                NEW_PASSWORD: getLabelByCode('NEW_PASSWORD') || getLabelByCode('-'),
                GENERATE_PASSWORD: getLabelByCode('GENERATE_PASSWORD') || getLabelByCode('-'),
                MIN_LENGTH: getLabelByCode('MIN_LENGTH') || getLabelByCode('-')
            },
            RecipientCard: {
                DELETE_RECIPIENT: getLabelByCode('DELETE_RECIPIENT') || getLabelByCode('-'),
                DELETE: getLabelByCode('DELETE') || getLabelByCode('-'),
                EDIT: getLabelByCode('EDIT') || getLabelByCode('-'),
                RECIPIENT: getLabelByCode('RECIPIENT') || getLabelByCode('-'),
                DEFAULT: getLabelByCode('DEFAULT') || getLabelByCode('-'),
                FULL_NAME: getLabelByCode('FULL_NAME') || getLabelByCode('-'),
                EMAIL: getLabelByCode('EMAIL') || getLabelByCode('-'),
                PHONE: getLabelByCode('PHONE') || getLabelByCode('-')
            },
            DeleteDialog: {
                CONFIRMATION: getLabelByCode('CONFIRMATION') || getLabelByCode('-'),
                CANCEL: getLabelByCode('CANCEL') || getLabelByCode('-'),
                DELETE: getLabelByCode('DELETE') || getLabelByCode('-')
            },
            DialogCrop: {
                CROP_PHOTO: getLabelByCode('CROP_PHOTO') || getLabelByCode('-'),
                CANCEL: getLabelByCode('CANCEL') || getLabelByCode('-'),
                SAVE: getLabelByCode('SAVE') || getLabelByCode('-')
            },
            Address: {
                LABEL: getLabelByCode('SEARCH_FAST_DATABASE') || getLabelByCode('-'),
                PLACEHOLDER: getLabelByCode('ENTER_ADDRESS') || getLabelByCode('-'),
                EMPTY_LIST: getLabelByCode('EMPTY_LIST') || getLabelByCode('-')
            },
            AddressField: {
                NO_ADDRESSES: getLabelByCode('NO_ADDRESSES') || getLabelByCode('-'),
                ADD: getLabelByCode('ADD') || getLabelByCode('-'),
                SELECT_ADDRESS: getLabelByCode('SELECT_ADDRESS') || getLabelByCode('-')
            },
            CountryField: {
                PLACEHOLDER: getLabelByCode('COUNTRY') || getLabelByCode('-')
            },
            RecipientsField: {
                NO_RECIPIENTS: getLabelByCode('NO_RECIPIENTS') || getLabelByCode('-'),
                ADD: getLabelByCode('ADD') || getLabelByCode('-'),
                SELECT_RECIPIENT: getLabelByCode('SELECT_RECIPIENT') || getLabelByCode('-')
            },
            WarehouseField: {
                PLACEHOLDER: getLabelByCode('WAREHOUSE') || getLabelByCode('-')
            },
            Navbar: {
                LOGIN: getLabelByCode('LOGIN') || getLabelByCode('-'),
                REGISTER: getLabelByCode('REGISTER') || getLabelByCode('-')
            },
            AuthTitle: {
                LOGIN: getLabelByCode('LOGIN') || getLabelByCode('-'),
                REGISTER: getLabelByCode('REGISTER') || getLabelByCode('-'),
                RESET: getLabelByCode('RESET_PASSWORD') || getLabelByCode('-')
            },
            Footer: {
                DESCRIPTION: getLabelByCode('DESCRIPTION') || getLabelByCode('-'),
                WEBSITE: getLabelByCode('WEBSITE') || getLabelByCode('-'),
                DASHBOARD: getLabelByCode('DASHBOARD') || getLabelByCode('-'),
                COPYRIGHT: getLabelByCode('COPYRIGHT') || getLabelByCode('-'),
                DEVELOPED_BY: getLabelByCode('DEVELOPED_BY') || getLabelByCode('-')
            },
            AvatarMenu: {
                LOGOUT: getLabelByCode('LOGOUT') || getLabelByCode('-')
            },
            EmailPopover: {
                NOT_VERIFIED: getLabelByCode('EMAIL_NOT_VERIFIED') || getLabelByCode('-'),
                SEND: getLabelByCode('SEND') || getLabelByCode('-')
            },
            AddressSideOver: {
                TITLE: getLabelByCode('DELIVERY_ADDRESSES') || getLabelByCode('-'),
                COUNTRY: getLabelByCode('COUNTRY') || getLabelByCode('-'),
                REGION: getLabelByCode('REGION') || getLabelByCode('-'),
                LOCALITY: getLabelByCode('LOCALITY') || getLabelByCode('-'),
                STREET: getLabelByCode('STREET') || getLabelByCode('-'),
                HOUSE: getLabelByCode('HOUSE') || getLabelByCode('-'),
                BUILDING: getLabelByCode('BUILDING') || getLabelByCode('-'),
                APARTMENT: getLabelByCode('APARTMENT') || getLabelByCode('-'),
                ZIP_CODE: getLabelByCode('ZIP_CODE') || getLabelByCode('-'),
                SET_DEFAULT: getLabelByCode('SET_DEFAULT_RECIPIENT') || getLabelByCode('-'),
                ADDITIONAL_INFO: getLabelByCode('ADDITIONAL_INFO') || getLabelByCode('-'),
                ADDITIONAL_INFO_LABEL: getLabelByCode('ADDITIONAL_INFO') || getLabelByCode('-'),
                REQUIRED_FIELD: getLabelByCode('REQUIRED_FIELD') || getLabelByCode('-')
            },
            MyAddressSideOver: {
                TITLE: getLabelByCode('SENDER_ADDRESS') || getLabelByCode('-'),
                LINE1_LABEL: getLabelByCode('ADDRESS_LINE1') || getLabelByCode('-'),
                ZIP_CODE_LABEL: getLabelByCode('ZIP_CODE') || getLabelByCode('-'),
                ADDITIONAL_INFO: getLabelByCode('ADDITIONAL_INFO') || getLabelByCode('-'),
                REQUIRED_FIELD: getLabelByCode('REQUIRED_FIELD') || getLabelByCode('-')
            },
            ProfileSideOver: {
                TITLE: getLabelByCode('PROFILE_CHANGE') || getLabelByCode('-'),
                FULL_NAME_LABEL: getLabelByCode('FULL_NAME') || getLabelByCode('-'),
                PHONE_LABEL: getLabelByCode('PHONE') || getLabelByCode('-'),
                EMAIL_LABEL: getLabelByCode('EMAIL') || getLabelByCode('-'),
                ADDITIONAL_INFO_LABEL: getLabelByCode('ADDITIONAL_INFO') || getLabelByCode('-'),
                REQUIRED_FIELD: getLabelByCode('REQUIRED_FIELD') || getLabelByCode('-'),
                INVALID_EMAIL: getLabelByCode('INVALID_EMAIL') || getLabelByCode('-')
            },
            RecipientsSideOver: {
                TITLE: getLabelByCode('RECIPIENT') || getLabelByCode('-'),
                NAME_LABEL: getLabelByCode('FULL_NAME') || getLabelByCode('-'),
                PHONE_LABEL: getLabelByCode('PHONE') || getLabelByCode('-'),
                EMAIL_LABEL: getLabelByCode('EMAIL') || getLabelByCode('-'),
                ADDITIONAL_INFO_LABEL: getLabelByCode('ADDITIONAL_INFO') || getLabelByCode('-'),
                IS_DEFAULT_LABEL: getLabelByCode('SET_DEFAULT_RECIPIENT') || getLabelByCode('-'),
                REQUIRED_FIELD: getLabelByCode('REQUIRED_FIELD') || getLabelByCode('-'),
                MIN_PHONE_LENGTH: getLabelByCode('MIN_NUMBER_LENGTH') || getLabelByCode('-'),
                EMAIL_INVALID: getLabelByCode('EMAIL_INVALID') || getLabelByCode('-')
            },
            SideOver: {
                DATA_ENCRYPTION_MESSAGE: getLabelByCode('DATA_ENCRYPTION_MESSAGE') || getLabelByCode('-'),
                CANCEL_BUTTON: getLabelByCode('CANCEL') || getLabelByCode('-'),
                SAVE_BUTTON: getLabelByCode('SAVE') || getLabelByCode('-')
            },
            ParcelTable: {
                ID: getLabelByCode('ID') || getLabelByCode('-'),
                NAME: getLabelByCode('NAME') || getLabelByCode('-'),
                QUANTITY: getLabelByCode('QUANTITY') || getLabelByCode('-'),
                COST: getLabelByCode('COST') || getLabelByCode('-')
            },
            FilterPanelWidget: {
                FILTERS: getLabelByCode('FILTERS') || getLabelByCode('-'),
                ENTER_NUMBER: getLabelByCode('ENTER_NUMBER') || getLabelByCode('-'),
                STATUS: getLabelByCode('STATUS') || getLabelByCode('-'),
                DRAFT: getLabelByCode('DRAFT') || getLabelByCode('-'),
                CONFIRMED: getLabelByCode('CONFIRMED') || getLabelByCode('-'),
                CANCELED: getLabelByCode('CANCELED') || getLabelByCode('-'),
                SENT: getLabelByCode('SENT') || getLabelByCode('-'),
                DELIVERED: getLabelByCode('DELIVERED') || getLabelByCode('-')
            },
            SearchPanelWidget: {
                SEARCH: getLabelByCode('SEARCH') || getLabelByCode('-')
            },
            AutocompleteCustom: {
                EMPTY_LIST: getLabelByCode('EMPTY_LIST') || getLabelByCode('-')
            }
        }
    }
};
