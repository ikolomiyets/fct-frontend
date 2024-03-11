import * as jose from 'jose';
import { useConfigStore } from '../store/config';

export const jwtVerify = (jWebToken, aud) => {
    let options = {};
    if (aud) {
        options = {
            ...options,
            audience: aud
        }
    }
    return jose.jwtVerify(jWebToken, jwksKeys, options);
};
var jwksKeys;

export const saveJwksKeys = (val) => {
    jwksKeys = val;
};

export async function extractUserData(accessToken) {
    const decoded = await jwtVerify(accessToken, null);
    console.log(decoded);
    return decoded;
}

export function hasScopes(desired) {
    const config = useConfigStore();

    if (config.scopes.length > 0) {
        if (desired instanceof Array) {
            for (const d of desired) {
                for (const scope of config.scopes) {
                    if (scope === d) {
                        return true;
                    }
                }
            }
        } else {
            for (const scope of config.scopes) {
                if (scope === desired) {
                    return true;
                }
            }
        }
    }

    return false;
}