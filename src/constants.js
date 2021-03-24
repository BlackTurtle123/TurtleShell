export const TURTLESHELL_DEBUG = process.env.NODE_ENV !== 'production';

export const CONFIG_URL = 'https://raw.githubusercontent.com/BlackTurtle123/tn-client-config/master/tn_keeper_blacklist.json';

export const allowMatcher = ['dex.tokenomica.com', 'vfa.tokenomica.com'];

export const MSG_STATUSES = {
    UNAPPROVED: 'unapproved',
    SIGNED: 'signed',
    PUBLISHED: 'published',
    FAILED: 'failed',
    REJECTED: 'rejected',
    SHOWED_NOTIFICATION: 'showed_notify',
    NEW_NOTIFICATION: 'new_notify',
};

export const STATUS = {
    ERROR: -1,
    OK: 1,
    PENDING: 0,
    UPDATED: 2,
};

export const DEFAULT_CONFIG = {
    CONFIG: {
        update_ms: 30000,
    },
    NETWORKS: [ 'mainnet', 'testnet', 'custom' ],
    NETWORK_CONFIG: {
        "testnet": {
            "code": "l",
            "server": "https://cluster.testnet.tnnode.turtlenetwork.eu",
            "matcher": "https://testnet.matcher.turtlenetwork.eu",
        },
        "mainnet": {
            "code": "L",
            "server": "https://cluster.tnnode.turtlenetwork.eu/",
            "matcher": "https://matcher.turtlenetwork.eu/"
        },
        "custom": {
            "code": "",
            "server": "",
            "matcher": ""
        }
    },
    MESSAGES_CONFIG: {
        message_expiration_ms: 30 * 60 * 1000,
        update_messages_ms: 30 * 1000,
        max_messages: 100,
        notification_title_max: 20,
        notification_interval_min: 30 * 1000,
        notification_message_max: 250,
    },
    PACK_CONFIG: {
        max: 5,
        allow_tx: [3, 4, 5, 6, 7, 10, 11, 12, 16],
    },
    IDLE: {
        'idle': 0,
        '5m': 5 * 60 * 1000,
        '10m': 10 * 60 * 1000,
        '20m': 20 * 60 * 1000,
        '40m': 40 * 60 * 1000,
        '1h': 60 * 60 * 1000,
    },
};

export const DEFAULT_FEE_CONFIG_URL = 'https://raw.githubusercontent.com/TurtleNetwork/waves-client-config/master/fee.json';

export const DEFAULT_FEE_CONFIG = {
    "smart_asset_extra_fee": 4000000,
    "smart_account_extra_fee": 4000000,
    "calculate_fee_rules": {
        "default": {
            "add_smart_asset_fee": true,
            "add_smart_account_fee": true,
            "min_price_step": 2000000,
            "fee":2000000
        },
        "3": {
            "fee": 100000000000
        },
        "5": {
            "fee": 100000000000
        },
        "7": {
            "add_smart_account_fee": false,
            "fee": 4000000
        },
        "11": {
            "price_per_transfer": 100000
        },
        "12": {
            "price_per_kb": 2000000
        },
        "13": {
            "fee": 100000000
        },
        "14": {
            "fee": 100000000000
        },
        "15": {
            "fee": 100000000
        },
        "16": {
            "fee": 500000
        },
        "17": {
            "fee": 100000
        }
    }
};
