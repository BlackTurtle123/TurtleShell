export const WAVESKEEPER_DEBUG = process.env.NODE_ENV !== 'production';

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
        testnet: {
            code: 'l', server: 'https://apitnetworktest.blackturtle.eu',
            matcher: 'https://tntestnetmatcher.blackturtle.eu',
        },
        mainnet: {
            code: 'L', server: 'https://privatenode2.blackturtle.eu/',
            matcher: 'https://privatematcher.blackturtle.eu/'
        },
        custom: {
            code: '', server: '',
            matcher: '',
        }
    },
    MESSAGES_CONFIG: {
        message_expiration_ms: 30 * 60 * 1000,
        update_messages_ms: 30 * 1000,
        max_messages: 100,
    },
    PACK_CONFIG: {
        max: 5,
        allow_tx: [3, 4, 5, 6, 7, 10, 11, 12],
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
